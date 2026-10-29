# HỆ THỐNG SMART CRM – MEKONG MOBILE
## BÁO CÁO ĐỒ ÁN CHUYÊN ĐỀ TỐT NGHIỆP 1 (HỌC KỲ 1, NĂM HỌC 2026 – 2027)

- **Chuyên ngành:** Công nghệ phần mềm (Software Engineering - Track SE)
- **Phân hệ thực hiện:** Luồng 05 – Quản lý Kho linh kiện thay thế (Spare Parts Inventory Management)
- **Chi nhánh triển khai:** Chi nhánh Quận 1 (`L5-WH-890`)
- **Sinh viên thực hiện:** Huỳnh Nguyễn Bảo Ngọc — **MSSV:** `2374802010339`
- **Lớp học phần:** `261_71ITGR40203_06`
- **Giảng viên hướng dẫn:** TS. Nguyễn Trí Hải
- **Repository GitHub:** [https://github.com/Johnny120905/CDTN01.git](https://github.com/Johnny120905/CDTN01.git)
- **Phiên bản đóng gói (Git Tags):** `v0.2` (Bài tập 2) · `v1.0` (Bài tập 3)

### Danh mục Tài liệu Kỹ thuật & Báo cáo trong dự án
- [docs/srs.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/srs.md) — Đặc tả yêu cầu phần mềm rút gọn (SRS 6 mục chuẩn Bài tập 1).
- [docs/api-contract.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/api-contract.md) — Đặc tả hợp đồng giao tiếp RESTful API chuẩn JSON.
- [docs/thietke.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/thietke.md) — Đặc tả chi tiết Layout 3D & Bộ Prompt Google Stitch tái tạo chính xác 100% từng giao diện theo vai trò.
- [docs/thaydoithietke.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/thaydoithietke.md) — Nhật ký chi tiết toàn bộ các thay đổi thiết kế Backend – Database – Frontend so với Bài tập 1.
- [docs/BT2.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/BT2.md) — Báo cáo chi tiết Bài tập 2 kèm trích dẫn mã nguồn thực tế từ toàn bộ các tệp trong dự án.
- [docs/test.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/test.md) — Kế hoạch kiểm thử, đặc tả ràng buộc 13 màn hình giao diện & Báo cáo 43 ca kiểm thử tự động.
- [docs/ai-disclosure.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/ai-disclosure.md) — Bảng khai báo sử dụng công cụ AI minh bạch và phương pháp tự kiểm chứng.

---

> [!IMPORTANT]
> **CAM KẾT TÁI TẠO CƠ CẤU TUYỆT ĐỐI 100% (100% REPRODUCTION GUARANTEE):**  
> Tài liệu `README.md` này hợp nhất toàn bộ nội dung hướng dẫn của dự án và được biên soạn theo tiêu chuẩn nghiêm ngặt: **Bất kỳ người đọc hoặc giảng viên chấm bài nào — kể cả người mới bắt đầu — chỉ cần thực hiện tuần tự từng bước hướng dẫn bên dưới là chắc chắn 100% tái tạo và vận hành thành công toàn bộ hệ thống (Database MongoDB Atlas & MongoDB Compass – Backend FastAPI – Frontend SPA Dark 3D Elevation – Docker Container – 43 Automated Tests) giống hệt bản gốc.** Mọi bước đều có lệnh sao chép chạy ngay và kết quả kiểm chứng cụ thể, tuyệt đối không có bước ngầm hiểu hay hướng dẫn mơ hồ.

---

## MỤC LỤC TỔNG QUAN

1. [MỤC 1: Mục tiêu Hệ thống & Kiến trúc Tổng thể 3 Tầng](#mục-1-mục-tiêu-hệ-thống--kiến-trúc-tổng-thể-3-tầng)
2. [MỤC 2: Cấu trúc Thư mục Bắt buộc (BT1 – BT2 – BT3) & Đối chiếu Thực tế Dự án `CDTN01`](#mục-2-cấu-trúc-thư-mục-bắt-buộc-bt1--bt2--bt3--đối-chiếu-thực-tế-dự-án-cdtn01)
3. [MỤC 3: Hướng dẫn Tái tạo Cơ cấu Database (MongoDB Atlas, MongoDB Compass, Migrations & Seed)](#mục-3-hướng-dẫn-tái-tạo-cơ-cấu-database-mongodb-atlas-mongodb-compass-migrations--seed)
4. [MỤC 4: Hướng dẫn Tái tạo Cơ cấu Backend (Python FastAPI 3-Tier Architecture)](#mục-4-hướng-dẫn-tái-tạo-cơ-cấu-backend-python-fastapi-3-tier-architecture)
5. [MỤC 5: Hướng dẫn Tái tạo Cơ cấu Frontend (Giao diện SPA Dark 3D & ReactJS)](#mục-5-hướng-dẫn-tái-tạo-cơ-cấu-frontend-giao-diện-spa-dark-3d--reactjs)
6. [MỤC 6: Hướng dẫn Đóng gói & Khởi chạy bằng Docker / Docker Compose (<= 2 lệnh)](#mục-6-hướng-dẫn-đóng-gói--khởi-chạy-bằng-docker--docker-compose--2-lệnh)
7. [MỤC 7: Danh sách Tài khoản Mẫu & Kịch bản Nghiệm thu 3 Vai trò](#mục-7-danh-sách-tài-khoản-mẫu--kịch-bản-nghiệm-thu-3-vai-trò)
8. [MỤC 8: Chi tiết Các Cải tiến Toàn diện UI/UX Dark 3D & Ràng buộc Nghiệp vụ](#mục-8-chi-tiết-các-cải-tiến-toàn-diện-uiux-dark-3d--ràng-buộc-nghiệp-vụ)
9. [MỤC 9: Hướng dẫn Chạy Bộ Kiểm thử Tự động (43/43 Tests PASS) & 10 Loại hình Kiểm thử](#mục-9-hướng-dẫn-chạy-bộ-kiểm-thử-tự-động-4343-tests-pass--10-loại-hình-kiểm-thử)
10. [MỤC 10: Cẩm nang Xử lý Sự cố Thường gặp (Troubleshooting) & Liêm chính Học thuật](#mục-10-cẩm-năng-xử-lý-sự-cố-thường-gặp-troubleshooting--liêm-chính-học-thuật)

---

# MỤC 1: MỤC TIÊU HỆ THỐNG & KIẾN TRÚC TỔNG THỂ 3 TẦNG

### 1.1. Mô tả Hệ thống (Phạm vi Luồng 05 – Chuyên ngành Công nghệ phần mềm SE)
Hệ thống **Smart CRM – Mekong Mobile (Luồng 05: Quản lý Kho linh kiện thay thế)** giải quyết bài toán quản trị tồn kho linh kiện sửa chữa theo thời gian thực tại **Chi nhánh Quận 1 (`L5-WH-890`)**. Hệ thống phân quyền chặt chẽ cho 3 vai trò nghiệp vụ (**Nhân viên Kỹ thuật `TECH_STAFF`**, **Nhân viên Vật tư `MATERIAL_STAFF`**, **Quản lý Kho `MANAGER`**), cưỡng chế nghiêm ngặt các quy tắc nghiệp vụ cốt lõi: **chặn tuyệt đối xuất kho âm (`BR-01`)**, **bắt buộc gắn mã phiếu bảo hành hợp lệ khi xuất kho/hoàn trả (`BR-02`)**, **ghi nhận sổ cái giao dịch bất biến (`BR-03`)**, **cô lập dữ liệu theo chi nhánh (`BR-04`)**, **cảnh báo ngưỡng tồn kho an toàn (`BR-05`)**, và **chống xung đột đồng thời bằng khóa lạc quan Optimistic Locking (`NFR-03`)**.

### 1.2. Sơ đồ Kiến trúc Tái tạo Cơ cấu Toàn diện (3-Tier Architecture)

```text
+---------------------------------------------------------------------------------------+
|                   KIẾN TRÚC TÁI TẠO CƠ CẤU TOÀN DIỆN DỰ ÁN CDTN01                     |
+---------------------------------------------------------------------------------------+
| 1. TẦNG GIAO DIỆN NGƯỜI DÙNG (PRESENTATION LAYER - FRONTEND SPA DARK 3D ELEVATION)    |
|    - Tệp thực thi chính: src/static/index.html, src/static/app.js, src/static/styles.css|
|    - Bản đồng bộ độc lập: frontend/public/ & frontend/src/ (ReactJS Components/API)   |
|    - Phông chữ Be Vietnam Pro, bảng màu ngữ nghĩa Xanh/Vàng/Đỏ, xử lý đủ 3 trạng thái |
|      (Đang tải Skeleton / Rỗng phân biệt bộ lọc / Lỗi kết nối có nút Thử lại)          |
|    - Địa chỉ truy cập trực tiếp: http://localhost:8000/                               |
|                                          ▲▼                                           |
| 2. TẦNG MÁY CHỦ ỨNG DỤNG (APPLICATION & BUSINESS LAYER - PYTHON FASTAPI BACKEND)      |
|    - Điểm vào ứng dụng: src/app.py (Cổng mặc định: 8000, Swagger: /docs, /health)     |
|    - Tầng 1 - Điều phối & Kiểm định: src/routes/inventory.routes.py                   |
|                                      src/validators/inventory.validator.py            |
|    - Tầng 2 - Logic Nghiệp vụ thuần: src/services/inventory.service.py                |
|                                      src/errors/AppError.py (Không chứa dấu vết HTTP) |
|    - Tầng 3 - Truy cập dữ liệu:      src/repositories/inventory.repository.py         |
|                                          ▲▼                                           |
| 3. TẦNG CƠ SỞ DỮ LIỆU & LƯU TRỮ BỀN VỮNG (DATA & PERSISTENCE LAYER)                   |
|    - CSDL Đám mây: MongoDB Atlas Cloud (Database: mekong_mobile_l5 / inventory_db)    |
|    - CSDL Cục bộ / Container: MongoDB 7.0 (mongodb://localhost:27017) & Compass GUI   |
|    - Khởi tạo cấu trúc: migrations/001_create_collections.js & 002_create_indexes.js  |
|    - Hạt giống dữ liệu: seeds/001_seed_parts_demo.json & script nạp seeds/seed.py     |
|    - Lưu trữ kép dự phòng (Dual-Persistence): data/users_store.json (Chống mất dữ liệu)|
+---------------------------------------------------------------------------------------+
```

---

# MỤC 2: CẤU TRÚC THƯ MỤC BẮT BUỘC (BT1 – BT2 – BT3) & ĐỐI CHIẾU THỰC TẾ DỰ ÁN `CDTN01`

Qua việc nghiên cứu toàn bộ bộ tài liệu hướng dẫn và đề bài học phần trong thư mục [`TL/tailieu/`](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/TL/tailieu) (gồm *Đề bài Bài tập 1*, *Đề bài Bài tập 2*, *Đề bài Bài tập 3* và các *Tài liệu tự học Buổi 02, 05, 07, 09, 11, 12* dành cho **Chuyên ngành Công nghệ phần mềm - Track SE**), dưới đây là cấu trúc thư mục bắt buộc qua 3 giai đoạn và bảng đối chiếu chi tiết với thư mục dự án `CDTN01` hiện tại.

### 2.1. Cấu trúc Thư mục Bắt buộc theo Quy chuẩn Học phần (BT1 + BT2 + BT3 — Track SE)

```markdown
CDTN01/                                   # Thư mục gốc của Repository GitHub
├── docs/                                 # [BẮT BUỘC Ở CẢ BT1, BT2, BT3] Thư mục tài liệu kỹ thuật & báo cáo
│   ├── srs.md                            # [BT1 - Bắt buộc] Bản đặc tả yêu cầu phần mềm rút gọn (6 mục, có bảng thuật ngữ)
│   ├── usecase.drawio                    # [BT1 - Bắt buộc] Sơ đồ Use Case gốc vẽ bằng draw.io
│   ├── architecture.drawio               # [BT1 & BT2 - Bắt buộc] Sơ đồ kiến trúc phân lớp gốc (.drawio)
│   ├── erd.drawio                        # [BT1 - Bắt buộc Track SE] Sơ đồ thực thể liên kết (ERD 4-6 bảng/collections)
│   ├── wireframe.png                     # [BT1 - Bắt buộc] Ảnh chụp Wireframe các màn hình chính của luồng nghiệp vụ
│   ├── api-contract.md                   # [BT1 & BT3 - Bắt buộc Track SE] Đặc tả hợp đồng giao tiếp API (Request/Response/Error)
│   ├── ai-disclosure.md                  # [BT1, BT2, BT3 - Bắt buộc] Bảng khai báo sử dụng công cụ AI và cách kiểm chứng
│   ├── thaydoithietke.md                 # [BT2 & BT3 - Bắt buộc] Nhật ký ghi nhận mọi thay đổi thiết kế so với BT1
│   ├── thietke.md                        # [BT2 - Mở rộng] Đặc tả chi tiết giao diện 3D & bộ Prompt Google Stitch
│   ├── BT2.md                            # [BT2 - Báo cáo] Tài liệu báo cáo tổng hợp Bài tập 2 kèm dẫn chứng code
│   └── test.md                           # [BT3 - Bắt buộc] Kế hoạch kiểm thử (Test Plan), Báo cáo (Test Report) & Bug Log
├── src/                                  # [BẮT BUỘC Ở BT2 & BT3 - Track SE] Mã nguồn Backend tách đủ các lớp độc lập
│   ├── routes/                           # Tầng 1 (Controller/Routes): Nhận HTTP Request, gọi Validator & Service, trả HTTP Status
│   │   ├── __init__.py
│   │   └── inventory.routes.py
│   ├── validators/                       # Tầng 1b (Input Validator): Kiểm định kiểu, độ dài, định dạng trước khi vào Service
│   │   ├── __init__.py
│   │   └── inventory.validator.py
│   ├── services/                         # Tầng 2 (Business Logic): Chứa quy tắc nghiệp vụ thật, KHÔNG chứa dấu vết HTTP
│   │   ├── __init__.py
│   │   └── inventory.service.py
│   ├── repositories/                     # Tầng 3 (Data Access): Đọc/ghi CSDL thuần túy, KHÔNG chứa điều kiện nghiệp vụ
│   │   ├── __init__.py
│   │   └── inventory.repository.py
│   ├── errors/                           # Tầng Ngoại lệ ứng dụng: Định nghĩa lớp lỗi nghiệp vụ có mã (AppError)
│   │   └── AppError.py
│   ├── static/                           # Giao diện Frontend SPA tích hợp phục vụ trực tiếp trên cổng 8000
│   │   ├── index.html
│   │   ├── app.js
│   │   └── styles.css
│   └── app.py                            # Điểm vào ứng dụng (Application Entry Point), đăng ký CORS & Global Error Handler
├── migrations/                           # [BẮT BUỘC Ở BT2 & BT3 - Track SE] Kịch bản khởi tạo cấu trúc CSDL & Indexes
│   ├── 001_create_collections.js         # Tạo 6 Collections kèm JSON Schema Validation (chạy lại lần 2 không lỗi)
│   └── 002_create_indexes.js             # Tạo hệ thống Unique Index & Compound Index tối ưu truy vấn < 500ms
├── seeds/                                # [BẮT BUỘC Ở BT2 & BT3 - Track SE] Dữ liệu mẫu để hệ thống không lên trống trơn
│   ├── 001_seed_parts_demo.json          # Dữ liệu hạt giống: 40 linh kiện, 75 bản ghi tồn kho, phiếu bảo hành, 6 tài khoản
│   └── seed.py                           # Script nạp dữ liệu mẫu tự động bằng 1 lệnh (Idempotent / Upsert không nhân đôi)
├── data/                                 # [BẮT BUỘC TỪ BUỔI 2] Thư mục lưu trữ dữ liệu bền vững cục bộ
│   ├── .gitkeep                          # Giữ cấu trúc thư mục trên Git
│   └── users_store.json                  # Tệp lưu trữ kép (Dual-Persistence) bảo toàn tài khoản người dùng
├── tests/                                # [BẮT BUỘC Ở BT2 & BT3] Bộ kiểm thử tự động chạy PASS bằng 1 lệnh duy nhất
│   ├── auth_and_user.test.py             # Kiểm thử xác thực, mật khẩu 4 nhóm, OTP, khóa tài khoản TERMINATED, nhân sự
│   ├── cross_role_and_ui.test.py         # Kiểm thử luồng liên vai trò (E2E) và kiểm định cấu trúc giao diện 3D
│   ├── inventory.routes.test.py          # Kiểm thử tích hợp các RESTful API Endpoints & HTTP Status Codes
│   └── inventory.service.test.py         # Kiểm thử đơn vị (Unit Test) lớp nghiệp vụ (Luồng đúng, Giá trị biên, Dữ liệu sai)
├── frontend/                             # [BẮT BUỘC MỞ RỘNG TRACK SE - BUỔI 9] Thư mục mã nguồn Giao diện Frontend tách biệt
│   ├── public/                           # Tài nguyên tĩnh (index.html, app.js, styles.css)
│   ├── src/                              # Cấu trúc thành phần Frontend (api/client.js, components/DataState.jsx, pages/)
│   └── package.json                      # Khai báo cấu hình gói Frontend
├── backend/                              # Thư mục gói Backend độc lập (đồng bộ mã nguồn phục vụ triển khai đa dịch vụ)
├── Dockerfile                            # [BẮT BUỘC Ở BT3 & ĐIỂM CỘNG BT2] Đóng gói Image ứng dụng Python 3.11-slim
├── docker-compose.yml                    # [BẮT BUỘC Ở BT3 & ĐIỂM CỘNG BT2] Điều phối Container App + MongoDB 7.0
├── .dockerignore                         # Loại trừ các thư mục rác (venv, __pycache__, .git) khi build Docker Image
├── .env.example                          # [BẮT BUỘC Ở BT1, BT2, BT3] Liệt kê đầy đủ mọi biến môi trường kèm giá trị mẫu
├── .gitignore                            # [BẮT BUỘC Ở BT1, BT2, BT3] Chặn tệp .env thật, venv/, node_modules/, __pycache__/
├── requirements.txt                      # [BẮT BUỘC Ở BT2 & BT3] Tệp khóa phiên bản thư viện Python (ghim bằng dấu ==)
├── package.json & package-lock.json      # [BẮT BUỘC Ở BT2 & BT3] Tệp khóa phiên bản phụ thuộc Node.js
├── pytest.ini                            # Tệp cấu hình khung kiểm thử tự động Pytest
└── README.md                             # [BẮT BUỘC Ở BT1, BT2, BT3] Tài liệu hướng dẫn tái tạo cơ cấu toàn diện (tệp này)
```

---

### 2.2. Cây Cấu trúc Thư mục Thực tế Hiện tại của Dự án `CDTN01` (Kèm Chú thích Chi tiết)

Dưới đây là toàn bộ cây thư mục và tệp tin thực tế đang hiện diện trong thư mục gốc `D:\Hoc\DH\N4\N4.HK01\Chuyende1\CDTN01`, nơi tệp `README.md` này nằm ngoài cùng, ngang hàng với các thư mục `backend/`, `frontend/`, `src/`, `docs/`, `tests/`:

```text
CDTN01/
├── README.md                             # [TỆP TRUNG TÂM] Cẩm nang hợp nhất hướng dẫn tái tạo Database - Backend - Frontend - Docker
├── Dockerfile                            # Cấu hình đóng gói Docker Image (python:3.11-slim, Healthcheck /health, Port 8000)
├── docker-compose.yml                    # Điều phối 2 dịch vụ: mekong-l5-app (FastAPI + SPA 3D) và mongodb (Mongo 7.0)
├── .dockerignore                         # Danh sách loại trừ venv/, node_modules/, __pycache__/ khi đóng gói Docker
├── .env.example                          # Tệp mẫu liệt kê đầy đủ các biến môi trường cần thiết để chạy hệ thống
├── .env                                  # Tệp biến môi trường thực tế trên máy cục bộ (đã được chặn trong .gitignore)
├── .gitignore                            # Cấu hình Git chặn commit .env, venv/, __pycache__/, .pytest_cache/, node_modules/
├── requirements.txt                      # Danh sách thư viện Python khóa phiên bản chính xác (==) phục vụ Backend & Pytest
├── pytest.ini                            # Cấu hình đường dẫn pythonpath và quy tắc dò tìm file *.test.py cho Pytest
├── package.json                          # Khai báo thông tin gói Node.js ở thư mục gốc
├── package-lock.json                     # Tệp khóa phiên bản gói Node.js phục vụ tính tái lập
├── BT1_2374802010339_HuynhNguyenBaoNgoc.pdf # Bản PDF báo cáo Bài tập 1 đã nộp
│
├── docs/                                 # THƯ MỤC TÀI LIỆU KỸ THUẬT, SƠ ĐỒ GỐC & BÁO CÁO NGHIỆM THU
│   ├── srs.md                            # Đặc tả yêu cầu phần mềm rút gọn (6 mục: Phạm vi, Thuật ngữ, Actor, FR/US, NFR, BR, Truy vết)
│   ├── usecase.drawio                    # File gốc sơ đồ Use Case vẽ bằng draw.io (3 Actors, các Use Case cốt lõi Luồng 05)
│   ├── architecture.drawio               # File gốc sơ đồ kiến trúc phân lớp 3-Tier (Presentation - Business - Data Access)
│   ├── erd.drawio                        # File gốc sơ đồ mô hình dữ liệu 6 thực thể/collections và mối quan hệ khóa ngoại
│   ├── wireframe.png                     # Hình ảnh thiết kế khung giao diện (Wireframe) các màn hình chính từ BT1
│   ├── api-contract.md                   # Hợp đồng giao tiếp RESTful API chuẩn hóa (Phương thức, URL, Body, Mã lỗi)
│   ├── ai-disclosure.md                  # Bảng khai báo công cụ AI đã dùng và quy trình kiểm chứng từng tệp/hàm
│   ├── thaydoithietke.md                 # Nhật ký chi tiết các thay đổi thiết kế từ BT1 sang BT2 (Mỗi mục rõ: Thay đổi gì - Vì sao - Ảnh hưởng)
│   ├── thietke.md                        # Đặc tả chi tiết 14 màn hình UI 3D & Bộ Prompt Google Stitch chống thêm/bớt phần tử
│   ├── BT2.md                            # Báo cáo chi tiết toàn bộ 7 mục Bài tập 2 kèm trích dẫn mã nguồn thực tế từ mọi file
│   └── test.md                           # Kế hoạch kiểm thử, điều kiện ràng buộc 13 giao diện & báo cáo 43 ca kiểm thử tự động
│
├── src/                                  # THƯ MỤC MÃ NGUỒN BACKEND CHÍNH (CHẠY TRỰC TIẾP & TRONG DOCKER)
│   ├── app.py                            # Điểm khởi chạy FastAPI, cấu hình CORS, Global Exception Handler & Mount Static SPA
│   ├── routes/                           # [TẦNG 1 - CONTROLLER/ROUTES] Tiếp nhận HTTP Request & dịch mã lỗi sang HTTP Status
│   │   ├── __init__.py                   # Xuất router tồn kho (/api/v1/inventory) và auth_router (/api/v1/auth)
│   │   └── inventory.routes.py           # Định nghĩa toàn bộ 15+ RESTful API Endpoints (Auth, Stock, Transaction, Threshold, Users)
│   ├── validators/                       # [TẦNG 1B - VALIDATOR] Kiểm định dữ liệu đầu vào trước khi chuyển xuống Service
│   │   ├── __init__.py
│   │   └── inventory.validator.py        # Kiểm tra độ dài trường, Regex mật khẩu 4 nhóm, kiểu số nguyên, chuẩn hóa chuỗi
│   ├── services/                         # [TẦNG 2 - BUSINESS SERVICE] Chứa toàn bộ quy tắc nghiệp vụ, KHÔNG chứa mã HTTP
│   │   ├── __init__.py
│   │   └── inventory.service.py          # Xử lý BR-01 (Chặn âm kho), BR-02 (Bắt buộc Ticket), BR-04 (Center), BR-05 (Ngưỡng), RBAC
│   ├── repositories/                     # [TẦNG 3 - REPOSITORY] Giao tiếp trực tiếp với MongoDB & Lưu trữ kép dự phòng
│   │   ├── __init__.py
│   │   └── inventory.repository.py       # Các hàm CRUD thao tác 6 Collections MongoDB, Optimistic Locking & Dual-Persistence
│   ├── errors/                           # [TẦNG XỬ LÝ LỖI] Định nghĩa ngoại lệ nghiệp vụ thống nhất
│   │   └── AppError.py                   # Lớp AppError mang mã lỗi nghiệp vụ (error_code) và thông điệp tiếng Việt chuẩn
│   └── static/                           # [GIAO DIỆN FRONTEND SPA DARK 3D ELEVATION ĐƯỢC PHỤC VỤ TẠI CỔNG 8000]
│       ├── index.html                    # Cấu trúc HTML5 SPA, Header tinh gọn, Modal Đăng nhập/Đăng ký/Quên mật khẩu, Fonts CDN
│       ├── app.js                        # Toàn bộ logic SPA 3 vai trò, Gợi ý tìm kiếm Enter, Đặt lại biểu mẫu, Đếm ngược OTP 10p
│       └── styles.css                    # Hệ thống Design Tokens 3D (.card-3d, .glass-panel, .btn-3d-primary, huy hiệu màu)
│
├── migrations/                           # THƯ MỤC KỊCH BẢN KHỞI TẠO CƠ SỞ DỮ LIỆU MONGODB (CHẠY LẠI KHÔNG LỖI)
│   ├── 001_create_collections.js         # Tạo 6 Collections (service_center, part, ticket, part_stock, part_transaction, users) + Schema
│   └── 002_create_indexes.js             # Tạo 6 chỉ mục Unique & Compound Indexes đảm bảo tốc độ tra cứu < 500ms (NFR-02)
│
├── seeds/                                # THƯ MỤC DỮ LIỆU HẠT GIỐNG MẪU (40 LINH KIỆN & 6 TÀI KHOẢN PHÂN QUYỀN)
│   ├── 001_seed_parts_demo.json          # Bộ dữ liệu JSON chuẩn: 2 Chi nhánh, 40 Linh kiện, 75 Tồn kho, 6 Phiếu sửa, 6 Tài khoản
│   └── seed.py                           # Script Python tự động nạp dữ liệu mẫu vào MongoDB theo cơ chế Upsert (không nhân đôi)
│
├── data/                                 # THƯ MỤC DỮ LIỆU BỀN VỮNG CỤC BỘ (DUAL-PERSISTENCE)
│   ├── .gitkeep                          # Tệp giữ thư mục trên Git
│   └── users_store.json                  # Lưu trữ đồng bộ danh sách tài khoản, mật khẩu băm Bcrypt, trạng thái & OTP
│
├── tests/                                # THƯ MỤC BỘ KIỂM THỬ TỰ ĐỘNG HÓA (43 TEST CASES - PYTEST)
│   ├── auth_and_user.test.py             # 15 ca kiểm thử: Đăng ký, Mật khẩu 4 nhóm, Đăng nhập, OTP, Khóa TERMINATED, Giới hạn ký tự
│   ├── cross_role_and_ui.test.py         # 15 ca kiểm thử: Luồng chéo 3 vai trò, Giao diện 3D, Việt hóa, Enter tra cứu, 40 linh kiện
│   ├── inventory.routes.test.py          # 6 ca kiểm thử: Các API Endpoints tồn kho, giao dịch xuất/nhập, phân quyền ngưỡng an toàn
│   └── inventory.service.test.py         # 7 ca kiểm thử Unit Test lớp Service: Luồng đúng, Giá trị biên, Chặn âm kho, Thiếu phiếu
│
├── frontend/                             # THƯ MỤC FRONTEND ĐỘC LẬP (REACTJS & BẢN ĐỒNG BỘ PUBLIC SPA)
│   ├── package.json                      # Cấu hình dự án Frontend ReactJS
│   ├── .env                              # Cấu hình biến môi trường Frontend (REACT_APP_API_URL / VITE_API_BASE_URL)
│   ├── public/                           # Bản đồng bộ giao diện tĩnh SPA 3D (index.html, app.js, styles.css, images/)
│   └── src/                              # Các mô-đun kiến trúc Frontend tách lớp theo chuẩn Buổi 09 Track SE
│       ├── api/                          # Lớp gọi API tập trung (client.js, inventory.api.js) - không gọi fetch rải rác
│       ├── components/                   # Thành phần dùng lại: DataState.jsx (Xử lý 3 trạng thái: Đang tải, Rỗng, Lỗi), Header, Footer
│       ├── pages/                        # Các trang giao diện (AuthPortal.js, ManagerUsers.js)
│       ├── services/                     # Dịch vụ kết nối API (api.js)
│       ├── App.js                        # Thành phần gốc của ứng dụng React
│       └── index.js                      # Điểm khởi chạy React DOM
│
├── backend/                              # THƯ MỤC BACKEND ĐỒNG BỘ (Chứa bản sao cấu trúc src, migrations, seeds, tests)
├── scripts/                              # THƯ MỤC CÁC SCRIPT TIỆN ÍCH HỖ TRỢ PHÁT TRIỂN & BẢO TRÌ DỰ ÁN
│   ├── add_33_parts.py                   # Script mở rộng danh mục từ 7 lên 40 linh kiện đa hãng (Apple, Samsung, Xiaomi, OPPO)
│   ├── apply_adjustments.py              # Script đồng bộ hóa các tinh chỉnh giao diện
│   └── ...                               # Các script kiểm tra và tự động hóa tài liệu
└── TL/                                   # THƯ MỤC TÀI LIỆU THAM KHẢO HỌC PHẦN & HÌNH ẢNH MINH CHỨNG GIAO DIỆN
    └── tailieu/                          # Chứa toàn bộ 19 file PDF Đề bài (BT1, BT2, BT3) và Bài giảng / Tự học (Buổi 1 -> Buổi 12)
```

---

### 2.3. Bảng Đối chiếu Chi tiết Yêu cầu Học phần (`TL/tailieu`) với Thực tế Dự án `CDTN01`

| Giai đoạn | Hạng mục / Tệp bắt buộc theo Đề bài (`TL/tailieu`) | Đường dẫn thực tế trong `CDTN01` | Trạng thái | Chú thích chi tiết nội dung bên trong tệp / thư mục |
| :---: | :--- | :--- | :---: | :--- |
| **BT1** | Bản đặc tả yêu cầu rút gọn (`docs/srs.md`) | [docs/srs.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/srs.md) | ✅ Đầy đủ | Gồm 6 mục chuẩn: Giới thiệu & Bảng thuật ngữ, Vai trò Actor, Yêu cầu chức năng (`FR-01`..`FR-07`) & User Stories (`US-01`..`US-07`), Yêu cầu phi chức năng có ngưỡng đo (`NFR-01`..`NFR-04`), Quy tắc nghiệp vụ (`BR-01`..`BR-05`), Bảng truy vết không ô trống. |
| **BT1** | Sơ đồ Use Case gốc (`docs/usecase.drawio`) | [docs/usecase.drawio](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/usecase.drawio) | ✅ Đầy đủ | Tệp gốc `.drawio` mô tả ranh giới hệ thống Luồng 05, 3 Actor (`TECH_STAFF`, `MATERIAL_STAFF`, `MANAGER`) và các Use Case cốt lõi kèm chú thích ký hiệu. |
| **BT1 & BT2** | Sơ đồ Kiến trúc hệ thống (`docs/architecture.drawio`) | [docs/architecture.drawio](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/architecture.drawio) | ✅ Đầy đủ | Tệp gốc `.drawio` biểu diễn kiến trúc 3 tầng (Presentation – Business Service – Data Repository), luồng dữ liệu một chiều và phần ngoài phạm vi. |
| **BT1** | Sơ đồ ERD mô hình dữ liệu (`docs/erd.drawio`) | [docs/erd.drawio](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/erd.drawio) | ✅ Đầy đủ | Tệp gốc `.drawio` thiết kế 6 thực thể (`service_center`, `part`, `ticket`, `part_stock`, `part_transaction`, `users`) với đầy đủ khóa chính (`PK`) và khóa ngoại (`FK`). |
| **BT1** | Wireframe màn hình chính (`docs/wireframe.png`) | [docs/wireframe.png](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/wireframe.png) | ✅ Đầy đủ | Ảnh chụp thiết kế khung giao diện các màn hình chính của Luồng 05 nối với Use Case và mô hình dữ liệu. |
| **BT1 & BT3** | Đặc tả Hợp đồng API (`docs/api-contract.md`) | [docs/api-contract.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/api-contract.md) | ✅ Đầy đủ | Đặc tả chi tiết các RESTful API Endpoints, Request Header/Query/Body, Response `200`/`201` và cấu trúc lỗi chuẩn `400`/`401`/`403`/`404`/`409`. |
| **BT1, BT2, BT3** | Bảng khai báo sử dụng AI (`docs/ai-disclosure.md`) | [docs/ai-disclosure.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/ai-disclosure.md) | ✅ Đầy đủ | Bảng 4 cột khai báo minh bạch công cụ AI sử dụng, mục đích, tệp/hàm áp dụng, phương pháp tự kiểm chứng và cam kết trách nhiệm cá nhân. |
| **BT2 & BT3** | Nhật ký thay đổi thiết kế (`docs/thaydoithietke.md`) | [docs/thaydoithietke.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/thaydoithietke.md) | ✅ Đầy đủ | Ghi nhận chi tiết toàn bộ các cải tiến từ BT1 sang BT2 theo đúng cấu trúc: Thay đổi gì · Vì sao thay đổi · Ảnh hưởng tới thành phần nào. |
| **BT2** | Tách lớp Backend 4 thành phần (`routes`, `validators`, `services`, `repositories`) | [src/routes/](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/routes), [src/validators/](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/validators), [src/services/](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/services), [src/repositories/](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/repositories) | ✅ Đầy đủ | Tuân thủ tuyệt đối nguyên tắc phụ thuộc một chiều: `routes` -> `validators` -> `services` -> `repositories`. Lớp `services` không chứa bất kỳ dấu vết HTTP nào (`req`, `res`, status code). |
| **BT2 & BT3** | Kịch bản Migration dựng CSDL (`migrations/`) | [migrations/001_create_collections.js](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/migrations/001_create_collections.js), [migrations/002_create_indexes.js](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/migrations/002_create_indexes.js) | ✅ Đầy đủ | Kiểm tra sự tồn tại trước khi tạo (`if (!targetDb.getCollectionNames().includes(...))`), đảm bảo chạy lại lần thứ 2 không bao giờ báo lỗi (đạt tiêu chí cốt lõi `C5`). |
| **BT2 & BT3** | Dữ liệu mẫu & Script nạp (`seeds/`) | [seeds/001_seed_parts_demo.json](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/seeds/001_seed_parts_demo.json), [seeds/seed.py](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/seeds/seed.py) | ✅ Đầy đủ | Chứa 40 linh kiện mẫu, 75 bản ghi tồn kho, 6 phiếu sửa chữa, 6 tài khoản mẫu. Script `seed.py` dùng `replace_one(..., upsert=True)` nên chạy lại nhiều lần không nhân đôi dữ liệu (`C5`). |
| **BT2 & BT3** | Giao diện Frontend & Xử lý 3 trạng thái (`src/static/` & `frontend/`) | [src/static/app.js](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/static/app.js), [frontend/src/components/DataState.jsx](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/frontend/src/components/DataState.jsx) | ✅ Đầy đủ | 13 màn hình giao diện lấy dữ liệu từ API thật; xử lý đầy đủ 3 trạng thái: Đang tải (`Skeleton`), Rỗng (phân biệt kho trống và bộ lọc không khớp kèm nút Xóa bộ lọc), Lỗi kết nối (có nút Thử lại). |
| **BT2 & BT3** | Bộ kiểm thử tự động chạy bằng 1 lệnh (`tests/`) | [tests/auth_and_user.test.py](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/tests/auth_and_user.test.py), [tests/cross_role_and_ui.test.py](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/tests/cross_role_and_ui.test.py), [tests/inventory.routes.test.py](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/tests/inventory.routes.test.py), [tests/inventory.service.test.py](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/tests/inventory.service.test.py) | ✅ Đầy đủ | Gồm **43 ca kiểm thử** bao phủ đủ Luồng đúng (Happy Path), Giá trị biên (Boundary Value), Dữ liệu sai (Invalid Input), Phân quyền bảo mật (OWASP A01) và tính Tái lập. Chạy 100% PASS bằng lệnh `pytest tests/ -v`. |
| **BT2 & BT3** | Gói đóng gói Container (`Dockerfile` & `docker-compose.yml`) | [Dockerfile](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/Dockerfile), [docker-compose.yml](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docker-compose.yml), [.dockerignore](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/.dockerignore) | ✅ Đầy đủ | Đóng gói toàn bộ hệ thống chạy lên hoàn chỉnh từ thư mục trống bằng đúng `<= 2` lệnh (`cp .env.example .env` và `docker compose up -d --build`), tích hợp `HEALTHCHECK` tự động. |
| **BT1, BT2, BT3** | Tệp khóa phiên bản & Cấu hình môi trường (`requirements.txt`, `.env.example`, `.gitignore`) | [requirements.txt](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/requirements.txt), [.env.example](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/.env.example), [.gitignore](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/.gitignore) | ✅ Đầy đủ | Ghim phiên bản thư viện bằng dấu `==`, liệt kê đầy đủ biến môi trường mẫu và bảo vệ `.env` thật không bị đẩy lên Git. |

---

# MỤC 3: HƯỚNG DẪN TÁI TẠO CƠ CẤU DATABASE (MONGODB ATLAS, MONGODB COMPASS, MIGRATIONS & SEED)

Hệ thống của dự án được thiết kế linh hoạt với **3 chế độ kết nối Cơ sở dữ liệu**:
1. **Kết nối Đám mây (MongoDB Atlas Cloud):** Dữ liệu tập trung trên đám mây.
2. **Kết nối Cục bộ (MongoDB Local & MongoDB Compass GUI):** Quản trị trực quan ngay trên máy tính cá nhân.
3. **Chế độ Dự phòng Lưu trữ kép (Dual-Persistence & In-Memory Fallback):** Tự động kích hoạt khi máy tính không có mạng Internet hoặc chưa cài MongoDB, đảm bảo ứng dụng **luôn chạy được 100% trong mọi hoàn cảnh**.

Dưới đây là hướng dẫn cầm tay chỉ việc từng bước để bạn tự tạo mới hoặc kết nối lại Database trên cả **MongoDB Atlas** và **MongoDB Compass**.

---

### 3.1. Cách 1: Tạo và Kết nối Cơ sở dữ liệu Đám mây trên MongoDB Atlas (Từng bước từ con số 0)

Nếu bạn muốn tự tạo một cụm cơ sở dữ liệu đám mây MongoDB Atlas mới tinh cho riêng mình (hoặc sử dụng cụm có sẵn của dự án), hãy thực hiện chính xác **5 bước** sau:

* **Bước 1: Đăng ký / Đăng nhập và Tạo Cluster miễn phí (`M0`)**
  1. Mở trình duyệt web, truy cập [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) và đăng nhập (có thể đăng nhập nhanh bằng tài khoản Google).
  2. Bấm nút **`+ Create`** (hoặc **`Build a Cluster`**).
  3. Chọn gói **`M0` (Free / Miễn phí vĩnh viễn)** -> Chọn nhà cung cấp **`AWS`**, khu vực gần Việt Nam nhất là **`Singapore (ap-southeast-1)`**.
  4. Đặt tên Cluster (ví dụ: `Cluster0` hoặc `huynhnguyenbaongoc2k5`) rồi bấm nút **`Create Deployment`**.

* **Bước 2: Tạo Tài khoản Quản trị Cơ sở dữ liệu (`Database Access`)**
  1. Ở thanh menu bên trái của trang MongoDB Atlas, dưới mục **SECURITY**, bấm vào **`Database Access`**.
  2. Bấm nút **`+ Add New Database User`** ở góc phải.
  3. Tại mục **Authentication Method**, chọn **`Password`**.
  4. Nhập tên đăng nhập (ví dụ: `huynhnguyenbaongoc2k5_db_user`) và mật khẩu (ví dụ: `MatKhauCuaBan123`, lưu ý chỉ dùng chữ cái và số để không phải mã hóa URL).
  5. Tại mục **Database User Privileges**, chọn **`Read and write to any database`** -> Bấm nút **`Add User`**.

* **Bước 3: Mở Quyền Truy cập Mạng cho mọi IP (`Network Access`) — *Bước cực kỳ quan trọng để máy khác kết nối được***
  1. Ở thanh menu bên trái, dưới mục **SECURITY**, bấm vào **`Network Access`**.
  2. Bấm nút **`+ Add IP Address`**.
  3. Trong hộp thoại hiện ra, bấm vào nút **`ALLOW ACCESS FROM ANYWHERE`** (ô IP sẽ tự động điền giá trị `0.0.0.0/0`) -> Bấm **`Confirm`**.
  4. Chờ khoảng 30 giây đến khi cột Status chuyển sang màu xanh **`Active`**.

* **Bước 4: Lấy Chuỗi kết nối (`MONGO_URI`)**
  1. Ở thanh menu bên trái, dưới mục **DEPLOYMENT**, bấm vào **`Database`** (hoặc **`Clusters`**).
  2. Bấm vào nút **`Connect`** ngay cạnh tên Cluster của bạn.
  3. Chọn mục **`Drivers`** -> Tại mục **Driver**, chọn **`Python`** và **Version** là **`3.11 or later`**.
  4. Sao chép chuỗi kết nối có dạng:
     ```text
     mongodb+srv://<username>:<password>@<cluster-url>/mekong_mobile_l5?retryWrites=true&w=majority
     ```
  5. Thay `<username>` và `<password>` bằng tài khoản bạn đã tạo ở Bước 2, sau đó dán vào biến `MONGO_URI` trong tệp `.env` ở thư mục gốc `CDTN01`.

---

### 3.2. Cách 2: Tạo, Kết nối và Quản trị Trực quan bằng Phần mềm MongoDB Compass (GUI)

**MongoDB Compass** là phần mềm giao diện đồ họa chính thức giúp bạn nhìn thấy tận mắt từng bảng (Collection), từng dòng dữ liệu (Document), tạo bảng và nạp dữ liệu chỉ bằng chuột.

#### Bước 1: Cài đặt MongoDB Compass (Nếu máy chưa có)
- Truy cập trang chủ [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass), tải bản **MongoDB Compass** dành cho Windows (`.msi` hoặc `.exe`) / macOS và cài đặt trong 1 phút.
- *(Tùy chọn)* Nếu muốn chạy máy chủ MongoDB ngay trên máy cá nhân (Offline), tải thêm **MongoDB Community Server** tại [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) (khi cài đặt giữ nguyên tích chọn *"Install MongoDB as a Service"* và *"Install MongoDB Compass"*).

#### Bước 2: Kết nối MongoDB Compass vào Database của Dự án
1. Mở phần mềm **MongoDB Compass** trên máy tính.
2. Bấm vào nút **`+ New Connection`** ở góc trên bên trái.
3. Tại ô **URI**, bạn chọn **1 trong 2 chuỗi kết nối** sau để dán vào:
   - **Lựa chọn A (Kết nối vào MongoDB Cục bộ trên máy tính hoặc Docker Container):**
     ```text
     mongodb://localhost:27017
     ```
   - **Lựa chọn B (Kết nối trực tiếp lên đám mây MongoDB Atlas của dự án):**
     ```text
     mongodb+srv://huynhnguyenbaongoc2k5_db_user:eT2y66s3VqEWQabi@huynhnguyenbaongoc2k5.pp4bdbi.mongodb.net/mekong_mobile_l5?appName=huynhnguyenbaongoc2k5
     ```
4. Đặt tên kết nối trong mục *Name* là `Mekong Mobile L5 - Kho Linh Kien` rồi bấm nút màu xanh **`Save & Connect`**.

#### Bước 3: Khởi tạo Database và 6 Collections chuẩn (Bằng Giao diện hoặc Bằng Script Tự động)
Sau khi kết nối thành công trong MongoDB Compass, bạn có thể tạo cấu trúc CSDL và nạp toàn bộ dữ liệu mẫu bằng **Phương pháp Tự động 1 lệnh (Khuyên dùng)** hoặc **Phương pháp Thao tác Tay trên MongoDB Compass**:

* **Phương pháp A — Tự động hóa 100% bằng 1 lệnh Python (Khuyên dùng, nhanh nhất trong 3 giây):**
  Mở cửa sổ PowerShell tại thư mục gốc `CDTN01` (đã kích hoạt `venv`) và gõ lệnh:
  ```powershell
  python seeds/seed.py
  ```
  **Kết quả hiển thị trên màn hình PowerShell:**
  ```text
  [*] Đang đọc tệp seed: ...\seeds\001_seed_parts_demo.json...
  [*] Đang kết nối tới MongoDB: ... (Database: mekong_mobile_l5)...
  [THÀNH CÔNG] Đã kết nối thành công tới máy chủ MongoDB!
    + Đã nạp 2 bản ghi vào 'service_center'
    + Đã nạp 6 tài khoản vào 'users'
    + Đã nạp 40 linh kiện vào 'part'
    + Đã nạp 6 phiếu bảo hành vào 'ticket'
    + Đã nạp 75 bản ghi tồn kho vào 'part_stock'
    + Đã nạp 12 nhật ký giao dịch vào 'part_transaction'
    + Đã tạo và xác thực đầy đủ hệ thống Indexes!
  [HOÀN TẤT] Toàn bộ dữ liệu mẫu đã được khởi tạo sẵn sàng cho ứng dụng!
  ```
  > **Bảo chứng tiêu chí C5 (Chạy lại lần thứ 2 không lỗi, không nhân đôi dữ liệu):** Tệp [`seeds/seed.py`](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/seeds/seed.py) sử dụng phương thức `replace_one(..., upsert=True)` theo khóa nghiệp vụ (`part_code`, `ticket_id`, `email`, `transaction_id`). Do đó, bạn có thể chạy lại lệnh `python seeds/seed.py` **2 lần, 5 lần hay 10 lần liên tiếp** mà số lượng bản ghi trong MongoDB vẫn giữ nguyên chính xác (40 linh kiện, 75 tồn kho), tuyệt đối không bao giờ bị nhân đôi hay báo lỗi trùng khóa!

* **Phương pháp B — Chạy trực tiếp 2 tệp Migration JavaScript trong tab `MONGOSH` của MongoDB Compass:**
  1. Nhìn xuống góc dưới cùng bên trái của cửa sổ **MongoDB Compass**, bấm vào thanh **`>_ MONGOSH`** để mở cửa sổ lệnh MongoDB Shell tích hợp.
  2. Chạy lần lượt 2 tệp kịch bản khởi tạo cấu trúc bảng (kèm JSON Schema Validation) và chỉ mục (Indexes) bằng lệnh:
     ```javascript
     load("D:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/migrations/001_create_collections.js")
     load("D:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/migrations/002_create_indexes.js")
     ```
  3. Nếu muốn tạo bằng chuột trên giao diện MongoDB Compass: Bấm nút **`+`** cạnh mục **Databases** -> Nhập **Database Name** là `mekong_mobile_l5`, **Collection Name** là `part` -> Bấm **`Create Database`**. Sau đó tạo tiếp 5 collections còn lại: `service_center`, `ticket`, `part_stock`, `part_transaction`, `users`.

#### Bước 4: Đối chiếu và Kiểm chứng 6 Collections trên MongoDB Compass
Bấm nút **Refresh** (biểu tượng mũi tên xoay tròn cạnh chữ *Databases*) trên MongoDB Compass, mở database `mekong_mobile_l5` (hoặc `inventory_db`), bạn sẽ thấy đúng **6 Collections** với số lượng bản ghi chuẩn xác như sau:

| STT | Tên Collection | Số bản ghi chuẩn | Khóa chính / Unique Index | Vai trò trong Nghiệp vụ Luồng 05 |
| :-: | :--- | :---: | :--- | :--- |
| 1 | **`service_center`** | **2** bản ghi | `center_id` (`L5-WH-890`, `L5-WH-891`) | Lưu danh mục Trung tâm bảo hành / Chi nhánh phục vụ cô lập dữ liệu vùng (`BR-04`). |
| 2 | **`part`** | **40** bản ghi | `part_code` (`SCR-IP14-01` ..) | Danh mục 40 loại linh kiện chính hãng (Apple, Samsung, Xiaomi, OPPO), đơn giá VNĐ và ngưỡng tồn tối thiểu `min_threshold` (`BR-05`). |
| 3 | **`part_stock`** | **75** bản ghi | `(center_id, part_code)` | Quản lý số lượng tồn kho thực tế (`quantity >= 0` theo `BR-01`) và cột `version` phục vụ khóa lạc quan Optimistic Locking (`NFR-03`). |
| 4 | **`ticket`** | **6** bản ghi | `ticket_id` (`TK-1092` ..) | Danh sách phiếu bảo hành hợp lệ dùng để đối chiếu bắt buộc khi kỹ thuật viên xuất kho hoặc hoàn trả (`BR-02`). |
| 5 | **`part_transaction`** | **12+** bản ghi | `transaction_id` + `(center_id, created_at)` | Sổ cái kiểm toán bất biến (`BR-03`) lưu vết mọi lệnh Xuất kho thay thế (`OUT`), Nhập kho vật tư (`IN`), Hoàn trả (`RETURN`). |
| 6 | **`users`** | **6+** bản ghi | `email` | Lưu hồ sơ nhân sự, mật khẩu băm Bcrypt, phân quyền 3 vai trò (`TECH_STAFF`, `MATERIAL_STAFF`, `MANAGER`), 4 trạng thái hoạt động và mã OTP. |

---

# MỤC 4: HƯỚNG DẪN TÁI TẠO CƠ CẤU BACKEND (PYTHON FASTAPI 3-TIER ARCHITECTURE)

### 4.1. Yêu cầu Môi trường Runtime
- **Hệ điều hành:** Windows 10/11, macOS, hoặc Linux (Ubuntu 20.04+).
- **Ngôn ngữ & Runtime:** **Python 3.10** hoặc **Python 3.11+** (Khuyến nghị Python `3.11.5`).
- **Trình quản lý gói:** `pip` (đi kèm sẵn khi cài đặt Python).

### 4.2. Bảng Giải thích Đầy đủ Biến Môi trường (`.env.example` -> `.env`)

Tệp [`.env.example`](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/.env.example) tại thư mục gốc liệt kê đầy đủ các biến cấu hình của hệ thống:

| Tên Biến Môi trường | Giá trị mẫu trong `.env.example` | Bắt buộc? | Ý nghĩa & Tác dụng trong Hệ thống |
| :--- | :--- | :---: | :--- |
| `MONGO_URI` | `mongodb://localhost:27017/inventory_db` | Có (Có mặc định) | Chuỗi kết nối tới máy chủ MongoDB (Atlas Cloud hoặc Localhost cổng `27017`). |
| `DB_NAME` | `mekong_mobile_l5` | Có (Có mặc định) | Tên cơ sở dữ liệu MongoDB chứa 6 collections của Luồng 05. |
| `API_PORT` | `8000` | Có (Có mặc định) | Cổng mạng mà máy chủ FastAPI/Uvicorn lắng nghe (mặc định `8000`). |
| `JWT_SECRET_KEY` | `mekong_mobile_secret_jwt_key_2026_cdtn01` | Có (Có mặc định) | Khóa bí mật dùng để ký và xác thực chữ ký số JWT Token khi đăng nhập. |
| `DEFAULT_CENTER_ID` | `L5-WH-890` | Có (Có mặc định) | Mã định danh mặc định của Kho Linh kiện Chi nhánh Quận 1. |

### 4.3. Quy trình 5 Bước Cài đặt & Khởi chạy Backend (Mỗi bước 1 lệnh)

> [!TIP]
> Bạn chỉ cần mở cửa sổ **PowerShell** (trên Windows: nhấn `Windows + R`, gõ `powershell`, nhấn `Enter`) hoặc **Terminal** (trên macOS/Linux) và sao chép lần lượt từng lệnh dưới đây:

#### Bước 1: Kiểm tra phiên bản Python trên máy tính
```powershell
python --version
```
*(Kết quả hiển thị `Python 3.10.x` hoặc `Python 3.11.x` là hợp lệ. Nếu máy chưa có Python, tải tại [https://www.python.org/downloads/](https://www.python.org/downloads/) và nhớ tích ô **"Add python.exe to PATH"** khi cài đặt).*

#### Bước 2: Di chuyển vào thư mục gốc của dự án `CDTN01` và tạo tệp `.env`
```powershell
cd D:\Hoc\DH\N4\N4.HK01\Chuyende1\CDTN01
Copy-Item .env.example .env -ErrorAction SilentlyContinue
```
*(Trên macOS/Linux hoặc Git Bash dùng lệnh: `cp -n .env.example .env`). Nếu trong thư mục đã có sẵn tệp `.env` cấu hình MongoDB Atlas thì lệnh này sẽ giữ nguyên tệp hiện có.*

#### Bước 3: Khởi tạo và kích hoạt môi trường ảo (`venv`)
- **Trên Windows (PowerShell):**
  ```powershell
  python -m venv venv
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  .\venv\Scripts\Activate.ps1
  ```
  *(Khi thành công, phía trước dấu nhắc lệnh sẽ xuất hiện chữ `(venv)` màu xanh lá).*
- **Trên macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### Bước 4: Cài đặt toàn bộ thư viện phụ thuộc từ tệp khóa phiên bản `requirements.txt`
```powershell
pip install -r requirements.txt
```
*(Hệ thống sẽ tự động cài đặt đúng phiên bản đã ghim của `fastapi`, `uvicorn`, `pymongo`, `dnspython`, `pydantic`, `pytest`, `httpx`, `bcrypt`, `pyjwt`, `python-dotenv`).*

#### Bước 5: Nạp dữ liệu mẫu (Idempotent Seed) và Khởi chạy máy chủ Backend + Frontend SPA
```powershell
python seeds/seed.py
python src/app.py
```

**Dấu hiệu nhận biết hệ thống đã khởi chạy thành công 100% trên màn hình PowerShell:**
```text
========================================================
  SMART CRM - MEKONG MOBILE (INVENTORY FLOW 05)
  Server running at: http://localhost:8000
  Swagger Docs at:   http://localhost:8000/docs
========================================================

INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [...]
INFO:     Application startup complete.
```

---

### 4.4. Cách Kiểm tra Hệ thống Backend đã Chạy Đúng (Verification Steps)

Khi máy chủ đang chạy ở cửa sổ PowerShell thứ nhất, bạn có thể kiểm chứng ngay lập tức qua trình duyệt hoặc mở cửa sổ PowerShell thứ hai để chạy các lệnh kiểm tra sau:

1. **Kiểm tra Endpoint Sức khỏe Hệ thống (`/health`):**
   - Mở trình duyệt truy cập: **`http://localhost:8000/health`** hoặc chạy lệnh:
     ```powershell
     curl.exe -s http://localhost:8000/health
     ```
   - **Kết quả trả về (HTTP 200 OK):**
     ```json
     {"status":"online","service":"Smart CRM - Inventory Subsystem (L5)","timestamp":"2026-10-25T21:40:00Z"}
     ```

2. **Kiểm tra Tài liệu API Tương tác Trực quan (Swagger UI / OpenAPI):**
   - Mở trình duyệt truy cập: **`http://localhost:8000/docs`**
   - Toàn bộ danh sách các API thuộc 2 nhóm **`Inventory Management`** (`/api/v1/inventory/*`) và **`Authentication & Roles`** (`/api/v1/auth/*`) hiện ra đầy đủ, cho phép bấm nút **`Try it out`** -> **`Execute`** ngay trên trình duyệt.

3. **Kiểm tra 3 Tầng Phản ứng Nghiệp vụ bằng `curl` (Luồng đúng – Lỗi Định dạng Tầng 1 – Lỗi Nghiệp vụ Tầng 2):**
   - **(1) Luồng đúng (Tra cứu tồn kho mã linh kiện `SCR-IP14-01` -> Trả về HTTP 200 kèm dữ liệu thật):**
     ```powershell
     curl.exe -s "http://localhost:8000/api/v1/inventory/stock?center_id=L5-WH-890&part_code=SCR-IP14-01"
     ```
   - **(2) Lỗi Tầng 1 Validator (Xuất kho thiếu mã phiếu bảo hành `ticket_id` -> Chặn ngay, trả về HTTP 400 `ERR_MISSING_TICKET_ID`):**
     ```powershell
     curl.exe -s -X POST "http://localhost:8000/api/v1/inventory/transactions" -H "Content-Type: application/json" -H "X-User-Role: TECH_STAFF" -d "{\"center_id\":\"L5-WH-890\",\"part_code\":\"SCR-IP14-01\",\"type\":\"OUT\",\"quantity\":1,\"created_by\":\"tech01\"}"
     ```
   - **(3) Lỗi Tầng 2 Business Service (Xuất kho số lượng `999` vượt quá số lượng tồn thực tế -> Chặn theo quy tắc `BR-01`, trả về HTTP 400 `ERR_INSUFFICIENT_STOCK`):**
     ```powershell
     curl.exe -s -X POST "http://localhost:8000/api/v1/inventory/transactions" -H "Content-Type: application/json" -H "X-User-Role: TECH_STAFF" -d "{\"center_id\":\"L5-WH-890\",\"part_code\":\"SCR-IP14-01\",\"type\":\"OUT\",\"quantity\":999,\"ticket_id\":\"TK-1092\",\"created_by\":\"tech01\"}"
     ```

---

# MỤC 5: HƯỚNG DẪN TÁI TẠO CƠ CẤU FRONTEND (GIAO DIỆN SPA DARK 3D & REACTJS)

Dự án cung cấp **2 phương thức vận hành Frontend** hoàn toàn đồng bộ để người đọc lựa chọn:

### 5.1. Phương thức 1: Truy cập Trực tiếp Giao diện SPA Dark 3D Tích hợp (Khuyên dùng — Không cần cài thêm Node.js)
Nhờ cơ chế `app.mount("/static", StaticFiles(...))` trong [`src/app.py`](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/app.py#L85-L95), ngay khi bạn chạy lệnh `python src/app.py` ở Mục 4, toàn bộ giao diện **Website 3D Tông màu tối (Dark 3D Elevation)** đã được phục vụ trực tiếp tại cổng `8000`:
- 👉 Mở bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari) và truy cập: **`http://localhost:8000/`**

### 5.2. Phương thức 2: Chạy Riêng Thư mục `frontend/` (Dành cho Môi trường Phát triển ReactJS / Node.js)
Thư mục [`frontend/`](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/frontend) chứa các mô-đun giao diện tách lớp theo chuẩn Buổi 09 (`frontend/src/api/client.js`, `frontend/src/api/inventory.api.js`, `frontend/src/components/DataState.jsx`, `frontend/src/pages/`) cùng bản đồng bộ tại `frontend/public/`. Để khởi chạy riêng với Node.js:
1. Đảm bảo máy chủ Backend đang chạy ở cổng `8000`.
2. Mở một cửa sổ PowerShell mới và chạy:
   ```powershell
   cd D:\Hoc\DH\N4\N4.HK01\Chuyende1\CDTN01\frontend
   npm install
   npm start
   ```

---

# MỤC 6: HƯỚNG DẪN ĐÓNG GÓI & KHỞI CHẠY BẰNG DOCKER / DOCKER COMPOSE (`<= 2` LỆNH)

Để đáp ứng trọn vẹn mức đánh giá cao nhất của **Bài tập 2 (Thành phần 4)** và mục kiểm chứng cốt lõi **`C1` của Bài tập 3 (Gói đóng gói chạy được bằng `<= 2` lệnh)**, toàn bộ dự án `CDTN01` đã được đóng gói hoàn chỉnh bằng bộ 3 tệp cấu hình tại thư mục gốc:
- **[Dockerfile](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/Dockerfile):** Sử dụng ảnh nền ghim phiên bản cụ thể `python:3.11-slim` (không dùng thẻ `latest`), sao chép `requirements.txt` trước để tận dụng Docker Layer Cache, đóng gói đầy đủ `src/`, `seeds/`, `data/`, `tests/`, `pytest.ini`, mở cổng `8000` và định nghĩa `HEALTHCHECK` tự động gọi `http://localhost:8000/health`.
- **[docker-compose.yml](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docker-compose.yml):** Điều phối 2 dịch vụ trong mạng nội bộ `mekong_l5_network`:
  1. `mekong-l5-app` (`container_name: mekong_crm_l5_app`): Chạy ứng dụng FastAPI + Giao diện SPA 3D tại cổng `8000:8000`, tự động nạp dữ liệu hạt giống và đồng bộ volume `./data:/app/data`.
  2. `mongodb` (`container_name: mekong_crm_l5_mongodb`): Máy chủ cơ sở dữ liệu `mongo:7.0` tại cổng `27017:27017` kèm volume bền vững `mongo_l5_data`.
- **[.dockerignore](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/.dockerignore):** Loại bỏ `venv/`, `node_modules/`, `__pycache__/`, `.pytest_cache/`, `.git/` giúp tốc độ build image cực nhanh.

### 6.1. Yêu cầu Môi trường Docker
- Hệ điều hành Windows 10/11, macOS hoặc Linux đã cài đặt và bật **Docker Desktop** (Docker Engine `v24.0+` và Docker Compose `v2.20+`).
- Cổng mạng cần trống: **`8000`** (Ứng dụng Web/API) và **`27017`** (MongoDB Container).

### 6.2. Khởi chạy Toàn bộ Hệ thống bằng Đúng 2 Lệnh Chuẩn
Tại thư mục gốc `D:\Hoc\DH\N4\N4.HK01\Chuyende1\CDTN01`, gõ đúng **2 lệnh** sau:

```powershell
# Lệnh 1: Tạo tệp cấu hình môi trường .env từ tệp mẫu .env.example (nếu chưa có)
cp .env.example .env

# Lệnh 2: Dựng ảnh (Build) và khởi chạy toàn bộ các dịch vụ ở chế độ nền (Detached mode)
docker compose up -d --build
```

### 6.3. Quy trình "Phép thử Máy trắng" (Clean-Machine Test — Chuẩn Giảng viên Chấm Bài tập 2 & Bài tập 3)
Bạn có thể tự thực hiện phép thử máy trắng đúng y hệt quy trình chấm bài của giảng viên tại Buổi 12 và Buổi 16 bằng các lệnh sau:

```powershell
# 1. Xóa sạch container và volume của lần chạy trước (mô phỏng máy trắng hoàn toàn)
docker compose down -v

# 2. Khởi dựng và bật lại hệ thống bằng 1 lệnh duy nhất
docker compose up -d --build

# 3. Kiểm tra trạng thái các container (cột STATUS hiển thị Up / healthy)
docker compose ps

# 4. Kiểm tra API sống và trả về trạng thái online
curl.exe -s http://localhost:8000/health

# 5. Chạy toàn bộ 43 ca kiểm thử tự động ngay bên trong Container
docker compose exec mekong-l5-app pytest tests/ -v
```

### 6.4. Các Lệnh Quản trị Docker Hữu ích Khác
- **Xem nhật ký hoạt động (Logs) thời gian thực của ứng dụng:**
  ```powershell
  docker compose logs -f mekong-l5-app
  ```
- **Chạy lại kịch bản nạp dữ liệu hạt giống bên trong Container:**
  ```powershell
  docker compose exec mekong-l5-app python seeds/seed.py
  ```
- **Dừng hệ thống Docker:**
  ```powershell
  docker compose down
  ```

---

# MỤC 7: DANH SÁCH TÀI KHOẢN MẪU & KỊCH BẢN NGHIỆM THU 3 VAI TRÒ

Khi mở trình duyệt tại địa chỉ **`http://localhost:8000/`**, hệ thống đã khởi tạo sẵn bộ tài khoản mẫu theo đúng 3 vai trò nghiệp vụ và 1 tài khoản kiểm thử bảo mật để bạn đăng nhập và nghiệm thu ngay lập tức:

| Vai trò Nghiệp vụ | Email Đăng nhập (Có thể dùng 1 trong 2) | Mật khẩu mặc định | Quyền hạn & Kịch bản Thao tác Nghiệm thu Thực tế trên Giao diện |
| :--- | :--- | :--- | :--- |
| **1. Nhân viên Kỹ thuật (`TECH_STAFF`)** | `kythuat.quan1@mekongmobile.vn`<br>*(hoặc `kythuat.test@gmail.com`)* | `Tech@123456`<br>*(hoặc `123456`)* | - **Màn hình 1 – Bảng tin Kỹ thuật viên:** Xem danh sách phiếu bảo hành cần linh kiện, trạng thái hiển thị 100% tiếng Việt (*"Chờ tiếp nhận"*, *"Đang xử lý"*, *"Đã hoàn thành"*).<br>- **Màn hình 2 – Tra cứu & Giao dịch kho:** Gõ từ khóa vào ô tìm kiếm thông minh `#smartPartSearch` (khởi tạo trống hoàn toàn) -> Hiện dropdown gợi ý kèm số lượng tồn & huy hiệu màu (Xanh/Vàng/Đỏ) -> Nhấn phím **`Enter`** để chọn nhanh linh kiện (không cần nút "Tra cứu"). Nhập số lượng vượt tồn kho thực tế -> Khung cảnh báo đỏ hiện lên và tự động khóa nút xác nhận (`BR-01`). Bấm nút **"Đặt lại biểu mẫu"** -> Toàn bộ ô tìm kiếm, thẻ chi tiết và thông báo lỗi được dọn sạch 100% về trạng thái hướng dẫn ban đầu.<br>- **Màn hình 3 – Lịch sử tiếp nhận:** Xem sổ nhật ký xuất kho (`Xuất kho thay thế`) và hoàn trả (`Hoàn trả linh kiện`) cá nhân. |
| **2. Nhân viên Vật tư (`MATERIAL_STAFF`)** | `vattu.quan1@mekongmobile.vn`<br>*(hoặc `vattu.test@gmail.com`)* | `Mat@123456`<br>*(hoặc `123456`)* | - **Màn hình 1 – Bảng tin Quản lý vật tư:** Xem KPI vật tư, bảng linh kiện chạm ngưỡng báo động đỏ kèm nút *"Nhập bổ sung ngay"* (đã loại bỏ nút *"Tạo lệnh Nhập kho mới"* thừa ở góc phải tiêu đề).<br>- **Màn hình 2 – Nhập kho linh kiện mới:** Thiết kế lưới **2 cột song song** (Cột trái: Biểu mẫu lập phiếu nhập kho `IN`; Cột phải: Bảng thống kê tồn kho trực tiếp của toàn bộ **40 linh kiện** có ô lọc nhanh và nút **`Chọn`** điền tự động mã linh kiện sang biểu mẫu).<br>- **Màn hình 3 – Nhà cung cấp:** Danh bạ các đối tác cung ứng linh kiện chính hãng. |
| **3. Quản lý Kho Chi nhánh (`MANAGER`)** | `quanly.quan1@mekongmobile.vn`<br>*(hoặc `quanlykho.test@gmail.com`)* | `Manager@123456`<br>*(hoặc `123456`)* | - **Màn hình 1 – Dashboard Tổng quan:** Xem 4 thẻ KPI tổng hợp, bảng cảnh báo linh kiện chạm ngưỡng an toàn viền đỏ; bấm nút **`Xem Báo cáo Chi tiết`** để mở trang Báo cáo.<br>- **Màn hình 2 – Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng:** Điều chỉnh trực tiếp ngưỡng an toàn `min_threshold` cho từng linh kiện; có nút **`Quay lại trang`** để trở về Dashboard; bộ phân trang chuẩn `10 / 20 / 50 / Tất cả`.<br>- **Màn hình 3 – Nhật ký Giao dịch Kho (Audit Log):** Sổ cái đối soát toàn bộ giao dịch `Xuất kho thay thế` (`OUT`), `Nhập kho vật tư` (`IN`), `Hoàn trả linh kiện` (`RETURN`) gắn kèm mã phiếu bảo hành và người thực hiện (không có nút *"Quay lại trang"* thừa).<br>- **Màn hình 4 – Quản lý nhân sự:** Tìm kiếm nhân viên cấp dưới (`TECH_STAFF`, `MATERIAL_STAFF`), lọc theo vai trò, lọc theo 4 trạng thái hoạt động, phân trang, Import nhân sự từ file và khóa vĩnh viễn tài khoản thôi việc (không có nút *"Quay lại trang"* thừa). |
| **4. Tài khoản Đã thôi việc (`TERMINATED`)** | `anhpham712002@gmail.com` | `Anhpham712002@` | - **Kịch bản Kiểm thử An ninh Bảo mật:** Thử đăng nhập bằng tài khoản này tại màn hình Đăng nhập -> Hệ thống **chặn lập tức** với mã lỗi **HTTP 403 `ERR_ACCOUNT_TERMINATED`** (*"Tài khoản đã thôi việc và bị vô hiệu hóa vĩnh viễn"*). |

---

# MỤC 8: CHI TIẾT CÁC CẢI TIẾN TOÀN DIỆN UI/UX DARK 3D & RÀNG BUỘC NGHIỆP VỤ

Hệ thống đã trải qua quá trình rà soát và tinh chỉnh toàn diện ở cả 3 tầng Giao diện – Nghiệp vụ – Cơ sở dữ liệu nhằm đạt độ hoàn thiện cao nhất:

### 8.1. Tinh gọn Header & Thanh lọc 100% Chuỗi Kỹ thuật / Breadcrumbs
- **Header (Thanh đầu trang):** Xóa bỏ hoàn toàn khung xám thừa bên trái chứa chữ `LUỒNG 05: KHO LINH KIỆN` và mã `(L5-WH-890)`. Chỉ giữ lại biểu tượng Logo 3D L5, tên hệ thống `SMART CRM — MEKONG MOBILE` và `Chi nhánh: Quận 1` sắc nét. Đổi tên nút trong menu tài khoản từ *"Đăng xuất khỏi hệ thống"* thành **`Đăng xuất tài khoản`**.
- **Xóa bỏ toàn bộ Breadcrumbs rườm rà và mã kỹ thuật (`BR-01..05`, `FR-01..07`, `NFR-01..03`)** trên mọi màn hình của cả 3 vai trò, thay bằng ngôn ngữ nghiệp vụ tiếng Việt tự nhiên, kèm cơ chế báo lỗi trực quan bằng dòng chữ nhỏ màu đỏ (`.field-error-text`) và viền khung nhập đỏ (`.field-error-input`).

### 8.2. Việt hóa 100% Trạng thái & Biểu diễn Tường minh Giao dịch `OUT`
- Mọi trạng thái phiếu bảo hành được chuyển ngữ sang tiếng Việt chuẩn: **`Chờ tiếp nhận`** (`OPEN`/`WAITING_PARTS`), **`Đang xử lý`** (`IN_PROGRESS`), **`Đã hoàn thành`** (`COMPLETED`), **`Đã hủy`** (`CANCELLED`).
- Loại giao dịch trong Sổ cái và Lịch sử hiển thị huy hiệu tiếng Việt rõ nghĩa:
  - 🟡 **`Xuất kho thay thế`** (`OUT` — Huy hiệu vàng hổ phách).
  - 🟢 **`Nhập kho vật tư`** (`IN` — Huy hiệu xanh ngọc lục bảo).
  - 🔵 **`Hoàn trả linh kiện`** (`RETURN` — Huy hiệu xanh dương).
- Loại bỏ triệt để 100% hiện tượng hiển thị chữ `undefined` hoặc `null` trên mọi bảng dữ liệu.

### 8.3. Nâng cấp Trải nghiệm Xác thực (Mật khẩu 4 nhóm, Con mắt xem mật khẩu, Đồng hồ đếm ngược OTP 10 phút)
- **Checklist quy chuẩn mật khẩu ẩn thông minh:** Danh sách 5 tiêu chí mật khẩu (tối thiểu 8 ký tự, chữ hoa, chữ thường, chữ số, ký tự đặc biệt) được **ẩn mặc định** để giao diện gọn gàng và chỉ bung ra cảnh báo màu đỏ khi người dùng nhập mật khẩu chưa đạt chuẩn.
- **Nút con mắt ẩn/hiện mật khẩu (`.eye-toggle-btn`):** Tích hợp tại tất cả các ô mật khẩu ở cả 3 màn hình Đăng nhập, Đăng ký và Quên mật khẩu.
- **Đồng hồ đếm ngược OTP 10 phút thời gian thực (`#countdownTimer`):** Khi yêu cầu mã khôi phục mật khẩu, hệ thống tạo mã OTP 6 chữ số có hiệu lực đúng **10 phút (600 giây)** và hiển thị đồng hồ đếm ngược từng giây (`10:00` -> `09:59` -> ... -> `00:00`) ngay trên màn hình.

### 8.4. Logic 4 Trạng thái Nhân sự Chuẩn xác (`ONLINE`, `AWAY`, `OFF_SHIFT`, `TERMINATED`)
- 🟢 **`ONLINE` (Đang hoạt động):** Chấm tròn xanh lá phát sáng nhấp nháy (`animate-pulse`) khi nhân viên đang đăng nhập trong ca.
- 🟡 **`AWAY` (Tạm dừng hoạt động):** Chấm tròn vàng khi nhân viên tạm rời vị trí.
- 🟠 **`OFF_SHIFT` (Nghỉ sau ca làm):** Chấm tròn cam khi nhân viên bấm **`Đăng xuất tài khoản`** kết thúc ca làm việc. Khi đăng nhập lại vào ca sau, trạng thái tự động chuyển về `ONLINE`.
- 🔴 **`TERMINATED` (Đã thôi việc):** Chấm tròn đỏ sẫm có gạch ngang; tài khoản bị vô hiệu hóa vĩnh viễn và bị chặn đăng nhập với mã lỗi HTTP 403 `ERR_ACCOUNT_TERMINATED`.

### 8.5. Ràng buộc Kiểm định Đầu vào Chặt chẽ tại Backend
- **Họ và tên (`full_name`):** Từ 2 đến tối đa 50 ký tự (`ERR_INVALID_FULL_NAME`).
- **Email (`email`):** Đúng định dạng email chuẩn, tối đa 100 ký tự (`ERR_INVALID_EMAIL`).
- **Mật khẩu (`password`):** Từ 8 đến 128 ký tự, bắt buộc hội tụ đủ 4 nhóm ký tự: Chữ hoa `[A-Z]`, Chữ thường `[a-z]`, Chữ số `[0-9]`, Ký tự đặc biệt `[!@#$%^&*...]` (`ERR_WEAK_PASSWORD`).
- **Mã phiếu bảo hành (`ticket_id`) & Mã linh kiện (`part_code`):** Tối đa 30 ký tự, tự động cắt khoảng trắng thừa (`strip()`).
- **Số lượng giao dịch (`quantity`):** Số nguyên dương từ `1` đến `1.000.000` (`ERR_INVALID_QUANTITY`).
- **Ngưỡng cảnh báo an toàn (`min_threshold`):** Số nguyên từ `1` đến `100.000` (`ERR_INVALID_THRESHOLD`).

---

# MỤC 9: HƯỚNG DẪN CHẠY BỘ KIỂM THỬ TỰ ĐỘNG (43/43 TESTS PASS) & 10 LOẠI HÌNH KIỂM THỬ

Hệ thống được bảo vệ bởi bộ kiểm thử tự động hóa gồm **43 ca kiểm thử (Test Cases)** viết bằng `pytest`, tự dựng dữ liệu kiểm thử độc lập (không phụ thuộc dữ liệu riêng trên máy cá nhân) và bao phủ đầy đủ các trường hợp: **Luồng đúng (Happy Path)**, **Giá trị biên (Boundary Value)**, **Dữ liệu sai (Invalid Data)**, **Phân quyền bảo mật (RBAC / OWASP A01)** và **Kiểm thử luồng liên vai trò (Cross-Role E2E)**.

### 9.1. Lệnh Chạy Toàn bộ Bộ Kiểm thử (1 Lệnh Duy nhất)
Tại cửa sổ PowerShell ở thư mục gốc `CDTN01` (đã kích hoạt `venv`), gõ đúng **1 lệnh**:

```powershell
pytest tests/ -v
```

### 9.2. Kết quả Chạy Kiểm thử Thực tế (Bảo chứng 43/43 PASS 100%)

```text
============================= test session starts =============================
platform win32 -- Python 3.11.5, pytest-9.1.1, pluggy-1.6.0
rootdir: D:\Hoc\DH\N4\N4.HK01\Chuyende1\CDTN01
configfile: pytest.ini
collected 43 items

tests/auth_and_user.test.py::TestAuthAndUserManagement::test_01_register_success_for_tech_staff PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_02_register_reject_short_password PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_02a_register_reject_missing_uppercase PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_02b_register_reject_missing_lowercase PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_02c_register_reject_missing_digit PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_02d_register_reject_missing_special PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_03_register_duplicate_email_forbidden PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_04_login_success PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_05_login_wrong_password PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_06_forgot_password_and_reset_with_otp PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_07_manager_view_subordinates_only PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_08_manager_import_subordinates PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_09_login_terminated_user_rejected_with_403 PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_10_logout_sets_user_status_to_off_shift PASSED
tests/auth_and_user.test.py::TestAuthAndUserManagement::test_11_max_length_constraints PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_01_cross_role_flow_export_triggers_manager_alert PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_02_cross_role_flow_material_import_updates_tech_stock PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_03_static_homepage_layout_and_font_integrity PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_04_styles_css_3d_and_semantic_colors PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_05_clean_app_js_no_breadcrumbs_no_technical_codes PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_06_header_renamed_logout_button_and_no_luong_05 PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_07_tech_staff_unified_smart_search_and_reset_form PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_08_manager_subordinates_search_filter_and_pagination PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_09_password_eye_toggle_and_hidden_checklists PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_10_otp_10_minutes_and_live_countdown PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_11_vietnamese_translations_and_out_transaction_representation PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_12_material_staff_ui_no_create_button_and_stats_table PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_13_manager_navigation_reports_removed_from_sidebar_and_back_button PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_14_expanded_parts_catalog_40_items PASSED
tests/cross_role_and_ui.test.py::TestCrossRoleAndUI::test_15_tech_staff_smart_lookup_enter_and_not_found_handling PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_01_api1_get_stock_success PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_02_api2_create_transaction_success PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_03_api2_create_transaction_negative_stock_error PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_04_api2_create_transaction_missing_ticket_error PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_05_api3_update_threshold_forbidden_for_tech_staff PASSED
tests/inventory.routes.test.py::TestInventoryRoutes::test_06_api3_update_threshold_success_for_manager PASSED
tests/inventory.service.test.py::TestInventoryService::test_01_stock_lookup_and_threshold_evaluation_normal PASSED
tests/inventory.service.test.py::TestInventoryService::test_02_stock_lookup_and_threshold_evaluation_warning PASSED
tests/inventory.service.test.py::TestInventoryService::test_03_export_happy_path PASSED
tests/inventory.service.test.py::TestInventoryService::test_04_br01_prevent_negative_stock PASSED
tests/inventory.service.test.py::TestInventoryService::test_05_br02_mandatory_ticket_for_out PASSED
tests/inventory.service.test.py::TestInventoryService::test_06_role_permission_checks PASSED
tests/inventory.service.test.py::TestInventoryService::test_07_fr06_set_threshold_by_manager_only PASSED

======================== 43 passed in 3.42s ========================
```

### 9.3. Tóm tắt 10 Loại hình Kiểm thử đã Áp dụng (Chi tiết tại [docs/test.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/test.md))
1. **Unit Testing (Kiểm thử đơn vị):** Kiểm tra độc lập lớp `InventoryService` và `InventoryValidator` (hàm kiểm tra mật khẩu 4 nhóm, hàm tính cờ cảnh báo `is_low_stock`, hàm chặn âm kho `BR-01`).
2. **Integration Testing (Kiểm thử tích hợp):** Kiểm tra sự phối hợp xuyên suốt giữa `Routes` -> `Validators` -> `Services` -> `Repositories`.
3. **API / Contract Testing:** Kiểm thử từng endpoint theo đúng hợp đồng [docs/api-contract.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/api-contract.md) và mã trạng thái HTTP (`200`, `201`, `400`, `401`, `403`, `404`, `409`).
4. **UI / Layout Testing (Kiểm thử giao diện 3D):** Kiểm định cấu trúc HTML/CSS/JS, phông chữ `Be Vietnam Pro`, các lớp 3D `.card-3d`, huy hiệu màu ngữ nghĩa và cơ chế xử lý 3 trạng thái.
5. **End-to-End (E2E) Cross-Role Testing:** Kiểm thử luồng nghiệp vụ liên vai trò: Kỹ thuật viên xuất kho làm chạm ngưỡng -> Quản lý nhận cảnh báo đỏ -> Nhân viên vật tư nhập bổ sung -> Số dư kho cập nhật tức thì.
6. **Performance Testing (Kiểm thử hiệu năng):** Thời gian phản hồi API tra cứu trung bình đạt **< 50ms** (vượt xa yêu cầu `NFR-02 < 500ms`).
7. **Security & RBAC Testing (Kiểm thử bảo mật):** Kiểm tra phân quyền theo vai trò (chặn `TECH_STAFF` sửa ngưỡng bằng HTTP 403), chặn tài khoản `TERMINATED` đăng nhập bằng HTTP 403, băm mật khẩu Bcrypt và cấp JWT Token.
8. **Regression Testing (Kiểm thử hồi quy):** Tự động chạy lại toàn bộ 43 ca kiểm thử sau mỗi lần nâng cấp giao diện và đóng gói Docker.
9. **Smoke / Sanity Testing:** Kiểm tra khởi động máy chủ, endpoint `/health` và tải trang chủ `/` (HTTP 200).
10. **Boundary & Data-Driven Testing (Kiểm thử giá trị biên & hướng dữ liệu):** Kiểm thử biên tồn kho vừa chạm ngưỡng (`quantity == min_threshold`), biên độ dài chuỗi (50, 100, 128 ký tự), biên thời hạn OTP 10 phút.

---

# MỤC 10: CẨM NANG XỬ LÝ SỰ CỐ THƯỜNG GẶP (TROUBLESHOOTING) & LIÊM CHÍNH HỌC THUẬT

### 10.1. Bảng Xử lý Nhanh Các Lỗi Thường Gặp Khi Dựng Hệ thống trên Máy Mới

| Triệu chứng / Thông báo lỗi | Nguyên nhân | Cách khắc phục triệt để trong 10 giây |
| :--- | :--- | :--- |
| `Activate.ps1 cannot be loaded because running scripts is disabled` | Chính sách mặc định của Windows PowerShell chặn chạy script kích hoạt `venv`. | Chạy lệnh: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` rồi chạy lại `.\venv\Scripts\Activate.ps1`. |
| `ModuleNotFoundError: No module named 'fastapi'` (hoặc `src`) | Chưa kích hoạt môi trường ảo `venv` hoặc chưa chạy lệnh từ thư mục gốc `CDTN01`. | Đảm bảo đang đứng tại `CDTN01`, kích hoạt `.\venv\Scripts\Activate.ps1` và chạy `pip install -r requirements.txt`. |
| `ERROR: [Errno 10048] error while attempting to bind on address ('0.0.0.0', 8000)` | Cổng `8000` đang được sử dụng bởi một tiến trình chạy trước đó. | Đổi biến `API_PORT=8001` trong tệp `.env` rồi chạy lại `python src/app.py`, hoặc tắt cửa sổ terminal cũ đang chạy cổng `8000`. |
| Máy tính không có mạng Internet hoặc chưa bật MongoDB Service | Không kết nối được tới máy chủ MongoDB từ xa hoặc cục bộ. | **Không cần lo lắng!** Hệ thống tự động kích hoạt chế độ **Dual-Persistence Fallback** đọc từ `seeds/001_seed_parts_demo.json` và lưu vào `data/users_store.json`, mọi chức năng Web & Test vẫn chạy 100% bình thường. |

---

### 10.2. Trạng thái Hoàn thành Dự án (Project Milestones Checklist)
- [x] **Giai đoạn 1 (Buổi 1 – 6 / Bài tập 1):** Hoàn thành SRS rút gọn 6 mục, Use Case Diagram, Architecture Diagram, ERD 6 thực thể, Wireframe, API Contract và Khai báo AI.
- [x] **Giai đoạn 2 (Buổi 7 – 12 / Bài tập 2):** Hoàn thành tách lớp Backend 3-Tier (`routes` / `validators` / `services` / `repositories`), Migrations & Seed 40 linh kiện chạy lại không nhân đôi (`C5`), Giao diện SPA Dark 3D Elevation cho 3 vai trò đủ 3 trạng thái (`S4`), Nhật ký thay đổi thiết kế (`docs/thaydoithietke.md`) và Báo cáo `docs/BT2.md`.
- [x] **Giai đoạn 3 (Buổi 13 – 16 / Bài tập 3):** Hoàn thành bộ 43 ca kiểm thử tự động PASS 100% bằng 1 lệnh (`pytest tests/ -v`), đóng gói Docker & Docker Compose chạy hoàn chỉnh bằng `<= 2` lệnh và hoàn thiện tài liệu bàn giao.

---

### 10.3. Thông tin Sinh viên & Cam kết Liêm chính Học thuật

- **Họ và tên sinh viên:** Huỳnh Nguyễn Bảo Ngọc
- **Mã số sinh viên:** `2374802010339`
- **Ngành đào tạo:** Công nghệ Thông tin — **Chuyên ngành:** Công nghệ phần mềm (Software Engineering - SE)
- **Khoa:** Công nghệ Thông tin – Trường Đại học Văn Lang (VLU)
- **Học phần:** Chuyên đề Tốt nghiệp 1 (Học kỳ 1, Năm học 2026 – 2027)

> [!NOTE]
> **Xác nhận Liêm chính Học thuật:**  
> *"Tôi xác nhận đã đọc, hiểu và chịu trách nhiệm về toàn bộ nội dung nộp. Toàn bộ mã nguồn, cấu trúc cơ sở dữ liệu, tài liệu đặc tả thiết kế, gói cấu hình Docker và bộ kiểm thử tự động trong dự án này do tôi thực hiện trung thực, tuân thủ nghiêm ngặt quy định về liêm chính học thuật và chính sách sử dụng AI của Khoa Công nghệ Thông tin – Trường Đại học Văn Lang."*  
> **Sinh viên thực hiện:** Huỳnh Nguyễn Bảo Ngọc — **MSSV:** `2374802010339` — **Ngày cập nhật:** 29/10/2026.
