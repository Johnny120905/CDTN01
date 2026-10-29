/**
 * File: frontend/src/components/Footer.js
 * Footer chân trang dùng chung cho cả 3 vai trò (Kỹ thuật, Vật tư, Quản lý kho)
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant mt-auto">
      <div className="flex items-center gap-2">
        <span className="font-bold text-primary">© 2026 MEKONG MOBILE</span>
        <span>•</span>
        <span>Smart CRM — Luồng 05: Quản lý Kho linh kiện thay thế</span>
      </div>
      <div className="flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
          Trực tuyến 24/7
        </span>
        <span>Hotline: <strong className="text-primary font-bold">1800 6868</strong></span>
        <span>Kho: <strong className="text-primary font-semibold">L5-WH-890</strong></span>
      </div>
    </footer>
  );
}
