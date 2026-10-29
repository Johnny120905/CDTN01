/**
 * File: frontend/src/App.js
 * Root Component điều phối giao diện phân quyền 3 vai trò và Auth Portal
 * Luồng 05: Quản lý Kho linh kiện thay thế - Mekong Mobile
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPortal from './pages/AuthPortal';
import ManagerUsers from './pages/ManagerUsers';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('mekong_l5_token');
    const savedUser = localStorage.getItem('mekong_l5_user');
    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser({ ...user, token: savedToken });
      } catch (e) {
        setShowAuthModal(true);
      }
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    setCurrentUser({ ...user, token });
    setShowAuthModal(false);
    localStorage.setItem('mekong_l5_token', token);
    localStorage.setItem('mekong_l5_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('mekong_l5_token');
    localStorage.removeItem('mekong_l5_user');
    setCurrentUser(null);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface">
      {currentUser && (
        <Header
          user={currentUser}
          onLogout={handleLogout}
          onChangeAccount={() => setShowAuthModal(true)}
        />
      )}

      <main className="flex-1 p-6 md:p-8">
        {!currentUser && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-xl font-bold text-primary mb-2">Hệ thống Quản lý Kho Linh kiện L5</h2>
            <p className="text-xs text-on-surface-variant mb-4">Vui lòng đăng nhập hoặc đăng ký cấp quyền để vào giao diện theo đúng vai trò chuyên môn.</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Mở cổng xác thực
            </button>
          </div>
        )}

        {currentUser && (
          <div className="w-full flex flex-col gap-6">
            {/* Phân hệ Quản lý kho */}
            {currentUser.role === 'MANAGER' && (
              <div>
                {activeTab === 'users' && <ManagerUsers user={currentUser} />}
                {activeTab === 'dashboard' && (
                  <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-primary">Dashboard Quản lý Kho</h1>
                    <p className="text-xs text-on-surface-variant">Tổng quan hoạt động điều hành và xuất nhập tồn linh kiện.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab('users')}
                        className="px-3 py-1.5 bg-primary text-on-primary rounded text-xs font-semibold"
                      >
                        Chuyển sang Quản lý nhân sự cấp dưới
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Phân hệ Nhân viên vật tư */}
            {currentUser.role === 'MATERIAL_STAFF' && (
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-primary">Phân hệ Quản lý Vật tư Kho</h1>
                <p className="text-xs text-on-surface-variant">Thực hiện nhập kho linh kiện từ nhà cung cấp và theo dõi số lượng tồn.</p>
              </div>
            )}

            {/* Phân hệ Nhân viên kỹ thuật */}
            {currentUser.role === 'TECH_STAFF' && (
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-primary">Bàn làm việc Kỹ thuật viên</h1>
                <p className="text-xs text-on-surface-variant">Tra cứu linh kiện thay thế và lập phiếu xuất bảo hành đính kèm Ticket.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Auth Modal khi chưa đăng nhập hoặc bấm đổi tài khoản */}
      {showAuthModal && (
        <AuthPortal
          onSuccess={handleLoginSuccess}
          onClose={() => currentUser && setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
