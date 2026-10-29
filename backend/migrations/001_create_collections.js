/**
 * File: migrations/001_create_collections.js
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
 * Database: inventory_db
 * Mục đích: Khởi tạo 6 Collections NoSQL với quy tắc kiểm thực cấu trúc (JSON Schema Validation).
 * Đáp ứng các quy tắc nghiệp vụ:
 *   - BR-01: Chống tồn kho âm (part_stock.quantity >= 0)
 *   - BR-02: Bắt buộc mã phiếu bảo hành hợp lệ
 *   - BR-03: Bất biến lịch sử giao dịch (part_transaction)
 *   - Phân quyền tài khoản 3 vai trò (users: MANAGER, MATERIAL_STAFF, TECH_STAFF)
 */

const dbName = "inventory_db";
const targetDb = db.getSiblingDB(dbName);

print(`[Migration 001] Đang khởi tạo CSDL: ${dbName}...`);

// ==========================================
// 1. COLLECTION: service_center (Trung tâm bảo hành - Phục vụ BR-04 Center Isolation)
// ==========================================
if (!targetDb.getCollectionNames().includes("service_center")) {
  targetDb.createCollection("service_center", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["center_id", "center_name"],
        properties: {
          center_id: {
            bsonType: "string",
            description: "Mã định danh duy nhất của trung tâm (Khóa chính)"
          },
          center_name: {
            bsonType: "string",
            description: "Tên chi nhánh/trung tâm bảo hành"
          },
          address: {
            bsonType: "string",
            description: "Địa chỉ thực tế của chi nhánh"
          },
          phone: {
            bsonType: "string",
            description: "Số điện thoại hotline chi nhánh"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: service_center");
} else {
  print("-> Collection service_center đã tồn tại, bỏ qua tạo mới.");
}

// ==========================================
// 2. COLLECTION: part (Danh mục linh kiện gốc & Ngưỡng an toàn BR-05)
// ==========================================
if (!targetDb.getCollectionNames().includes("part")) {
  targetDb.createCollection("part", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["part_code", "part_name", "price", "min_threshold"],
        properties: {
          part_code: {
            bsonType: "string",
            description: "Mã linh kiện duy nhất (Khóa chính) - VD: SCR-IP14-01"
          },
          part_name: {
            bsonType: "string",
            description: "Tên mô tả linh kiện phụ tùng"
          },
          category: {
            bsonType: "string",
            description: "Phân loại linh kiện (Màn hình, Pin, Camera, Mainboard,...)"
          },
          price: {
            bsonType: ["double", "int", "long"],
            minimum: 0,
            description: "Đơn giá linh kiện, bắt buộc >= 0"
          },
          min_threshold: {
            bsonType: "int",
            minimum: 0,
            description: "Ngưỡng tồn kho an toàn tối thiểu (BR-05 / FR-06)"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: part");
} else {
  print("-> Collection part đã tồn tại, bỏ qua tạo mới.");
}

// ==========================================
// 3. COLLECTION: ticket (Phiếu bảo hành liên kết từ phân hệ Lễ tân - Phục vụ BR-02)
// ==========================================
if (!targetDb.getCollectionNames().includes("ticket")) {
  targetDb.createCollection("ticket", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["ticket_id", "status"],
        properties: {
          ticket_id: {
            bsonType: "string",
            description: "Mã phiếu bảo hành tiếp nhận sửa chữa (VD: TK-1092, TK-2026-8892)"
          },
          status: {
            enum: ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
            description: "Trạng thái phiếu bảo hành"
          },
          device_name: {
            bsonType: "string",
            description: "Tên dòng máy sửa chữa (iPhone 14 Pro Max, Galaxy S23,...)"
          },
          customer_name: {
            bsonType: "string",
            description: "Tên khách hàng bảo hành"
          },
          reported_issue: {
            bsonType: "string",
            description: "Mô tả sự cố thiết bị"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: ticket");
} else {
  print("-> Collection ticket đã tồn tại, bỏ qua tạo mới.");
}

// ==========================================
// 4. COLLECTION: part_stock (Tồn kho vật lý theo từng chi nhánh - Phục vụ BR-01 & NFR-03)
// ==========================================
if (!targetDb.getCollectionNames().includes("part_stock")) {
  targetDb.createCollection("part_stock", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["center_id", "part_code", "quantity", "version"],
        properties: {
          center_id: {
            bsonType: "string",
            description: "Mã trung tâm nắm giữ hàng tồn (Tham chiếu service_center.center_id)"
          },
          part_code: {
            bsonType: "string",
            description: "Mã linh kiện tồn kho (Tham chiếu part.part_code)"
          },
          quantity: {
            bsonType: "int",
            minimum: 0,
            description: "Số lượng tồn kho thực tế, BẮT BUỘC >= 0 (Chặn tồn kho âm BR-01)"
          },
          version: {
            bsonType: "int",
            minimum: 0,
            description: "Phiên bản document phục vụ Optimistic Locking chống xung đột xuất kho đồng thời (NFR-03 / EX-05)"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: part_stock");
} else {
  print("-> Collection part_stock đã tồn tại, bỏ qua tạo mới.");
}

// ==========================================
// 5. COLLECTION: part_transaction (Nhật ký giao dịch bất biến - Sổ cái lưu vết BR-03)
// ==========================================
if (!targetDb.getCollectionNames().includes("part_transaction")) {
  targetDb.createCollection("part_transaction", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["transaction_id", "center_id", "part_code", "type", "quantity", "created_by", "created_at"],
        properties: {
          transaction_id: {
            bsonType: ["long", "int", "string"],
            description: "Mã định danh giao dịch duy nhất"
          },
          center_id: {
            bsonType: "string",
            description: "Mã trung tâm thực hiện biến động kho"
          },
          part_code: {
            bsonType: "string",
            description: "Mã linh kiện xuất/nhập/hoàn"
          },
          type: {
            enum: ["IN", "OUT", "RETURN"],
            description: "Loại giao dịch: Nhập (IN), Xuất sửa (OUT), Hoàn trả (RETURN)"
          },
          quantity: {
            bsonType: "int",
            minimum: 1,
            description: "Số lượng linh kiện biến động, BẮT BUỘC >= 1"
          },
          ticket_id: {
            bsonType: ["string", "null"],
            description: "Mã phiếu bảo hành bắt buộc khi OUT và RETURN (BR-02)"
          },
          created_by: {
            bsonType: "string",
            description: "Tài khoản thực hiện thao tác"
          },
          created_at: {
            bsonType: "date",
            description: "Thời điểm ghi nhận giao dịch (bất biến, không thể sửa/xóa)"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: part_transaction");
} else {
  print("-> Collection part_transaction đã tồn tại, bỏ qua tạo mới.");
}

// ==========================================
// 6. COLLECTION: users (Quản lý tài khoản và phân quyền 3 vai trò)
// ==========================================
if (!targetDb.getCollectionNames().includes("users")) {
  targetDb.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "password_hash", "full_name", "role", "is_active"],
        properties: {
          email: {
            bsonType: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            description: "Địa chỉ email nội bộ dùng để đăng nhập (Khóa định danh độc nhất)"
          },
          password_hash: {
            bsonType: "string",
            description: "Chuỗi mã hóa mật khẩu bằng thuật toán Bcrypt"
          },
          full_name: {
            bsonType: "string",
            description: "Họ và tên đầy đủ của nhân sự"
          },
          role: {
            enum: ["MANAGER", "MATERIAL_STAFF", "TECH_STAFF"],
            description: "Vai trò phân quyền trong Luồng 5: Quản lý kho, Nhân viên vật tư, Nhân viên kỹ thuật"
          },
          center_id: {
            bsonType: "string",
            description: "Mã trung tâm nhân sự đang trực thuộc (BR-04 Phân mảnh khu vực)"
          },
          is_verified: {
            bsonType: "bool",
            description: "Trạng thái xác thực email/tài khoản"
          },
          otp_code: {
            bsonType: ["string", "null"],
            description: "Mã OTP 6 số dùng để đặt lại mật khẩu hoặc xác minh"
          },
          otp_expires_at: {
            bsonType: ["date", "null"],
            description: "Thời điểm hết hạn của OTP"
          },
          is_active: {
            bsonType: "bool",
            description: "Trạng thái tài khoản (true: đang hoạt động, false: bị khóa)"
          }
        }
      }
    }
  });
  print("-> Đã tạo collection: users");
} else {
  print("-> Collection users đã tồn tại, bỏ qua tạo mới.");
}

print("[Migration 001] Hoàn thành khởi tạo toàn bộ 6 collections thành công!");
