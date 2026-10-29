"""
File: seeds/seed.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Script tự động nạp dữ liệu mẫu từ seeds/001_seed_parts_demo.json vào CSDL MongoDB.
Chạy bằng lệnh: python seeds/seed.py
"""

import json
import os
import sys
from datetime import datetime
from dotenv import load_dotenv
import pymongo
from bson import ObjectId

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Tải cấu hình biến môi trường
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/inventory_db")
DB_NAME = os.getenv("DB_NAME", "inventory_db")

def parse_iso_date(date_str):
    """Chuyển đổi chuỗi ISO thời gian thành đối tượng datetime của Python."""
    if not date_str:
        return datetime.utcnow()
    try:
        if date_str.endswith("Z"):
            date_str = date_str[:-1]
        return datetime.fromisoformat(date_str)
    except Exception:
        return datetime.utcnow()

def run_seed():
    """Hàm thực thi nạp dữ liệu vào MongoDB."""
    seed_file_path = os.path.join(os.path.dirname(__file__), "001_seed_parts_demo.json")
    if not os.path.exists(seed_file_path):
        print(f"[LỖI] Không tìm thấy tệp dữ liệu mẫu tại: {seed_file_path}")
        sys.exit(1)

    print(f"[*] Đang đọc tệp seed: {seed_file_path}...")
    with open(seed_file_path, "r", encoding="utf-8") as f:
        seed_data = json.load(f)

    print(f"[*] Đang kết nối tới MongoDB: {MONGO_URI} (Database: {DB_NAME})...")
    try:
        client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
        client.server_info()  # Kiểm tra kết nối
        db = client[DB_NAME]
        print("[THÀNH CÔNG] Đã kết nối thành công tới máy chủ MongoDB!")
    except Exception as e:
        print(f"[CẢNH BÁO / LỖI] Không thể kết nối tới MongoDB tại {MONGO_URI}.")
        print(f"Chi tiết lỗi: {e}")
        print("\n==> HƯỚNG DẪN DÀNH CHO BẠN:")
        print("1. Hãy đảm bảo MongoDB Service đang chạy (Port mặc định: 27017) hoặc mở MongoDB Compass và kết nối.")
        print("2. Nếu dùng MongoDB Atlas đám mây, hãy cập nhật MONGO_URI trong file .env.")
        print("Hệ thống Backend có chế độ InMemory Fallback khi chạy thử nghiệm nếu MongoDB chưa bật.")
        return False

    # 1. Nạp service_center
    if "service_center" in seed_data:
        center_col = db["service_center"]
        for item in seed_data["service_center"]:
            center_col.replace_one({"center_id": item["center_id"]}, item, upsert=True)
        print(f"  + Đã nạp {len(seed_data['service_center'])} bản ghi vào 'service_center'")

    # 2. Nạp users
    if "users" in seed_data:
        user_col = db["users"]
        for item in seed_data["users"]:
            doc = dict(item)
            if "_id" in doc:
                try:
                    doc["_id"] = ObjectId(doc["_id"])
                except Exception:
                    pass
            if "otp_expires_at" in doc and doc["otp_expires_at"]:
                doc["otp_expires_at"] = parse_iso_date(doc["otp_expires_at"])
            user_col.replace_one({"email": doc["email"]}, doc, upsert=True)
        print(f"  + Đã nạp {len(seed_data['users'])} tài khoản vào 'users'")

    # 3. Nạp part
    if "part" in seed_data:
        part_col = db["part"]
        for item in seed_data["part"]:
            part_col.replace_one({"part_code": item["part_code"]}, item, upsert=True)
        print(f"  + Đã nạp {len(seed_data['part'])} linh kiện vào 'part'")

    # 4. Nạp ticket
    if "ticket" in seed_data:
        ticket_col = db["ticket"]
        for item in seed_data["ticket"]:
            ticket_col.replace_one({"ticket_id": item["ticket_id"]}, item, upsert=True)
        print(f"  + Đã nạp {len(seed_data['ticket'])} phiếu bảo hành vào 'ticket'")

    # 5. Nạp part_stock
    if "part_stock" in seed_data:
        stock_col = db["part_stock"]
        for item in seed_data["part_stock"]:
            stock_col.replace_one(
                {"center_id": item["center_id"], "part_code": item["part_code"]},
                item,
                upsert=True
            )
        print(f"  + Đã nạp {len(seed_data['part_stock'])} bản ghi tồn kho vào 'part_stock'")

    # 6. Nạp part_transaction
    if "part_transaction" in seed_data:
        tx_col = db["part_transaction"]
        for item in seed_data["part_transaction"]:
            doc = dict(item)
            if "created_at" in doc:
                doc["created_at"] = parse_iso_date(doc["created_at"])
            tx_col.replace_one({"transaction_id": doc["transaction_id"]}, doc, upsert=True)
        print(f"  + Đã nạp {len(seed_data['part_transaction'])} nhật ký giao dịch vào 'part_transaction'")

    # Tạo indexes cơ bản
    try:
        db["service_center"].create_index([("center_id", 1)], unique=True)
        db["part"].create_index([("part_code", 1)], unique=True)
        db["ticket"].create_index([("ticket_id", 1)], unique=True)
        db["part_stock"].create_index([("center_id", 1), ("part_code", 1)], unique=True, name="idx_stock_lookup")
        db["part_transaction"].create_index([("center_id", 1), ("created_at", -1)], name="idx_transaction_history")
        db["users"].create_index([("email", 1)], unique=True, name="email_1")
        print("  + Đã tạo và xác thực đầy đủ hệ thống Indexes!")
    except Exception as e:
        print(f"  [Lưu ý khi tạo index]: {e}")

    print("\n[HOÀN TẤT] Toàn bộ dữ liệu mẫu đã được khởi tạo sẵn sàng cho ứng dụng!")
    return True

if __name__ == "__main__":
    run_seed()
