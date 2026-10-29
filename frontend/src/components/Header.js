/**
 * File: frontend/src/components/Header.js
 * Header phân hệ L5 - Đã loại bỏ hoàn toàn Role Switcher
 * Icon tài khoản hiển thị Dropdown Popover thông tin cá nhân và nút Đăng xuất
 */

import React, { useState } from 'react';

export default function Header({ user, onLogout, onChangeAccount }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const roleLabels = {
    TECH_STAFF: 'Nhân viên Kỹ thuật',
    MATERIAL_STAFF: 'Nhân viên Vật tư',
    MANAGER: 'Quản lý Kho'
  };

  const roleColors = {
    TECH_STAFF: 'bg-emerald-100 text-emerald-800',
    MATERIAL_STAFF: 'bg-blue-100 text-blue-800',
    MANAGER: 'bg-amber-100 text-amber-800'
  };

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
      {/* Logo & Trung tâm */}
      {/* Logo & Trung tâm */}
      <div className="flex items-center gap-3 select-none">
        <div className="w-10 h-10 bg-gradient-to-br from-zinc-900 via-neutral-800 to-black text-white rounded-xl flex items-center justify-center font-black text-lg tracking-wider shadow-md border border-white/20">
          L5
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-sm sm:text-base uppercase tracking-tight text-primary">SMART CRM — MEKONG MOBILE</span>
          <span className="text-xs text-on-surface-variant font-medium">Chi nhánh: <strong className="text-primary font-bold">Quận 1</strong></span>
        </div>
      </div>

      {/* Profile & Dropdown (Không còn thanh chuyển đổi vai trò) */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-container transition-colors focus:outline-none"
        >
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-xs font-bold text-primary">{user.full_name || 'Nhân sự'}</span>
            <span className="text-[11px] font-semibold text-emerald-700">
              {roleLabels[user.role] || user.role}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl z-50 p-4">
            <div className="flex items-center gap-3 pb-3 border-b border-surface-container">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
                {(user.full_name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-primary truncate">{user.full_name}</span>
                <span className="text-[11px] text-on-surface-variant truncate">{user.email}</span>
              </div>
            </div>

            <div className="py-2.5 flex flex-col gap-1.5 text-xs border-b border-surface-container">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Vai trò:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                  {user.role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Chi nhánh:</span>
                <span className="font-semibold text-primary">{user.center_id || 'L5-WH-890'}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-1">
              <button
                onClick={() => { setShowDropdown(false); onChangeAccount(); }}
                className="w-full text-left px-2 py-1.5 text-xs text-on-surface-variant hover:text-primary rounded hover:bg-surface-container"
              >
                Đăng nhập tài khoản khác
              </button>
              <button
                onClick={() => { setShowDropdown(false); onLogout(); }}
                className="w-full text-left px-2 py-1.5 text-xs text-error font-semibold rounded hover:bg-error-container/40"
              >
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
