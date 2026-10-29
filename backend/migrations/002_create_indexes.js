/**
 * File: migrations/002_create_indexes.js
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
 * Database: inventory_db
 * Mục đích: Thiết lập hệ thống chỉ mục (Indexes) nhằm tối ưu hiệu năng:
 *   - NFR-02: Đạt thời gian phản hồi API tra cứu < 500ms với 10.000 bản ghi.
 *   - Đảm bảo tính toàn vẹn duy nhất (Unique constraints).
 */

const dbName = "inventory_db";
const targetDb = db.getSiblingDB(dbName);

print(`[Migration 002] Đang thiết lập hệ thống Indexes cho CSDL: ${dbName}...`);

// 1. Chỉ mục Unique cho service_center
targetDb.service_center.createIndex({ center_id: 1 }, { unique: true, name: "idx_center_id_unique" });
print("-> Đã tạo Unique Index cho service_center.center_id");

// 2. Chỉ mục Unique cho part
targetDb.part.createIndex({ part_code: 1 }, { unique: true, name: "idx_part_code_unique" });
print("-> Đã tạo Unique Index cho part.part_code");

// 3. Chỉ mục Unique cho ticket
targetDb.ticket.createIndex({ ticket_id: 1 }, { unique: true, name: "idx_ticket_id_unique" });
print("-> Đã tạo Unique Index cho ticket.ticket_id");

// 4. Compound Unique Index cho part_stock: { center_id: 1, part_code: 1 }
// Đáp ứng NFR-02: Tra cứu tức thì số lượng tồn kho theo linh kiện tại trung tâm chỉ định < 500ms
targetDb.part_stock.createIndex(
  { center_id: 1, part_code: 1 },
  { unique: true, name: "idx_stock_lookup" }
);
print("-> Đã tạo Compound Unique Index: idx_stock_lookup trên part_stock (center_id, part_code)");

// 5. Compound Index cho part_transaction: { center_id: 1, created_at: -1 }
// Tối ưu hóa truy vấn Nhật ký giao dịch (Audit Log) theo dòng thời gian mới nhất (FR-05)
targetDb.part_transaction.createIndex(
  { center_id: 1, created_at: -1 },
  { name: "idx_transaction_history" }
);
print("-> Đã tạo Compound Index: idx_transaction_history trên part_transaction (center_id, created_at)");

// 6. Chỉ mục trên users: email_1 (Unique)
targetDb.users.createIndex(
  { email: 1 },
  { unique: true, name: "email_1" }
);
print("-> Đã tạo Unique Index: email_1 trên users.email");

print("[Migration 002] Hoàn thành thiết lập toàn bộ hệ thống Indexes thành công!");
