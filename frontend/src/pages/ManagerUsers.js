/**
 * File: frontend/src/pages/ManagerUsers.js
 * Giao diện Quản lý Nhân sự Cấp dưới dành riêng cho Quản lý kho:
 *   - Chỉ hiển thị: Nhân viên kỹ thuật (TECH_STAFF) và Nhân viên vật tư (MATERIAL_STAFF)
 *   - Bắt buộc có: Xem nhân sự, Tải file xuống (Xuất Excel/CSV), Tải file lên (Import), và In ấn / PDF.
 */

import React, { useState, useEffect } from 'react';

const API_BASE = window.location.port === "8000" ? "/api/v1" : "http://localhost:8000/api/v1";

export default function ManagerUsers({ user }) {
  const [subordinates, setSubordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const fetchSubordinates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/inventory/users/subordinates`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const data = await res.json();
      setSubordinates(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubordinates();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Xuất file CSV / Excel
  const exportCSV = () => {
    if (subordinates.length === 0) return;
    let csv = "\uFEFF"; // UTF-8 BOM cho Excel
    csv += "HỌ VÀ TÊN,EMAIL CÁ NHÂN,VAI TRÒ CẤP DƯỚI,TRUNG TÂM,TRẠNG THÁI\r\n";
    subordinates.forEach(u => {
      const roleStr = u.role === 'TECH_STAFF' ? 'Nhân viên Kỹ thuật' : 'Nhân viên Vật tư';
      csv += `"${u.full_name}","${u.email}","${roleStr}","${u.center_id || 'L5-WH-890'}","Đang hoạt động"\r\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `DanhSach_NhanSu_CapDuoi_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    showToast("Đã tải xuống danh sách nhân sự cấp dưới dạng Excel/CSV!");
  };

  // Import file CSV / JSON
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        let usersToImport = [];

        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(text);
          usersToImport = Array.isArray(parsed) ? parsed : (parsed.users || []);
        } else {
          // Parse CSV
          const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
            if (parts.length >= 3) {
              usersToImport.push({
                full_name: parts[0],
                email: parts[1],
                role: parts[2].includes('Kỹ thuật') || parts[2] === 'TECH_STAFF' ? 'TECH_STAFF' : 'MATERIAL_STAFF',
                center_id: parts[3] || 'L5-WH-890'
              });
            }
          }
        }

        const res = await fetch(`${API_BASE}/inventory/users/import`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(usersToImport)
        });
        const resData = await res.json();
        showToast(resData.message || `Đã import thành công ${resData.imported_count} nhân sự!`);
        fetchSubordinates();
      } catch (err) {
        showToast(`Lỗi nạp file: ${err.message}`);
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="flex flex-col gap-5">
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 p-3 rounded bg-emerald-700 text-white text-xs font-semibold shadow-lg">
          {toastMsg}
        </div>
      )}

      {/* Header & Thao tác */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary mt-1">Danh sách Nhân sự cấp dưới</h1>
          <p className="text-xs text-on-surface-variant">Chỉ hiển thị và quản lý <strong>Nhân viên kỹ thuật</strong> và <strong>Nhân viên vật tư</strong> trực thuộc kho.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút Import File */}
          <label className="px-3 py-1.5 bg-primary text-on-primary rounded text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            <span>Nhập file Nhân sự</span>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Nút Xuất Excel */}
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container rounded text-xs font-semibold flex items-center gap-1.5 text-primary shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-700">table_view</span>
            <span>Xuất Excel (.csv)</span>
          </button>

          {/* Nút In ấn / Xuất PDF */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container rounded text-xs font-semibold flex items-center gap-1.5 text-primary shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>In / PDF</span>
          </button>

          <button
            onClick={fetchSubordinates}
            className="px-3 py-1.5 border border-outline-variant rounded text-xs font-semibold hover:bg-surface-container flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Bảng Danh sách Nhân sự cấp dưới */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-on-surface-variant">Đang tải danh sách nhân sự...</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-secondary uppercase font-bold">
                <th className="py-3 px-4">HỌ VÀ TÊN</th>
                <th className="py-3 px-4">EMAIL CÁ NHÂN</th>
                <th className="py-3 px-4">VAI TRÒ CẤP DƯỚI</th>
                <th className="py-3 px-4">TRUNG TÂM</th>
                <th className="py-3 px-4">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {subordinates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">Chưa có nhân sự cấp dưới nào. Hãy bấm 'Nhập file Nhân sự' để tải dữ liệu.</td>
                </tr>
              ) : subordinates.map(u => (
                <tr key={u._id || u.email} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-4 font-bold text-primary flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-bold text-xs text-primary">
                      {(u.full_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span>{u.full_name}</span>
                  </td>
                  <td className="py-3 px-4 text-secondary">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'TECH_STAFF' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role === 'TECH_STAFF' ? 'KỸ THUẬT VIÊN' : 'NHÂN VIÊN VẬT TƯ'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-secondary">{u.center_id || 'L5-WH-890'}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Đang hoạt động
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
