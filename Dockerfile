# ==============================================================================
# File: Dockerfile
# Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
# Chi nhánh: Quận 1 (L5-WH-890)
# Mục đích: Đóng gói toàn bộ Backend FastAPI + Frontend SPA Dark 3D + Seed Data
#           thành một Container độc lập, chạy hoàn chỉnh bằng 1 lệnh (NFR-01).
# ==============================================================================

FROM python:3.11-slim

# Thông tin định danh Image
LABEL maintainer="Huynh Nguyen Bao Ngoc <2374802010339>"
LABEL project="Smart CRM - Mekong Mobile (Flow 05: Spare Parts Inventory)"
LABEL version="0.2"

# Thiết lập biến môi trường tối ưu cho Python trong Container
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    API_PORT=8000 \
    DB_NAME=mekong_mobile_l5 \
    DEFAULT_CENTER_ID=L5-WH-890

# Thiết lập thư mục làm việc gốc
WORKDIR /app

# Cài đặt công cụ kiểm tra sức khỏe (curl) và dọn dẹp apt cache
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Sao chép và cài đặt thư viện phụ thuộc trước để tận dụng Docker Layer Caching
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn ứng dụng, dữ liệu hạt giống (40 linh kiện) và bộ kiểm thử
COPY src/ ./src/
COPY seeds/ ./seeds/
COPY data/ ./data/
COPY tests/ ./tests/
COPY pytest.ini .
COPY .env.example .

# Đảm bảo thư mục lưu trữ dữ liệu bền vững tồn tại
RUN mkdir -p /app/data /app/seeds

# Mở cổng dịch vụ Web & RESTful API
EXPOSE 8000

# Kiểm tra sức khỏe tự động của Container thông qua endpoint /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Khởi chạy máy chủ Uvicorn phục vụ đồng thời cả RESTful API và Giao diện Web SPA
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]

