import os
import re
import shutil

APP_JS_PATH = r"src/static/app.js"
with open(APP_JS_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# -------------------------------------------------------------
# 1. Add formatTicketStatus and formatTransactionType & OTP countdown
# -------------------------------------------------------------
helper_code = """
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
"""

# Insert helper functions after showToast
if "let otpCountdownInterval = null;" not in content:
    target = 'function showToast(message, type = "info", duration = 3500) {'
    idx = content.find(target)
    if idx != -1:
        # Find end of showToast
        end_idx = content.find("function setFieldError(", idx)
        if end_idx != -1:
            content = content[:end_idx] + helper_code + "\n\n" + content[end_idx:]

# -------------------------------------------------------------
# 2. Update requestOTP to start countdown timer (10 minutes = 600s)
# -------------------------------------------------------------
req_otp_old = """    const newPwdInput = document.getElementById("resetNewPassword");
    if (newPwdInput) newPwdInput.focus();

    showToast(`Mã xác thực OTP: ${otpCode} (Hệ thống đã tự động điền vào ô OTP). Vui lòng nhập mật khẩu mới!`, "success", 5000);"""

req_otp_new = """    const newPwdInput = document.getElementById("resetNewPassword");
    if (newPwdInput) newPwdInput.focus();

    // Khởi động đếm ngược thời gian thực 10 phút (600 giây)
    startOtpCountdown(600);

    showToast(`Mã xác thực OTP: ${otpCode} (Hệ thống đã tự động điền vào ô OTP). Thời hạn mã: 10 phút đếm ngược!`, "success", 5000);"""

content = content.replace(req_otp_old, req_otp_new)

# In submitResetPassword, clear the countdown on success
reset_pwd_success_old = """    showToast("Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập.", "success", 4000);"""
reset_pwd_success_new = """    if (otpCountdownInterval) {
      clearInterval(otpCountdownInterval);
      otpCountdownInterval = null;
    }
    showToast("Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập.", "success", 4000);"""

content = content.replace(reset_pwd_success_old, reset_pwd_success_new)

# -------------------------------------------------------------
# 3. Manager Sidebar: Remove manager_reports from menuItems
# -------------------------------------------------------------
sidebar_manager_old = """  } else if (currentUser.role === "MANAGER") {
    menuItems = [
      { id: "manager_dashboard", label: "Dashboard Tổng quan", icon: "analytics" },
      { id: "manager_reports", label: "Báo cáo Xuất Nhập Tồn", icon: "bar_chart" },
      { id: "manager_audit", label: "Nhật ký Giao dịch Kho", icon: "receipt_long" },
      { id: "manager_users", label: "Quản lý nhân sự", icon: "group" }
    ];
  }"""

sidebar_manager_new = """  } else if (currentUser.role === "MANAGER") {
    menuItems = [
      { id: "manager_dashboard", label: "Dashboard Tổng quan", icon: "analytics" },
      { id: "manager_audit", label: "Nhật ký Giao dịch Kho", icon: "receipt_long" },
      { id: "manager_users", label: "Quản lý nhân sự", icon: "group" }
    ];
  }"""

content = content.replace(sidebar_manager_old, sidebar_manager_new)

# -------------------------------------------------------------
# 4. Manager Reports: Add "Quay lại trang" button in header
# -------------------------------------------------------------
manager_reports_hdr_old = """        <div class="flex items-center gap-2">
          ${renderDataActionsDropdownHTML()}
          <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm mới dữ liệu">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>"""

manager_reports_hdr_new = """        <div class="flex items-center gap-2">
          <button onclick="navigateToTab('manager_dashboard')" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-blue-400 hover:text-white" title="Quay lại Dashboard Tổng quan">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Quay lại trang</span>
          </button>
          ${renderDataActionsDropdownHTML()}
          <button onclick="renderCurrentView()" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer" title="Làm mới dữ liệu">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>"""

content = content.replace(manager_reports_hdr_old, manager_reports_hdr_new)

# -------------------------------------------------------------
# 5. Material Dashboard: Remove "Tạo lệnh Nhập kho mới" button
# -------------------------------------------------------------
mat_dash_btn_old = """        <button onclick="navigateToTab('material_stock_in')" class="btn-3d-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">add_box</span>
          <span>Tạo lệnh Nhập kho mới</span>
        </button>"""

mat_dash_btn_new = """        <div class="card-3d px-3.5 py-1.5 text-xs text-slate-300 font-semibold flex items-center gap-1.5">
          <span class="status-badge-green text-[10px] py-0 px-1.5"><span class="dot-indicator"></span>Trung tâm Vật tư Quận 1</span>
        </div>"""

content = content.replace(mat_dash_btn_old, mat_dash_btn_new)

# -------------------------------------------------------------
# 6. Tech Dashboard: Use formatTicketStatus in table
# -------------------------------------------------------------
tech_ticket_badge_old = """                <td class="py-3 px-5">
                  <span class="status-badge-yellow text-[10px]">
                    <span class="dot-indicator"></span>
                    ${t.status || 'Chờ linh kiện'}
                  </span>
                </td>"""

tech_ticket_badge_new = """                <td class="py-3 px-5">
                  ${formatTicketStatus(t.status)}
                </td>"""

content = content.replace(tech_ticket_badge_old, tech_ticket_badge_new)

# -------------------------------------------------------------
# 7. Tech History & Manager Audit: Use formatTransactionType
# -------------------------------------------------------------
tech_hist_type_old = """                <td class="py-3 px-5">
                  <span class="${tx.type === 'OUT' ? 'status-badge-yellow' : 'status-badge-green'} text-[10px]">
                    <span class="dot-indicator"></span>
                    ${tx.type === 'OUT' ? 'Xuất thay thế' : 'Hoàn trả kho'}
                  </span>
                </td>"""

tech_hist_type_new = """                <td class="py-3 px-5">
                  ${formatTransactionType(tx.type)}
                </td>"""

content = content.replace(tech_hist_type_old, tech_hist_type_new)

audit_table_row_old = """                  <td class="py-3 px-5">
                    <span class="${
                      tx.type === 'OUT' ? 'status-badge-yellow' : 'status-badge-green'
                    } text-[10px] py-0.5 px-2">
                      <span class="dot-indicator"></span>
                      ${tx.type === 'OUT' ? 'XUẤT SỬA' : tx.type === 'IN' ? 'NHẬP KHO' : 'HOÀN TRẢ'}
                    </span>
                  </td>
                  <td class="py-3 px-5 font-extrabold text-white">${tx.quantity} cái</td>
                  <td class="py-3 px-5 font-mono text-slate-400">${tx.ticket_id || '—'}</td>
                  <td class="py-3 px-5 text-slate-400 font-medium">Chi nhánh Quận 1</td>"""

audit_table_row_new = """                  <td class="py-3 px-5">
                    ${formatTransactionType(tx.type)}
                  </td>
                  <td class="py-3 px-5 font-extrabold text-white">${tx.quantity} cái</td>
                  <td class="py-3 px-5 font-mono text-blue-400 font-bold">${tx.ticket_id || '—'}</td>
                  <td class="py-3 px-5 text-slate-300 font-medium">${tx.performed_by || tx.actor_name || 'Kỹ thuật viên'}</td>
                  <td class="py-3 px-5 text-slate-400 font-medium">Chi nhánh Quận 1</td>"""

content = content.replace(audit_table_row_old, audit_table_row_new)

# Audit table header: add NGƯỜI THỰC HIỆN
audit_tbl_hdr_old = """                <th class="py-3 px-5">SỐ LƯỢNG</th>
                <th class="py-3 px-5">MÃ PHIẾU BẢO HÀNH</th>
                <th class="py-3 px-5">TRUNG TÂM</th>"""

audit_tbl_hdr_new = """                <th class="py-3 px-5">SỐ LƯỢNG</th>
                <th class="py-3 px-5">MÃ PHIẾU BẢO HÀNH</th>
                <th class="py-3 px-5">NGƯỜI THỰC HIỆN</th>
                <th class="py-3 px-5">TRUNG TÂM</th>"""

content = content.replace(audit_tbl_hdr_old, audit_tbl_hdr_new)

# Colspan for empty audit table
content = content.replace('colspan="7" class="p-8 text-center text-slate-500">Chưa có giao dịch', 'colspan="8" class="p-8 text-center text-slate-500">Chưa có giao dịch')

# -------------------------------------------------------------
# 8. Material Stock In: Add Side-by-Side Statistics Table
# -------------------------------------------------------------
stock_in_old_start = 'async function renderMaterialStockIn(container) {'
stock_in_old_end = 'function updateStockInPreview() {'

idx_start = content.find(stock_in_old_start)
idx_end = content.find(stock_in_old_end)

if idx_start != -1 and idx_end != -1:
    new_stock_in_func = """async function renderMaterialStockIn(container) {
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
                  <option value="${s.part_code}" data-qty="${s.quantity}" data-threshold="${s.min_threshold}">
                    ${s.part_code} — ${s.part_name} (Hiện có: ${s.quantity})
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
                        <span class="font-bold text-white code-badge text-[11px]">${s.part_code}</span>
                        <span class="text-[10px] text-slate-400 truncate max-w-[150px]">${s.part_name}</span>
                      </div>
                    </td>
                    <td class="py-2.5 px-3 text-center">
                      <span class="font-extrabold ${s.quantity <= s.min_threshold ? 'text-amber-400' : 'text-white'}">
                        ${s.quantity}
                      </span>
                      <span class="text-[10px] text-slate-500">/${s.min_threshold}</span>
                    </td>
                    <td class="py-2.5 px-3 text-right">
                      <button onclick="selectPartForStockIn('${s.part_code}')" class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold cursor-pointer">
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

"""
    content = content[:idx_start] + new_stock_in_func + content[idx_end:]

# -------------------------------------------------------------
# 9. Tech Staff Lookup & Transaction: Completely Revised Logic
# -------------------------------------------------------------
tx_start = 'async function renderTechTransaction(container) {'
tx_end = '/**\n * Trả về Badge ngữ nghĩa 3 màu sắc chuẩn theo yêu cầu:'

idx_tx_start = content.find(tx_start)
idx_tx_end = content.find(tx_end)

if idx_tx_start != -1 and idx_tx_end != -1:
    new_tech_tx = """async function renderTechTransaction(container) {
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
              <span class="text-[11px] text-slate-500 font-medium">Gõ để gợi ý hoặc bấm Tra cứu</span>
            </div>

            <!-- Ô tìm kiếm thông minh: Không điền sẵn nội dung, hỗ trợ gõ gợi ý hoặc Enter -->
            <div class="flex items-center gap-2">
              <div class="relative flex-1">
                <input type="text" id="smartPartSearch"
                       autocomplete="off"
                       value=""
                       placeholder="Nhập thông tin linh kiện (Mã hoặc Tên)..."
                       oninput="handleSmartPartSearch(event)"
                       onkeydown="handleSmartSearchKeyDown(event)"
                       onfocus="showPartSuggestionsDropdown()"
                       class="w-full h-10 pl-10 pr-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-medium transition-colors placeholder:text-slate-500" />
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px] pointer-events-none">search</span>
              </div>
              <button type="button" id="btnTraCuuPart" onclick="executeSmartLookup()" class="btn-3d-primary h-10 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all">
                <span class="material-symbols-outlined text-[16px]">manage_search</span>
                <span id="btnTraCuuText">Tra cứu</span>
              </button>
            </div>

            <!-- Dropdown danh sách gợi ý khi gõ hoặc click vào ô tìm kiếm -->
            <div id="partSuggestionsDropdown" class="hidden absolute top-full left-0 right-14 mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto p-1.5 glass-panel">
              <div id="suggestionsList" class="flex flex-col gap-1">
                <!-- Nạp động từ handleSmartPartSearch -->
              </div>
            </div>

            <!-- Hidden input lưu trữ part_code hiện tại -->
            <select id="txPartSelect" class="hidden">
              <option value="" selected>-- Chưa chọn linh kiện --</option>
              ${cachedStocks.map(s => `
                <option value="${s.part_code}">
                  ${s.part_code}
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
                <span class="dot-indicator"></span>Nhập từ khóa hoặc bấm Tra cứu
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
              <input type="text" id="ticketIdInput" placeholder="Ví dụ: TK-1092, TK-2026-8892" value="TK-1092"
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
              <div onclick="selectPartForTransaction('${s.part_code}')"
                   class="p-3 border border-white/10 bg-slate-950/40 rounded-xl hover:border-blue-500/60 hover:bg-slate-800/50 transition-all cursor-pointer flex items-center justify-between group">
                <div class="flex flex-col">
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-xs text-white code-badge group-hover:text-blue-400">${s.part_code}</span>
                    ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
                  </div>
                  <span class="text-[11px] text-slate-400 truncate max-w-[210px] mt-0.5">${s.part_name}</span>
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
"""
    content = content[:idx_tx_start] + new_tech_tx + content[idx_tx_end:]

# -------------------------------------------------------------
# 10. Update handleSmartPartSearch, executeSmartLookup, resetTechTransactionForm
# -------------------------------------------------------------
lookup_funcs_old = """function showPartSuggestionsDropdown() {
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.remove("hidden");
  const query = (document.getElementById("smartPartSearch")?.value || "").toLowerCase().trim();
  const filtered = query 
    ? cachedStocks.filter(s => s.part_code.toLowerCase().includes(query) || s.part_name.toLowerCase().includes(query))
    : cachedStocks;
  renderPartSuggestions(filtered);
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
    <div onclick="selectPartFromAutocomplete('${s.part_code}')"
         class="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors border border-transparent hover:border-white/10">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="font-bold text-white code-badge">${s.part_code}</span>
          ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
        </div>
        <span class="text-[11px] text-slate-400 mt-0.5">${s.part_name}</span>
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
  const defaultPart = cachedStocks[0];
  if (defaultPart) {
    selectPartForTransaction(defaultPart.part_code);
  }

  const ticketInput = document.getElementById("ticketIdInput");
  if (ticketInput) ticketInput.value = "TK-1092";

  const qtyInput = document.getElementById("txQtyInput");
  if (qtyInput) qtyInput.value = 1;

  const outRadio = document.querySelector('input[name="txType"][value="OUT"]');
  if (outRadio) outRadio.checked = true;

  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const alertBox = document.getElementById("negativeStockAlert");
  if (alertBox) alertBox.classList.add("hidden");

  validateLiveStockQuantity();
  showToast("Đã đặt lại toàn bộ biểu mẫu về trạng thái chuẩn.", "info", 2000);
}"""

lookup_funcs_new = """function showPartSuggestionsDropdown() {
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.remove("hidden");
  const rawQuery = (document.getElementById("smartPartSearch")?.value || "").trim().toLowerCase();
  
  // Xử lý chuỗi tìm kiếm thông minh: Bỏ qua ký tự phân tách nếu chuỗi là "CODE — NAME"
  const cleanQuery = rawQuery.includes("—") ? rawQuery.split("—")[0].trim() : rawQuery;

  const filtered = cleanQuery 
    ? cachedStocks.filter(s => {
        const code = s.part_code.toLowerCase();
        const name = s.part_name.toLowerCase();
        return code.includes(cleanQuery) || name.includes(cleanQuery) || cleanQuery.split(/\\s+/).every(token => code.includes(token) || name.includes(token));
      })
    : cachedStocks;

  renderPartSuggestions(filtered);
}

function handleSmartSearchKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    executeSmartLookup();
  }
}

function handleSmartPartSearch(event) {
  const rawQuery = (event.target.value || "").trim().toLowerCase();
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.remove("hidden");

  const cleanQuery = rawQuery.includes("—") ? rawQuery.split("—")[0].trim() : rawQuery;

  const filtered = cleanQuery
    ? cachedStocks.filter(s => {
        const code = s.part_code.toLowerCase();
        const name = s.part_name.toLowerCase();
        return code.includes(cleanQuery) || name.includes(cleanQuery) || cleanQuery.split(/\\s+/).every(token => code.includes(token) || name.includes(token));
      })
    : cachedStocks;

  renderPartSuggestions(filtered);
}

function renderPartSuggestions(partsList) {
  const container = document.getElementById("suggestionsList");
  if (!container) return;

  if (partsList.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
        <span class="material-symbols-outlined text-[22px] text-amber-400">search_off</span>
        <span>Không tìm thấy linh kiện phù hợp với từ khóa.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = partsList.map(s => `
    <div onclick="selectPartFromAutocomplete('${s.part_code}')"
         class="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors border border-transparent hover:border-white/10 group">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="font-bold text-white code-badge group-hover:text-blue-400">${s.part_code}</span>
          ${getSemanticStockBadge(s.quantity, s.min_threshold, true)}
        </div>
        <span class="text-[11px] text-slate-400 mt-0.5">${s.part_name}</span>
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
  const btn = document.getElementById("btnTraCuuPart");
  const rawQuery = (input?.value || "").trim().toLowerCase();

  if (!rawQuery) {
    showToast("Vui lòng nhập mã hoặc tên linh kiện vào ô tìm kiếm.", "warning", 3000);
    showPartSuggestionsDropdown();
    return;
  }

  // Tách query
  const cleanQuery = rawQuery.includes("—") ? rawQuery.split("—")[0].trim() : rawQuery;

  // 1. Ưu tiên khớp chính xác mã linh kiện
  let match = cachedStocks.find(s => s.part_code.toLowerCase() === cleanQuery);

  // 2. Khớp bắt đầu bằng mã
  if (!match) {
    match = cachedStocks.find(s => s.part_code.toLowerCase().startsWith(cleanQuery));
  }

  // 3. Khớp chuỗi chứa trong mã hoặc tên
  if (!match) {
    match = cachedStocks.find(s => 
      s.part_code.toLowerCase().includes(cleanQuery) ||
      s.part_name.toLowerCase().includes(cleanQuery)
    );
  }

  // 4. Khớp từng từ khóa
  if (!match) {
    const tokens = cleanQuery.split(/\\s+/);
    match = cachedStocks.find(s => {
      const fullText = `${s.part_code} ${s.part_name}`.toLowerCase();
      return tokens.every(t => fullText.includes(t));
    });
  }

  if (match) {
    selectPartForTransaction(match.part_code);
    const dropdown = document.getElementById("partSuggestionsDropdown");
    if (dropdown) dropdown.classList.add("hidden");

    // Hiệu ứng phản hồi trực quan trên nút Tra cứu và ô Input
    if (input) {
      input.classList.add("border-emerald-500", "ring-2", "ring-emerald-500/30");
      setTimeout(() => input.classList.remove("border-emerald-500", "ring-2", "ring-emerald-500/30"), 1800);
    }
    if (btn) {
      const btnText = document.getElementById("btnTraCuuText");
      if (btnText) btnText.textContent = "Đã tìm thấy";
      btn.classList.add("bg-emerald-600");
      setTimeout(() => {
        if (btnText) btnText.textContent = "Tra cứu";
        btn.classList.remove("bg-emerald-600");
      }, 1800);
    }
    showToast(`Đã tìm thấy: ${match.part_code} — ${match.part_name} (Tồn kho: ${match.quantity} cái)`, "success", 3000);
  } else {
    // Mở dropdown hiển thị "Không tìm thấy linh kiện phù hợp"
    const dropdown = document.getElementById("partSuggestionsDropdown");
    if (dropdown) {
      dropdown.classList.remove("hidden");
      renderPartSuggestions([]);
    }
    showToast(`Không tìm thấy linh kiện nào khớp với từ khóa "${input.value}". Vui lòng thử từ khóa khác.`, "warning", 3500);
  }
}

function selectPartForTransaction(partCode) {
  const stockItem = cachedStocks.find(s => s.part_code === partCode);
  if (!stockItem) return;

  // Cập nhật ô nhập thông minh với định dạng chuẩn
  const smartInput = document.getElementById("smartPartSearch");
  if (smartInput) {
    smartInput.value = `${stockItem.part_code} — ${stockItem.part_name}`;
    clearFieldError("txPartSelect", "txPartSelectError");
    smartInput.classList.add("border-blue-500");
    setTimeout(() => smartInput.classList.remove("border-blue-500"), 1200);
  }

  // Đồng bộ với txPartSelect ẩn
  const select = document.getElementById("txPartSelect");
  if (select) {
    select.value = partCode;
  }

  // Cập nhật thẻ chỉ số thời gian thực
  const qtyEl = document.getElementById("displayQty");
  const badgeEl = document.getElementById("displayBadge");

  if (qtyEl) {
    qtyEl.innerHTML = `<span class="text-2xl font-black text-white">${stockItem.quantity}</span> <span class="font-bold text-slate-400 text-xs">cái</span>`;
  }
  if (badgeEl) {
    badgeEl.innerHTML = getSemanticStockBadge(stockItem.quantity, stockItem.min_threshold);
  }

  validateLiveStockQuantity();
  const dropdown = document.getElementById("partSuggestionsDropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

function resetTechTransactionForm() {
  const smartInput = document.getElementById("smartPartSearch");
  if (smartInput) smartInput.value = "";

  const select = document.getElementById("txPartSelect");
  if (select) select.value = "";

  const qtyEl = document.getElementById("displayQty");
  const badgeEl = document.getElementById("displayBadge");

  if (qtyEl) qtyEl.innerHTML = `<span class="text-sm font-bold text-slate-300">Chưa chọn linh kiện</span>`;
  if (badgeEl) {
    badgeEl.innerHTML = `<span class="status-badge-yellow text-[10px] py-1 px-2.5"><span class="dot-indicator"></span>Nhập từ khóa hoặc bấm Tra cứu</span>`;
  }

  const calcText = document.getElementById("stockCalculationText");
  if (calcText) calcText.textContent = "Chưa chọn linh kiện";

  const ticketInput = document.getElementById("ticketIdInput");
  if (ticketInput) ticketInput.value = "TK-1092";

  const qtyInput = document.getElementById("txQtyInput");
  if (qtyInput) qtyInput.value = 1;

  const outRadio = document.querySelector('input[name="txType"][value="OUT"]');
  if (outRadio) outRadio.checked = true;

  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const alertBox = document.getElementById("negativeStockAlert");
  if (alertBox) alertBox.classList.add("hidden");

  showToast("Đã đặt lại toàn bộ biểu mẫu về trạng thái ban đầu.", "info", 2000);
}"""

content = content.replace(lookup_funcs_old, lookup_funcs_new)

# In validateLiveStockQuantity: handle case when no part is selected yet
val_old = """function validateLiveStockQuantity() {
  const select = document.getElementById("txPartSelect");
  const qtyInput = document.getElementById("txQtyInput");
  const calcText = document.getElementById("stockCalculationText");
  const alertBox = document.getElementById("negativeStockAlert");
  const submitBtn = document.getElementById("submitTxBtn");

  if (!select || !qtyInput) return;

  const partCode = select.value;
  const stockItem = cachedStocks.find(s => s.part_code === partCode);
  if (!stockItem) return;"""

val_new = """function validateLiveStockQuantity() {
  const select = document.getElementById("txPartSelect");
  const qtyInput = document.getElementById("txQtyInput");
  const calcText = document.getElementById("stockCalculationText");
  const alertBox = document.getElementById("negativeStockAlert");
  const submitBtn = document.getElementById("submitTxBtn");

  if (!select || !qtyInput) return;

  const partCode = select.value;
  if (!partCode) {
    if (calcText) calcText.textContent = "Chưa chọn linh kiện";
    if (alertBox) alertBox.classList.add("hidden");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
    return;
  }

  const stockItem = cachedStocks.find(s => s.part_code === partCode);
  if (!stockItem) return;"""

content = content.replace(val_old, val_new)

# In submitTechTransaction: validate if part is selected
submit_tx_old = """async function submitTechTransaction() {
  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const partSelect = document.getElementById("txPartSelect");
  const ticketInput = document.getElementById("ticketIdInput");
  const qtyInput = document.getElementById("txQtyInput");
  const typeRadio = document.querySelector('input[name="txType"]:checked');

  const partCode = partSelect ? partSelect.value : "";"""

submit_tx_new = """async function submitTechTransaction() {
  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const partSelect = document.getElementById("txPartSelect");
  const ticketInput = document.getElementById("ticketIdInput");
  const qtyInput = document.getElementById("txQtyInput");
  const typeRadio = document.querySelector('input[name="txType"]:checked');

  const partCode = partSelect ? partSelect.value : "";
  if (!partCode) {
    setFieldError("txPartSelect", "txPartSelectError", "Vui lòng tra cứu và chọn linh kiện cần thực hiện giao dịch.");
    showToast("Vui lòng tra cứu và chọn linh kiện cần thực hiện giao dịch.", "error", 3500);
    return;
  }"""

content = content.replace(submit_tx_old, submit_tx_new)

# Write to src/static/app.js
with open(APP_JS_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully updated {APP_JS_PATH}!")

# Sync to backend/src/static/app.js and frontend/public/app.js
dest1 = r"backend/src/static/app.js"
dest2 = r"frontend/public/app.js"

shutil.copyfile(APP_JS_PATH, dest1)
shutil.copyfile(APP_JS_PATH, dest2)
print(f"Synced to {dest1} and {dest2}!")
