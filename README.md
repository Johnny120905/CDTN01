# DỰ ÁN SMART CRM - MEKONG MOBILE 
**Phân hệ:** Luồng L5 - Quản lý Kho linh kiện

---

## Mục 1: Giới thiệu dự án (Project Overview)
- **Mục tiêu:** Số hóa toàn diện quy trình quản lý kho linh kiện tại các trung tâm bảo hành Mekong Mobile. Triệt tiêu độ trễ thông tin, kiểm soát chặt chẽ biến động tồn kho vật lý và tự động hóa cảnh báo.
- **Track thực hiện:** Software Engineering (Kỹ nghệ Phần mềm - SE).
- **Phạm vi cốt lõi (In-scope):** Ghi nhận giao dịch nhập/xuất/hoàn trả, tra cứu tồn kho theo thời gian thực (Real-time), phân quyền độc lập theo trung tâm và giám sát cảnh báo an toàn.

---

## Mục 2: Cấu trúc thư mục dự án (Project Structure)
Ở thời điểm hiện tại (Hoàn thành Bài tập 1 - Phân tích & Thiết kế), hệ thống tài liệu cốt lõi được lưu trữ tại thư mục `docs/`:

```text
CDTN01/
├── docs/
│   ├── srs.md                  # Bản Đặc tả yêu cầu phần mềm rút gọn (SRS)
│   ├── usecase.drawio          # File mã nguồn sơ đồ Use Case
│   ├── architecture.drawio     # File mã nguồn sơ đồ Kiến trúc phân lớp
│   ├── erd.drawio              # File mã nguồn sơ đồ Mô hình dữ liệu (ERD)
│   ├── wireframe.png           # File ảnh thiết kế giao diện (UI) 3 màn hình
│   ├── api-contract.md         # Đặc tả hợp đồng API (Dành cho Track SE)
│   └── ai-disclosure.md        # Phụ lục bắt buộc: Khai báo sử dụng AI
├── backend/                    # (Dành cho giai đoạn lập trình)
├── frontend/                   # (Dành cho giai đoạn lập trình)
├── qa_automation/              # (Dành cho giai đoạn kiểm thử)
└── README.md                   # Thông tin tổng quan dự án
```

## Mục 3: Thông tin Sinh viên thực hiện (Student Information)
Họ và tên: Huỳnh Nguyễn Bảo Ngọc
Mã số sinh viên (MSSV): 2374802010339
Trạng thái tiến độ: Đã hoàn thành 100% tài liệu BT1.