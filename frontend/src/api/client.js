/**
 * File: frontend/src/api/client.js
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
 * Mục đích: Lớp gọi API cơ sở - Một chỗ duy nhất biết về HTTP (theo Slide 9).
 * Quy tắc: Không gọi fetch rải rác trong component; mọi request đều đi qua lớp này.
 */

const BASE = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;  // Mã trạng thái HTTP (400, 403, 409, 422,...)
    this.code = code;      // Mã lỗi định danh nghiệp vụ do Backend trả về
  }
}

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.error_code || "ERR_HTTP",
      data.message || `Lỗi yêu cầu HTTP ${res.status}`
    );
  }

  return data;
}
