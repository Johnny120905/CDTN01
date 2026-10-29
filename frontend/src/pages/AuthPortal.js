/**
 * File: frontend/src/pages/AuthPortal.js
 * Cổng Xác thực & Cấp quyền:
 *   1. Đăng ký cấp quyền: Họ tên, Email thật, Mật khẩu >= 8 ký tự, Role cố định.
 *   2. Đăng nhập: Email, Mật khẩu.
 *   3. Khôi phục mật khẩu: Gửi OTP 6 số qua email, nhập OTP và mật khẩu mới >= 8 ký tự.
 */

import React, { useState } from 'react';

const API_BASE = window.location.port === "8000" ? "/api/v1" : "http://localhost:8000/api/v1";

export default function AuthPortal({ onSuccess, onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [otpDemo, setOtpDemo] = useState('');

  // State Đăng nhập (Mặc định để trống, yêu cầu nhập thông tin thật)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State Đăng ký
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('TECH_STAFF');

  // State Khôi phục mật khẩu
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại.');
      onSuccess(data.user, data.token);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const validatePassword = (pwd) => {
    if (!pwd || pwd.length < 8) return 'Mật khẩu bắt buộc có tối thiểu 8 ký tự.';
    if (!/[A-Z]/.test(pwd)) return 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z).';
    if (!/[a-z]/.test(pwd)) return 'Mật khẩu phải chứa ít nhất 1 chữ in thường (a-z).';
    if (!/\d/.test(pwd)) return 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9).';
    if (!/[!@#$%^&*(),.?":{}|<>_~`\-+=\[\]\\;/]/.test(pwd)) return 'Mật khẩu phải chứa ít nhất 1 ký hiệu đặc biệt (!@#$%^&*...).';
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const pwdErr = validatePassword(regPassword);
    if (pwdErr) {
      setErrorMsg(`${pwdErr} Vui lòng đặt lại mật khẩu!`);
      setRegPassword('');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: regFullName,
          email: regEmail,
          password: regPassword,
          role: regRole,
          center_id: 'L5-WH-890'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại.');
      onSuccess(data.user, data.token);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleRequestOTP = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!forgotEmail) {
      setErrorMsg('Vui lòng nhập email cá nhân cần khôi phục.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Không thể gửi mã OTP.');
      setOtpDemo(data.otp_demo);
      setResetOtp(data.otp_demo || '');
      setSuccessMsg(data.message || 'Mã xác thực OTP đã được gửi về email của bạn!');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!resetOtp || resetOtp.length !== 6) {
      setErrorMsg('Mã OTP phải có đúng 6 chữ số.');
      return;
    }
    const pwdErr = validatePassword(resetNewPassword);
    if (pwdErr) {
      setErrorMsg(`${pwdErr} Vui lòng đặt lại mật khẩu mới!`);
      setResetNewPassword('');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          otp: resetOtp,
          new_password: resetNewPassword
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Khôi phục mật khẩu thất bại.');
      setSuccessMsg('Đổi mật khẩu thành công! Vui lòng đăng nhập.');
      setActiveTab('login');
      setLoginEmail(forgotEmail);
      setLoginPassword(resetNewPassword);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-lg p-6 rounded-lg shadow-2xl flex flex-col gap-4">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              L5
            </div>
            <div>
              <h3 className="text-base font-bold text-primary">Cổng Xác Thực & Cấp Quyền Kho L5</h3>
              <p className="text-[11px] text-on-surface-variant">Smart CRM — Mekong Mobile</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Thông báo lỗi / thành công */}
        {errorMsg && (
          <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            {successMsg}
          </div>
        )}

        {/* Thanh Tabs */}
        <div className="flex border-b border-outline-variant">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'login' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'register' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
            }`}
          >
            Đăng ký cấp quyền
          </button>
          <button
            onClick={() => { setActiveTab('forgot'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'forgot' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
            }`}
          >
            Khôi phục mật khẩu
          </button>
        </div>

        {/* TAB 1: ĐĂNG NHẬP */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Email cá nhân</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Mật khẩu</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full h-9 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-2"
            >
              Đăng nhập hệ thống
            </button>
          </form>
        )}

        {/* TAB 2: ĐĂNG KÝ CẤP QUYỀN */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Họ và tên cá nhân *</label>
              <input
                type="text"
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Email cá nhân (Email thật) *</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="user@example.com"
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Mật khẩu cá nhân (Tối thiểu 8 ký tự) *</label>
              <input
                type="password"
                minLength={8}
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Ít nhất 8 ký tự"
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Cấp quyền vai trò chuyên môn *</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary font-medium"
              >
                <option value="TECH_STAFF">Nhân viên kỹ thuật (Xuất/trả linh kiện & Tra cứu)</option>
                <option value="MATERIAL_STAFF">Nhân viên vật tư (Nhập kho hàng mới & Nguồn cung)</option>
                <option value="MANAGER">Quản lý kho (Toàn quyền quản trị & Nhân sự)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full h-9 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-2"
            >
              Đăng ký và Truy cập vai trò
            </button>
          </form>
        )}

        {/* TAB 3: KHÔI PHỤC MẬT KHẨU OTP */}
        {activeTab === 'forgot' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">1. Nhập email cá nhân cần khôi phục</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="flex-1 h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  className="px-3 h-9 bg-primary text-on-primary text-xs font-bold rounded hover:bg-neutral-800 shrink-0"
                >
                  Gửi OTP
                </button>
              </div>
            </div>

            {otpDemo && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800">
                Mã OTP xác thực: <strong className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-emerald-400">{otpDemo}</strong> (Hiệu lực: 15 phút)
              </div>
            )}

            <form onSubmit={handleResetPassword} className="flex flex-col gap-3 pt-2 border-t border-outline-variant">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">2. Nhập mã OTP (6 số) *</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value)}
                  className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary font-mono tracking-widest text-center font-bold"
                  placeholder="• • • • • •"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">3. Mật khẩu mới (Tối thiểu 8 ký tự) *</label>
                <input
                  type="password"
                  minLength={8}
                  required
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  className="h-9 px-3 text-xs border border-outline-variant rounded focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full h-9 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-1"
              >
                Xác nhận đổi mật khẩu
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
