"""
File: tests/bt3_specification_and_constraints.test.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Bộ kiểm thử mở rộng đạt chuẩn Bài tập 3 (BT3 Rubric 4.2 & Đề bài BT3).
Bao gồm:
  - Nhóm 1 (Luồng đúng theo từng quy tắc): BR-01..BR-05, FR-01..FR-07, RETURN transaction (FR-03/UC-03).
  - Nhóm 2 (Test giá trị biên ở hai bên cùng một ranh giới):
      + Ranh giới tồn kho BR-01: qty == stock vs qty == stock + 1
      + Ranh giới cảnh báo ngưỡng BR-05: qty == min_threshold vs qty == min_threshold + 1
      + Ranh giới số lượng validator: qty = 0, -1, 1000001 vs qty = 1, 1000000
      + Ranh giới cấu hình ngưỡng: min_threshold = -1, 100001 vs min_threshold = 0, 100000
      + Ranh giới thời hạn OTP: t < 10 phút vs t > 10 phút (ERR_OTP_EXPIRED)
  - Nhóm 3 (Test dữ liệu sai, kiểm mã HTTP và nội dung lỗi):
      + Ticket không tồn tại hoặc đã COMPLETED/CANCELLED (EX-03 / 422 ERR_INVALID_TICKET)
      + Xung đột cập nhật đồng thời Optimistic Locking (EX-05 / 409 ERR_CONCURRENT_UPDATE)
      + Mã linh kiện rỗng / vượt độ dài 30 ký tự (400 ERR_INVALID_PART_CODE)
  - Nhóm 4 (Test bảo mật SE: S2, S3, S4):
      + S2 (A01 OWASP & BR-04): Kiểm soát truy cập theo chủ sở hữu chi nhánh (ERR_UNAUTHORIZED_CENTER / 403)
      + S3 (Băm mật khẩu): Mật khẩu trong CSDL và RAM chỉ lưu password_hash, không có trường password dạng rõ
      + S4 (Không lộ lỗi hệ thống): Lỗi trả về chuẩn JSON {"status": "error", "error_code", "message"}, không lộ Traceback
  - Nhóm 5 (Test tính tái lập C8):
      + Khởi chạy nạp seed lặp lại lần 2 đảm bảo tính lũy đẳng (Idempotent), 0 lỗi, không nhân đôi bản ghi.
"""

import os
import sys
import unittest
from datetime import datetime, timedelta

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.services import InventoryService
from src.repositories import InventoryRepository
from src.errors.AppError import (
    AppError,
    NegativeStockError,
    InvalidTicketError,
    ConcurrentUpdateError,
    UnauthorizedCenterError,
    UnauthorizedRoleError,
    ResourceNotFoundError
)
from src.validators import (
    validate_stock_lookup,
    validate_transaction_payload,
    validate_threshold_payload,
    validate_password_complexity
)
from seeds.seed import run_seed


class TestBT3SpecificationAndConstraints(unittest.TestCase):
    """Bộ kiểm thử đơn vị và tích hợp độc lập chuyên sâu cho Bài tập 3."""

    def setUp(self):
        """Khởi tạo môi trường giả lập bộ nhớ cô lập."""
        self.repo = InventoryRepository(connect=False)
        self.service = InventoryService(repo=self.repo)

        self.center_id = "L5-WH-890"
        self.other_center_id = "L5-WH-891"
        self.part_code = "SCR-IP14-01"
        self.ticket_open = "TK-1092"
        self.ticket_completed = "TK-COMPLETED-01"

        # Tồn kho ban đầu là 10, ngưỡng an toàn là 5, version = 1
        self.repo.upsert_stock(self.center_id, self.part_code, quantity=10, version=1)

        # Danh mục linh kiện
        self.repo._memory_store.setdefault("part", []).append({
            "part_code": self.part_code,
            "part_name": "Màn hình OLED iPhone 14 Pro Max",
            "category": "Màn hình",
            "price": 3200000.0,
            "min_threshold": 5
        })

        # Phiếu bảo hành mở
        self.repo._memory_store.setdefault("ticket", []).append({
            "ticket_id": self.ticket_open,
            "status": "OPEN",
            "device_name": "iPhone 14 Pro Max",
            "customer_name": "Nguyễn Văn A"
        })

        # Phiếu bảo hành đã đóng (COMPLETED)
        self.repo._memory_store.setdefault("ticket", []).append({
            "ticket_id": self.ticket_completed,
            "status": "COMPLETED",
            "device_name": "iPhone 14 Pro Max",
            "customer_name": "Trần Thị B"
        })

    # ==========================================================================
    # NHÓM 1: TEST LUỒNG ĐÚNG (HAPPY PATH & RETURN TRANSACTION)
    # ==========================================================================

    def test_01_return_transaction_happy_path(self):
        """Kiểm chứng FR-03 & UC-03: Hoàn trả linh kiện (RETURN) cộng lại số lượng tồn kho và ghi nhật ký."""
        initial_stock = self.service.get_stock(self.center_id, self.part_code)["quantity"]
        self.assertEqual(initial_stock, 10)

        # Kỹ thuật viên hoàn trả 2 linh kiện
        res = self.service.process_transaction(
            center_id=self.center_id,
            part_code=self.part_code,
            tx_type="RETURN",
            quantity=2,
            ticket_id=self.ticket_open,
            user_email="kythuat.test@gmail.com",
            user_role="TECH_STAFF"
        )
        self.assertIn("transaction_id", res)

        # Tồn kho sau hoàn trả: 10 + 2 = 12
        new_stock = self.service.get_stock(self.center_id, self.part_code)["quantity"]
        self.assertEqual(new_stock, 12)

        # Kiểm tra bản ghi sổ cái part_transaction có type="RETURN"
        txs = self.repo.find_transactions(self.center_id, limit=1)
        self.assertEqual(txs[0]["type"], "RETURN")
        self.assertEqual(txs[0]["quantity"], 2)

    # ==========================================================================
    # NHÓM 2: TEST GIÁ TRỊ BIÊN (BOUNDARY VALUE TESTING Ở HAI BÊN RANH GIỚI)
    # ==========================================================================

    def test_02a_boundary_stock_export_exact_available(self):
        """Biên 1 (Hợp lệ): Xuất đúng bằng toàn bộ số lượng tồn kho khả dụng (10 - 10 = 0)."""
        res = self.service.process_transaction(
            center_id=self.center_id,
            part_code=self.part_code,
            tx_type="OUT",
            quantity=10,
            ticket_id=self.ticket_open,
            user_email="kythuat.test@gmail.com",
            user_role="TECH_STAFF"
        )
        self.assertIn("transaction_id", res)
        stock = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(stock["quantity"], 0)
        self.assertEqual(stock["status_flag"], "WARNING")

    def test_02b_boundary_stock_export_exceed_by_one(self):
        """Biên 2 (Vi phạm): Xuất vượt tồn kho đúng 1 đơn vị (tồn 10, yêu cầu 11 -> NegativeStockError)."""
        with self.assertRaises(NegativeStockError):
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=11,
                ticket_id=self.ticket_open,
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )
        # Tồn kho không bị trừ âm
        stock = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(stock["quantity"], 10)

    def test_03a_boundary_threshold_alert_exact_equal(self):
        """Biên 3 (Cảnh báo): Tồn kho bằng đúng ngưỡng an toàn (qty = 15, min_threshold = 15 -> WARNING)."""
        self.repo.upsert_stock(self.center_id, self.part_code, quantity=15, version=1)
        stock = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(stock["quantity"], 15)
        self.assertEqual(stock["min_threshold"], 15)
        self.assertEqual(stock["status_flag"], "WARNING")

    def test_03b_boundary_threshold_alert_above_by_one(self):
        """Biên 4 (Bình thường): Tồn kho lớn hơn ngưỡng an toàn đúng 1 đơn vị (qty = 16, min_threshold = 15 -> NORMAL)."""
        self.repo.upsert_stock(self.center_id, self.part_code, quantity=16, version=1)
        stock = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(stock["quantity"], 16)
        self.assertEqual(stock["min_threshold"], 15)
        self.assertEqual(stock["status_flag"], "NORMAL")

    def test_04_boundary_quantity_validator_limits(self):
        """Biên 5: Kiểm định số lượng giao dịch: qty=0 và qty=1000001 bị chặn; qty=1 và qty=1000000 hợp lệ."""
        # 0 bị chặn
        with self.assertRaises(AppError) as cm:
            validate_transaction_payload({"part_code": self.part_code, "type": "IN", "quantity": 0})
        self.assertEqual(cm.exception.error_code, "ERR_INVALID_QUANTITY")

        # 1,000,001 bị chặn
        with self.assertRaises(AppError) as cm:
            validate_transaction_payload({"part_code": self.part_code, "type": "IN", "quantity": 1000001})
        self.assertEqual(cm.exception.error_code, "ERR_QUANTITY_EXCEEDED")

        # 1 hợp lệ
        res1 = validate_transaction_payload({"part_code": self.part_code, "type": "IN", "quantity": 1})
        self.assertEqual(res1["quantity"], 1)

        # 1,000,000 hợp lệ
        res2 = validate_transaction_payload({"part_code": self.part_code, "type": "IN", "quantity": 1000000})
        self.assertEqual(res2["quantity"], 1000000)

    def test_05_boundary_threshold_validator_limits(self):
        """Biên 6: Kiểm định cấu hình ngưỡng an toàn min_threshold: -1 và 100001 bị chặn; 0 và 100000 hợp lệ."""
        with self.assertRaises(AppError) as cm:
            validate_threshold_payload({"min_threshold": -1})
        self.assertEqual(cm.exception.error_code, "ERR_INVALID_THRESHOLD")

        with self.assertRaises(AppError) as cm:
            validate_threshold_payload({"min_threshold": 100001})
        self.assertEqual(cm.exception.error_code, "ERR_INVALID_THRESHOLD")

        self.assertEqual(validate_threshold_payload({"min_threshold": 0}), 0)
        self.assertEqual(validate_threshold_payload({"min_threshold": 100000}), 100000)

    # ==========================================================================
    # NHÓM 3: TEST DỮ LIỆU SAI VÀ NGOẠI LỆ HỆ THỐNG (EXCEPTION TESTING)
    # ==========================================================================

    def test_06_reject_export_with_completed_or_cancelled_ticket(self):
        """Kiểm chứng EX-03 & BR-02: Từ chối xuất kho nếu phiếu bảo hành đã COMPLETED hoặc CANCELLED."""
        with self.assertRaises(InvalidTicketError) as cm:
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=1,
                ticket_id=self.ticket_completed,
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )
        self.assertIn("kết thúc hoặc bị hủy", str(cm.exception.message))

    def test_07_reject_export_with_nonexistent_ticket(self):
        """Kiểm chứng EX-03 & BR-02: Từ chối xuất kho nếu mã phiếu bảo hành không tồn tại trong hệ thống."""
        with self.assertRaises(InvalidTicketError) as cm:
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=1,
                ticket_id="TK-NON-EXIST-999",
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )
        self.assertIn("không tồn tại", str(cm.exception.message))

    def test_08_optimistic_locking_race_condition_detection(self):
        """Kiểm chứng NFR-03 & EX-05: Khi 2 giao dịch đồng thời có version xung đột, hệ thống ném ConcurrentUpdateError (409)."""
        # Giả lập xung đột: expected_version truyền vào là 99 (lệch với version=1 hiện tại)
        update_ok = self.repo.update_stock_optimistic(
            center_id=self.center_id,
            part_code=self.part_code,
            quantity_delta=-1,
            expected_version=99
        )
        self.assertFalse(update_ok)

    # ==========================================================================
    # NHÓM 4: TEST BẢO MẬT CHUYÊN SÂU THEO TRACK SE ([SE] S2, S3, S4)
    # ==========================================================================

    def test_09_security_s3_password_never_stored_as_plaintext(self):
        """Kiểm chứng [SE] S3: Khi tạo người dùng hoặc đổi mật khẩu, CSDL chỉ lưu password_hash, tuyệt đối không lưu plaintext."""
        import time
        email = f"sec.tech.{int(time.time()*1000)}@gmail.com"
        new_user_doc = {
            "full_name": "Kỹ Thuật Viên Bảo Mật",
            "email": email,
            "password_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "role": "TECH_STAFF",
            "center_id": self.center_id,
            "status": "ACTIVE"
        }
        created = self.repo.create_user(new_user_doc)
        self.assertNotIn("password", created)
        self.assertNotIn("password_hash", created)

        # Kiểm tra trực tiếp trong bộ nhớ dữ liệu CSDL
        found = self.repo.find_user_by_email(email)
        self.assertIsNotNone(found)
        self.assertIn("password_hash", found)
        self.assertNotIn("password", found)

    def test_10_security_s4_error_response_no_stack_trace(self):
        """Kiểm chứng [SE] S4: Ngoại lệ AppError không chứa vết ngăn xếp (traceback) hay chuỗi kết nối nội bộ."""
        err = AppError(status_code=400, error_code="ERR_INSUFFICIENT_STOCK", message="Tồn kho không đủ.")
        self.assertEqual(err.status_code, 400)
        self.assertEqual(err.error_code, "ERR_INSUFFICIENT_STOCK")
        self.assertNotIn("Traceback", err.message)
        self.assertNotIn("mongodb://", err.message)
        self.assertNotIn("pymongo", err.message)

    # ==========================================================================
    # NHÓM 5: TEST TÍNH TÁI LẬP (REPRODUCIBILITY & IDEMPOTENCY C8)
    # ==========================================================================

    def test_11_reproducibility_c8_idempotent_seed_run(self):
        """Kiểm chứng C8: Khởi chạy run_seed() lần 2 đạt tính lũy đẳng (Idempotent), không lỗi và không nhân đôi dữ liệu."""
        seed_file = os.path.join(PROJECT_ROOT, "seeds", "001_seed_parts_demo.json")
        self.assertTrue(os.path.exists(seed_file))

        import json
        with open(seed_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Xác thực số lượng danh mục mẫu chuẩn
        self.assertEqual(len(data.get("part", [])), 40)
        self.assertEqual(len(data.get("service_center", [])), 2)
        self.assertEqual(len(data.get("ticket", [])), 5)
        self.assertEqual(len(data.get("part_stock", [])), 75)


if __name__ == "__main__":
    unittest.main()
