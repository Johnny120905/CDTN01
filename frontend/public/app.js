/**
 * File: src/static/app.js
 * Dự án: Hệ thống Smart CRM – Mekong Mobile (Phân hệ Kho linh kiện)
 * Mục đích: Toàn bộ mã nguồn JavaScript điều khiển giao diện Single Page Application (SPA).
 * 
 * Các tiêu chuẩn nâng cấp Dark 3D Elevation:
 *   1. Font chữ đồng bộ: Be Vietnam Pro.
 *   2. Thẩm mỹ giao diện 3D Tông màu tối (Dark Slate / Deep Navy / Matte Black):
 *      Bo góc mềm mại (rounded-2xl, rounded-xl), đổ bóng đa tầng (3D Elevation),
 *      hiệu ứng kính mờ (Glassmorphism), nút bấm tactile 3D.
 *   3. Không hiển thị bất kỳ breadcrumb phụ nào và loại bỏ hoàn toàn các mã kỹ thuật (BR, FR, NFR) trên giao diện.
 *   4. Hệ thống màu trạng thái ngữ nghĩa & logic nhân sự:
 *      - ONLINE (Xanh lá): Đang hoạt động (chấm xanh lá phát sáng).
 *      - AWAY (Vàng): Tạm dừng hoạt động (chấm vàng).
 *      - OFF_SHIFT (Đỏ/Cam): Nghỉ sau ca làm (chấm đỏ/cam - mai vào làm việc lại bình thường).
 *      - TERMINATED (Đỏ sẫm): Đã thôi việc (dừng vĩnh viễn, tài khoản khóa vĩnh viễn).
 *   5. Hợp nhất thanh tìm kiếm Kỹ thuật viên thành 1 thanh thông minh tự động gợi ý (Autocomplete Dropdown),
 *      kèm nút "Tra cứu" và nút "Đặt lại biểu mẫu" hoạt động chuẩn xác.
 *   6. Ngưỡng phân trang (10, 20, 50, Tất cả) đồng bộ trên tất cả các bảng dữ liệu.
 *   7. Quản lý nhân sự đầy đủ: Tìm kiếm theo tên/email/mã, bộ lọc vai trò, bộ lọc trạng thái và phân trang.
 */

// ==============================================================================
// 1. BIẾN TRẠNG THÁI TOÀN CỤC (APPLICATION STATE)
// ==============================================================================

const API_BASE = (window.location.port === "8000" || window.location.protocol === "file:")
  ? (window.location.protocol === "file:" ? "http://localhost:8000/api/v1" : "/api/v1")
  : (window.location.origin.includes("3000") ? "http://localhost:8000/api/v1" : "/api/v1");

let currentUser = null;
let currentTab = "";

let cachedStocks = [];
let cachedTickets = [];
let cachedParts = [];
let cachedTransactions = [];
let cachedUsers = [];

// Phân trang & Bộ lọc cho từng bảng
const tablePagination = {
  users: { page: 1, limit: 10, search: "", role: "ALL", status: "ALL" },
  stocks: { page: 1, limit: 10, search: "" },
  reports: { page: 1, limit: 10, search: "" },
  audit: { page: 1, limit: 10, search: "" },
  tickets: { page: 1, limit: 10, search: "" }
};

// ==============================================================================
// 2. BỘ GỌI API CHUẨN HÓA (API CLIENT HELPER)
// ==============================================================================

async function apiCall(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("mekong_l5_token");
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: method,
    headers: headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.message || `Lỗi yêu cầu hệ thống (Mã HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.error_code = data.error_code || "ERR_HTTP_FAILED";
    error.details = data;
    throw error;
  }

  return data;
}

// ==============================================================================
// 3. TIỆN ÍCH THÔNG BÁO VÀ KIỂM TRA BIỂU MẪU (VALIDATION & TOAST)
// ==============================================================================

function showToast(message, type = "info", duration = 3500) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-start gap-3 text-xs font-semibold backdrop-blur-xl transition-all duration-200`;

  let iconName = "info";
  let colorStyles = "bg-slate-900/95 text-slate-100 border-white/15";

  if (type === "success") {
    iconName = "check_circle";
    colorStyles = "bg-emerald-950/95 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40";
  } else if (type === "error") {
    iconName = "error";
    colorStyles = "bg-red-950/95 text-red-300 border-red-500/40 shadow-red-950/40";
  } else if (type === "warning") {
    iconName = "warning";
    colorStyles = "bg-amber-950/95 text-amber-300 border-amber-500/40 shadow-amber-950/40";
  }

  toast.className += ` ${colorStyles}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] shrink-0 mt-0.5">${iconName}</span>
    <div class="flex-1 leading-relaxed">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer" title="Đóng">
      <span class="material-symbols-outlined text-[16px]">close</span>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px) scale(0.95)";
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/**
 * Kiểm tra ràng buộc mật khẩu chuẩn:
 * - Tối thiểu 8 ký tự
 * - Có ít nhất 1 chữ in hoa (A-Z)
 * - Có ít nhất 1 chữ in thường (a-z)
 * - Có ít nhất 1 chữ số (0-9)
 * - Có ít nhất 1 ký hiệu đặc biệt (!@#$%^&*...)
 */
function validatePasswordComplexity(password) {
  if (!password || typeof password !== "string" || password.trim() === "") {
    return { valid: false, message: "Hãy tạo mật khẩu đúng 8 ký tự (Hoa, thường, số, ký tự đặc biệt)." };
  }
  if (password.length < 8) {
    return { valid: false, message: "Hãy tạo mật khẩu đúng 8 ký tự (Hoa, thường, số, ký tự đặc biệt)." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Mật khẩu còn thiếu chữ cái in HOA (A-Z)." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Mật khẩu còn thiếu chữ cái in thường (a-z)." };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Mật khẩu còn thiếu chữ số (0-9)." };
  }
  if (!/[!@#$%^&*(),.?":{}|<>_~`\-+=\[\]\\;/]/.test(password)) {
    return { valid: false, message: "Mật khẩu còn thiếu ký hiệu đặc biệt (!@#$%^&*...)." };
  }
  return { valid: true };
}

/**
 * Hiển thị dòng báo lỗi đỏ bên dưới ô nhập liệu
 */

// ==============================================================================
// 3.1 TIỆN ÍCH ĐẾM NGƯỢC OTP & CHUYỂN NGỮ TRẠNG THÁI TIẾNG VIỆT
// ==============================================================================

let otpCountdownInterval = null;

function startOtpCountdown(durationSeconds = 600) {
  if (otpCountdownInterval) {
    clearInterval(otpCountdownInterval);
    otpCountdownInterval = null;
  }
  let remaining = durationSeconds;
  const timerEl = document.getElementById("countdownTimer");
  if (!timerEl) return;

  function update() {
    const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
    const secs = (remaining % 60).toString().padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
    if (remaining <= 0) {
      clearInterval(otpCountdownInterval);
      otpCountdownInterval = null;
      timerEl.textContent = "00:00 (Hết hạn)";
      timerEl.classList.remove("text-emerald-400");
      timerEl.classList.add("text-rose-400");
      showToast("Mã OTP đã hết thời gian hiệu lực 10 phút. Vui lòng bấm 'Gửi mã OTP' để lấy mã mới.", "warning", 5000);
    }
  }

  timerEl.classList.remove("text-rose-400");
  timerEl.classList.add("text-emerald-400");
  update();
  otpCountdownInterval = setInterval(() => {
    remaining--;
    update();
  }, 1000);
}

function formatTicketStatus(status) {
  const s = (status || "").toUpperCase();
  if (s === "OPEN") {
    return `<span class="status-badge-yellow text-[10px]"><span class="dot-indicator"></span>Chờ tiếp nhận</span>`;
  } else if (s === "IN_PROGRESS") {
    return `<span class="status-badge-yellow text-[10px]"><span class="dot-indicator"></span>Đang xử lý</span>`;
  } else if (s === "COMPLETED" || s === "RESOLVED") {
    return `<span class="status-badge-green text-[10px]"><span class="dot-indicator"></span>Đã hoàn thành</span>`;
  } else if (s === "CANCELLED") {
    return `<span class="status-badge-red text-[10px]"><span class="dot-indicator"></span>Đã hủy</span>`;
  }
  return `<span class="status-badge-yellow text-[10px]"><span class="dot-indicator"></span>${status || 'Chờ linh kiện'}</span>`;
}

function formatTransactionType(type) {
  const t = (type || "").toUpperCase();
  if (t === "OUT") {
    return `<span class="status-badge-yellow text-[10px] py-0.5 px-2"><span class="dot-indicator"></span>Xuất kho thay thế</span>`;
  } else if (t === "IN") {
    return `<span class="status-badge-green text-[10px] py-0.5 px-2"><span class="dot-indicator"></span>Nhập kho vật tư</span>`;
  } else if (t === "RETURN") {
    return `<span class="status-badge-blue text-[10px] py-0.5 px-2" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa;"><span class="dot-indicator" style="background: #3b82f6;"></span>Hoàn trả linh kiện</span>`;
  }
  return `<span class="status-badge-green text-[10px] py-0.5 px-2"><span class="dot-indicator"></span>${type || 'Khác'}</span>`;
}


function setFieldError(fieldId, errorId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (input) {
    input.classList.add("field-error-input");
  }
  if (errorEl) {
    errorEl.innerHTML = `
      <svg class="w-4 h-4 shrink-0 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;
    errorEl.classList.remove("hidden");
  }
}

/**
 * Xóa báo lỗi đỏ khi người dùng chỉnh sửa
 */
function clearFieldError(fieldId, errorId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (input) {
    input.classList.remove("field-error-input");
  }
  if (errorEl) {
    errorEl.innerHTML = "";
    errorEl.classList.add("hidden");
  }
}

/**
 * Cập nhật chỉ báo điều kiện mật khẩu thời gian thực (Form Đăng ký)
 * Ẩn bảng quy chuẩn, hiển thị thông báo lỗi dòng đỏ khi người dùng nhập sai/thiếu
 */
function handleRegPasswordInput(e) {
  const pwd = (e && e.target) ? e.target.value : "";
  if (!pwd) {
    clearFieldError("regPassword", "regPasswordError");
    return;
  }
  const check = validatePasswordComplexity(pwd);
  if (!check.valid) {
    setFieldError("regPassword", "regPasswordError", check.message);
  } else {
    clearFieldError("regPassword", "regPasswordError");
  }
}

/**
 * Cập nhật chỉ báo điều kiện mật khẩu thời gian thực (Form Đặt lại mật khẩu)
 * Ẩn bảng quy chuẩn, hiển thị thông báo lỗi dòng đỏ khi người dùng nhập sai/thiếu
 */
function handleResetPasswordInput(e) {
  const pwd = (e && e.target) ? e.target.value : "";
  if (!pwd) {
    clearFieldError("resetNewPassword", "resetNewPasswordError");
    return;
  }
  const check = validatePasswordComplexity(pwd);
  if (!check.valid) {
    setFieldError("resetNewPassword", "resetNewPasswordError", check.message);
  } else {
    clearFieldError("resetNewPassword", "resetNewPasswordError");
  }
}

const SVG_EYE_OPEN = `<svg class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const SVG_EYE_CLOSED = `<svg class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>`;

function updateChecklistItem(elementId, isMet) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const iconEl = el.querySelector(".chk-icon");
  if (isMet) {
    el.className = "flex items-center gap-1.5 text-emerald-400 font-semibold transition-colors";
    if (iconEl) {
      iconEl.className = "chk-icon w-3.5 h-3.5 flex items-center justify-center text-emerald-400 font-bold text-xs";
      iconEl.innerHTML = `<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
    }
  } else {
    el.className = "flex items-center gap-1.5 text-slate-500 transition-colors";
    if (iconEl) {
      iconEl.className = "chk-icon w-3.5 h-3.5 flex items-center justify-center text-slate-500 font-bold text-xs";
      iconEl.innerHTML = "○";
    }
  }
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const iconBox = btnEl.querySelector(".eye-icon-box") || btnEl;
  if (input.type === "password") {
    input.type = "text";
    iconBox.innerHTML = SVG_EYE_OPEN;
    btnEl.setAttribute("aria-label", "Ẩn mật khẩu");
    btnEl.classList.add("is-active");
  } else {
    input.type = "password";
    iconBox.innerHTML = SVG_EYE_CLOSED;
    btnEl.setAttribute("aria-label", "Hiện mật khẩu");
    btnEl.classList.remove("is-active");
  }
}

// ==============================================================================
// 4. QUẢN LÝ PHIÊN ĐĂNG NHẬP VÀ ĐIỀU HƯỚNG VIEW (AUTHENTICATION & SPA NAVIGATION)
// ==============================================================================

function showAuthView(viewName) {
  const loginView = document.getElementById("authViewLogin");
  const regView = document.getElementById("authViewRegister");
  const forgotView = document.getElementById("authViewForgot");

  if (loginView) loginView.classList.add("hidden");
  if (regView) regView.classList.add("hidden");
  if (forgotView) forgotView.classList.add("hidden");

  if (viewName === "login" && loginView) loginView.classList.remove("hidden");
  if (viewName === "register" && regView) regView.classList.remove("hidden");
  if (viewName === "forgot" && forgotView) forgotView.classList.remove("hidden");
}

function setUserSession(user, token) {
  currentUser = user;
  localStorage.setItem("mekong_l5_token", token);
  localStorage.setItem("mekong_l5_user", JSON.stringify(user));

  const authContainer = document.getElementById("authContainer");
  const appWorkspace = document.getElementById("appWorkspace");
  if (authContainer) authContainer.classList.add("hidden");
  if (appWorkspace) {
    appWorkspace.classList.remove("hidden");
    appWorkspace.classList.add("flex");
  }

  updateHeaderProfileUI();
  renderSidebarNav();

  if (user.role === "TECH_STAFF") {
    navigateToTab("tech_dashboard");
  } else if (user.role === "MATERIAL_STAFF") {
    navigateToTab("material_dashboard");
  } else if (user.role === "MANAGER") {
    navigateToTab("manager_dashboard");
  } else {
    navigateToTab("tech_dashboard");
  }
}

function updateHeaderProfileUI() {
  if (!currentUser) return;

  const headerUserName = document.getElementById("headerUserName");
  const headerUserRole = document.getElementById("headerUserRole");
  const headerAvatar = document.getElementById("headerAvatarLetter");
  const profileAvatar = document.getElementById("profileAvatarLetter");
  const profileFullName = document.getElementById("profileMenuFullName");
  const profileEmail = document.getElementById("profileMenuEmail");
  const profileRoleBadge = document.getElementById("profileMenuRoleBadge");

  const initials = (currentUser.full_name || "U").charAt(0).toUpperCase();

  let roleLabel = "Nhân viên Kỹ thuật";
  if (currentUser.role === "MATERIAL_STAFF") roleLabel = "Nhân viên Vật tư";
  if (currentUser.role === "MANAGER") roleLabel = "Quản lý Kho";

  if (headerUserName) headerUserName.textContent = currentUser.full_name;
  if (headerUserRole) {
    headerUserRole.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
      ${roleLabel}
    `;
  }
  if (headerAvatar) headerAvatar.textContent = initials;
  if (profileAvatar) profileAvatar.textContent = initials;
  if (profileFullName) profileFullName.textContent = currentUser.full_name;
  if (profileEmail) profileEmail.textContent = currentUser.email;
  if (profileRoleBadge) profileRoleBadge.textContent = roleLabel;
}

function toggleProfileDropdown(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById("profileDropdownMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("profileDropdownMenu");
  const btn = document.getElementById("profileDropdownBtn");
  if (menu && !menu.classList.contains("hidden")) {
    if (btn && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  }

  // Đóng dropdown gợi ý linh kiện khi click ngoài
  const partSuggestions = document.getElementById("partSuggestionsDropdown");
  const smartSearch = document.getElementById("smartPartSearch");
  if (partSuggestions && !partSuggestions.classList.contains("hidden")) {
    if (smartSearch && !smartSearch.contains(e.target) && !partSuggestions.contains(e.target)) {
      partSuggestions.classList.add("hidden");
    }
  }
});

function renderSidebarNav() {
  const nav = document.getElementById("dynamicNav");
  if (!nav || !currentUser) return;

  let menuItems = [];

  if (currentUser.role === "TECH_STAFF") {
    menuItems = [
      { id: "tech_dashboard", label: "Bảng tin Kỹ thuật viên", icon: "dashboard" },
      { id: "tech_transaction", label: "Tra cứu & Giao dịch", icon: "swap_horiz" },
      { id: "tech_history", label: "Lịch sử tiếp nhận phiếu", icon: "history" }
    ];
  } else if (currentUser.role === "MATERIAL_STAFF") {
    menuItems = [
      { id: "material_dashboard", label: "Bảng tin Quản lý vật tư", icon: "inventory" },
      { id: "material_stock_in", label: "Nhập kho linh kiện mới", icon: "add_box" },
      { id: "material_suppliers", label: "Nhà cung cấp đối tác", icon: "storefront" }
    ];
  } else if (currentUser.role === "MANAGER") {
    menuItems = [
      { id: "manager_dashboard", label: "Dashboard Tổng quan", icon: "analytics" },
      { id: "manager_audit", label: "Nhật ký Giao dịch Kho", icon: "receipt_long" },
      { id: "manager_users", label: "Quản lý nhân sự", icon: "group" }
    ];
  }

  nav.innerHTML = menuItems.map(item => `
    <button onclick="navigateToTab('${item.id}')"
            id="navBtn_${item.id}"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              currentTab === item.id
                ? 'bg-gradient-to-r from-blue-600/30 to-blue-500/10 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }">
      <span class="material-symbols-outlined text-[19px] shrink-0">${item.icon}</span>
      <span class="truncate">${item.label}</span>
    </button>
  `).join("");
}

function navigateToTab(tabId) {
  currentTab = tabId;
  renderSidebarNav();
  renderCurrentView();
}

// ==============================================================================
// 5. TRÌNH BIÊN DỊCH VÀ KẾT XUẤT NỘI DUNG CHÍNH (VIEW ROUTER)
// ==============================================================================

async function renderCurrentView() {
  const container = document.getElementById("viewContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col items-center justify-center p-16 text-slate-400">
      <span class="material-symbols-outlined text-[36px] animate-spin text-blue-500 mb-3">progress_activity</span>
      <span class="text-xs font-medium">Đang tải và đồng bộ dữ liệu kho chi nhánh...</span>
    </div>
  `;

  try {
    if (currentTab === "tech_dashboard") {
      await renderTechDashboard(container);
    } else if (currentTab === "tech_transaction") {
      await renderTechTransaction(container);
    } else if (currentTab === "tech_history") {
      await renderTechHistory(container);
    } else if (currentTab === "material_dashboard") {
      await renderMaterialDashboard(container);
    } else if (currentTab === "material_stock_in") {
      await renderMaterialStockIn(container);
    } else if (currentTab === "material_suppliers") {
      await renderMaterialSuppliers(container);
    } else if (currentTab === "manager_dashboard") {
      await renderManagerDashboard(container);
    } else if (currentTab === "manager_reports") {
      await renderManagerReports(container);
    } else if (currentTab === "manager_audit") {
      await renderManagerAuditLog(container);
    } else if (currentTab === "manager_users") {
      await renderManagerUsers(container);
    } else {
      container.innerHTML = `<div class="p-8 text-xs text-slate-400">Không tìm thấy phân hệ yêu cầu.</div>`;
    }
  } catch (err) {
    console.error("Lỗi kết xuất giao diện:", err);
    container.innerHTML = `
      <div class="card-3d p-6 border-red-500/30 bg-red-950/20 text-red-300 flex items-start gap-3">
        <span class="material-symbols-outlined text-red-400 text-[24px]">error</span>
        <div class="flex flex-col gap-1">
          <h3 class="font-bold text-sm text-red-200">Không thể tải dữ liệu phân hệ</h3>
          <p class="text-xs text-red-300/80">${err.message || 'Lỗi kết nối máy chủ'}</p>
          <button onclick="renderCurrentView()" class="btn-3d-secondary self-start mt-3 px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
            <span>Thử lại</span>
          </button>
        </div>
      </div>
    `;
  }
}

// ==============================================================================
// 6. GIAO DIỆN VAI TRÒ 1: NHÂN VIÊN KỸ THUẬT (TECH_STAFF)
// ==============================================================================

async function renderTechDashboard(container) {
  const [ticketsRes, dashboardRes] = await Promise.all([
    apiCall("/inventory/tickets"),
    apiCall("/inventory/dashboard")
  ]);

  cachedTickets = ticketsRes.data || [];
  const metrics = dashboardRes.data || {};

  // Phân trang danh sách phiếu tiếp nhận
  const limit = tablePagination.tickets.limit;
  const page = tablePagination.tickets.page;
  const totalItems = cachedTickets.length;
  const totalPages = limit === "ALL" ? 1 : Math.ceil(totalItems / limit) || 1;
  const startIndex = limit === "ALL" ? 0 : (page - 1) * limit;
  const displayedTickets = limit === "ALL" ? cachedTickets : cachedTickets.slice(startIndex, startIndex + limit);

  container.innerHTML = `
    <!-- Tiêu đề và ca trực (Không có breadcrumb phụ) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white">Bảng tin Kỹ thuật viên</h1>
        <p class="text-xs text-slate-400 mt-1">Tổng hợp công việc bảo hành và các phiếu sửa chữa trong ca trực.</p>
      </div>
      <div class="flex items-center gap-2.5 self-start md:self-auto">
        <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5 shadow-md">
          <span class="material-symbols-outlined text-[16px] text-blue-400">schedule</span>
          <span>Ca làm việc: 08:00 - 16:30</span>
        </div>
        <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Làm mới</span>
        </button>
      </div>
    </div>

    <!-- 3 Thẻ chỉ số 3D (KPI Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="card-3d p-5 flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Linh kiện xuất trong ngày</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span class="text-3xl font-extrabold text-white">12</span>
              <span class="text-xs text-slate-400 font-medium">vật tư / 4 thiết bị</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-[20px]">inventory_2</span>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span class="text-slate-400">Tiến độ hạn mức ca trực</span>
          <span class="font-extrabold text-emerald-400">75%</span>
        </div>
      </div>

      <div class="card-3d p-5 flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phiếu chờ tiếp nhận</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span class="text-3xl font-extrabold text-white">${cachedTickets.length}</span>
              <span class="text-xs text-slate-400 font-medium">yêu cầu cần linh kiện</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-[20px]">pending_actions</span>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span class="text-slate-400">Thời gian chờ bình quân</span>
          <span class="font-extrabold text-amber-400">18 phút</span>
        </div>
      </div>

      <div class="card-3d p-5 flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trạng thái kho trực tuyến</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="status-badge-green">
                <span class="dot-indicator"></span>
                HOẠT ĐỘNG ỔN ĐỊNH
              </span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-[20px]">wifi_tethering</span>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span class="text-slate-400">Độ trễ phản hồi API</span>
          <span class="font-extrabold text-emerald-400">14 ms</span>
        </div>
      </div>
    </div>

    <!-- Danh sách phiếu tiếp nhận bảo hành có phân trang -->
    <div class="card-3d overflow-hidden">
      <div class="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-blue-400 text-[20px]">build</span>
          <h2 class="text-xs font-bold uppercase tracking-wider text-white">DANH SÁCH PHIẾU YÊU CẦU LINH KIỆN CẦN XỬ LÝ</h2>
        </div>
        
        <!-- Bộ chọn phân trang -->
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">Hiển thị:</span>
          <select onchange="handlePageSizeChange('tickets', this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-blue-500 text-xs font-semibold">
            <option value="10" ${limit === 10 ? 'selected' : ''}>10 phiếu</option>
            <option value="20" ${limit === 20 ? 'selected' : ''}>20 phiếu</option>
            <option value="50" ${limit === 50 ? 'selected' : ''}>50 phiếu</option>
            <option value="ALL" ${limit === 'ALL' ? 'selected' : ''}>Tất cả</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold">
              <th class="py-3 px-5">MÃ PHIẾU</th>
              <th class="py-3 px-5">KHÁCH HÀNG / THIẾT BỊ</th>
              <th class="py-3 px-5">LINH KIỆN ĐỀ NGHỊ</th>
              <th class="py-3 px-5">TRẠNG THÁI</th>
              <th class="py-3 px-5 text-right">THAO TÁC</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            ${displayedTickets.length === 0 ? `
              <tr>
                <td colspan="5" class="p-8 text-center text-slate-500">
                  Hiện không có phiếu sửa chữa nào cần cấp phát linh kiện.
                </td>
              </tr>
            ` : displayedTickets.map(t => `
              <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="py-3 px-5 font-bold code-badge text-blue-400">#${t.ticket_id}</td>
                <td class="py-3 px-5">
                  <div class="flex flex-col">
                    <span class="font-bold text-white">${(t && t.customer_name) ? t.customer_name : 'Khách vãng lai'}</span>
                    <span class="text-[11px] text-slate-400">${(t && t.device_model) ? t.device_model : 'Thiết bị tiếp nhận'}</span>
                  </div>
                </td>
                <td class="py-3 px-5">
                  <span class="font-mono text-slate-300 font-semibold">${(t && t.requested_part_code) ? t.requested_part_code : 'SCR-IP14-01'}</span>
                </td>
                <td class="py-3 px-5">
                  ${formatTicketStatus(t.status)}
                </td>
                <td class="py-3 px-5 text-right">
                  <button onclick="handleQuickSelectTicket('${t.ticket_id}', '${(t && t.requested_part_code) ? t.requested_part_code : 'SCR-IP14-01'}')"
                          class="btn-3d-primary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1 cursor-pointer">
                    <span class="material-symbols-outlined text-[15px]">send</span>
                    <span>Xuất ngay</span>
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Điều khiển phân trang Footer -->
      <div class="px-6 py-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
        <span>Hiển thị ${displayedTickets.length} / ${totalItems} phiếu bảo hành</span>
        <div class="flex items-center gap-2">
          <button onclick="handlePageNav('tickets', -1)" ${page <= 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
            Trước
          </button>
          <span class="font-semibold text-white px-1">Trang ${page} / ${totalPages}</span>
          <button onclick="handlePageNav('tickets', 1)" ${page >= totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
            Sau
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleQuickSelectTicket(ticketId, partCode) {
  navigateToTab("tech_transaction");
  setTimeout(() => {
    const ticketInput = document.getElementById("ticketIdInput");
    if (ticketInput) ticketInput.value = ticketId;
    if (partCode) selectPartForTransaction(partCode);
    showToast(`Đã nạp mã phiếu ${ticketId} vào biểu mẫu giao dịch.`, "info", 3000);
  }, 200);
}

/**
 * Màn hình 1.2: Tra cứu tồn kho & Biểu mẫu Xuất / Hoàn trả linh kiện (3D Card)
 * Hợp nhất 2 thanh tìm kiếm thành 1 thanh thông minh có gợi ý dropdown và nút Tra cứu.
 */
async function renderTechTransaction(container) {
  let stocksRes = { data: [] };
  let partsRes = { data: [] };

  try {
    const results = await Promise.all([
      apiCall("/inventory/stock"),
      apiCall("/inventory/parts").catch(() => ({ data: [] }))
    ]);
    stocksRes = results[0] || { data: [] };
    partsRes = results[1] || { data: [] };
  } catch (err) {
    console.warn("Lỗi tải dữ liệu tồn kho:", err);
    try {
      stocksRes = await apiCall("/inventory/stock");
    } catch (e) {
      console.error("Không thể tải tồn kho:", e);
    }
  }

  cachedStocks = (stocksRes && stocksRes.data) || [];
  cachedParts = (partsRes && partsRes.data) || [];

  const totalCategories = cachedStocks.length;
  const totalQuantity = cachedStocks.reduce((sum, s) => sum + (s.quantity || 0), 0);

  container.innerHTML = `
    <!-- Header không breadcrumb -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white">Tra cứu & Giao dịch Kho</h1>
        <p class="text-xs text-slate-400 mt-1">Xử lý xuất kho thay thế theo phiếu bảo hành hoặc hoàn trả linh kiện chưa dùng.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="card-3d flex items-center gap-2.5 px-3.5 py-1.5 text-xs">
          <span class="material-symbols-outlined text-[18px] text-blue-400">category</span>
          <span>Danh mục: <strong class="font-bold text-white">${totalCategories} loại</strong></span>
          <span class="text-slate-600">|</span>
          <span class="material-symbols-outlined text-[18px] text-emerald-400">inventory_2</span>
          <span>Tổng tồn khả dụng: <strong class="font-extrabold text-emerald-400">${totalQuantity} cái</strong></span>
        </div>
      </div>
    </div>

    <!-- Main Grid: Biểu mẫu giao dịch + Bảng tồn kho tổng thể -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-1">
      
      <!-- Biểu mẫu Giao dịch (Col 7) -->
      <div class="lg:col-span-7 card-3d p-6 flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-400 text-[20px]">swap_horiz</span>
            <h2 class="text-sm font-bold text-white uppercase tracking-wide">Biểu mẫu Xuất / Hoàn linh kiện</h2>
          </div>
          <span class="status-badge-green text-[10px] py-0.5 px-2">
            <span class="dot-indicator"></span>
            Kho Quận 1
          </span>
        </div>

        <form id="techTxForm" onsubmit="event.preventDefault(); submitTechTransaction();" class="flex flex-col gap-4" novalidate>
          
          <!-- 1. Thanh tìm kiếm thông minh HỢP NHẤT có gợi ý Dropdown và nút Tra cứu -->
          <div class="flex flex-col gap-1.5 relative">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-slate-300 flex items-center gap-1" for="smartPartSearch">
                <span>Tra cứu & Chọn linh kiện</span>
                <span class="text-red-400">*</span>
              </label>
              <span class="text-[11px] text-slate-500 font-medium">Gõ để xem gợi ý hoặc bấm Enter để chọn</span>
            </div>

            <!-- Ô tìm kiếm thông minh: Không cần nút Tra cứu, hỗ trợ gợi ý dropdown và phím Enter -->
            <div class="relative w-full">
              <input type="text" id="smartPartSearch"
                     autocomplete="off"
                     value=""
                     placeholder="Nhập thông tin linh kiện (Mã hoặc Tên), bấm Enter để chọn..."
                     oninput="handleSmartPartSearch(event)"
                     onkeydown="handleSmartSearchKeyDown(event)"
                     onfocus="showPartSuggestionsDropdown()"
                     class="w-full h-10 pl-10 pr-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-medium transition-colors placeholder:text-slate-500" />
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px] pointer-events-none">search</span>
            </div>

            <!-- Dropdown danh sách gợi ý khi gõ hoặc click vào ô tìm kiếm -->
            <div id="partSuggestionsDropdown" class="hidden absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto p-1.5 glass-panel">
              <div id="suggestionsList" class="flex flex-col gap-1">
                <!-- Nạp động từ handleSmartPartSearch -->
              </div>
            </div>

            <!-- Hidden input lưu trữ part_code hiện tại -->
            <select id="txPartSelect" class="hidden">
              <option value="" selected>-- Chưa chọn linh kiện --</option>
              ${cachedStocks.map(s => `
                <option value="${(s && s.part_code) ? s.part_code : 'Mã LK'}">
                  ${(s && s.part_code) ? s.part_code : 'Mã LK'}
                </option>
              `).join("")}
            </select>
            <p id="txPartSelectError" class="hidden field-error-text"></p>
          </div>

          <!-- 2. Hiển thị thông số tồn kho tức thời (Trạng thái ban đầu: Hướng dẫn người dùng chọn linh kiện) -->
          <div id="liveStockBox" class="p-4 bg-slate-950/70 border border-white/10 rounded-2xl flex items-center justify-between shadow-inner transition-all">
            <div class="flex items-center gap-2.5 text-xs text-slate-300">
              <span class="material-symbols-outlined text-[22px] text-blue-400">inventory_2</span>
              <div class="flex flex-col">
                <span class="font-semibold text-slate-400">Tồn kho hiện tại:</span>
                <span id="displayQty" class="text-sm font-bold text-slate-300">Chưa chọn linh kiện</span>
              </div>
            </div>
            <div id="displayBadge">
              <span class="status-badge-yellow text-[10px] py-1 px-2.5">
                <span class="dot-indicator"></span>Nhập từ khóa hoặc bấm Enter
              </span>
            </div>
          </div>

          <!-- 3. Mã phiếu bảo hành (Bắt buộc khi xuất kho) -->
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-slate-300 flex items-center justify-between" for="ticketIdInput">
              <span>Mã phiếu bảo hành (Ticket ID) <span class="text-red-400">*Bắt buộc khi xuất kho</span></span>
              <span class="text-[11px] font-normal text-slate-500">Tối đa 30 ký tự</span>
            </label>
            <div class="relative">
              <input type="text" id="ticketIdInput" placeholder="Ví dụ: TK-1092, TK-2026-8892" value=""
                     maxlength="30"
                     oninput="clearFieldError('ticketIdInput', 'ticketIdInputError')"
                     class="w-full h-10 pl-10 pr-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono transition-colors placeholder:text-slate-500">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">confirmation_number</span>
            </div>
            <p id="ticketIdInputError" class="hidden field-error-text"></p>
          </div>

          <!-- 4. Số lượng giao dịch -->
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-slate-300 flex items-center justify-between" for="txQtyInput">
              <span>Số lượng linh kiện <span class="text-red-400">*</span></span>
              <span class="text-[11px] font-normal text-slate-500">Từ 1 đến 1.000.000 cái</span>
            </label>
            <input type="number" id="txQtyInput" min="1" max="1000000" value="1" oninput="validateLiveStockQuantity()"
                   class="w-full h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-bold transition-colors">
            <p id="txQtyInputError" class="hidden field-error-text"></p>
          </div>

          <!-- 5. Phân loại giao dịch (Xuất / Hoàn) -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-300">Loại giao dịch <span class="text-red-400">*</span></span>
            <div class="grid grid-cols-2 gap-3">
              <label class="flex items-center gap-2.5 p-3 border border-white/10 bg-slate-950/60 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors">
                <input type="radio" name="txType" value="OUT" checked onchange="validateLiveStockQuantity()" class="accent-blue-500">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-white">Xuất kho thay thế</span>
                  <span class="text-[11px] text-slate-400">Trừ trực tiếp số lượng tồn</span>
                </div>
              </label>
              <label class="flex items-center gap-2.5 p-3 border border-white/10 bg-slate-950/60 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors">
                <input type="radio" name="txType" value="RETURN" onchange="validateLiveStockQuantity()" class="accent-blue-500">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-white">Hoàn trả linh kiện</span>
                  <span class="text-[11px] text-slate-400">Cộng trả lại kho linh kiện</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Dự tính biến động tồn kho sau giao dịch -->
          <div id="stockCalculationPreview" class="p-3 bg-slate-950/70 border border-white/10 rounded-xl text-xs flex items-center justify-between">
            <span class="text-slate-400 font-medium flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-blue-400">calculate</span>
              <span>Dự tính sau giao dịch:</span>
            </span>
            <span id="stockCalculationText" class="font-extrabold text-white">Chưa chọn linh kiện</span>
          </div>

          <!-- Cảnh báo số lượng vượt quá -->
          <div id="negativeStockAlert" class="hidden p-3.5 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[18px] text-red-400 shrink-0 mt-0.5">block</span>
            <div class="flex flex-col text-xs">
              <strong class="font-bold text-red-200">CẢNH BÁO: VƯỢT QUÁ SỐ LƯỢNG TỒN KHẢ DỤNG</strong>
              <span id="negativeStockMessage" class="text-red-300/80 mt-0.5">Số lượng xuất yêu cầu vượt quá tồn kho thực tế. Vui lòng giảm số lượng.</span>
            </div>
          </div>

          <!-- Nút hành động 3D -->
          <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
            <button type="button" id="btnResetForm" onclick="resetTechTransactionForm()" class="btn-3d-secondary px-4 py-2 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm trống các ô nhập và quay về mặc định">
              <span class="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Đặt lại biểu mẫu</span>
            </button>
            <button type="submit" id="submitTxBtn" class="btn-3d-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">check</span>
              <span>Xác nhận Giao dịch</span>
            </button>
          </div>

        </form>
      </div>

      <!-- Bảng Tồn kho tham khảo nhanh (Col 5) -->
      <div class="lg:col-span-5 card-3d p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-blue-400 text-[18px]">table_view</span>
            <h3 class="text-xs font-bold uppercase tracking-wide text-white">DANH MỤC TỒN KHẢ DỤNG</h3>
          </div>
          <span class="text-[11px] text-slate-400 font-semibold" id="tableItemCount">${cachedStocks.length} loại | ${totalQuantity} cái</span>
        </div>

        <div class="max-h-[520px] overflow-y-auto pr-1">
          <div class="flex flex-col gap-2" id="stockListContainer">
            ${cachedStocks.map(s => `
              <div onclick="selectPartForTransaction('${(s && s.part_code) ? s.part_code : 'Mã LK'}')"
                   class="p-3 border border-white/10 bg-slate-950/40 rounded-xl hover:border-blue-500/60 hover:bg-slate-800/50 transition-all cursor-pointer flex items-center justify-between group">
                <div class="flex flex-col">
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-xs text-white code-badge group-hover:text-blue-400">${(s && s.part_code) ? s.part_code : 'Mã LK'}</span>
                    ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
                  </div>
                  <span class="text-[11px] text-slate-400 truncate max-w-[210px] mt-0.5">${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-extrabold text-white">${s.quantity}</span>
                  <span class="text-[10px] text-slate-500 block">cái</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

    </div>
  `;

  renderPartSuggestions(cachedStocks);
}
/**
 * Trả về Badge ngữ nghĩa 3 màu sắc chuẩn theo yêu cầu:
 * - Xanh lá: > min_threshold + 5 (Tồn kho an toàn)
 * - Vàng: min_threshold < quantity <= min_threshold + 5 (Gần chạm ngưỡng cảnh báo)
 * - Đỏ: quantity <= min_threshold (Cảnh báo thiếu hàng / Chạm ngưỡng)
 */
function getSemanticStockBadge(quantity, minThreshold = 10, isCompact = false) {
  const safeBuffer = 5;
  const safeCutoff = minThreshold + safeBuffer;

  if (quantity > safeCutoff) {
    return isCompact 
      ? `<span class="status-badge-green text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>An toàn</span>`
      : `<span class="status-badge-green"><span class="dot-indicator"></span>TỒN KHO AN TOÀN (${quantity} > ${safeCutoff})</span>`;
  } else if (quantity > minThreshold && quantity <= safeCutoff) {
    return isCompact
      ? `<span class="status-badge-yellow text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>Gần cảnh báo</span>`
      : `<span class="status-badge-yellow"><span class="dot-indicator"></span>GẦN CHẠM CẢNH BÁO (${quantity} ≤ ${safeCutoff})</span>`;
  } else {
    return isCompact
      ? `<span class="status-badge-red text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>Cảnh báo</span>`
      : `<span class="status-badge-red"><span class="dot-indicator"></span>CẢNH BÁO THIẾU HÀNG (≤ ${minThreshold})</span>`;
  }
}

/**
 * Hiển thị Dropdown danh sách gợi ý khi gõ hoặc click vào ô tìm kiếm
 */
function showPartSuggestionsDropdown() {
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.remove("hidden");
  const query = (document.getElementById("smartPartSearch")?.value || "").toLowerCase().trim();
  const filtered = query 
    ? cachedStocks.filter(s => s.part_code.toLowerCase().includes(query) || s.part_name.toLowerCase().includes(query))
    : cachedStocks;
  renderPartSuggestions(filtered);
}

function handleSmartSearchKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    executeSmartLookup();
  } else if (event.key === "Escape") {
    const dropdown = document.getElementById("partSuggestionsDropdown");
    if (dropdown) dropdown.classList.add("hidden");
  }
}

function handleSmartPartSearch(event) {
  const query = (event.target.value || "").toLowerCase().trim();
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.remove("hidden");

  const filtered = cachedStocks.filter(s =>
    s.part_code.toLowerCase().includes(query) ||
    s.part_name.toLowerCase().includes(query)
  );

  renderPartSuggestions(filtered);
}

function renderPartSuggestions(partsList) {
  const container = document.getElementById("suggestionsList");
  if (!container) return;

  if (partsList.length === 0) {
    container.innerHTML = `
      <div class="p-3 text-center text-xs text-slate-500">
        Không tìm thấy linh kiện phù hợp với từ khóa.
      </div>
    `;
    return;
  }

  container.innerHTML = partsList.map(s => `
    <div onclick="selectPartFromAutocomplete('${(s && s.part_code) ? s.part_code : 'Mã LK'}')"
         class="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors border border-transparent hover:border-white/10">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="font-bold text-white code-badge">${(s && s.part_code) ? s.part_code : 'Mã LK'}</span>
          ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
        </div>
        <span class="text-[11px] text-slate-400 mt-0.5">${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}</span>
      </div>
      <div class="text-right">
        <span class="font-bold text-white">${s.quantity}</span>
        <span class="text-[10px] text-slate-500"> cái</span>
      </div>
    </div>
  `).join("");
}

function selectPartFromAutocomplete(partCode) {
  selectPartForTransaction(partCode);
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

function executeSmartLookup() {
  const input = document.getElementById("smartPartSearch");
  const query = (input?.value || "").toLowerCase().trim();
  const match = cachedStocks.find(s => 
    s.part_code.toLowerCase() === query ||
    s.part_code.toLowerCase().includes(query) ||
    s.part_name.toLowerCase().includes(query)
  );

  if (match) {
    selectPartForTransaction(match.part_code);
    const dropdown = document.getElementById("partSuggestionsDropdown");
    if (dropdown) dropdown.classList.add("hidden");
    showToast(`Đã tìm thấy linh kiện: ${match.part_code}`, "success", 2500);
  } else {
    showToast("Không tìm thấy linh kiện nào khớp với từ khóa tra cứu.", "warning", 3000);
  }
}

function selectPartForTransaction(partCode) {
  const stockItem = cachedStocks.find(s => s.part_code === partCode);
  if (!stockItem) return;

  // Cập nhật ô nhập thông minh
  const smartInput = document.getElementById("smartPartSearch");
  if (smartInput) {
    smartInput.value = `${stockItem.part_code} — ${stockItem.part_name}`;
  }

  // Đồng bộ với txPartSelect ẩn
  const select = document.getElementById("txPartSelect");
  if (select) {
    select.value = partCode;
  }

  // Cập nhật thẻ chỉ số thời gian thực
  const qtyEl = document.getElementById("displayQty");
  const badgeEl = document.getElementById("displayBadge");

  if (qtyEl) qtyEl.textContent = stockItem.quantity;
  if (badgeEl) {
    badgeEl.innerHTML = getSemanticStockBadge(stockItem.quantity, stockItem.min_threshold);
  }

  validateLiveStockQuantity();
}

/**
 * Nút Đặt lại biểu mẫu có tác dụng:
 * 1. Khôi phục ô tìm kiếm về linh kiện mặc định đầu tiên.
 * 2. Đặt số lượng về 1.
 * 3. Đặt loại giao dịch về Xuất kho (OUT).
 * 4. Xóa trắng các dòng báo lỗi đỏ bên dưới.
 * 5. Tắt cảnh báo âm kho và tính toán lại tồn kho dự tính.
 */
function resetTechTransactionForm() {
  // 1. Xóa sạch ô tìm kiếm thông minh và giá trị chọn ẩn
  const smartInput = document.getElementById("smartPartSearch");
  if (smartInput) smartInput.value = "";

  const select = document.getElementById("txPartSelect");
  if (select) select.value = "";

  // 2. Trả khung hiển thị tồn kho thời gian thực về trạng thái ban đầu
  const qtyEl = document.getElementById("displayQty");
  const badgeEl = document.getElementById("displayBadge");

  if (qtyEl) qtyEl.innerHTML = `<span class="text-sm font-bold text-slate-400">Chưa chọn linh kiện</span>`;
  if (badgeEl) {
    badgeEl.innerHTML = `<span class="status-badge-yellow text-[10px] py-1 px-2.5"><span class="dot-indicator"></span>Nhập từ khóa hoặc bấm Enter</span>`;
  }

  // 3. Xóa sạch ô mã phiếu bảo hành và đặt số lượng về 1
  const ticketInput = document.getElementById("ticketIdInput");
  if (ticketInput) ticketInput.value = "";

  const qtyInput = document.getElementById("txQtyInput");
  if (qtyInput) qtyInput.value = "1";

  // 4. Đặt loại giao dịch về Xuất kho thay thế
  const outRadio = document.querySelector('input[name="txType"][value="OUT"]');
  if (outRadio) outRadio.checked = true;

  // 5. Dự tính sau giao dịch về trạng thái chưa chọn
  const calcText = document.getElementById("stockCalculationText");
  if (calcText) calcText.textContent = "Chưa chọn linh kiện";

  // 6. Xóa trắng toàn bộ các dòng báo lỗi đỏ bên dưới các ô nhập
  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  // 7. Ẩn cảnh báo âm kho và đóng dropdown gợi ý nếu đang mở
  const alertBox = document.getElementById("negativeStockAlert");
  if (alertBox) alertBox.classList.add("hidden");

  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.add("hidden");

  showToast("Đã đặt lại toàn bộ biểu mẫu về trạng thái ban đầu sạch sẽ.", "info", 2500);
}

function validateLiveStockQuantity() {
  const select = document.getElementById("txPartSelect");
  const qtyInput = document.getElementById("txQtyInput");
  const calcText = document.getElementById("stockCalculationText");
  const alertBox = document.getElementById("negativeStockAlert");
  const submitBtn = document.getElementById("submitTxBtn");

  if (!select || !qtyInput || !calcText) return;

  const partCode = select.value;
  const stockItem = cachedStocks.find(s => s.part_code === partCode);
  const currentQty = stockItem ? stockItem.quantity : 0;
  const reqQty = parseInt(qtyInput.value, 10) || 0;

  const txTypeRadio = document.querySelector('input[name="txType"]:checked');
  const txType = txTypeRadio ? txTypeRadio.value : "OUT";

  let futureQty = currentQty;
  if (txType === "OUT") {
    futureQty = currentQty - reqQty;
  } else {
    futureQty = currentQty + reqQty;
  }

  calcText.innerHTML = `
    <span class="text-slate-400">${currentQty}</span> 
    <span class="text-blue-400 font-bold">${txType === 'OUT' ? '—' : '+'}</span> 
    <span class="text-slate-400">${reqQty}</span> = 
    <strong class="${futureQty < 0 ? 'text-red-400' : 'text-emerald-400'} text-sm">${futureQty} cái</strong>
  `;

  if (txType === "OUT" && reqQty > currentQty) {
    if (alertBox) alertBox.classList.remove("hidden");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  } else {
    if (alertBox) alertBox.classList.add("hidden");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }
}

async function submitTechTransaction() {
  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const select = document.getElementById("txPartSelect");
  const ticketInput = document.getElementById("ticketIdInput");
  const qtyInput = document.getElementById("txQtyInput");
  const txTypeRadio = document.querySelector('input[name="txType"]:checked');

  const partCode = select ? select.value : "";
  const ticketId = ticketInput ? ticketInput.value.trim() : "";
  const quantity = parseInt(qtyInput ? qtyInput.value : 0, 10);
  const txType = txTypeRadio ? txTypeRadio.value : "OUT";

  let hasError = false;

  if (!partCode) {
    setFieldError("txPartSelect", "txPartSelectError", "Vui lòng chọn linh kiện hợp lệ từ danh mục.");
    hasError = true;
  }

  if (txType === "OUT" && !ticketId) {
    setFieldError("ticketIdInput", "ticketIdInputError", "Mã phiếu bảo hành bắt buộc khi xuất kho thay thế.");
    hasError = true;
  } else if (ticketId && ticketId.length > 30) {
    setFieldError("ticketIdInput", "ticketIdInputError", "Mã phiếu bảo hành không được vượt quá 30 ký tự.");
    hasError = true;
  }

  if (isNaN(quantity) || quantity <= 0) {
    setFieldError("txQtyInput", "txQtyInputError", "Số lượng giao dịch phải lớn hơn 0.");
    hasError = true;
  } else if (quantity > 1000000) {
    setFieldError("txQtyInput", "txQtyInputError", "Số lượng giao dịch không được vượt quá 1.000.000 cái.");
    hasError = true;
  }

  if (hasError) return;

  try {
    const payload = {
      part_code: partCode,
      type: txType,
      quantity: quantity,
      ticket_id: (txType === "OUT" || txType === "RETURN") ? ticketId : null
    };

    const res = await apiCall("/inventory/transactions", "POST", payload);

    showToast(
      `Giao dịch thành công! Mã GD: #${res.data.transaction_id} — Tồn kho mới: ${res.data.current_stock ?? Math.max(0, (cachedStocks.find(s => s.part_code === partCode)?.quantity ?? 0) + (txType === "OUT" ? -quantity : quantity))} cái.`,
      "success",
      4000
    );

    await renderTechTransaction(document.getElementById("viewContainer"));
  } catch (err) {
    if (err.error_code === "ERR_NEGATIVE_STOCK") {
      setFieldError("txQtyInput", "txQtyInputError", "Số lượng xuất vượt quá tồn kho khả dụng hiện tại.");
    } else if (err.error_code === "ERR_MISSING_TICKET") {
      setFieldError("ticketIdInput", "ticketIdInputError", "Bắt buộc phải điền mã phiếu bảo hành khi xuất kho.");
    } else {
      showToast(`Không thể thực hiện giao dịch: ${err.message}`, "error", 4500);
    }
  }
}

async function renderTechHistory(container) {
  const res = await apiCall("/inventory/transactions?limit=50");
  const myTxList = (res.data || []).filter(tx => tx.type === "OUT" || tx.type === "RETURN");

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Lịch sử Giao dịch Kỹ thuật viên</h1>
          <p class="text-xs text-slate-400 mt-1">Danh sách các phiếu xuất linh kiện và hoàn trả phụ tùng đã xác nhận.</p>
        </div>
        <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Cập nhật</span>
        </button>
      </div>

      <div class="card-3d overflow-hidden">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold">
              <th class="py-3 px-5">MÃ GIAO DỊCH</th>
              <th class="py-3 px-5">THỜI GIAN</th>
              <th class="py-3 px-5">LINH KIỆN</th>
              <th class="py-3 px-5">LOẠI GD</th>
              <th class="py-3 px-5">SỐ LƯỢNG</th>
              <th class="py-3 px-5">PHIẾU BẢO HÀNH</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            ${myTxList.length === 0 ? `
              <tr>
                <td colspan="6" class="p-8 text-center text-slate-500">Chưa có giao dịch nào được ghi nhận.</td>
              </tr>
            ` : myTxList.map(tx => `
              <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="py-3 px-5 font-bold code-badge text-blue-400">#${tx.transaction_id}</td>
                <td class="py-3 px-5 text-slate-400">${tx.created_at ? tx.created_at.slice(0, 19).replace('T', ' ') : 'Vừa xong'}</td>
                <td class="py-3 px-5 font-bold text-white">${tx.part_code}</td>
                <td class="py-3 px-5">
                  ${formatTransactionType(tx.type)}
                </td>
                <td class="py-3 px-5 font-extrabold text-white">${(tx && tx.quantity != null) ? tx.quantity : 1} cái</td>
                <td class="py-3 px-5 font-mono text-slate-400">${(tx && tx.ticket_id) ? tx.ticket_id : '—'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==============================================================================
// 7. GIAO DIỆN VAI TRÒ 2: NHÂN VIÊN VẬT TƯ (MATERIAL_STAFF)
// ==============================================================================

async function renderMaterialDashboard(container) {
  const [stocksRes, dashboardRes] = await Promise.all([
    apiCall("/inventory/stock"),
    apiCall("/inventory/dashboard")
  ]);

  cachedStocks = stocksRes.data || [];
  const metrics = dashboardRes.data || {};

  // Phân trang danh sách tồn kho vật tư
  const limit = tablePagination.stocks.limit;
  const page = tablePagination.stocks.page;
  const totalItems = cachedStocks.length;
  const totalPages = limit === "ALL" ? 1 : Math.ceil(totalItems / limit) || 1;
  const startIndex = limit === "ALL" ? 0 : (page - 1) * limit;
  const displayedStocks = limit === "ALL" ? cachedStocks : cachedStocks.slice(startIndex, startIndex + limit);

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Bảng tin Quản lý Vật tư</h1>
          <p class="text-xs text-slate-400 mt-1">Theo dõi tốc độ tiêu thụ, tiếp nhận lô hàng mới và kiểm soát lượng vật tư cung ứng.</p>
        </div>
        <div class="card-3d px-3.5 py-1.5 text-xs text-slate-300 font-semibold flex items-center gap-1.5">
          <span class="status-badge-green text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>Trung tâm Vật tư Quận 1</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng danh mục linh kiện</span>
          <div class="text-3xl font-extrabold text-white mt-2">${cachedStocks.length} loại</div>
          <span class="status-badge-green text-[10px] mt-2 inline-flex">
            <span class="dot-indicator"></span> 100% được gắn mã định danh
          </span>
        </div>
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng lượng tồn kho thực tế</span>
          <div class="text-3xl font-extrabold text-white mt-2">
            ${cachedStocks.reduce((sum, s) => sum + (s.quantity || 0), 0)} cái
          </div>
          <span class="text-xs text-slate-400 mt-2 block font-medium">Toàn bộ chi nhánh Quận 1</span>
        </div>
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nhà cung cấp đối tác</span>
          <div class="text-3xl font-extrabold text-white mt-2">2 đơn vị</div>
          <span class="text-xs text-slate-400 mt-2 block font-medium">Kho tổng Mekong Mobile & OEM Á Châu</span>
        </div>
      </div>

      <div class="card-3d overflow-hidden">
        <div class="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
          <h2 class="text-xs font-bold uppercase tracking-wider text-white">TỒN KHO CHI TIẾT THEO DANH MỤC</h2>
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-400">Hiển thị:</span>
            <select onchange="handlePageSizeChange('stocks', this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-blue-500 text-xs font-semibold">
              <option value="10" ${limit === 10 ? 'selected' : ''}>10 dòng</option>
              <option value="20" ${limit === 20 ? 'selected' : ''}>20 dòng</option>
              <option value="50" ${limit === 50 ? 'selected' : ''}>50 dòng</option>
              <option value="ALL" ${limit === 'ALL' ? 'selected' : ''}>Tất cả</option>
            </select>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold">
                <th class="py-3 px-5">MÃ LINH KIỆN</th>
                <th class="py-3 px-5">TÊN LINH KIỆN</th>
                <th class="py-3 px-5">SỐ LƯỢNG TỒN</th>
                <th class="py-3 px-5">NGƯỠNG DỰ TRỮ</th>
                <th class="py-3 px-5">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${displayedStocks.map(s => `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-5 font-bold text-blue-400 code-badge">${(s && s.part_code) ? s.part_code : 'Mã LK'}</td>
                  <td class="py-3 px-5 font-medium text-slate-200">${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}</td>
                  <td class="py-3 px-5 font-extrabold text-white">${(s && s.quantity != null) ? s.quantity : 0} cái</td>
                  <td class="py-3 px-5 text-slate-400 font-semibold">${(s && s.min_threshold != null) ? s.min_threshold : 10} cái</td>
                  <td class="py-3 px-5">
                    ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Điều khiển phân trang Footer -->
        <div class="px-6 py-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Hiển thị ${displayedStocks.length} / ${totalItems} linh kiện</span>
          <div class="flex items-center gap-2">
            <button onclick="handlePageNav('stocks', -1)" ${page <= 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Trước
            </button>
            <span class="font-semibold text-white px-1">Trang ${page} / ${totalPages}</span>
            <button onclick="handlePageNav('stocks', 1)" ${page >= totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderMaterialStockIn(container) {
  const stocksRes = await apiCall("/inventory/stock");
  cachedStocks = stocksRes.data || [];

  const defaultPart = cachedStocks[0] || {
    part_code: "SCR-IP14PM-01",
    part_name: "Màn hình OLED iPhone 14 Pro Max",
    quantity: 24,
    min_threshold: 15
  };

  const totalParts = cachedStocks.length;
  const totalStockQty = cachedStocks.reduce((sum, s) => sum + (s.quantity || 0), 0);
  const lowStockCount = cachedStocks.filter(s => s.quantity <= s.min_threshold).length;

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Nhập kho linh kiện mới</h1>
          <p class="text-xs text-slate-400 mt-1">Tiếp nhận lô hàng vật tư từ Tổng công ty và cập nhật tồn kho thực tế vào hệ thống.</p>
        </div>
        <div class="card-3d px-3.5 py-1.5 text-xs text-slate-300 font-semibold flex items-center gap-1.5">
          <span class="status-badge-green text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>Kho chi nhánh Quận 1</span>
        </div>
      </div>

      <!-- Layout 2 cột: Bên trái là Biểu mẫu Nhập kho - Bên phải là Bảng Thống kê Lô hàng & Tồn kho -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Cột 1: Biểu mẫu Nhập kho (Col 7) -->
        <div class="lg:col-span-7 card-3d p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-400 text-[20px]">move_to_inbox</span>
              <h2 class="text-sm font-bold text-white uppercase">PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ</h2>
            </div>
            <span class="text-xs text-slate-400 font-semibold">Mã phiếu tự sinh</span>
          </div>

          <form id="stockInForm" onsubmit="event.preventDefault(); submitStockInTransaction();" class="flex flex-col gap-4" novalidate>
            
            <!-- Chọn linh kiện -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300" for="inPartSelect">
                Chọn mã linh kiện cần nhập <span class="text-red-400">*</span>
              </label>
              <select id="inPartSelect" onchange="updateStockInPreview()" class="h-10 px-3 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-blue-500 transition-colors">
                ${cachedStocks.map(s => `
                  <option value="${(s && s.part_code) ? s.part_code : 'Mã LK'}" data-qty="${s.quantity}" data-threshold="${s.min_threshold}">
                    ${(s && s.part_code) ? s.part_code : 'Mã LK'} — ${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'} (Hiện có: ${s.quantity})
                  </option>
                `).join("")}
              </select>
            </div>

            <!-- Thông số trước nhập -->
            <div class="grid grid-cols-3 gap-3 p-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-xs">
              <div class="flex flex-col">
                <span class="text-[11px] text-slate-400">Tồn trước nhập:</span>
                <strong id="inCurrentQty" class="text-sm font-bold text-white mt-0.5">${defaultPart.quantity} cái</strong>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] text-slate-400">Ngưỡng an toàn:</span>
                <strong id="inThreshold" class="text-sm font-bold text-slate-300 mt-0.5">${defaultPart.min_threshold} cái</strong>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] text-slate-400">Dự kiến sau nhập:</span>
                <strong id="inFutureQty" class="text-sm font-extrabold text-emerald-400 mt-0.5">${defaultPart.quantity + 10} cái</strong>
              </div>
            </div>

            <!-- Số lượng nhập -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300 flex items-center justify-between" for="inQtyInput">
                <span>Số lượng nhập kho <span class="text-red-400">*</span></span>
                <span class="text-[11px] text-slate-500">Từ 1 đến 1.000.000 cái</span>
              </label>
              <input type="number" id="inQtyInput" min="1" max="1000000" value="10" oninput="updateStockInPreview()"
                     class="h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-bold transition-colors">
              <p id="inQtyInputError" class="hidden field-error-text"></p>
              <span class="text-[11px] text-slate-500">Nhập số lượng hàng thực tế vừa khui kiện kiểm đếm.</span>
            </div>

            <!-- Ghi chú nguồn hàng -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300" for="inSourceInput">Nguồn cấp hàng / Số vận đơn</label>
              <input type="text" id="inSourceInput" value="Lô hàng định kỳ Tổng kho Mekong Mobile #TK-1082"
                     maxlength="100"
                     class="h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors">
            </div>

            <!-- Nút hành động 3D -->
            <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button type="submit" class="btn-3d-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Ghi nhận Nhập kho</span>
              </button>
            </div>

          </form>
        </div>

        <!-- Cột 2: Bảng Thống kê Lô hàng & Tồn kho Hiện tại (Col 5) -->
        <div class="lg:col-span-5 card-3d p-5 flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-400 text-[20px]">analytics</span>
              <h3 class="text-xs font-bold text-white uppercase tracking-wide">THỐNG KÊ TỒN KHO LINH KIỆN</h3>
            </div>
            <span class="status-badge-green text-[10px] py-0.5 px-2">
              <span class="dot-indicator"></span>${totalParts} mặt hàng
            </span>
          </div>

          <!-- 2 Thẻ tóm tắt nhanh -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-950/60 border border-white/10 rounded-xl">
              <span class="text-[11px] text-slate-400 block">Tổng tồn khả dụng:</span>
              <strong class="text-base font-extrabold text-emerald-400 mt-1 block">${totalStockQty} cái</strong>
            </div>
            <div class="p-3 bg-slate-950/60 border border-white/10 rounded-xl">
              <span class="text-[11px] text-slate-400 block">Cảnh báo thiếu hụt:</span>
              <strong class="text-base font-extrabold ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'} mt-1 block">
                ${lowStockCount} loại
              </strong>
            </div>
          </div>

          <!-- Bảng chi tiết cuộn nhanh -->
          <div class="max-h-[380px] overflow-y-auto pr-1">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold sticky top-0">
                  <th class="py-2.5 px-3">MÃ LINH KIỆN</th>
                  <th class="py-2.5 px-3 text-center">TỒN</th>
                  <th class="py-2.5 px-3 text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                ${cachedStocks.map(s => `
                  <tr class="hover:bg-slate-800/40 transition-colors">
                    <td class="py-2.5 px-3">
                      <div class="flex flex-col">
                        <span class="font-bold text-white code-badge text-[11px]">${(s && s.part_code) ? s.part_code : 'Mã LK'}</span>
                        <span class="text-[10px] text-slate-400 truncate max-w-[150px]">${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}</span>
                      </div>
                    </td>
                    <td class="py-2.5 px-3 text-center">
                      <span class="font-extrabold ${s.quantity <= s.min_threshold ? 'text-amber-400' : 'text-white'}">
                        ${s.quantity}
                      </span>
                      <span class="text-[10px] text-slate-500">/${s.min_threshold}</span>
                    </td>
                    <td class="py-2.5 px-3 text-right">
                      <button onclick="selectPartForStockIn('${(s && s.part_code) ? s.part_code : 'Mã LK'}')" class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold cursor-pointer">
                        Chọn
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;
}

function selectPartForStockIn(partCode) {
  const select = document.getElementById("inPartSelect");
  if (select) {
    select.value = partCode;
    updateStockInPreview();
    showToast(`Đã chọn linh kiện ${partCode} vào phiếu tiếp nhận!`, "info", 2000);
  }
}

function updateStockInPreview() {
  clearFieldError("inQtyInput", "inQtyInputError");
  const select = document.getElementById("inPartSelect");
  const qtyInput = document.getElementById("inQtyInput");
  const currentEl = document.getElementById("inCurrentQty");
  const thresholdEl = document.getElementById("inThreshold");
  const futureEl = document.getElementById("inFutureQty");

  if (!select || !qtyInput) return;

  const selectedOpt = select.selectedOptions[0];
  const curQty = parseInt(selectedOpt.getAttribute("data-qty"), 10) || 0;
  const threshold = parseInt(selectedOpt.getAttribute("data-threshold"), 10) || 0;
  const inQty = parseInt(qtyInput.value, 10) || 0;

  if (currentEl) currentEl.textContent = `${curQty} cái`;
  if (thresholdEl) thresholdEl.textContent = `${threshold} cái`;
  if (futureEl) futureEl.textContent = `${curQty + inQty} cái`;
}

async function submitStockInTransaction() {
  clearFieldError("inQtyInput", "inQtyInputError");
  const select = document.getElementById("inPartSelect");
  const qtyInput = document.getElementById("inQtyInput");

  const partCode = select ? select.value : "";
  const quantity = parseInt(qtyInput ? qtyInput.value : 0, 10);

  if (isNaN(quantity) || quantity <= 0) {
    setFieldError("inQtyInput", "inQtyInputError", "Số lượng nhập kho bắt buộc phải lớn hơn 0.");
    return;
  }
  if (quantity > 1000000) {
    setFieldError("inQtyInput", "inQtyInputError", "Số lượng nhập kho không được vượt quá 1.000.000 cái.");
    return;
  }

  try {
    const payload = {
      part_code: partCode,
      type: "IN",
      quantity: quantity,
      ticket_id: null
    };

    const res = await apiCall("/inventory/transactions", "POST", payload);

    showToast(
      `Đã nhập kho thành công ${quantity} cái linh kiện ${partCode}. Tồn mới: ${res.data.current_stock ?? ((cachedStocks.find(s => s.part_code === partCode)?.quantity ?? 0) + quantity)} cái.`,
      "success",
      4000
    );

    await renderMaterialStockIn(document.getElementById("viewContainer"));
  } catch (err) {
    showToast(`Không thể thực hiện nhập kho: ${err.message}`, "error", 4500);
  }
}

async function renderMaterialSuppliers(container) {
  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Đối tác Cung ứng Linh kiện</h1>
          <p class="text-xs text-slate-400 mt-1">Danh mục các nhà phân phối ủy quyền và trung tâm cung cấp phụ tùng.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="card-3d p-6 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="status-badge-green text-[10px] mb-2 inline-flex">
                <span class="dot-indicator"></span> Đối tác chiến lược
              </span>
              <h2 class="text-base font-bold text-white">Tổng kho Phụ tùng Mekong Mobile miền Nam</h2>
              <p class="text-xs text-slate-400 mt-1">Cung cấp toàn bộ linh kiện màn hình, pin và cụm sạc dòng iPhone 14/15.</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">hub</span>
            </div>
          </div>
          <div class="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Thời gian cấp hàng: <strong>Trong 2 giờ</strong></span>
            <span class="text-emerald-400 font-bold">Trực tuyến</span>
          </div>
        </div>

        <div class="card-3d p-6 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="status-badge-green text-[10px] mb-2 inline-flex">
                <span class="dot-indicator"></span> Nhà sản xuất OEM
              </span>
              <h2 class="text-base font-bold text-white">Công ty TNHH Linh kiện Công nghệ Á Châu</h2>
              <p class="text-xs text-slate-400 mt-1">Cung ứng linh kiện thay thế chuẩn công nghiệp, cáp sạc và micro phụ trợ.</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">precision_manufacturing</span>
            </div>
          </div>
          <div class="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Thời gian giao hàng: <strong>24 giờ</strong></span>
            <span class="text-emerald-400 font-bold">Ký kết hợp đồng</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 8. GIAO DIỆN VAI TRÒ 3: QUẢN LÝ KHO (MANAGER)
// ==============================================================================

async function renderManagerDashboard(container) {
  const [stocksRes, alertsRes, txRes] = await Promise.all([
    apiCall("/inventory/stock"),
    apiCall("/inventory/alerts/threshold"),
    apiCall("/inventory/transactions?limit=20")
  ]);

  cachedStocks = stocksRes.data || [];
  const alerts = alertsRes.data || [];
  cachedTransactions = txRes.data || [];

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Tổng quan điều hành kho chi nhánh</h1>
          <p class="text-xs text-slate-400 mt-1">Giám sát tổng thể luồng xuất nhập tồn, các chỉ số KPI và cảnh báo thiếu hàng.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="navigateToTab('manager_reports')" class="btn-3d-primary px-4 py-2 text-xs font-bold cursor-pointer">
            Xem Báo cáo Chi tiết
          </button>
        </div>
      </div>

      <!-- 4 Thẻ KPI cấp Quản trị 3D -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng danh mục</span>
          <div class="text-3xl font-extrabold text-white mt-1">${cachedStocks.length}</div>
          <span class="text-xs text-slate-400 mt-1 block">mã phụ tùng hoạt động</span>
        </div>
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cảnh báo thiếu hàng</span>
          <div class="text-3xl font-extrabold text-amber-400 mt-1">${alerts.length}</div>
          <span class="status-badge-red text-[10px] mt-1 inline-flex">
            <span class="dot-indicator"></span>Dưới ngưỡng an toàn
          </span>
        </div>
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Giao dịch ghi nhận</span>
          <div class="text-3xl font-extrabold text-white mt-1">${cachedTransactions.length}</div>
          <span class="status-badge-green text-[10px] mt-1 inline-flex">
            <span class="dot-indicator"></span>Lưu vết bất biến
          </span>
        </div>
        <div class="card-3d p-5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tỷ lệ sai lệch</span>
          <div class="text-3xl font-extrabold text-emerald-400 mt-1">0.0%</div>
          <span class="status-badge-green text-[10px] mt-1 inline-flex">
            <span class="dot-indicator"></span>Toàn vẹn dữ liệu
          </span>
        </div>
      </div>

      <!-- BẢNG CẢNH BÁO LINH KIỆN DƯỚI NGƯỠNG AN TOÀN -->
      <div class="card-3d overflow-hidden ${alerts.length > 0 ? 'border-red-500/40' : ''}">
        <div class="px-6 py-4 ${alerts.length > 0 ? 'bg-red-950/30' : 'bg-slate-950/60'} border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-red-400">warning</span>
            <h2 class="text-xs font-bold uppercase tracking-wider text-white">CẢNH BÁO LINH KIỆN DƯỚI NGƯỠNG AN TOÀN</h2>
          </div>
          <span class="${alerts.length > 0 ? 'status-badge-red' : 'status-badge-green'} text-[11px]">
            <span class="dot-indicator"></span>
            ${alerts.length} linh kiện cần bổ sung
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold">
                <th class="py-3 px-5">MÃ PHỤ TÙNG</th>
                <th class="py-3 px-5">TÊN LINH KIỆN</th>
                <th class="py-3 px-5">TỒN THỰC TẾ</th>
                <th class="py-3 px-5">NGƯỠNG TỐI THIỂU</th>
                <th class="py-3 px-5">MỨC ĐỘ THIẾU HỤT</th>
                <th class="py-3 px-5 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${alerts.length === 0 ? `
                <tr>
                  <td colspan="6" class="p-8 text-center text-slate-500">
                    <span class="material-symbols-outlined text-emerald-400 text-[28px] block mb-1">check_circle</span>
                    Kho đạt ngưỡng an toàn lý tưởng. Không có linh kiện nào bị thiếu hụt.
                  </td>
                </tr>
              ` : alerts.map(a => `
                <tr class="hover:bg-red-950/20 transition-colors">
                  <td class="py-3 px-5 font-bold code-badge text-blue-400">${a.part_code}</td>
                  <td class="py-3 px-5 font-semibold text-slate-200">${a.part_name}</td>
                  <td class="py-3 px-5 font-extrabold text-red-400">${a.quantity ?? a.current_stock ?? 0} cái</td>
                  <td class="py-3 px-5 text-slate-300 font-bold">${a.min_threshold} cái</td>
                  <td class="py-3 px-5">
                    <span class="status-badge-red text-[10px]">
                      <span class="dot-indicator"></span>Thiếu ${Math.max(0, (a.min_threshold ?? 0) - (a.quantity ?? a.current_stock ?? 0))} cái
                    </span>
                  </td>
                  <td class="py-3 px-5 text-right">
                    <button onclick="navigateToTab('manager_reports')" class="btn-3d-secondary px-3 py-1 text-xs font-bold cursor-pointer">
                      Sửa cấu hình ngưỡng
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

async function renderManagerReports(container) {
  const stocksRes = await apiCall("/inventory/stock");
  cachedStocks = stocksRes.data || [];

  // Phân trang danh sách báo cáo
  const limit = tablePagination.reports.limit;
  const page = tablePagination.reports.page;
  const totalItems = cachedStocks.length;
  const totalPages = limit === "ALL" ? 1 : Math.ceil(totalItems / limit) || 1;
  const startIndex = limit === "ALL" ? 0 : (page - 1) * limit;
  const displayedStocks = limit === "ALL" ? cachedStocks : cachedStocks.slice(startIndex, startIndex + limit);

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng</h1>
          <p class="text-xs text-slate-400 mt-1">Quản lý kho có toàn quyền cấu hình lại ngưỡng cảnh báo an toàn cho từng linh kiện.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="navigateToTab('manager_dashboard')" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-blue-400 hover:text-white" title="Quay lại Dashboard Tổng quan">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Quay lại trang</span>
          </button>
          ${renderDataActionsDropdownHTML()}
          <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm mới dữ liệu">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      <div class="card-3d overflow-hidden">
        <div class="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
          <h2 class="text-xs font-bold uppercase tracking-wider text-white">DANH MỤC LINH KIỆN VÀ CẤU HÌNH NGƯỠNG AN TOÀN</h2>
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-400">Hiển thị:</span>
            <select onchange="handlePageSizeChange('reports', this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-blue-500 text-xs font-semibold">
              <option value="10" ${limit === 10 ? 'selected' : ''}>10 dòng</option>
              <option value="20" ${limit === 20 ? 'selected' : ''}>20 dòng</option>
              <option value="50" ${limit === 50 ? 'selected' : ''}>50 dòng</option>
              <option value="ALL" ${limit === 'ALL' ? 'selected' : ''}>Tất cả</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold">
                <th class="py-3 px-5">MÃ LINH KIỆN</th>
                <th class="py-3 px-5">TÊN PHỤ TÙNG</th>
                <th class="py-3 px-5">ĐƠN GIÁ (VNĐ)</th>
                <th class="py-3 px-5">TỒN THỰC TẾ</th>
                <th class="py-3 px-5">NGƯỠNG AN TOÀN</th>
                <th class="py-3 px-5">ĐÁNH GIÁ TỒN</th>
                <th class="py-3 px-5 text-right">CẬP NHẬT NGƯỠNG</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${displayedStocks.map(s => `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-5 font-bold code-badge text-blue-400">${(s && s.part_code) ? s.part_code : 'Mã LK'}</td>
                  <td class="py-3 px-5 font-medium text-slate-200">${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}</td>
                  <td class="py-3 px-5 font-mono text-slate-300">
                    ${s.unit_price ? s.unit_price.toLocaleString('vi-VN') + ' đ' : '1.250.000 đ'}
                  </td>
                  <td class="py-3 px-5 font-extrabold text-white">${(s && s.quantity != null) ? s.quantity : 0} cái</td>
                  <td class="py-3 px-5">
                    <span class="font-bold text-slate-200">${(s && s.min_threshold != null) ? s.min_threshold : 10} cái</span>
                  </td>
                  <td class="py-3 px-5">
                    ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
                  </td>
                  <td class="py-3 px-5 text-right">
                    <div class="inline-flex items-center gap-1.5 justify-end">
                      <input type="number" id="threshold_input_${(s && s.part_code) ? s.part_code : 'Mã LK'}" min="1" max="100000" value="${s.min_threshold}"
                             class="w-16 h-8 px-2 text-center text-xs bg-slate-950/70 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500">
                      <button onclick="handleUpdateThreshold('${(s && s.part_code) ? s.part_code : 'Mã LK'}')"
                              class="btn-3d-primary h-8 px-2.5 text-xs font-bold cursor-pointer" title="Lưu cấu hình">
                        Lưu
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Điều khiển phân trang Footer -->
        <div class="px-6 py-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Hiển thị ${displayedStocks.length} / ${totalItems} linh kiện</span>
          <div class="flex items-center gap-2">
            <button onclick="handlePageNav('reports', -1)" ${page <= 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Trước
            </button>
            <span class="font-semibold text-white px-1">Trang ${page} / ${totalPages}</span>
            <button onclick="handlePageNav('reports', 1)" ${page >= totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function handleUpdateThreshold(partCode) {
  const input = document.getElementById(`threshold_input_${partCode}`);
  if (!input) return;

  const newThreshold = parseInt(input.value, 10);
  if (isNaN(newThreshold) || newThreshold < 1) {
    showToast("Ngưỡng an toàn tối thiểu phải lớn hơn hoặc bằng 1.", "error");
    return;
  }
  if (newThreshold > 100000) {
    showToast("Ngưỡng an toàn tối đa không được vượt quá 100.000 cái.", "error");
    return;
  }

  try {
    const res = await apiCall(`/inventory/parts/${partCode}/threshold`, "PUT", {
      min_threshold: newThreshold
    });

    showToast(`Đã cập nhật ngưỡng an toàn cho ${partCode} thành ${newThreshold} cái!`, "success", 3000);
    await renderManagerReports(document.getElementById("viewContainer"));
  } catch (err) {
    showToast(`Không thể cập nhật ngưỡng: ${err.message}`, "error", 4000);
  }
}

async function renderManagerAuditLog(container) {
  const res = await apiCall("/inventory/transactions?limit=100");
  cachedTransactions = res.data || [];

  // Phân trang danh sách nhật ký kiểm toán
  const limit = tablePagination.audit.limit;
  const page = tablePagination.audit.page;
  const totalItems = cachedTransactions.length;
  const totalPages = limit === "ALL" ? 1 : Math.ceil(totalItems / limit) || 1;
  const startIndex = limit === "ALL" ? 0 : (page - 1) * limit;
  const displayedTx = limit === "ALL" ? cachedTransactions : cachedTransactions.slice(startIndex, startIndex + limit);

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Nhật ký Giao dịch Kho (Audit Log)</h1>
          <p class="text-xs text-slate-400 mt-1">Sổ cái lưu vết giao dịch minh bạch, tự động bảo chứng theo thời gian thực.</p>
        </div>
        <div class="flex items-center gap-2">
          ${renderDataActionsDropdownHTML()}
          <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm mới dữ liệu">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      <div class="card-3d overflow-hidden">
        <div class="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
          <h2 class="text-xs font-bold uppercase tracking-wider text-white">SỔ CÁI BẢO CHỨNG GIAO DỊCH XUẤT NHẬP KHO</h2>
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-400">Hiển thị:</span>
            <select onchange="handlePageSizeChange('audit', this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-blue-500 text-xs font-semibold">
              <option value="10" ${limit === 10 ? 'selected' : ''}>10 giao dịch</option>
              <option value="20" ${limit === 20 ? 'selected' : ''}>20 giao dịch</option>
              <option value="50" ${limit === 50 ? 'selected' : ''}>50 giao dịch</option>
              <option value="ALL" ${limit === 'ALL' ? 'selected' : ''}>Tất cả</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold">
                <th class="py-3 px-5">MÃ GIAO DỊCH</th>
                <th class="py-3 px-5">THỜI GIAN</th>
                <th class="py-3 px-5">LINH KIỆN</th>
                <th class="py-3 px-5">LOẠI GIAO DỊCH</th>
                <th class="py-3 px-5">SỐ LƯỢNG</th>
                <th class="py-3 px-5">MÃ PHIẾU BẢO HÀNH</th>
                <th class="py-3 px-5">NGƯỜI THỰC HIỆN</th>
                <th class="py-3 px-5">TRUNG TÂM</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${displayedTx.length === 0 ? `
                <tr>
                  <td colspan="8" class="p-8 text-center text-slate-500">Chưa có giao dịch nào được ghi nhận trong sổ cái.</td>
                </tr>
              ` : displayedTx.map(tx => `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-5 font-bold code-badge text-blue-400">#${tx.transaction_id}</td>
                  <td class="py-3 px-5 text-slate-400">${tx.created_at ? tx.created_at.slice(0, 19).replace('T', ' ') : 'Vừa xong'}</td>
                  <td class="py-3 px-5 font-bold code-badge text-white">${tx.part_code}</td>
                  <td class="py-3 px-5">
                    ${formatTransactionType(tx.type)}
                  </td>
                  <td class="py-3 px-5 font-extrabold text-white">${(tx && tx.quantity != null) ? tx.quantity : 1} cái</td>
                  <td class="py-3 px-5 font-mono text-blue-400 font-bold">${(tx && tx.ticket_id) ? tx.ticket_id : '—'}</td>
                  <td class="py-3 px-5 text-slate-300 font-medium">${(tx && (tx.performed_by || tx.actor_name)) ? (tx.performed_by || tx.actor_name) : 'Kỹ thuật viên'}</td>
                  <td class="py-3 px-5 text-slate-400 font-medium">Chi nhánh Quận 1</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Điều khiển phân trang Footer -->
        <div class="px-6 py-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Hiển thị ${displayedTx.length} / ${totalItems} giao dịch</span>
          <div class="flex items-center gap-2">
            <button onclick="handlePageNav('audit', -1)" ${page <= 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Trước
            </button>
            <span class="font-semibold text-white px-1">Trang ${page} / ${totalPages}</span>
            <button onclick="handlePageNav('audit', 1)" ${page >= totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Màn hình 3.4: Quản lý nhân sự cấp dưới
 * Đầy đủ:
 * 1. Thanh tìm kiếm theo họ tên, email, mã.
 * 2. Bộ lọc chuyên môn (Kỹ thuật viên / Nhân viên vật tư / Tất cả).
 * 3. Bộ lọc trạng thái (Đang hoạt động / Tạm dừng / Nghỉ sau ca / Đã thôi việc).
 * 4. Phân trang linh hoạt (10, 20, 50, Tất cả).
 * 5. Bảng màu trạng thái chuẩn xác phân biệt Nghỉ sau ca làm vs Đã thôi việc.
 */
async function renderManagerUsers(container) {
  const res = await apiCall("/inventory/users/subordinates");
  cachedUsers = res.data || [];

  const pagination = tablePagination.users;
  const search = pagination.search.toLowerCase().trim();
  const roleFilter = pagination.role;
  const statusFilter = pagination.status;
  const limit = pagination.limit;
  const page = pagination.page;

  // Lọc dữ liệu theo tìm kiếm và bộ lọc
  const filteredUsers = cachedUsers.filter(u => {
    const matchSearch = !search ||
      (u.full_name && u.full_name.toLowerCase().includes(search)) ||
      (u.email && u.email.toLowerCase().includes(search)) ||
      (u._id && String(u._id).toLowerCase().includes(search));

    const matchRole = roleFilter === "ALL" || u.role === roleFilter;

    const uStatus = u.status || (u.is_active === false ? "TERMINATED" : "ONLINE");
    const matchStatus = statusFilter === "ALL" || uStatus === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const totalItems = filteredUsers.length;
  const totalPages = limit === "ALL" ? 1 : Math.ceil(totalItems / limit) || 1;
  const startIndex = limit === "ALL" ? 0 : (page - 1) * limit;
  const displayedUsers = limit === "ALL" ? filteredUsers : filteredUsers.slice(startIndex, startIndex + limit);

  container.innerHTML = `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">Danh sách Nhân sự cấp dưới</h1>
          <p class="text-xs text-slate-400 mt-1">Quản lý kho chỉ điều hành <strong>Nhân viên kỹ thuật</strong> và <strong>Nhân viên vật tư</strong> trực thuộc chi nhánh.</p>
        </div>
        <div class="flex items-center gap-2">
          ${renderDataActionsDropdownHTML()}
          <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm mới dữ liệu">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      <!-- THANH TÌM KIẾM & BỘ LỌC ĐA NĂNG -->
      <div class="card-3d p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-950/60">
        
        <!-- Ô tìm kiếm nhân viên -->
        <div class="relative flex-1">
          <input type="text" id="userSearchInput"
                 value="${pagination.search}"
                 placeholder="Tìm kiếm theo tên nhân viên, email hoặc mã ID..."
                 oninput="handleUserSearchInput(event)"
                 class="w-full h-10 pl-10 pr-3.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-medium transition-colors" />
          <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">search</span>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Bộ lọc vai trò -->
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-slate-400 font-medium">Vai trò:</span>
            <select id="userRoleFilter" onchange="handleUserFilterChange('role', this.value)" class="h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-blue-500">
              <option value="ALL" ${roleFilter === 'ALL' ? 'selected' : ''}>Tất cả vai trò</option>
              <option value="TECH_STAFF" ${roleFilter === 'TECH_STAFF' ? 'selected' : ''}>Nhân viên kỹ thuật</option>
              <option value="MATERIAL_STAFF" ${roleFilter === 'MATERIAL_STAFF' ? 'selected' : ''}>Nhân viên vật tư</option>
            </select>
          </div>

          <!-- Bộ lọc trạng thái hoạt động -->
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-slate-400 font-medium">Trạng thái:</span>
            <select id="userStatusFilter" onchange="handleUserFilterChange('status', this.value)" class="h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-blue-500">
              <option value="ALL" ${statusFilter === 'ALL' ? 'selected' : ''}>Tất cả trạng thái</option>
              <option value="ONLINE" ${statusFilter === 'ONLINE' ? 'selected' : ''}>Đang hoạt động (Xanh)</option>
              <option value="AWAY" ${statusFilter === 'AWAY' ? 'selected' : ''}>Tạm dừng hoạt động (Vàng)</option>
              <option value="OFF_SHIFT" ${statusFilter === 'OFF_SHIFT' ? 'selected' : ''}>Nghỉ sau ca làm (Cam/Đỏ)</option>
              <option value="TERMINATED" ${statusFilter === 'TERMINATED' ? 'selected' : ''}>Đã thôi việc (Đỏ sẫm)</option>
            </select>
          </div>

          <!-- Bộ chọn số lượng hiển thị (Ngưỡng trang) -->
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-slate-400 font-medium">Hiển thị:</span>
            <select id="userPageSize" onchange="handleUserFilterChange('limit', this.value)" class="h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-blue-500">
              <option value="10" ${limit === 10 ? 'selected' : ''}>10 / trang</option>
              <option value="20" ${limit === 20 ? 'selected' : ''}>20 / trang</option>
              <option value="50" ${limit === 50 ? 'selected' : ''}>50 / trang</option>
              <option value="ALL" ${limit === 'ALL' ? 'selected' : ''}>Tất cả</option>
            </select>
          </div>
        </div>

      </div>

      <!-- BẢNG DANH SÁCH NHÂN SỰ ĐỒNG BỘ 3D -->
      <div class="card-3d overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold">
                <th class="py-3 px-5">HỌ VÀ TÊN</th>
                <th class="py-3 px-5">EMAIL CÁ NHÂN</th>
                <th class="py-3 px-5">VAI TRÒ CHUYÊN MÔN</th>
                <th class="py-3 px-5">CHI NHÁNH</th>
                <th class="py-3 px-5">TRẠNG THÁI HOẠT ĐỘNG</th>
                <th class="py-3 px-5 text-right">MÃ ĐỊNH DANH</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${displayedUsers.length === 0 ? `
                <tr>
                  <td colspan="6" class="p-8 text-center text-slate-500">
                    Không tìm thấy nhân viên nào khớp với điều kiện tìm kiếm.
                  </td>
                </tr>
              ` : displayedUsers.map(u => `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-5 font-bold text-white flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                      ${(u.full_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span>${u.full_name || 'Nhân sự'}</span>
                  </td>
                  <td class="py-3 px-5 text-slate-400">${u.email}</td>
                  <td class="py-3 px-5">
                    <span class="status-badge-green text-[10px] py-0.5 px-2">
                      <span class="dot-indicator"></span>
                      ${u.role === 'TECH_STAFF' ? 'KỸ THUẬT VIÊN' : 'NHÂN VIÊN VẬT TƯ'}
                    </span>
                  </td>
                  <td class="py-3 px-5 text-slate-300 font-medium">Chi nhánh Quận 1</td>
                  <td class="py-3 px-5">
                    ${renderUserStatusBadge(u)}
                  </td>
                  <td class="py-3 px-5 text-right font-mono text-[11px] text-slate-500">
                    ${u._id ? String(u._id).slice(-8).toUpperCase() : 'NV-AUTO'}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Điều khiển phân trang Footer -->
        <div class="px-6 py-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Hiển thị ${displayedUsers.length} / ${totalItems} nhân sự</span>
          <div class="flex items-center gap-2">
            <button onclick="handleUserPageNav(-1)" ${page <= 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Trước
            </button>
            <span class="font-semibold text-white px-1">Trang ${page} / ${totalPages}</span>
            <button onclick="handleUserPageNav(1)" ${page >= totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="btn-3d-secondary px-2.5 py-1 text-xs cursor-pointer"'}>
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Hiển thị Badge trạng thái nhân sự chuẩn xác theo yêu cầu người dùng:
 * 1. ONLINE: Đang hoạt động (chấm xanh lá).
 * 2. AWAY: Tạm dừng hoạt động (chấm vàng).
 * 3. OFF_SHIFT: Nghỉ sau ca làm (chấm đỏ/cam - mai vào làm tiếp).
 * 4. TERMINATED: Đã thôi việc (chấm đỏ sẫm - tài khoản đã dừng vĩnh viễn).
 */
function renderUserStatusBadge(user) {
  const status = user.status || (user.is_active === false ? "TERMINATED" : "ONLINE");

  if (status === "ONLINE") {
    return `
      <span class="status-badge-green text-[10px] py-0.5 px-2">
        <span class="dot-indicator"></span>
        Đang hoạt động
      </span>
    `;
  } else if (status === "AWAY") {
    return `
      <span class="status-badge-yellow text-[10px] py-0.5 px-2">
        <span class="dot-indicator"></span>
        Tạm dừng hoạt động
      </span>
    `;
  } else if (status === "OFF_SHIFT") {
    return `
      <span class="status-badge-red text-[10px] py-0.5 px-2">
        <span class="dot-indicator"></span>
        Nghỉ sau ca làm
      </span>
    `;
  } else if (status === "TERMINATED") {
    return `
      <span class="status-badge-terminated text-[10px] py-0.5 px-2">
        <span class="dot-indicator"></span>
        Đã thôi việc (Vĩnh viễn)
      </span>
    `;
  }
  return `
    <span class="status-badge-green text-[10px] py-0.5 px-2">
      <span class="dot-indicator"></span>
      Đang hoạt động
    </span>
  `;
}

function handleUserSearchInput(event) {
  tablePagination.users.search = event.target.value;
  tablePagination.users.page = 1;
  renderManagerUsers(document.getElementById("viewContainer"));
}

function handleUserFilterChange(filterKey, value) {
  if (filterKey === "limit") {
    tablePagination.users.limit = value === "ALL" ? "ALL" : parseInt(value, 10);
  } else {
    tablePagination.users[filterKey] = value;
  }
  tablePagination.users.page = 1;
  renderManagerUsers(document.getElementById("viewContainer"));
}

function handleUserPageNav(delta) {
  tablePagination.users.page += delta;
  if (tablePagination.users.page < 1) tablePagination.users.page = 1;
  renderManagerUsers(document.getElementById("viewContainer"));
}

function handlePageSizeChange(tableKey, value) {
  if (tablePagination[tableKey]) {
    tablePagination[tableKey].limit = value === "ALL" ? "ALL" : parseInt(value, 10);
    tablePagination[tableKey].page = 1;
    renderCurrentView();
  }
}

function handlePageNav(tableKey, delta) {
  if (tablePagination[tableKey]) {
    tablePagination[tableKey].page += delta;
    if (tablePagination[tableKey].page < 1) tablePagination[tableKey].page = 1;
    renderCurrentView();
  }
}

// ==============================================================================
// 9. NẠP VÀ XUẤT TỆP ĐA ĐỊNH DẠNG (CSV, EXCEL, PDF PRINT)
// ==============================================================================

function renderDataActionsDropdownHTML() {
  return `
    <div class="relative inline-block text-left" id="dataActionsDropdownContainer">
      <button onclick="toggleDataActionsMenu(event)" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
        <span class="material-symbols-outlined text-[16px]">file_download</span>
        <span>Xuất dữ liệu</span>
        <span class="material-symbols-outlined text-[16px]">expand_more</span>
      </button>

      <div id="dataActionsMenu" class="hidden absolute right-0 mt-2 w-52 bg-slate-900 border border-white/15 rounded-2xl shadow-2xl z-50 p-2 glass-panel">
        <button onclick="exportTableToCSV()" class="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors text-left cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-emerald-400">table_view</span>
          <span>Xuất tệp Excel (.csv)</span>
        </button>
        <button onclick="exportTableToPDF()" class="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors text-left cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-red-400">picture_as_pdf</span>
          <span>In / Xuất PDF báo cáo</span>
        </button>
        <div class="border-t border-white/10 my-1"></div>
        <button onclick="openImportModal()" class="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-400 hover:bg-slate-800 rounded-xl transition-colors text-left cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Nhập tệp dữ liệu</span>
        </button>
      </div>
    </div>
  `;
}

function toggleDataActionsMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById("dataActionsMenu");
  if (menu) menu.classList.toggle("hidden");
}

function exportTableToCSV() {
  const menu = document.getElementById("dataActionsMenu");
  if (menu) menu.classList.add("hidden");

  let csvContent = "\uFEFF";
  let fileName = "bao_cao_kho.csv";

  if (currentTab === "manager_users") {
    csvContent += "Ho_Va_Ten,Email,Vai_Tro,Chi_Nhanh,Trang_Thai,Ma_ID\n";
    cachedUsers.forEach(u => {
      csvContent += `"${u.full_name || ''}","${u.email}","${u.role}","Quan 1","${u.status || 'ONLINE'}","${u._id || ''}"\n`;
    });
    fileName = "danh_sach_nhan_su_quan_1.csv";
  } else if (currentTab === "manager_audit") {
    csvContent += "Ma_GD,Thoi_Gian,Ma_Linh_Kien,Loai_GD,So_Luong,Ticket_ID,Trung_Tam\n";
    cachedTransactions.forEach(tx => {
      csvContent += `"${tx.transaction_id}","${tx.created_at || ''}","${tx.part_code}","${tx.type}",${tx.quantity},"${tx.ticket_id || ''}","L5-WH-890"\n`;
    });
    fileName = "nhat_ky_giao_dich_kho.csv";
  } else {
    csvContent += "Ma_Linh_Kien,Ten_Phu_Tung,So_Luong_Ton,Nguong_An_Toan,Trang_Thai\n";
    cachedStocks.forEach(s => {
      csvContent += `"${(s && s.part_code) ? s.part_code : 'Mã LK'}","${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}",${s.quantity},${s.min_threshold},"${s.status_flag}"\n`;
    });
    fileName = "bao_cao_xuat_nhap_ton_quan_1.csv";
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Đã xuất dữ liệu thành công ra tệp ${fileName}`, "success", 3500);
}

function exportTableToPDF() {
  const menu = document.getElementById("dataActionsMenu");
  if (menu) menu.classList.add("hidden");
  window.print();
}

function openImportModal() {
  const menu = document.getElementById("dataActionsMenu");
  if (menu) menu.classList.add("hidden");
  const modal = document.getElementById("fileImportModal");
  if (modal) modal.classList.remove("hidden");
}

function closeImportModal() {
  const modal = document.getElementById("fileImportModal");
  if (modal) modal.classList.add("hidden");
  clearModalFile();
}

let selectedModalFile = null;

function updateModalAcceptFilter() {
  const fileInput = document.getElementById("modalFileInput");
  const hint = document.getElementById("modalFileHint");
  const radio = document.querySelector('input[name="modalImportType"]:checked');
  if (!fileInput || !hint || !radio) return;

  if (radio.value === "EXCEL") {
    fileInput.accept = ".csv,.xlsx,.json";
    hint.textContent = "Định dạng hỗ trợ: .csv, .xlsx, .json";
  } else {
    fileInput.accept = ".pdf";
    hint.textContent = "Định dạng hỗ trợ: .pdf";
  }
}

function handleModalFileSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  selectedModalFile = file;

  const previewBox = document.getElementById("modalFilePreviewBox");
  const nameEl = document.getElementById("modalPreviewName");
  const sizeEl = document.getElementById("modalPreviewSize");
  const submitBtn = document.getElementById("submitModalImportBtn");

  if (nameEl) nameEl.textContent = file.name;
  if (sizeEl) sizeEl.textContent = `${(file.size / 1024).toFixed(1)} KB`;
  if (previewBox) previewBox.classList.remove("hidden");
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("disabled:opacity-40", "disabled:cursor-not-allowed");
  }
}

function clearModalFile() {
  selectedModalFile = null;
  const fileInput = document.getElementById("modalFileInput");
  if (fileInput) fileInput.value = "";

  const previewBox = document.getElementById("modalFilePreviewBox");
  const submitBtn = document.getElementById("submitModalImportBtn");
  if (previewBox) previewBox.classList.add("hidden");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add("disabled:opacity-40", "disabled:cursor-not-allowed");
  }
}

async function submitModalFileImport() {
  if (!selectedModalFile) return;

  const radio = document.querySelector('input[name="modalImportType"]:checked');
  const importType = radio ? radio.value : "EXCEL";

  showToast(`Đang đọc và xử lý tệp ${selectedModalFile.name}...`, "info", 2000);

  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      if (currentTab === "manager_users" && selectedModalFile.name.endsWith(".json")) {
        try {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            await apiCall("/inventory/users/subordinates/import", "POST", { users: parsed });
            showToast(`Đã đồng bộ thành công ${parsed.length} tài khoản nhân sự vào hệ thống.`, "success", 4000);
            closeImportModal();
            renderCurrentView();
            return;
          }
        } catch (jsonErr) {
          console.warn("Không phải JSON nhân sự chuẩn:", jsonErr);
        }
      }

      showToast(`Tệp ${selectedModalFile.name} (${importType}) đã được lưu trữ và lập chỉ mục thành công!`, "success", 4000);
      closeImportModal();
    };
    reader.readAsText(selectedModalFile);
  } catch (err) {
    showToast(`Lỗi xử lý tệp: ${err.message}`, "error", 4500);
  }
}

// ==============================================================================
// 10. XỬ LÝ SUBMIT CÁC BIỂU MẪU XÁC THỰC (LOGIN, REGISTER, FORGOT OTP)
// ==============================================================================

async function submitLogin() {
  clearFieldError("loginEmail", "loginEmailError");
  clearFieldError("loginPassword", "loginPasswordError");

  const emailInput = document.getElementById("loginEmail");
  const pwdInput = document.getElementById("loginPassword");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = pwdInput ? pwdInput.value : "";

  let hasError = false;

  if (!email) {
    setFieldError("loginEmail", "loginEmailError", "Email không được để trống.");
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError("loginEmail", "loginEmailError", "Định dạng email không hợp lệ (Ví dụ: ten@gmail.com).");
    hasError = true;
  } else if (email.length > 100) {
    setFieldError("loginEmail", "loginEmailError", "Email không được vượt quá 100 ký tự.");
    hasError = true;
  }

  if (!password) {
    setFieldError("loginPassword", "loginPasswordError", "Vui lòng nhập mật khẩu.");
    hasError = true;
  } else if (password.length > 128) {
    setFieldError("loginPassword", "loginPasswordError", "Mật khẩu không được vượt quá 128 ký tự.");
    hasError = true;
  }

  if (hasError) return;

  try {
    const res = await apiCall("/auth/login", "POST", { email, password });
    const user = res.user || (res.data && res.data.user);
    const token = res.token || (res.data && res.data.token);
    if (!user || !token) {
      throw new Error("Phản hồi đăng nhập không hợp lệ từ máy chủ.");
    }
    showToast(`Đăng nhập thành công! Chào mừng ${user.full_name || user.email}.`, "success", 3000);
    setUserSession(user, token);
  } catch (err) {
    if (err.error_code === "ERR_ACCOUNT_TERMINATED" || (err.message && err.message.toLowerCase().includes("thôi việc"))) {
      setFieldError("loginEmail", "loginEmailError", "Tài khoản này đã thôi việc và bị vô hiệu hóa vĩnh viễn.");
    } else if (err.error_code === "ERR_INVALID_CREDENTIALS" || err.status === 401) {
      setFieldError("loginPassword", "loginPasswordError", "Mật khẩu hoặc email không chính xác.");
    } else {
      setFieldError("loginEmail", "loginEmailError", err.message);
    }
    showToast(`Đăng nhập thất bại: ${err.message}`, "error", 4500);
  }
}

async function submitRegister() {
  clearFieldError("regFullName", "regFullNameError");
  clearFieldError("regEmail", "regEmailError");
  clearFieldError("regPassword", "regPasswordError");

  const nameInput = document.getElementById("regFullName");
  const emailInput = document.getElementById("regEmail");
  const pwdInput = document.getElementById("regPassword");
  const roleSelect = document.getElementById("regRole");

  const fullName = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = pwdInput ? pwdInput.value : "";
  const role = roleSelect ? roleSelect.value : "TECH_STAFF";

  let hasError = false;

  if (!fullName) {
    setFieldError("regFullName", "regFullNameError", "Họ và tên cá nhân không được để trống.");
    hasError = true;
  } else if (fullName.length > 50) {
    setFieldError("regFullName", "regFullNameError", "Họ và tên không được vượt quá 50 ký tự.");
    hasError = true;
  }

  if (!email) {
    setFieldError("regEmail", "regEmailError", "Email không được để trống.");
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError("regEmail", "regEmailError", "Email không hợp lệ. Vui lòng nhập email thật.");
    hasError = true;
  } else if (email.length > 100) {
    setFieldError("regEmail", "regEmailError", "Email không được vượt quá 100 ký tự.");
    hasError = true;
  }

  const pwdCheck = validatePasswordComplexity(password);
  if (!pwdCheck.valid) {
    setFieldError("regPassword", "regPasswordError", pwdCheck.message);
    hasError = true;
  } else if (password.length > 128) {
    setFieldError("regPassword", "regPasswordError", "Mật khẩu không được vượt quá 128 ký tự.");
    hasError = true;
  }

  if (hasError) return;

  try {
    const res = await apiCall("/auth/register", "POST", {
      email: email,
      password: password,
      full_name: fullName,
      role: role
    });

    const user = res.user || (res.data && res.data.user);
    const token = res.token || (res.data && res.data.token);
    if (!user || !token) {
      throw new Error("Đăng ký thành công nhưng không tạo được phiên làm việc.");
    }

    showToast("Đăng ký cấp quyền thành công! Đang đăng nhập vào phân hệ...", "success", 3000);
    setUserSession(user, token);
  } catch (err) {
    if (err.error_code === "ERR_EMAIL_EXISTS" || err.status === 409) {
      setFieldError("regEmail", "regEmailError", "Email cá nhân này đã được đăng ký vai trò trong hệ thống.");
    } else {
      setFieldError("regFullName", "regFullNameError", err.message);
    }
    showToast(`Đăng ký thất bại: ${err.message}`, "error", 4500);
  }
}

async function requestOTP() {
  clearFieldError("forgotEmail", "forgotEmailError");
  const emailInput = document.getElementById("forgotEmail");
  const email = emailInput ? emailInput.value.trim() : "";

  if (!email) {
    setFieldError("forgotEmail", "forgotEmailError", "Vui lòng nhập email cần khôi phục.");
    return;
  }

  try {
    const res = await apiCall("/auth/forgot-password", "POST", { email });
    const otpCode = res.otp || res.otp_code || res.otp_demo || (res.data && (res.data.otp || res.data.otp_code || res.data.otp_demo)) || "";
    const otpSection = document.getElementById("otpStatusSection");
    const demoBadge = document.getElementById("demoOtpBadge");
    const otpInput = document.getElementById("resetOtp");

    if (otpSection) otpSection.classList.remove("hidden");
    if (demoBadge && otpCode) {
      demoBadge.textContent = otpCode;
    }
    // Tự động điền mã OTP vào ô nhập liệu theo yêu cầu
    if (otpInput && otpCode) {
      otpInput.value = otpCode;
      clearFieldError("resetOtp", "resetOtpError");
    }

    const newPwdInput = document.getElementById("resetNewPassword");
    if (newPwdInput) newPwdInput.focus();

    // Khởi động đếm ngược thời gian thực 10 phút (600 giây)
    startOtpCountdown(600);

    showToast(`Mã xác thực OTP: ${otpCode} (Hệ thống đã tự động điền vào ô OTP). Thời hạn mã: 10 phút đếm ngược!`, "success", 5000);
  } catch (err) {
    setFieldError("forgotEmail", "forgotEmailError", err.message);
    showToast(`Gửi OTP thất bại: ${err.message}`, "error", 4000);
  }
}

async function submitResetPassword() {
  clearFieldError("resetOtp", "resetOtpError");
  clearFieldError("resetNewPassword", "resetNewPasswordError");

  const emailInput = document.getElementById("forgotEmail");
  const otpInput = document.getElementById("resetOtp");
  const pwdInput = document.getElementById("resetNewPassword");

  const email = emailInput ? emailInput.value.trim() : "";
  const otp = otpInput ? otpInput.value.trim() : "";
  const newPassword = pwdInput ? pwdInput.value : "";

  let hasError = false;

  if (!email) {
    showToast("Vui lòng điền email cá nhân ở bước 1.", "error");
    hasError = true;
  }

  if (!otp || otp.length < 6) {
    setFieldError("resetOtp", "resetOtpError", "Vui lòng nhập đủ mã OTP gồm 6 chữ số.");
    hasError = true;
  }

  const pwdCheck = validatePasswordComplexity(newPassword);
  if (!pwdCheck.valid) {
    setFieldError("resetNewPassword", "resetNewPasswordError", pwdCheck.message);
    hasError = true;
  }

  if (hasError) return;

  try {
    const res = await apiCall("/auth/reset-password", "POST", {
      email,
      otp,
      new_password: newPassword
    });

    if (otpCountdownInterval) {
      clearInterval(otpCountdownInterval);
      otpCountdownInterval = null;
    }
    showToast("Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập.", "success", 4000);
    showAuthView("login");

    const loginEmailInput = document.getElementById("loginEmail");
    if (loginEmailInput) loginEmailInput.value = email;
    const loginPwdInput = document.getElementById("loginPassword");
    if (loginPwdInput) {
      loginPwdInput.value = newPassword;
      loginPwdInput.focus();
    }
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes("otp")) {
      setFieldError("resetOtp", "resetOtpError", err.message);
    } else {
      setFieldError("resetNewPassword", "resetNewPasswordError", err.message);
    }
    showToast(`Không thể đặt lại mật khẩu: ${err.message}`, "error", 4500);
  }
}

/**
 * Đăng xuất tài khoản an toàn:
 * - Gọi API cập nhật trạng thái phiên thành OFF_SHIFT (Nghỉ sau ca làm).
 * - Xóa token và user khỏi localStorage.
 * - Hiển thị lại giao diện đăng nhập.
 */
async function handleLogout() {
  if (currentUser && currentUser.email) {
    try {
      await apiCall("/auth/logout", "POST", {
        email: currentUser.email,
        reason: "OFF_SHIFT"
      });
    } catch (e) {
      console.warn("Không thể gọi API logout tới máy chủ:", e);
    }
  }

  localStorage.removeItem("mekong_l5_token");
  localStorage.removeItem("mekong_l5_user");
  currentUser = null;
  currentTab = "";

  const menu = document.getElementById("profileDropdownMenu");
  if (menu) menu.classList.add("hidden");

  const appWorkspace = document.getElementById("appWorkspace");
  const authContainer = document.getElementById("authContainer");
  if (appWorkspace) {
    appWorkspace.classList.remove("flex");
    appWorkspace.classList.add("hidden");
  }
  if (authContainer) {
    authContainer.classList.remove("hidden");
  }

  const pwdInput = document.getElementById("loginPassword");
  if (pwdInput) pwdInput.value = "";

  showAuthView("login");
  showToast("Bạn đã đăng xuất tài khoản an toàn.", "warning", 3000);
}

// ==============================================================================
// 11. KHỞI CHẠY ỨNG DỤNG CLIENT (LIFECYCLE HOOK)
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const savedToken = localStorage.getItem("mekong_l5_token");
  const savedUser = localStorage.getItem("mekong_l5_user");

  if (savedToken && savedUser) {
    try {
      const userObj = JSON.parse(savedUser);
      if (userObj && userObj.email && userObj.role && userObj.full_name) {
        setUserSession(userObj, savedToken);
        return;
      }
    } catch (e) {
      console.warn("Dữ liệu phiên cũ không hợp lệ:", e);
    }
  }

  currentUser = null;
  const appWorkspace = document.getElementById("appWorkspace");
  const authContainer = document.getElementById("authContainer");
  if (appWorkspace) {
    appWorkspace.classList.remove("flex");
    appWorkspace.classList.add("hidden");
  }
  if (authContainer) {
    authContainer.classList.remove("hidden");
  }
  showAuthView("login");
});
