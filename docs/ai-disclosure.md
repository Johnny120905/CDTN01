# PHỤ LỤC BẮT BUỘC: KHAI BÁO SỬ DỤNG CÔNG CỤ TRÍ TUỆ NHÂN TẠO (AI)

- **Dự án:** Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
- **Chuyên ngành:** Công nghệ phần mềm (`SE`)
- **Sinh viên thực hiện:** Huỳnh Nguyễn Bảo Ngọc – **MSSV:** `2374802010339`
- **Phiên bản phát hành:** `v0.2` (Bài tập 1 & Bài tập 2)

---

## 1. Cam kết Liêm chính Học thuật & Quy tắc Kiểm chứng Mã nguồn

Tôi xin cam đoan tính minh bạch và trung thực tuyệt đối trong quá trình thực hiện đồ án (từ giai đoạn Phân tích & Thiết kế ở Bài tập 1 đến giai đoạn Hiện thực hóa Module cốt lõi ở Bài tập 2). Mọi công cụ Trí tuệ Nhân tạo (AI) chỉ đóng vai trò trợ lý hỗ trợ tra cứu cú pháp, sinh khung mẫu (boilerplate), rà soát chính tả và gợi ý kịch bản kiểm thử. Toàn bộ kiến trúc phân lớp 5 tầng, thuật toán khóa lạc quan *Optimistic Locking*, quy tắc nghiệp vụ (`BR-01`..`BR-05`), luồng ngoại lệ (`EX-02`..`EX-05`) và bộ 43 ca kiểm thử tự động đều do tôi trực tiếp kiểm chứng, chạy thử và chịu trách nhiệm 100%.

---

## 2. Bảng Kê khai Chi tiết Mức độ Sử dụng AI & Kiểm chứng Mã nguồn (Chuẩn Bài tập 2)

| Công cụ | Dùng vào việc gì | Áp dụng ở tệp / hàm nào | Em đã kiểm chứng thế nào |
| :--- | :--- | :--- | :--- |
| **— Không dùng AI (Tự làm hoàn toàn) —** | Thiết kế luồng nghiệp vụ cốt lõi 6 bước giao dịch kho, thuật toán Khóa lạc quan (*Optimistic Locking* qua trường `version`), quy tắc chặn âm kho (`BR-01`), bắt buộc chứng từ (`BR-02` / `UC-99`), bất biến lịch sử (`BR-03`), cô lập chi nhánh (`BR-04`) và cơ chế *Dual-Persistence Fallback*. | - `src/services/inventory.service.py` → `InventoryService.process_transaction()`, `get_stock()`, `set_part_threshold()`<br>- `src/repositories/inventory.repository.py` → `atomic_update_stock()`, `insert_transaction()`<br>- `src/errors/AppError.py` → `AppError` & 6 lớp ngoại lệ (`EX-02`..`EX-05`) | Tự viết mã và viết 7 Unit Tests độc lập trong `tests/inventory.service.test.py` (không phụ thuộc mạng/HTTP) để ép lỗi xuất quá tồn kho (`NegativeStockError`), thiếu phiếu (`InvalidTicketError`) và sai quyền (`UnauthorizedRoleError`), đảm bảo 100% pass. |
| **Google Gemini / Antigravity AI** | Hỗ trợ gợi ý cú pháp FastAPI Global Exception Handler, biểu thức chính quy kiểm tra độ phức tạp mật khẩu 4 nhóm ký tự và bộ khung nạp mô-đun động cho tệp có dấu chấm (`inventory.*.py`). | - `src/app.py` → `app_error_handler()`, `general_exception_handler()`<br>- `src/validators/inventory.validator.py` → `validate_password_complexity()`, `validate_transaction_payload()`<br>- `src/*/__init__.py` (`importlib.util`) | Đọc hiểu từng dòng Regex và cơ chế `importlib`; viết các ca kiểm thử biên trong `tests/auth_and_user.test.py` (`test_02`..`test_02d`) và `tests/inventory.routes.test.py` để xác nhận API trả đúng mã HTTP `400`/`403`/`422` và `0%` lộ Stack Trace lỗi `500`. |
| **Google Gemini / Antigravity AI** | Hỗ trợ chuẩn hóa script Migration MongoDB (`$jsonSchema`), cấu hình đóng gói `Dockerfile` / `docker-compose.yml` và gợi ý cấu trúc hàm gọi API tập trung + xử lý 3 trạng thái giao diện (`Loading`, `Empty`, `Error`). | - `migrations/001_create_collections.js`, `migrations/002_create_indexes.js`<br>- `seeds/seed.py` → `run_seed()`<br>- `Dockerfile`, `docker-compose.yml`<br>- `src/static/app.js` → `apiCall()`, `renderTechWorkspace()`, `renderMaterialImport()`, `renderManagerDashboard()` | Chạy `python seeds/seed.py` liên tiếp 2 lần để kiểm chứng tính *Idempotent* (`upsert=True`, không sinh bản ghi trùng); dựng container qua `docker compose up -d --build` và chạy toàn bộ `pytest tests/ -v` đạt **43/43 PASSED**. |
| **Google Stitch & Draw.io** | Hỗ trợ phác thảo Wireframe / Design Tokens giao diện *Dark 3D Elevation* và vẽ các sơ đồ kỹ thuật chuẩn hóa (`usecase.drawio`, `erd.drawio`, `architecture.drawio`, `layer clean architecture.drawio`). | - `src/static/index.html`, `src/static/styles.css`<br>- `docs/thietke.md`<br>- `docs/*.drawio` | Đối chiếu thủ công 100% trường dữ liệu trên giao diện với 6 collections MongoDB; chạy kiểm thử tự động giao diện `tests/cross_role_and_ui.test.py` kiểm chứng font `Be Vietnam Pro`, CSS tokens 3D và luồng liên vai trò thực tế. |
