"""
File: tests/inventory.routes.test.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Bộ kiểm thử tích hợp (Integration Tests) cho Lớp Điều phối API (inventory.routes.py).
Kiểm chứng tính tương thích với Hợp đồng API (docs/api-contract.md):
  - API 1: GET /api/v1/inventory/stock/{part_code} (200 OK)
  - API 2: POST /api/v1/inventory/transactions (201 Created, 400 Bad Request, 422 Unprocessable Entity)
  - API 3: PUT /api/v1/inventory/parts/{part_code}/threshold (200 OK, 403 Forbidden)

Chạy kiểm thử:
  pytest tests/inventory.routes.test.py -v
"""

import os
import sys
import unittest
from fastapi.testclient import TestClient

# Đảm bảo đường dẫn import tới thư mục gốc
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.app import app
from src.repositories import inventory_repository
import jwt

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "mekong_mobile_secret_jwt_key_2026_cdtn01")


class TestInventoryRoutes(unittest.TestCase):
    """Bộ test case kiểm tra tích hợp các HTTP Endpoint."""

    def setUp(self):
        """Khởi tạo TestClient của FastAPI và nạp dữ liệu mẫu cho phiên kiểm thử."""
        self.client = TestClient(app)
        self.center_id = "L5-WH-890"
        self.part_code = "SCR-IP14-01"
        self.ticket_id = "TK-1092"

        # Khởi tạo Token cho vai trò Kỹ thuật viên (TECH_STAFF)
        self.tech_token = jwt.encode({
            "email": "kythuat.test@gmail.com",
            "role": "TECH_STAFF",
            "full_name": "Lê Văn Kỹ Thuật",
            "center_id": self.center_id
        }, JWT_SECRET_KEY, algorithm="HS256")

        # Khởi tạo Token cho vai trò Quản lý kho (MANAGER)
        self.manager_token = jwt.encode({
            "email": "quanlykho.test@gmail.com",
            "role": "MANAGER",
            "full_name": "Trần Văn Quản Lý",
            "center_id": self.center_id
        }, JWT_SECRET_KEY, algorithm="HS256")

        # Đảm bảo có tồn kho ban đầu
        inventory_repository.upsert_stock(self.center_id, self.part_code, quantity=12, version=1)

    def test_01_api1_get_stock_success(self):
        """Kiểm chứng API 1: Tra cứu tồn kho trả về đúng cấu trúc theo docs/api-contract.md."""
        headers = {"Authorization": f"Bearer {self.tech_token}"}
        response = self.client.get(f"/api/v1/inventory/stock/{self.part_code}", headers=headers)

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "success")
        self.assertIn("data", data)
        stock_info = data["data"]
        self.assertEqual(stock_info["part_code"], self.part_code)
        self.assertEqual(stock_info["center_id"], self.center_id)
        self.assertIn("quantity", stock_info)
        self.assertIn("status_flag", stock_info)

    def test_02_api2_create_transaction_success(self):
        """Kiểm chứng API 2: Tạo giao dịch xuất kho hợp lệ trả về HTTP 201 Created."""
        headers = {"Authorization": f"Bearer {self.tech_token}"}
        payload = {
            "part_code": self.part_code,
            "type": "OUT",
            "quantity": 1,
            "ticket_id": self.ticket_id
        }
        response = self.client.post("/api/v1/inventory/transactions", json=payload, headers=headers)

        self.assertEqual(response.status_code, 201)
        res_data = response.json()
        self.assertEqual(res_data["status"], "success")
        self.assertIn("data", res_data)
        self.assertIn("transaction_id", res_data["data"])

    def test_03_api2_create_transaction_negative_stock_error(self):
        """Kiểm chứng API 2: Xuất quá tồn kho trả về HTTP 400 Bad Request và mã ERR_NEGATIVE_STOCK."""
        headers = {"Authorization": f"Bearer {self.tech_token}"}
        payload = {
            "part_code": self.part_code,
            "type": "OUT",
            "quantity": 99999,  # Vượt quá số lượng tồn
            "ticket_id": self.ticket_id
        }
        response = self.client.post("/api/v1/inventory/transactions", json=payload, headers=headers)

        self.assertEqual(response.status_code, 400)
        res_data = response.json()
        self.assertEqual(res_data["status"], "error")
        self.assertEqual(res_data["error_code"], "ERR_NEGATIVE_STOCK")

    def test_04_api2_create_transaction_missing_ticket_error(self):
        """Kiểm chứng API 2: Thiếu ticket_id khi xuất kho trả về HTTP 422 Unprocessable Entity theo BR-02."""
        headers = {"Authorization": f"Bearer {self.tech_token}"}
        payload = {
            "part_code": self.part_code,
            "type": "OUT",
            "quantity": 1
            # Thiếu trường ticket_id
        }
        response = self.client.post("/api/v1/inventory/transactions", json=payload, headers=headers)

        self.assertEqual(response.status_code, 422)
        res_data = response.json()
        self.assertEqual(res_data["status"], "error")
        self.assertEqual(res_data["error_code"], "ERR_INVALID_TICKET")

    def test_05_api3_update_threshold_forbidden_for_tech_staff(self):
        """Kiểm chứng API 3: Kỹ thuật viên sửa ngưỡng an toàn bị trả về HTTP 403 Forbidden."""
        headers = {"Authorization": f"Bearer {self.tech_token}"}
        payload = {"min_threshold": 25}
        response = self.client.put(f"/api/v1/inventory/parts/{self.part_code}/threshold", json=payload, headers=headers)

        self.assertEqual(response.status_code, 403)
        res_data = response.json()
        self.assertEqual(res_data["status"], "error")
        self.assertEqual(res_data["error_code"], "ERR_UNAUTHORIZED_ROLE")

    def test_06_api3_update_threshold_success_for_manager(self):
        """Kiểm chứng API 3: Quản lý kho sửa ngưỡng an toàn trả về HTTP 200 OK."""
        headers = {"Authorization": f"Bearer {self.manager_token}"}
        payload = {"min_threshold": 10}
        response = self.client.put(f"/api/v1/inventory/parts/{self.part_code}/threshold", json=payload, headers=headers)

        self.assertEqual(response.status_code, 200)
        res_data = response.json()
        self.assertEqual(res_data["status"], "success")


if __name__ == "__main__":
    unittest.main()
