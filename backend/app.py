"""
File: backend/app.py
Entry point khởi chạy Backend FastAPI từ thư mục backend/.
Chạy bằng lệnh: python app.py
"""

import os
import sys

# Đảm bảo đường dẫn import
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from src.app import app

if __name__ == "__main__":
    import uvicorn
    api_port = int(os.getenv("API_PORT", 8000))
    print(f"[FastAPI Server] Starting Mekong Mobile Inventory Service at http://localhost:{api_port}")
    uvicorn.run("src.app:app", host="0.0.0.0", port=api_port, reload=False)
