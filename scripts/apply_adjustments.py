import os
import re
import shutil

APP_JS = r"src/static/app.js"
with open(APP_JS, "r", encoding="utf-8") as f:
    content = f.read()

# -------------------------------------------------------------------
# 1. Giao diện Tra cứu & Giao dịch: Loại bỏ nút "Tra cứu"
# -------------------------------------------------------------------
search_div_old = """            <!-- Ô tìm kiếm thông minh: Không điền sẵn nội dung, hỗ trợ gõ gợi ý hoặc Enter -->
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
            <div id="partSuggestionsDropdown" class="hidden absolute top-full left-0 right-14 mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto p-1.5 glass-panel">"""

search_div_new = """            <!-- Ô tìm kiếm thông minh: Không cần nút Tra cứu, hỗ trợ gợi ý dropdown và phím Enter -->
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
            <div id="partSuggestionsDropdown" class="hidden absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto p-1.5 glass-panel">"""

content = content.replace(search_div_old, search_div_new)
content = content.replace('Gõ để gợi ý hoặc bấm Tra cứu', 'Gõ để xem gợi ý hoặc bấm Enter để chọn')

# Update executeSmartLookup feedback (since btnTraCuuPart is removed)
lookup_old = """    if (btn) {
      const btnText = document.getElementById("btnTraCuuText");
      if (btnText) btnText.textContent = "Đã tìm thấy";
      btn.classList.add("bg-emerald-600");
      setTimeout(() => {
        if (btnText) btnText.textContent = "Tra cứu";
        btn.classList.remove("bg-emerald-600");
      }, 1800);
    }"""

lookup_new = """    // Hiển thị hiệu ứng viền sáng xanh lá trên ô tìm kiếm
    if (input) {
      input.classList.add("border-emerald-500", "ring-2", "ring-emerald-500/30");
      setTimeout(() => input.classList.remove("border-emerald-500", "ring-2", "ring-emerald-500/30"), 1800);
    }"""

content = content.replace(lookup_old, lookup_new)

# -------------------------------------------------------------------
# 2. Nút "Đặt lại biểu mẫu": Xóa sạch toàn bộ thông tin về ban đầu
# -------------------------------------------------------------------
reset_func_old = """function resetTechTransactionForm() {
  const defaultPart = cachedStocks[0];
  if (defaultPart) {
    selectPartForTransaction(defaultPart.part_code);
  }

  const ticketInput = document.getElementById("ticketIdInput");
  if (ticketInput) ticketInput.value = "TK-1092";

  const qtyInput = document.getElementById("txQtyInput");
  if (qtyInput) qtyInput.value = "1";

  const outRadio = document.querySelector('input[name="txType"][value="OUT"]');
  if (outRadio) outRadio.checked = true;

  clearFieldError("txPartSelect", "txPartSelectError");
  clearFieldError("ticketIdInput", "ticketIdInputError");
  clearFieldError("txQtyInput", "txQtyInputError");

  const alertBox = document.getElementById("negativeStockAlert");
  if (alertBox) alertBox.classList.add("hidden");

  validateLiveStockQuantity();
  showToast("Đã đặt lại biểu mẫu giao dịch về trạng thái mặc định.", "info", 2500);
}"""

reset_func_new = """function resetTechTransactionForm() {
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
}"""

content = content.replace(reset_func_old, reset_func_new)

# -------------------------------------------------------------------
# 3. Giao diện Nhật ký Giao dịch & Quản lý nhân sự: Bỏ "Quay lại trang"
# -------------------------------------------------------------------
audit_hdr_back_btn = """        <div class="flex items-center gap-2">
          <button onclick="navigateToTab('manager_dashboard')" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-blue-400 hover:text-white" title="Quay lại Dashboard Tổng quan">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Quay lại trang</span>
          </button>
          ${renderDataActionsDropdownHTML()}"""

audit_hdr_no_back = """        <div class="flex items-center gap-2">
          ${renderDataActionsDropdownHTML()}"""

content = content.replace(audit_hdr_back_btn, audit_hdr_no_back)

# Also in renderManagerUsers:
users_hdr_back_btn = """        <div class="flex items-center gap-2">
          <button onclick="navigateToTab('manager_dashboard')" class="btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer text-blue-400 hover:text-white" title="Quay lại Dashboard Tổng quan">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Quay lại trang</span>
          </button>
          ${renderDataActionsDropdownHTML()}"""

content = content.replace(users_hdr_back_btn, audit_hdr_no_back)

# -------------------------------------------------------------------
# 4. Ngăn chặn triệt để cụm từ "undefined" trên toàn bộ giao diện
# -------------------------------------------------------------------
# Safeguard customer_name, device_model, part_name, quantity, ticket_id
content = content.replace("${t.customer_name || 'Khách vãng lai'}", "${(t && t.customer_name) ? t.customer_name : 'Khách vãng lai'}")
content = content.replace("${t.device_model || 'Thiết bị tiếp nhận'}", "${(t && t.device_model) ? t.device_model : 'Thiết bị tiếp nhận'}")
content = content.replace("${t.requested_part_code || 'SCR-IP14-01'}", "${(t && t.requested_part_code) ? t.requested_part_code : 'SCR-IP14-01'}")
content = content.replace("${tx.ticket_id || '—'}", "${(tx && tx.ticket_id) ? tx.ticket_id : '—'}")
content = content.replace("${tx.performed_by || tx.actor_name || 'Kỹ thuật viên'}", "${(tx && (tx.performed_by || tx.actor_name)) ? (tx.performed_by || tx.actor_name) : 'Kỹ thuật viên'}")
content = content.replace("${tx.quantity} cái", "${(tx && tx.quantity != null) ? tx.quantity : 1} cái")
content = content.replace("${s.quantity} cái", "${(s && s.quantity != null) ? s.quantity : 0} cái")
content = content.replace("${s.min_threshold} cái", "${(s && s.min_threshold != null) ? s.min_threshold : 10} cái")
content = content.replace("${s.part_name}", "${(s && s.part_name) ? s.part_name : 'Linh kiện thay thế'}")
content = content.replace("${s.part_code}", "${(s && s.part_code) ? s.part_code : 'Mã LK'}")

# Write to src/static/app.js
with open(APP_JS, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully updated {APP_JS}!")

# Sync to backend/src/static/app.js and frontend/public/app.js
dest1 = r"backend/src/static/app.js"
dest2 = r"frontend/public/app.js"
shutil.copyfile(APP_JS, dest1)
shutil.copyfile(APP_JS, dest2)
print(f"Synced to {dest1} and {dest2}!")
