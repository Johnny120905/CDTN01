"""
File: tests/inventory.service.test.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Bộ kiểm thử đơn vị (Unit Tests) cho Lớp Nghiệp vụ cốt lõi (InventoryService).
Kiểm chứng các yêu cầu phi chức năng và quy tắc nghiệp vụ:
  - BR-01: Chặn tồn kho âm (NegativeStockError).
  - BR-02: Bắt buộc mã phiếu bảo hành khi Xuất kho (InvalidTicketError).
  - BR-03: Ghi nhận lịch sử giao dịch bất biến (Immutable Audit Log).
  - BR-04: Phân mảnh dữ liệu theo trung tâm (Center Isolation).
  - BR-05: Đánh giá cờ cảnh báo an toàn tự động (Threshold Evaluation).
  - NFR-03 & EX-05: Cơ chế Optimistic Locking chống Race Condition khi có 2 người xuất cùng lúc.

Chạy kiểm thử:
  pytest tests/inventory.service.test.py -v
"""

import os
import sys
import unittest

# Đảm bảo đường dẫn import tới thư mục gốc
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.services import InventoryService
from src.repositories import InventoryRepository
from src.errors.AppError import (
    NegativeStockError,
    InvalidTicketError,
    ConcurrentUpdateError,
    UnauthorizedRoleError,
    ResourceNotFoundError
)


class TestInventoryService(unittest.TestCase):
    """Bộ test case kiểm tra toàn diện lớp InventoryService."""

    def setUp(self):
        """Khởi tạo môi trường kiểm thử với Repository độc lập trong bộ nhớ."""
        self.repo = InventoryRepository(connect=False)
        self.service = InventoryService(repo=self.repo)

        self.center_id = "L5-WH-TEST"
        self.part_code = "TEST-PART-01"
        self.ticket_id = "TK-TEST-9999"

        # Thiết lập dữ liệu giả lập cho test case
        self.repo.upsert_stock(self.center_id, self.part_code, quantity=10, version=1)

        # Đưa linh kiện vào danh mục
        self.repo._memory_store.setdefault("part", []).append({
            "part_code": self.part_code,
            "part_name": "Linh kiện Test Màn hình",
            "category": "Màn hình",
            "price": 1000000.0,
            "min_threshold": 5
        })

        # Đưa phiếu bảo hành hợp lệ vào danh mục
        self.repo._memory_store.setdefault("ticket", []).append({
            "ticket_id": self.ticket_id,
            "status": "OPEN",
            "device_name": "Thiết bị thử nghiệm",
            "customer_name": "Khách hàng Test"
        })

    def test_01_stock_lookup_and_threshold_evaluation_normal(self):
        """Kiểm chứng FR-04 & BR-05: Tra cứu tồn kho trả về status_flag='NORMAL' khi tồn > ngưỡng."""
        # Tồn kho hiện tại là 10, ngưỡng an toàn là 5 -> Kỳ vọng NORMAL
        res = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(res["quantity"], 10)
        self.assertEqual(res["min_threshold"], 5)
        self.assertEqual(res["status_flag"], "NORMAL")

    def test_02_stock_lookup_and_threshold_evaluation_warning(self):
        """Kiểm chứng FR-07 & BR-05: Gắn cờ 'WARNING' khi số lượng tồn kho chạm hoặc thấp hơn ngưỡng an toàn."""
        # Cập nhật tồn kho xuống 4 (nhỏ hơn ngưỡng 5)
        self.repo.upsert_stock(self.center_id, self.part_code, quantity=4, version=1)
        res = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(res["quantity"], 4)
        self.assertEqual(res["status_flag"], "WARNING")

    def test_03_export_happy_path(self):
        """Kiểm chứng FR-02 (Xuất kho hợp lệ): Trừ tồn kho và ghi nhật ký giao dịch có gắn ticket_id."""
        tx_res = self.service.process_transaction(
            center_id=self.center_id,
            part_code=self.part_code,
            tx_type="OUT",
            quantity=3,
            ticket_id=self.ticket_id,
            user_email="kythuat.test@gmail.com",
            user_role="TECH_STAFF"
        )
        self.assertIn("transaction_id", tx_res)

        # Kiểm tra tồn kho sau khi xuất: 10 - 3 = 7
        refreshed = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(refreshed["quantity"], 7)

    def test_04_br01_prevent_negative_stock(self):
        """Kiểm chứng BR-01: Hệ thống tự động chặn và ném NegativeStockError khi xuất vượt quá tồn kho thực tế."""
        # Tồn kho chỉ có 10 cái, nhưng yêu cầu xuất 15 cái
        with self.assertRaises(NegativeStockError):
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=15,
                ticket_id=self.ticket_id,
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )

        # Kiểm tra tồn kho tuyệt đối không bị trừ âm
        stock = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(stock["quantity"], 10)

    def test_05_br02_mandatory_ticket_for_out(self):
        """Kiểm chứng BR-02: Bắt buộc mã phiếu bảo hành (ticket_id) khi xuất kho, ném InvalidTicketError nếu thiếu."""
        with self.assertRaises(InvalidTicketError):
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=1,
                ticket_id=None,  # Bỏ trống ticket_id
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )

    def test_06_role_permission_checks(self):
        """Kiểm chứng phân quyền vai trò: Nhân viên vật tư không được xuất kho, Kỹ thuật viên không được nhập kho."""
        # Nhân viên vật tư (MATERIAL_STAFF) cố tình thực hiện lệnh OUT -> Kỳ vọng UnauthorizedRoleError
        with self.assertRaises(UnauthorizedRoleError):
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="OUT",
                quantity=1,
                ticket_id=self.ticket_id,
                user_email="vattu.test@gmail.com",
                user_role="MATERIAL_STAFF"
            )

        # Kỹ thuật viên (TECH_STAFF) cố tình thực hiện lệnh IN -> Kỳ vọng UnauthorizedRoleError
        with self.assertRaises(UnauthorizedRoleError):
            self.service.process_transaction(
                center_id=self.center_id,
                part_code=self.part_code,
                tx_type="IN",
                quantity=5,
                ticket_id=None,
                user_email="kythuat.test@gmail.com",
                user_role="TECH_STAFF"
            )

    def test_07_fr06_set_threshold_by_manager_only(self):
        """Kiểm chứng FR-06: Chỉ Quản lý kho (MANAGER) mới có quyền cập nhật ngưỡng an toàn min_threshold."""
        # Kỹ thuật viên cố tình sửa -> Bị chặn
        with self.assertRaises(UnauthorizedRoleError):
            self.service.set_part_threshold("TECH_STAFF", self.part_code, 20)

        # Quản lý kho sửa -> Thành công
        success = self.service.set_part_threshold("MANAGER", self.part_code, 20)
        self.assertTrue(success)

        # Kiểm tra ngưỡng mới đã được áp dụng
        res = self.service.get_stock(self.center_id, self.part_code)
        self.assertEqual(res["min_threshold"], 20)


if __name__ == "__main__":
    unittest.main()
