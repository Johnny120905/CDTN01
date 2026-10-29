"""
File: tests/cross_role_and_ui.test.py
Mục đích: Kiểm thử tự động hóa toàn diện:
  1. Luồng tương tác liên vai trò (Cross-Role Flow & Real-time Notification).
  2. Tính toàn vẹn của Giao diện UI/UX (Font Be Vietnam Pro, Bố cục 3D, Không che Header, Màu ngữ nghĩa).
  3. Ràng buộc mật khẩu 8 ký tự (Hoa, thường, số, ký hiệu đặc biệt).
"""

import os
import sys
import unittest
import jwt

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from fastapi.testclient import TestClient
from src.app import app
from src.repositories import inventory_repository

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "mekong_mobile_secret_jwt_key_2026_cdtn01")


class TestCrossRoleAndUI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        self.center_id = "L5-WH-890"
        self.part_code = "SCR-IP14-01"
        self.ticket_id = "TK-1092"

        self.tech_token = jwt.encode({
            "email": "kythuat.test@gmail.com",
            "role": "TECH_STAFF",
            "full_name": "Lê Văn Kỹ Thuật",
            "center_id": self.center_id
        }, JWT_SECRET_KEY, algorithm="HS256")

        self.material_token = jwt.encode({
            "email": "vattu.test@gmail.com",
            "role": "MATERIAL_STAFF",
            "full_name": "Phạm Văn Vật Tư",
            "center_id": self.center_id
        }, JWT_SECRET_KEY, algorithm="HS256")

        self.manager_token = jwt.encode({
            "email": "quanlykho.test@gmail.com",
            "role": "MANAGER",
            "full_name": "Trần Văn Quản Lý",
            "center_id": self.center_id
        }, JWT_SECRET_KEY, algorithm="HS256")

    def test_01_cross_role_flow_export_triggers_manager_alert(self):
        """
        Kỹ thuật viên xuất kho linh kiện -> Tồn kho giảm -> 
        Khi tồn kho <= min_threshold, Quản lý kho lập tức nhận cảnh báo thiếu hàng (FR-07 / Threshold Alert).
        """
        # 1. Quản lý kho cấu hình ngưỡng an toàn cho SCR-IP14-01 là 50 cái
        res_threshold = self.client.put(
            f"/api/v1/inventory/parts/{self.part_code}/threshold",
            headers={"Authorization": f"Bearer {self.manager_token}"},
            json={"min_threshold": 50}
        )
        self.assertEqual(res_threshold.status_code, 200)

        # 2. Kỹ thuật viên tra cứu tồn kho hiện tại
        res_stock_before = self.client.get(
            f"/api/v1/inventory/stock/{self.part_code}",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_stock_before.status_code, 200)
        qty_before = res_stock_before.json()["data"]["quantity"]

        # 3. Kỹ thuật viên thực hiện xuất kho 1 cái theo phiếu bảo hành TK-1092
        res_export = self.client.post(
            "/api/v1/inventory/transactions",
            headers={"Authorization": f"Bearer {self.tech_token}"},
            json={
                "part_code": self.part_code,
                "type": "OUT",
                "quantity": 1,
                "ticket_id": self.ticket_id
            }
        )
        self.assertEqual(res_export.status_code, 201)
        self.assertIn("transaction_id", res_export.json()["data"])

        # Kiểm tra tồn kho sau khi xuất -> giảm đúng 1 cái
        res_stock_after = self.client.get(
            f"/api/v1/inventory/stock/{self.part_code}",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_stock_after.json()["data"]["quantity"], qty_before - 1)

        # 4. Kiểm tra phía Quản lý kho: API Cảnh báo ngưỡng phải báo động vì tồn kho < 50 cái
        res_alerts = self.client.get(
            "/api/v1/inventory/alerts/threshold",
            headers={"Authorization": f"Bearer {self.manager_token}"}
        )
        self.assertEqual(res_alerts.status_code, 200)
        alerts = res_alerts.json()["data"]
        alert_codes = [a["part_code"] for a in alerts]
        self.assertIn(self.part_code, alert_codes)

    def test_02_cross_role_flow_material_import_updates_tech_stock(self):
        """
        Nhân viên vật tư tiếp nhận lô hàng Nhập kho (IN) -> 
        Tồn kho tăng -> Kỹ thuật viên lập tức thấy tồn kho khả dụng để phục vụ sửa chữa.
        """
        # 1. Kỹ thuật viên kiểm tra tồn kho hiện tại
        res_before = self.client.get(
            f"/api/v1/inventory/stock/{self.part_code}",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_before.status_code, 200)
        qty_before = res_before.json()["data"]["quantity"]

        # 2. Nhân viên vật tư nhập thêm 10 linh kiện từ nhà cung cấp
        res_import = self.client.post(
            "/api/v1/inventory/transactions",
            headers={"Authorization": f"Bearer {self.material_token}"},
            json={
                "part_code": self.part_code,
                "type": "IN",
                "quantity": 10,
                "ticket_id": None
            }
        )
        self.assertEqual(res_import.status_code, 201)

        # 3. Kỹ thuật viên kiểm tra lại tồn kho -> phải tăng chính xác 10 cái
        res_after = self.client.get(
            f"/api/v1/inventory/stock/{self.part_code}",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_after.status_code, 200)
        self.assertEqual(res_after.json()["data"]["quantity"], qty_before + 10)

    def test_03_static_homepage_layout_and_font_integrity(self):
        """
        Kiểm tra trang giao diện HTML tĩnh:
        - Phục vụ thành công tại endpoint '/' (HTTP 200).
        - Nhúng chuẩn font Be Vietnam Pro.
        - Header chuẩn: Có 'SMART CRM — MEKONG MOBILE', 'Chi nhánh: Quận 1'.
        - Không chứa khung 'Luồng 05: Kho linh kiện' hoặc mã '(L5-WH-890)' trên Header.
        """
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        html = res.text

        # 1. Kiểm tra Font Be Vietnam Pro
        self.assertIn("Be+Vietnam+Pro", html)
        self.assertIn("Be Vietnam Pro", html)

        # 2. Kiểm tra Header branding theo yêu cầu Item 4
        self.assertIn("SMART CRM — MEKONG MOBILE", html)
        self.assertIn("Chi nhánh: <strong class=\"text-zinc-800 font-bold\">Quận 1</strong>", html)
        self.assertNotIn("LUỒNG 05: KHO LINH KIỆN", html)
        self.assertNotIn("Quận 1 (L5-WH-890)", html)

        # 3. Kiểm tra các phần tử hiển thị lỗi đỏ bên dưới (Input Error Containers)
        self.assertIn('id="loginEmailError"', html)
        self.assertIn('id="loginPasswordError"', html)
        self.assertIn('id="regPasswordError"', html)
        self.assertIn('id="regPasswordChecklist"', html)
        self.assertIn('id="resetNewPasswordError"', html)

    def test_04_styles_css_3d_and_semantic_colors(self):
        """
        Kiểm tra tệp styles.css:
        - Có định nghĩa các lớp hiệu ứng 3D (.card-3d, .btn-3d-primary, .glass-panel).
        - Có định nghĩa 3 màu trạng thái ngữ nghĩa (.status-badge-green, .status-badge-yellow, .status-badge-red).
        - Có định nghĩa kiểu dáng báo lỗi dòng đỏ (.field-error-text, .field-error-input).
        """
        res = self.client.get("/static/styles.css")
        self.assertEqual(res.status_code, 200)
        css = res.text

        self.assertIn(".card-3d", css)
        self.assertIn(".btn-3d-primary", css)
        self.assertIn(".glass-panel", css)
        self.assertIn(".status-badge-green", css)
        self.assertIn(".status-badge-yellow", css)
        self.assertIn(".status-badge-red", css)
        self.assertIn(".field-error-text", css)
        self.assertIn(".field-error-input", css)

    def test_05_clean_app_js_no_breadcrumbs_no_technical_codes(self):
        """
        Kiểm tra tệp app.js:
        - Đã loại bỏ các dòng breadcrumb như 'Kho vận & Kỹ thuật', 'chevron_right'.
        - Đã loại bỏ các mã yêu cầu kỹ thuật '(FR-', '(BR-', '(NFR-' trên giao diện.
        - Chứa hàm kiểm tra độ phức tạp mật khẩu 8 ký tự validatePasswordComplexity.
        """
        res = self.client.get("/static/app.js")
        self.assertEqual(res.status_code, 200)
        js = res.text

        # Kiểm tra không có breadcrumbs
        self.assertNotIn("Kho vận & Kỹ thuật", js)
        self.assertNotIn("Kho vận & Quản lý vật tư", js)
        self.assertNotIn("chevron_right", js)

        # Kiểm tra không chứa các mã kỹ thuật trên giao diện người dùng
        self.assertNotIn("(FR-01)", js)
        self.assertNotIn("(FR-06)", js)
        self.assertNotIn("(FR-07)", js)
        self.assertNotIn("(BR-01)", js)
        self.assertNotIn("(BR-02)", js)
        self.assertNotIn("(BR-03)", js)
        self.assertNotIn("(NFR-03)", js)

        # Kiểm tra hàm validation mật khẩu 8 ký tự
        self.assertIn("function validatePasswordComplexity", js)
        self.assertIn("handleRegPasswordInput", js)
        self.assertIn("handleResetPasswordInput", js)

    def test_06_header_renamed_logout_button_and_no_luong_05(self):
        """
        Kiểm tra nút Đăng xuất trên Header:
        - Đã đổi tên thành 'Đăng xuất tài khoản'.
        - Không còn tên cũ 'Đăng xuất khỏi hệ thống'.
        - Không chứa khung xám 'LUỒNG 05: KHO LINH KIỆN'.
        """
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        html = res.text
        self.assertIn("Đăng xuất tài khoản", html)
        self.assertNotIn("Đăng xuất khỏi hệ thống", html)
        self.assertNotIn("LUỒNG 05: KHO LINH KIỆN", html)

    def test_07_tech_staff_unified_smart_search_and_reset_form(self):
        """
        Kiểm tra tính năng Tra cứu & Giao dịch của Nhân viên kỹ thuật:
        - Có thanh tìm kiếm thông minh hợp nhất (smartPartSearch).
        - Có hàm gợi ý dropdown trực quan (handleSmartPartSearch).
        - Có hàm đánh giá trạng thái tồn kho 3 màu (getSemanticStockBadge).
        - Có nút và hàm đặt lại biểu mẫu hoạt động chuẩn xác (resetTechTransactionForm).
        """
        res = self.client.get("/static/app.js")
        self.assertEqual(res.status_code, 200)
        js = res.text
        self.assertIn("smartPartSearch", js)
        self.assertIn("handleSmartPartSearch", js)
        self.assertIn("getSemanticStockBadge", js)
        self.assertIn("resetTechTransactionForm", js)

    def test_08_manager_subordinates_search_filter_and_pagination(self):
        """
        Kiểm tra Quản lý nhân sự của Quản lý kho:
        - Có ô tìm kiếm nhân sự (userSearchInput).
        - Có bộ lọc vai trò (userRoleFilter).
        - Có bộ lọc trạng thái (userStatusFilter).
        - Có ngưỡng phân trang (userPageSize: 10, 20, 50, Tất cả).
        - Có hàm hiển thị huy hiệu trạng thái phân biệt rõ ràng (renderUserStatusBadge).
        """
        res = self.client.get("/static/app.js")
        self.assertEqual(res.status_code, 200)
        js = res.text
        self.assertIn("userSearchInput", js)
        self.assertIn("userRoleFilter", js)
        self.assertIn("userStatusFilter", js)
        self.assertIn("userPageSize", js)
        self.assertIn("renderUserStatusBadge", js)

    def test_09_password_eye_toggle_and_hidden_checklists(self):
        """
        Kiểm tra yêu cầu mới về con mắt toggle mật khẩu, bảng quy chuẩn ẩn và API /parts:
        1. Cả 3 ô mật khẩu (loginPassword, regPassword, resetNewPassword) đều có nút con mắt .eye-toggle-btn.
        2. Bảng quy chuẩn mật khẩu (#regPasswordChecklist, #resetPasswordChecklist) có class 'hidden' mặc định.
        3. Hàm togglePasswordVisibility và validatePasswordComplexity có trong app.js.
        4. API GET /api/v1/inventory/parts trả về HTTP 200 kèm danh mục linh kiện.
        """
        res_html = self.client.get("/")
        self.assertEqual(res_html.status_code, 200)
        html = res_html.text

        # 1. Nút con mắt ở 3 form
        self.assertIn("togglePasswordVisibility('loginPassword'", html)
        self.assertIn("togglePasswordVisibility('regPassword'", html)
        self.assertIn("togglePasswordVisibility('resetNewPassword'", html)
        self.assertIn("eye-toggle-btn", html)

        # 2. Bảng quy chuẩn mật khẩu ẩn mặc định
        self.assertIn('id="regPasswordChecklist" class="hidden', html)
        self.assertIn('id="resetPasswordChecklist" class="hidden', html)

        # 3. CSS định nghĩa nút con mắt và autofill
        res_css = self.client.get("/static/styles.css")
        self.assertEqual(res_css.status_code, 200)
        self.assertIn(".eye-toggle-btn", res_css.text)
        self.assertIn("input:-webkit-autofill", res_css.text)

        # 4. API GET /api/v1/inventory/parts thành công không bị lỗi 404
        res_parts = self.client.get(
            "/api/v1/inventory/parts",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_parts.status_code, 200)
        parts_data = res_parts.json()
        self.assertEqual(parts_data["status"], "success")
        self.assertIsInstance(parts_data["data"], list)
        self.assertGreater(len(parts_data["data"]), 0)

    def test_10_otp_10_minutes_and_live_countdown(self):
        """
        Kiểm tra yêu cầu 1:
        - Thời gian OTP là 10 phút (10:00).
        - Hàm startOtpCountdown(600) đếm ngược mỗi giây trong app.js.
        - Backend sinh OTP có hạn 10 phút (timedelta(minutes=10)).
        """
        res_html = self.client.get("/")
        self.assertEqual(res_html.status_code, 200)
        self.assertIn('id="countdownTimer"', res_html.text)
        self.assertIn('>10:00<', res_html.text)

        res_js = self.client.get("/static/app.js")
        self.assertEqual(res_js.status_code, 200)
        self.assertIn("startOtpCountdown(600)", res_js.text)
        self.assertIn("otpCountdownInterval", res_js.text)

    def test_11_vietnamese_translations_and_out_transaction_representation(self):
        """
        Kiểm tra yêu cầu 2:
        - Chuyển ngữ toàn bộ mã kỹ thuật tiếng Anh sang tiếng Việt.
        - OUT -> 'Xuất kho thay thế', IN -> 'Nhập kho vật tư', RETURN -> 'Hoàn trả linh kiện'.
        - OPEN -> 'Chờ tiếp nhận', IN_PROGRESS -> 'Đang xử lý', RESOLVED/COMPLETED -> 'Đã hoàn thành'.
        - Sổ cái kiểm toán Audit Log hiển thị rõ phân loại 'Xuất kho thay thế' kèm Ticket ID và Người thực hiện.
        """
        res_js = self.client.get("/static/app.js")
        self.assertEqual(res_js.status_code, 200)
        js = res_js.text
        self.assertIn("formatTicketStatus", js)
        self.assertIn("formatTransactionType", js)
        self.assertIn("Chờ tiếp nhận", js)
        self.assertIn("Đang xử lý", js)
        self.assertIn("Xuất kho thay thế", js)
        self.assertIn("Nhập kho vật tư", js)
        self.assertIn("Hoàn trả linh kiện", js)
        self.assertIn("NGƯỜI THỰC HIỆN", js)

    def test_12_material_staff_ui_no_create_button_and_stats_table(self):
        """
        Kiểm tra yêu cầu 3:
        - Bảng tin Quản lý vật tư không còn nút 'Tạo lệnh Nhập kho mới' ở Main Content.
        - Giao diện Nhập kho linh kiện mới có bố cục 2 cột kèm 'THỐNG KÊ TỒN KHO LINH KIỆN' kế bên biểu mẫu.
        """
        res_js = self.client.get("/static/app.js")
        self.assertEqual(res_js.status_code, 200)
        js = res_js.text
        # Không có nút Tạo lệnh Nhập kho mới
        self.assertNotIn("Tạo lệnh Nhập kho mới", js)
        # Có Bảng Thống kê bên cạnh phiếu nhập kho
        self.assertIn("PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ", js)
        self.assertIn("THỐNG KÊ TỒN KHO LINH KIỆN", js)
        self.assertIn("selectPartForStockIn", js)

    def test_13_manager_navigation_reports_removed_from_sidebar_and_back_button(self):
        """
        Kiểm tra yêu cầu 4:
        - Danh mục 'Báo cáo Xuất Nhập Tồn' đã được bỏ khỏi Sidebar của Quản lý kho.
        - Trong giao diện Báo cáo Xuất Nhập Tồn có nút 'Quay lại trang' dẫn về Dashboard Tổng quan.
        """
        res_js = self.client.get("/static/app.js")
        self.assertEqual(res_js.status_code, 200)
        js = res_js.text
        
        # Sidebar MANAGER chỉ còn dashboard, audit, users và không còn manager_reports
        js_normalized = js.replace("\r\n", "\n")
        self.assertNotIn('{ id: "manager_reports"', js_normalized)
        self.assertIn('{ id: "manager_dashboard", label: "Dashboard Tổng quan"', js_normalized)
        self.assertIn('{ id: "manager_audit", label: "Nhật ký Giao dịch Kho"', js_normalized)
        self.assertIn('{ id: "manager_users", label: "Quản lý nhân sự"', js_normalized)
        # Nút Quay lại trang
        self.assertIn("Quay lại trang", js)
        self.assertIn("navigateToTab('manager_dashboard')", js)

    def test_14_expanded_parts_catalog_40_items(self):
        """
        Kiểm tra yêu cầu 6:
        - Danh mục linh kiện được mở rộng từ 7 lên 40 mã linh kiện (+33 linh kiện mới).
        - API GET /api/v1/inventory/parts và /inventory/stock trả về >= 40 mặt hàng.
        """
        res_parts = self.client.get(
            "/api/v1/inventory/parts",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_parts.status_code, 200)
        parts = res_parts.json()["data"]
        self.assertGreaterEqual(len(parts), 40)

        res_stock = self.client.get(
            "/api/v1/inventory/stock",
            headers={"Authorization": f"Bearer {self.tech_token}"}
        )
        self.assertEqual(res_stock.status_code, 200)
        stocks = res_stock.json()["data"]
        self.assertGreaterEqual(len(stocks), 40)

    def test_15_tech_staff_smart_lookup_enter_and_not_found_handling(self):
        """
        Kiểm tra yêu cầu cải tiến mới:
        - Nút 'Tra cứu' đã được loại bỏ khỏi form xuất linh kiện, thay bằng Enter và gợi ý dropdown.
        - Ô tìm kiếm thông minh không điền sẵn nội dung, có placeholder 'bấm Enter để chọn'.
        - Trạng thái ban đầu của khung tồn kho hiển thị 'Chưa chọn linh kiện'.
        - Hỗ trợ phím Enter (handleSmartSearchKeyDown).
        - Xử lý không tìm thấy hiển thị 'Không tìm thấy linh kiện phù hợp với từ khóa'.
        - Nút 'Đặt lại biểu mẫu' khôi phục sạch sẽ toàn bộ thông tin về ban đầu.
        """
        res_js = self.client.get("/static/app.js")
        self.assertEqual(res_js.status_code, 200)
        js = res_js.text
        # Nút Tra cứu đã được loại bỏ khỏi form
        self.assertNotIn('id="btnTraCuuPart"', js)
        self.assertIn('placeholder="Nhập thông tin linh kiện (Mã hoặc Tên), bấm Enter để chọn..."', js)
        self.assertIn("Chưa chọn linh kiện", js)
        self.assertIn("handleSmartSearchKeyDown", js)
        self.assertIn("Không tìm thấy linh kiện phù hợp với từ khóa", js)
        self.assertIn("resetTechTransactionForm", js)
        self.assertIn("Đã đặt lại toàn bộ biểu mẫu về trạng thái ban đầu sạch sẽ", js)


if __name__ == "__main__":
    unittest.main()



