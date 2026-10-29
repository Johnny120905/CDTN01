# -*- coding: utf-8 -*-
"""
Script bổ sung thêm 33 linh kiện mới (tổng cộng 40 linh kiện) cho hệ thống Smart CRM - Mekong Mobile
"""
import json
import os

NEW_PARTS = [
    {"part_code": "SCR-IP15PM-08", "part_name": "Màn hình Super Retina XDR iPhone 15 Pro Max", "category": "Màn hình", "price": 4200000.0, "min_threshold": 10},
    {"part_code": "BAT-IP15-09", "part_name": "Pin Polymer iPhone 15 (3349mAh)", "category": "Pin & Nguồn", "price": 890000.0, "min_threshold": 15},
    {"part_code": "CAM-SS24U-10", "part_name": "Cụm Camera 200MP Galaxy S24 Ultra", "category": "Camera", "price": 3100000.0, "min_threshold": 8},
    {"part_code": "CHR-IP15-11", "part_name": "Cổng sạc Type-C & Cáp nguồn iPhone 15 Series", "category": "Cổng sạc & Cáp", "price": 450000.0, "min_threshold": 12},
    {"part_code": "SCR-IP13-12", "part_name": "Màn hình OLED Super Retina iPhone 13", "category": "Màn hình", "price": 2850000.0, "min_threshold": 15},
    {"part_code": "BAT-IP14-13", "part_name": "Pin Li-ion iPhone 14 (3279mAh)", "category": "Pin & Nguồn", "price": 850000.0, "min_threshold": 20},
    {"part_code": "CAM-IP15PM-14", "part_name": "Cụm Camera tiềm vọng 5X iPhone 15 Pro Max", "category": "Camera", "price": 3450000.0, "min_threshold": 6},
    {"part_code": "GLS-IP15PM-15", "part_name": "Mặt kính lưng Ceramic Shield iPhone 15 Pro Max", "category": "Vỏ & Kính", "price": 950000.0, "min_threshold": 10},
    {"part_code": "SPK-SS23-16", "part_name": "Cụm Loa ngoài AKG Stereo Galaxy S23 Ultra", "category": "Âm thanh", "price": 420000.0, "min_threshold": 10},
    {"part_code": "MIC-IP14-17", "part_name": "Cụm Micro thu âm chống ồn & Cáp cảm biến iPhone 14", "category": "Âm thanh", "price": 380000.0, "min_threshold": 12},
    {"part_code": "SCR-XIA-14-18", "part_name": "Màn hình AMOLED 1.5K 120Hz Xiaomi 14", "category": "Màn hình", "price": 2650000.0, "min_threshold": 8},
    {"part_code": "BAT-XIA-14-19", "part_name": "Pin sạc nhanh 90W Xiaomi 14 (4610mAh)", "category": "Pin & Nguồn", "price": 680000.0, "min_threshold": 10},
    {"part_code": "FCD-IP14-20", "part_name": "Cụm Cảm biến Face ID TrueDepth iPhone 14 Pro", "category": "Bo mạch & Cảm biến", "price": 1850000.0, "min_threshold": 6},
    {"part_code": "TAP-IP14-21", "part_name": "Động cơ rung Haptic Taptic Engine iPhone 14 Series", "category": "Linh kiện cơ học", "price": 350000.0, "min_threshold": 10},
    {"part_code": "CHR-SS23-22", "part_name": "Cụm bo sạc nhanh Type-C Galaxy S23", "category": "Cổng sạc & Cáp", "price": 410000.0, "min_threshold": 15},
    {"part_code": "ANT-IP15-23", "part_name": "Cáp Ăng-ten sóng 5G mmWave iPhone 15 Pro", "category": "Bo mạch & Cảm biến", "price": 290000.0, "min_threshold": 10},
    {"part_code": "SCR-IPAD-M2-24", "part_name": "Màn hình Liquid Retina XDR iPad Pro 11 inch M2", "category": "Màn hình", "price": 5200000.0, "min_threshold": 5},
    {"part_code": "BAT-IPAD-M2-25", "part_name": "Pin Li-Po iPad Pro 11 inch M2 (7538mAh)", "category": "Pin & Nguồn", "price": 1450000.0, "min_threshold": 6},
    {"part_code": "CAM-IPAD-M2-26", "part_name": "Cụm Camera Ultra Wide LiDAR iPad Pro M2", "category": "Camera", "price": 1950000.0, "min_threshold": 4},
    {"part_code": "PWR-IP14-27", "part_name": "Dây cáp nguồn phím âm lượng & Gạt rung iPhone 14", "category": "Cáp & Nút bấm", "price": 280000.0, "min_threshold": 15},
    {"part_code": "GLS-SS24U-28", "part_name": "Kính cường lực Gorilla Armor Galaxy S24 Ultra", "category": "Vỏ & Kính", "price": 890000.0, "min_threshold": 10},
    {"part_code": "SIM-IP14-29", "part_name": "Khay sim kép khay đơn vật lý iPhone 14 Series", "category": "Vỏ & Kính", "price": 120000.0, "min_threshold": 20},
    {"part_code": "WCH-IP15-30", "part_name": "Cụm cuộn sạc không dây MagSafe & Cảm biến nhiệt iPhone 15", "category": "Cổng sạc & Cáp", "price": 520000.0, "min_threshold": 8},
    {"part_code": "SCR-IP12-31", "part_name": "Màn hình Super Retina OLED iPhone 12 / 12 Pro", "category": "Màn hình", "price": 2100000.0, "min_threshold": 15},
    {"part_code": "BAT-IP12-32", "part_name": "Pin thay thế chính hãng iPhone 12 (2815mAh)", "category": "Pin & Nguồn", "price": 650000.0, "min_threshold": 18},
    {"part_code": "CAM-IP13-33", "part_name": "Cụm Camera kép góc siêu rộng iPhone 13", "category": "Camera", "price": 1650000.0, "min_threshold": 8},
    {"part_code": "SPK-IP13-34", "part_name": "Cụm loa trong và loa đàm thoại iPhone 13", "category": "Âm thanh", "price": 320000.0, "min_threshold": 12},
    {"part_code": "GLS-IP14-35", "part_name": "Mặt kính lưng phủ nhám iPhone 14 Plus", "category": "Vỏ & Kính", "price": 550000.0, "min_threshold": 10},
    {"part_code": "IC-PWR-IP14-36", "part_name": "IC Quản lý nguồn PMIC iPhone 14 Pro", "category": "Bo mạch & Cảm biến", "price": 780000.0, "min_threshold": 10},
    {"part_code": "IC-CHG-SS23-37", "part_name": "IC Điều khiển sạc nhanh Qualcomm Galaxy S23", "category": "Bo mạch & Cảm biến", "price": 590000.0, "min_threshold": 10},
    {"part_code": "SCR-MAC-M1-38", "part_name": "Cụm Màn hình Retina True Tone MacBook Air M1 13 inch", "category": "Màn hình", "price": 6800000.0, "min_threshold": 4},
    {"part_code": "BAT-MAC-M1-39", "part_name": "Pin Li-Po MacBook Air M1 (49.9Wh)", "category": "Pin & Nguồn", "price": 1850000.0, "min_threshold": 5},
    {"part_code": "KBD-MAC-M1-40", "part_name": "Bàn phím Magic Keyboard cơ chế cắt kéo MacBook Air M1", "category": "Linh kiện cơ học", "price": 1450000.0, "min_threshold": 5}
]

NEW_STOCKS_Q1 = [
    ("SCR-IP15PM-08", 18),
    ("BAT-IP15-09", 25),
    ("CAM-SS24U-10", 5),
    ("CHR-IP15-11", 14),
    ("SCR-IP13-12", 22),
    ("BAT-IP14-13", 21),
    ("CAM-IP15PM-14", 4),
    ("GLS-IP15PM-15", 16),
    ("SPK-SS23-16", 15),
    ("MIC-IP14-17", 28),
    ("SCR-XIA-14-18", 10),
    ("BAT-XIA-14-19", 19),
    ("FCD-IP14-20", 5),
    ("TAP-IP14-21", 18),
    ("CHR-SS23-22", 17),
    ("ANT-IP15-23", 24),
    ("SCR-IPAD-M2-24", 7),
    ("BAT-IPAD-M2-25", 8),
    ("CAM-IPAD-M2-26", 3),
    ("PWR-IP14-27", 32),
    ("GLS-SS24U-28", 12),
    ("SIM-IP14-29", 45),
    ("WCH-IP15-30", 14),
    ("SCR-IP12-31", 16),
    ("BAT-IP12-32", 26),
    ("CAM-IP13-33", 9),
    ("SPK-IP13-34", 20),
    ("GLS-IP14-35", 15),
    ("IC-PWR-IP14-36", 4),
    ("IC-CHG-SS23-37", 12),
    ("SCR-MAC-M1-38", 6),
    ("BAT-MAC-M1-39", 5),
    ("KBD-MAC-M1-40", 8)
]

def update_seed_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    existing_codes = {p["part_code"] for p in data.get("part", [])}
    added_parts = 0
    for p in NEW_PARTS:
        if p["part_code"] not in existing_codes:
            data.setdefault("part", []).append(p)
            added_parts += 1

    existing_stocks = {(s["center_id"], s["part_code"]) for s in data.get("part_stock", [])}
    for code, qty in NEW_STOCKS_Q1:
        if ("L5-WH-890", code) not in existing_stocks:
            data.setdefault("part_stock", []).append({
                "center_id": "L5-WH-890",
                "part_code": code,
                "quantity": qty,
                "version": 1
            })
        if ("L5-WH-102", code) not in existing_stocks:
            data.setdefault("part_stock", []).append({
                "center_id": "L5-WH-102",
                "part_code": code,
                "quantity": max(5, qty + 8),
                "version": 1
            })

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Updated {file_path}: Total parts={len(data['part'])}, Total stock records={len(data['part_stock'])}")

def sync_to_mongodb():
    try:
        from src.repositories import inventory_repository
        if inventory_repository.is_connected and inventory_repository.db is not None:
            for p in NEW_PARTS:
                doc = {k: v for k, v in p.items() if k != "_id"}
                inventory_repository.db.part.update_one(
                    {"part_code": p["part_code"]},
                    {"$set": doc},
                    upsert=True
                )
            for code, qty in NEW_STOCKS_Q1:
                inventory_repository.db.part_stock.update_one(
                    {"center_id": "L5-WH-890", "part_code": code},
                    {"$setOnInsert": {"center_id": "L5-WH-890", "part_code": code, "quantity": qty, "version": 1}},
                    upsert=True
                )
                inventory_repository.db.part_stock.update_one(
                    {"center_id": "L5-WH-102", "part_code": code},
                    {"$setOnInsert": {"center_id": "L5-WH-102", "part_code": code, "quantity": max(5, qty + 8), "version": 1}},
                    upsert=True
                )
            cnt = inventory_repository.db.part.count_documents({})
            print(f"[MongoDB Atlas] Sync complete! Total parts in MongoDB: {cnt}")
        else:
            print("[MongoDB Atlas] Offline or In-Memory fallback mode.")
    except Exception as e:
        print(f"[MongoDB Atlas Error] {e}")

if __name__ == "__main__":
    import sys
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if base_dir not in sys.path:
        sys.path.insert(0, base_dir)
    update_seed_file(os.path.join(base_dir, "seeds", "001_seed_parts_demo.json"))
    update_seed_file(os.path.join(base_dir, "backend", "seeds", "001_seed_parts_demo.json"))
    sync_to_mongodb()
