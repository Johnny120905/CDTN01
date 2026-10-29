"""
File: src/app.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Tệp khởi chạy ứng dụng chính (Application Entry Point).
Vai trò trong kiến trúc phân lớp:
  - Khởi tạo FastAPI Application.
  - Thiết lập cấu hình CORS (Cross-Origin Resource Sharing) kết nối thông suốt với Frontend.
  - Đăng ký bộ xử lý ngoại lệ tập trung (Global Exception Handler) cho AppError (NFR-04).
  - Ghép nối Lớp Điều phối (routes/inventory.routes.py) vào tiền tố chuẩn '/api/v1/inventory'.
  - Mount và phục vụ trực tiếp Giao diện Web SPA hoàn chỉnh từ thư mục static (NFR-01: Chạy bằng 1 lệnh).

Chạy ứng dụng:
  - Cách 1: python src/app.py
  - Cách 2: uvicorn src.app:app --reload --port 8000
"""

import os
import sys
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Nạp biến môi trường
load_dotenv()

# Đảm bảo đường dẫn import tương đối chính xác
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.errors.AppError import AppError
from src.routes import router as inventory_router, auth_router

# Khởi tạo FastAPI application
app = FastAPI(
    title="Smart CRM - Mekong Mobile | Luồng 05: Quản lý Kho linh kiện",
    description="Hệ thống quản lý kho linh kiện thay thế, tra cứu tồn kho real-time và xuất kho bảo hành.",
    version="1.0.0"
)

# 1. Cấu hình CORS cho phép Frontend gọi API không bị chặn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Xử lý ngoại lệ tập trung (Global Exception Handler) cho AppError
# Đảm bảo tỷ lệ lộ mã lỗi hệ thống 500 là 0% theo yêu cầu NFR-04
@app.exception_handler(AppError)
async def custom_app_error_handler(request: Request, exc: AppError):
    """
    Chuyển đổi các ngoại lệ nghiệp vụ thành phản hồi JSON chuẩn hóa.
    Định dạng: {"status": "error", "error_code": "ERR_...", "message": "..."}
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "error_code": exc.error_code,
            "message": exc.message
        }
    )

# 3. Đăng ký các Routes điều phối API theo đúng chuẩn RESTful
app.include_router(inventory_router, prefix="/api/v1/inventory", tags=["Inventory Management"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication & Roles"])

# 4. Kiểm tra sức khỏe hệ thống (Health Check)
@app.get("/health", tags=["Monitoring"])
def health_check():
    """Endpoint kiểm tra trạng thái hoạt động của dịch vụ."""
    return {
        "status": "online",
        "service": "Smart CRM - Inventory Subsystem (L5)",
        "timestamp": "2026-10-25T21:40:00Z"
    }

# 5. Mount thư mục tĩnh phục vụ Website Frontend hoàn chỉnh
static_dir = os.path.join(CURRENT_DIR, "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

    @app.get("/", tags=["Frontend"])
    def serve_frontend_homepage():
        """Phục vụ trang chủ giao diện người dùng trực tiếp trên trình duyệt."""
        index_file = os.path.join(static_dir, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "Mekong Mobile Inventory API is running. Static index.html not found."}


if __name__ == "__main__":
    import uvicorn
    api_port = int(os.getenv("API_PORT", 8000))
    print(f"\n========================================================")
    print(f"  SMART CRM - MEKONG MOBILE (INVENTORY FLOW 05)")
    print(f"  Server running at: http://localhost:{api_port}")
    print(f"  Swagger Docs at:   http://localhost:{api_port}/docs")
    print(f"========================================================\n")
    uvicorn.run("src.app:app", host="0.0.0.0", port=api_port, reload=True)
