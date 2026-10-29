/**
 * File: frontend/src/components/DataState.jsx
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
 * Mục đích: Thành phần hiển thị 3 trạng thái dữ liệu chuẩn theo Slide 9:
 *   1. Đang tải (isLoading)
 *   2. Có lỗi (error)
 *   3. Dữ liệu rỗng (isEmpty)
 */

import React from "react";

export function DataState({ isLoading, error, isEmpty, emptyMessage = "Không có dữ liệu.", onRetry, children }) {
  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center bg-white border border-gray-200 rounded text-xs text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
        <span>Đang đồng bộ dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-900 text-xs flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold">
          <span>Đã xảy ra lỗi:</span>
          <span>{error.message || String(error)}</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="self-start px-2.5 py-1 bg-red-600 text-white rounded text-[11px] font-semibold hover:bg-red-700"
          >
            Thử lại
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="p-8 text-center bg-white border border-gray-200 rounded text-xs text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return <>{children}</>;
}
