/**
 * File: frontend/src/api/inventory.api.js
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
 * Mục đích: Đóng gói các hàm gọi API nghiệp vụ Kho theo đúng Hợp đồng docs/api-contract.md.
 */

import { request } from "./client";

/**
 * Tra cứu tồn kho linh kiện real-time (API 1: GET /inventory/stock/{part_code})
 */
export async function getStockByPartCode(partCode) {
  return request(`/inventory/stock/${partCode}`);
}

/**
 * Ghi nhận giao dịch kho Xuất/Nhập/Hoàn (API 2: POST /inventory/transactions)
 */
export async function createTransaction(payload) {
  return request("/inventory/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Thiết lập ngưỡng an toàn cho Quản lý kho (API 3: PUT /inventory/parts/{part_code}/threshold)
 */
export async function updateThreshold(partCode, minThreshold) {
  return request(`/inventory/parts/${partCode}/threshold`, {
    method: "PUT",
    body: JSON.stringify({ min_threshold: minThreshold }),
  });
}

/**
 * Lấy toàn bộ danh sách tồn kho tại chi nhánh
 */
export async function getAllStocks() {
  return request("/inventory/stock");
}

/**
 * Lấy danh sách linh kiện chạm ngưỡng an toàn (FR-07)
 */
export async function getLowStockAlerts() {
  return request("/inventory/alerts");
}

/**
 * Lấy nhật ký giao dịch đối soát (FR-05)
 */
export async function getTransactionHistory(limit = 50) {
  return request(`/inventory/transactions?limit=${limit}`);
}

/**
 * Đăng nhập hệ thống theo vai trò
 */
export async function loginUser(email, password = "password123") {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
