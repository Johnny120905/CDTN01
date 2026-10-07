# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS) RÚT GỌN
**Dự án:** Smart CRM - Mekong Mobile 
**Phân hệ:** Luồng L5 - Quản lý Kho linh kiện

---

## Mục 1: Giới thiệu & Phạm vi

> **Bối cảnh & Phát biểu phạm vi dự án:**
> Hệ thống Smart CRM phân hệ L5 được xây dựng nhằm số hóa quy trình quản lý kho linh kiện tại các trung tâm bảo hành Mekong Mobile. Mục tiêu là triệt tiêu độ trễ thông tin, kiểm soát chặt chẽ tồn kho vật lý và đảm bảo tính minh bạch trong luồng luân chuyển vật tư.

**1. Các hạng mục Trong phạm vi (In-Scope)**
- Quản lý danh mục và thiết lập ngưỡng tồn kho linh kiện.
- Ghi nhận giao dịch nhập/xuất/hoàn trả kho theo thời gian thực.
- Tra cứu tồn kho và cảnh báo tự động khi chạm ngưỡng an toàn.
- Phân quyền dữ liệu độc lập theo từng trung tâm bảo hành (Center Isolation).

**2. Các hạng mục Ngoài phạm vi (Out-of-Scope / WON'T HAVE)**
- Quản lý quy trình Lễ tân tiếp nhận thiết bị của khách hàng.
- Tích hợp API đồng bộ dữ liệu với hệ thống Kế toán - Tài chính.
- Theo dõi quá trình vận chuyển (Logistics) từ Tổng công ty về chi nhánh.

**3. Bảng thuật ngữ nghiệp vụ (Glossary)**
- **Part (Linh kiện):** Đơn vị vật tư thay thế.
- **Ticket (Phiếu bảo hành):** Chứng từ bắt buộc để xuất kho.
- **Stock (Tồn kho):** Số lượng vật lý thực tế tại một trung tâm.
- **Min_threshold (Ngưỡng an toàn):** Mức tồn kho tối thiểu trước khi báo động.

---

## Mục 2: Các bên liên quan & Vai trò
1. **Nhân viên Kỹ thuật (Technical Staff - ACT-01):** Người trực tiếp sửa chữa, có quyền tra cứu, xuất kho (cần mã phiếu) và hoàn trả linh kiện.
2. **Nhân viên Vật tư (Material Specialist - ACT-02):** Người chịu trách nhiệm tiếp nhận và nhập kho linh kiện mới từ Tổng công ty.
3. **Quản lý Kho (Inventory Manager - ACT-03):** Người giám sát tổng thể, thiết lập ngưỡng an toàn và xem nhật ký đối soát.

---

## Mục 3: Yêu cầu chức năng (FR)
- **FR-01:** Nhập kho linh kiện.
- **FR-02:** Xuất kho hợp lệ (Bắt buộc kèm chứng từ).
- **FR-03:** Hoàn trả kho (Return).
- **FR-04:** Tra cứu Tồn kho Real-time.
- **FR-05:** Xem Nhật ký Giao dịch (Audit Log).
- **FR-06:** Thiết lập Ngưỡng an toàn.
- **FR-07:** Hiển thị Cảnh báo thiếu hàng.

---

## Mục 4: Yêu cầu Phi chức năng (NFR)
- **NFR-01: Tính Tái lập và Triển khai (Deployability):** Hệ thống phải được dựng và khởi chạy thành công bằng tối đa 4 câu lệnh (`<= 4 commands`) trên Terminal. 100% cấu hình lấy từ file `.env`.
- **NFR-02: Hiệu năng (Performance):** Thời gian phản hồi cho các API truy vấn cốt lõi phải đạt mức `< 500ms` khi CSDL chứa 10.000 bản ghi.
- **NFR-03: Toàn vẹn Dữ liệu (Data Integrity):** Tỷ lệ sai lệch tồn kho bằng 0 ngay cả khi có `>= 50 requests` xuất kho gọi đến cùng một lúc (Concurrent requests).
- **NFR-04: Tính Khả dụng (Usability):** Kỹ thuật viên có thể hoàn thành lệnh Tra cứu và Xuất kho trong tối đa 3 thao tác click chuột (`<= 3 clicks`).

---

## Mục 5: Ràng buộc và Quy tắc nghiệp vụ (BR)
- **BR-01: Tồn kho không âm (Non-negative Stock):** Hệ thống tự động đánh chặn mọi giao dịch xuất kho nếu số lượng yêu cầu > tồn kho thực tế.
- **BR-02: Bắt buộc Chứng từ (Ticket Reference Mandate):** Mọi hành vi làm giảm tồn kho (Xuất kho) bắt buộc phải gắn với một mã phiếu bảo hành (`ticket_id`) hợp lệ.
- **BR-03: Bất biến Lịch sử (Transaction Immutability):** Bất kỳ sự thay đổi nào cũng sinh ra log vĩnh viễn. Tuyệt đối không được sửa/xóa giao dịch.
- **BR-04: Phân mảnh Khu vực (Center Isolation):** Tài khoản thuộc trung tâm nào chỉ được phép xem và tạo giao dịch tại trung tâm đó.
- **BR-05: Đánh giá Ngưỡng (Threshold Evaluation):** Khi Tồn kho <= Ngưỡng an toàn, linh kiện lập tức bị gắn cờ cảnh báo đỏ, không ngoại lệ.

---

## Mục 6: Bảng truy vết yêu cầu (RTM)

| Mã Yêu cầu Chức năng (FR) | Mã User Story (US) | Mã Use Case (UC) | Mức độ ưu tiên (MoSCoW) |
| :--- | :--- | :--- | :--- |
| **FR-01:** Nhập kho linh kiện | US-01 | UC-01 | **MUST** |
| **FR-02:** Xuất kho hợp lệ | US-02 | UC-02 | **MUST** |
| **FR-03:** Hoàn trả kho (Return) | US-03 | UC-03 | **SHOULD** |
| **FR-04:** Tra cứu Tồn kho Real-time | US-04 | UC-04 | **MUST** |
| **FR-05:** Xem Nhật ký Giao dịch | US-05 | UC-05 | **SHOULD** |
| **FR-06:** Thiết lập Ngưỡng an toàn | US-06 | UC-06 | **MUST** |
| **FR-07:** Hiển thị Cảnh báo | US-07 | UC-07 | **SHOULD** |