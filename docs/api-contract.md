# TÀI LIỆU ĐẶC TẢ API (API CONTRACT)
**Dự án:** Smart CRM - Mekong Mobile 
**Phân hệ:** Luồng L5 - Quản lý Kho linh kiện
**Phiên bản:** 1.0.0

---

## 1. Cấu hình chung (General Configuration)
- **Base URL:** `https://api.mekongmobile.vn/api/v1/inventory`
- **Authentication:** Yêu cầu gửi kèm header `Authorization: Bearer <JWT_Token>` trong mọi request. Token chứa thông tin `user_id`, `role`, và `center_id` (Phân mảnh dữ liệu theo BR-04).
- **Định dạng dữ liệu:** `application/json`
- **Yêu cầu hiệu năng:** Mọi API truy vấn phải trả về kết quả trong thời gian `< 500ms` (Tuân thủ NFR-02).

---

## 2. Danh sách API cốt lõi

### API 1: Tra cứu Tồn kho Linh kiện
- **Mô tả:** Lấy thông tin số lượng tồn kho thực tế của một linh kiện tại trung tâm hiện tại (Phục vụ FR-04 & UC-04).
- **Method:** `GET`
- **Endpoint:** `/stock/{part_code}`
- **Path Variables:**
  - `part_code` (string): Mã linh kiện (VD: `SCR-IP14-01`).

**Response - Thành công (200 OK):**
```json
{
  "status": "success",
  "data": {
    "center_id": "L5-WH-890",
    "part_code": "SCR-IP14-01",
    "part_name": "Màn hình iPhone 14 Pro Max",
    "quantity": 12,
    "min_threshold": 15,
    "status_flag": "WARNING" 
  }
}
```
*(Ghi chú: Trả về `status_flag` là WARNING do quantity <= min_threshold, kích hoạt tính năng cảnh báo FR-07).*

---

### API 2: Ghi nhận Giao dịch Kho (Xuất / Nhập / Hoàn trả)
- **Mô tả:** Tạo một giao dịch làm biến động số lượng tồn kho (Phục vụ FR-01, FR-02, FR-03).
- **Method:** `POST`
- **Endpoint:** `/transactions`
- **Request Body:**
```json
{
  "part_code": "SCR-IP14-01",
  "type": "OUT",
  "quantity": 1,
  "ticket_id": "TK-2026-8892"
}
```
- **Ràng buộc Dữ liệu (Payload Constraints):**
  - `type`: Chỉ chấp nhận các giá trị `IN`, `OUT`, `RETURN`.
  - `quantity`: Phải là số nguyên dương `> 0`.
  - `ticket_id`: Bắt buộc nếu `type` là `OUT` hoặc `RETURN` (Tuân thủ BR-02).

**Response - Thành công (201 Created):**
```json
{
  "status": "success",
  "message": "Giao dịch thành công, số dư kho đã được cập nhật.",
  "data": {
    "transaction_id": 884920,
    "created_at": "2026-10-27T10:42:15Z"
  }
}
```

**Response - Lỗi Ngoại lệ (400 Bad Request):**
```json
{
  "error_code": "ERR_NEGATIVE_STOCK",
  "message": "Số lượng xuất vượt quá tồn kho thực tế. Giao dịch bị từ chối."
}
```
*(Ghi chú: Đánh chặn theo quy tắc nghiệp vụ BR-01: Tồn kho không âm).*

**Response - Lỗi Ngoại lệ (422 Unprocessable Entity):**
```json
{
  "error_code": "ERR_INVALID_TICKET",
  "message": "Mã phiếu bảo hành không tồn tại hoặc đã đóng."
}
```

---

### API 3: Cập nhật Ngưỡng An toàn
- **Mô tả:** Thiết lập lại số lượng tối thiểu trước khi báo động đỏ cho một linh kiện (Phục vụ FR-06). Quyền này chỉ dành cho Quản lý kho (ACT-03).
- **Method:** `PUT`
- **Endpoint:** `/parts/{part_code}/threshold`
- **Request Body:**
```json
{
  "min_threshold": 10
}
```

**Response - Thành công (200 OK):**
```json
{
  "status": "success",
  "message": "Đã cập nhật ngưỡng an toàn thành 10 cái."
}
```

**Response - Lỗi Phân quyền (403 Forbidden):**
```json
{
  "error_code": "ERR_UNAUTHORIZED_ROLE",
  "message": "Tài khoản của bạn không có quyền sửa đổi thông số này."
}
```