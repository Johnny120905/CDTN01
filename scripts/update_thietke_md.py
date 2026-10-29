import os
import shutil

THIETKE_PATH = r"docs/thietke.md"
with open(THIETKE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Update Screen 03: 15:00 -> 10:00 live countdown
content = content.replace(
    '- Timer: "timer 15:00". Demo OTP code: "123456" in white badge.', 
    '''- Timer: "10:00" LIVE COUNTDOWN (Đồng hồ đếm ngược từng giây từ 10:00 xuống 00:00).
  - Tự động điền: Mã OTP 6 số ngẫu nhiên được tự động điền ngay vào ô nhập OTP phía dưới.
  - Con mắt bật/tắt (Eye Toggle Button): Bấm vào biểu tượng con mắt để xem/ẩn mật khẩu mới.
  - Bảng checklist quy chuẩn mật khẩu: Ẩn mặc định (class hidden), chỉ kích hoạt và báo đỏ khi người dùng nhập sai quy chuẩn 8 ký tự (Hoa, thường, số, ký tự đặc biệt).'''
)

# Update Screen 05: Tech Stock Lookup
old_s05 = """[SEARCH & AUTOCOMPLETE DROPDOWN]:
- Input smartPartSearch: h-10, pl-10, background rgba(2,6,23,0.70), border slate-700, rounded-xl text-white text-xs. Icon search left. Default value prefilled.
- Button "Tra cứu": btn-3d-primary h-10 px-4 text-xs font-bold.
- Dropdown partSuggestionsDropdown: absolute top-full, background slate-900 glass-panel, border slate-700, rounded-2xl shadow-2xl max-h-64 overflow-y-auto p-1.5 z-50.
  - Items: Part Code (badge), Semantic Badge (Safe/Near Warning/Alert), Part Name, Current Quantity. On click: selects part, fills input, updates live metrics."""

new_s05 = """[SEARCH & AUTOCOMPLETE DROPDOWN]:
- Input smartPartSearch: h-10, pl-10, background rgba(2,6,23,0.70), border slate-700, rounded-xl text-white text-xs. Icon search left.
  - GIÁ TRỊ BAN ĐẦU: Rỗng (value=""), Placeholder chuẩn: "Nhập thông tin linh kiện (Mã hoặc Tên)...".
  - HỖ TRỢ PHÍM ENTER: Người dùng gõ từ khóa và bấm Enter trên bàn phím sẽ lập tức kích hoạt hàm Tra cứu / Chọn linh kiện (handleSmartSearchKeyDown).
- Button "Tra cứu" (btnTraCuuPart): btn-3d-primary h-10 px-4 text-xs font-bold.
  - PHẢN HỒI TRỰC QUAN: Khi bấm, nếu tìm thấy linh kiện sẽ đổi trạng thái sang "Đã tìm thấy" kèm icon check, viền ô nhập phát sáng xanh lá trong 1.8s và hiển thị Toast thông báo chi tiết số tồn kho.
  - NẾU KHÔNG TÌM THẤY: Tự động mở dropdown hiển thị thông báo "Không tìm thấy linh kiện phù hợp với từ khóa." và hiển thị Toast cảnh báo màu vàng.
- Dropdown partSuggestionsDropdown: absolute top-full, background slate-900 glass-panel, border slate-700, rounded-2xl shadow-2xl max-h-64 overflow-y-auto p-1.5 z-50.
  - THÔNG BÁO RỖNG: Khi từ khóa không khớp, hiển thị khối icon search_off màu vàng và dòng chữ: "Không tìm thấy linh kiện phù hợp với từ khóa."
  - Items khi tìm thấy: Part Code (badge), Semantic Badge (An toàn/Gần cảnh báo/Cảnh báo), Part Name, Current Quantity.
- Khung tồn kho thời gian thực (liveStockBox):
  - TRẠNG THÁI BAN ĐẦU (Chưa chọn): Hiển thị dòng chữ hướng dẫn "Chưa chọn linh kiện. Vui lòng nhập từ khóa hoặc bấm tra cứu".
  - TRẠNG THÁI ĐÃ CHỌN: Hiển thị số lượng tồn số lớn font-black kèm huy hiệu 3 màu ngữ nghĩa (Xanh lá > min+5, Vàng cận ngưỡng, Đỏ thiếu hàng)."""

content = content.replace(old_s05, new_s05)

# Update Material Dashboard: remove button Tao lenh nhap kho moi
old_mat_dash = '- Header: "Bảng tin Quản lý Vật tư", Subtitle "Theo dõi tốc độ tiêu thụ, tiếp nhận lô hàng mới và kiểm soát lượng vật tư cung ứng." | Button "Tạo lệnh Nhập kho mới" btn-3d-primary.'
new_mat_dash = '- Header: "Bảng tin Quản lý Vật tư", Subtitle "Theo dõi tốc độ tiêu thụ, tiếp nhận lô hàng mới và kiểm soát lượng vật tư cung ứng." | Badge "Trung tâm Vật tư Quận 1" (Đã loại bỏ nút \'Tạo lệnh Nhập kho mới\' thừa ở Main Content vì đã có danh mục riêng trên Sidebar).'
content = content.replace(old_mat_dash, new_mat_dash)

# Update Material Stock In: 2-column layout with statistics table
old_mat_in = """PROMPT STITCH - SCREEN 07: MATERIAL STOCK-IN RECEIPT
Role: Material Management Staff (MATERIAL_STAFF)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".

[FORM CONTAINER 3D]:
- Card max-width 672px (max-w-2xl), card-3d rounded-2xl, bg-slate-900/80 border white/10 p-6."""

new_mat_in = """PROMPT STITCH - SCREEN 07: MATERIAL STOCK-IN RECEIPT (2-COLUMN RESPONSIVE LAYOUT)
Role: Material Management Staff (MATERIAL_STAFF)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".

[MAIN CONTENT - BỐ CỤC 2 CỘT SONG SONG]:
- Cột 1 (Bên trái, col-span-7): BIỂU MẪU PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ
  - Header: Icon move_to_inbox, tiêu đề uppercase "PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ".
  - Field 1: Chọn mã linh kiện cần nhập (dropdown danh mục 40 linh kiện, hiển thị mã + tên + số lượng hiện có).
  - Field 2: Thẻ chỉ số 3 thông số tính toán tự động: Tồn trước nhập | Ngưỡng an toàn | Dự kiến sau nhập (số lớn màu xanh lá font-extrabold).
  - Field 3: Số lượng nhập kho (input number 1..1.000.000, cập nhật live dự kiến sau nhập).
  - Field 4: Nguồn cấp hàng / Số vận đơn (max 100 ký tự).
  - Button hành động 3D: "Ghi nhận Nhập kho" (btn-3d-primary).
- Cột 2 (Bên phải, col-span-5): BẢNG THỐNG KÊ LÔ HÀNG VẬT TƯ & TỒN HIỆN TẠI
  - Header: Icon analytics, tiêu đề "THỐNG KÊ TỒN KHO LINH KIỆN", badge số lượng 40 mặt hàng.
  - 2 Thẻ tóm tắt nhanh: "Tổng tồn khả dụng" (số lượng cái) | "Cảnh báo thiếu hụt" (số loại cạn kho).
  - Bảng cuộn thông minh: Cột Mã linh kiện, Tồn hiện tại / Ngưỡng an toàn, nút "Chọn" để tự động điền linh kiện vào biểu mẫu bên trái."""

content = content.replace(old_mat_in, new_mat_in)

# Update Manager Dashboard & Reports navigation
old_mgr_dash = """PROMPT STITCH - SCREEN 08: MANAGER OVERVIEW DASHBOARD
Role: Store & Warehouse Manager (MANAGER)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".

[HEADER SECTION]:
- Title: "Tổng quan điều hành kho chi nhánh", Subtitle "Giám sát tổng thể luồng xuất nhập tồn, các chỉ số KPI và cảnh báo thiếu hàng." | Button "Xem Báo cáo Chi tiết" btn-3d-primary."""

new_mgr_dash = """PROMPT STITCH - SCREEN 08: MANAGER OVERVIEW DASHBOARD
Role: Store & Warehouse Manager (MANAGER)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".
Sidebar: Sidebar Quản lý đã loại bỏ mục "Báo cáo Xuất Nhập Tồn" (chỉ giữ Dashboard Tổng quan, Nhật ký Giao dịch Kho, Quản lý nhân sự).

[HEADER SECTION]:
- Title: "Tổng quan điều hành kho chi nhánh", Subtitle "Giám sát tổng thể luồng xuất nhập tồn, các chỉ số KPI và cảnh báo thiếu hàng."
- Button "Xem Báo cáo Chi tiết" (btn-3d-primary): Khi click, hệ thống chuyển sang giao diện Báo cáo Xuất Nhập Tồn (Screen 09)."""

content = content.replace(old_mgr_dash, new_mgr_dash)

# Update Manager Reports with Back button
old_mgr_rep = """PROMPT STITCH - SCREEN 09: MANAGER INVENTORY REPORTS & THRESHOLD CONFIG
Role: Store & Warehouse Manager (MANAGER)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".

[HEADER SECTION]:
- Title: "Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng", Subtitle "Quản lý kho có toàn quyền cấu hình lại ngưỡng cảnh báo an toàn cho từng linh kiện." | Dropdown hành động + Refresh."""

new_mgr_rep = """PROMPT STITCH - SCREEN 09: MANAGER INVENTORY REPORTS & THRESHOLD CONFIG
Role: Store & Warehouse Manager (MANAGER)
Workspace: margin-left: 256px, padding-top: 64px, padding: 32px.
Background: Deep Space #070b14. Font: "Be Vietnam Pro".

[HEADER SECTION]:
- Title: "Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng", Subtitle "Quản lý kho có toàn quyền cấu hình lại ngưỡng cảnh báo an toàn cho từng linh kiện."
- Action Buttons:
  - Nút "Quay lại trang" (btn-3d-secondary, icon arrow_back, text-blue-400 hover:text-white): Khi click, quay trở lại Dashboard Tổng quan Quản lý kho.
  - Dropdown Sao lưu/Nhập dữ liệu + Nút Làm mới (refresh)."""

content = content.replace(old_mgr_rep, new_mgr_rep)

# Update Manager Audit Log with Vietnamese translations
old_mgr_audit = '- Table Columns: MÃ GIAO DỊCH | THỜI GIAN | LINH KIỆN | LOẠI GIAO DỊCH (badge yellow XUẤT SỬA / green NHẬP KHO) | SỐ LƯỢNG | MÃ PHIẾU BẢO HÀNH | TRUNG TÂM.'
new_mgr_audit = '- Table Columns: MÃ GIAO DỊCH | THỜI GIAN | LINH KIỆN | LOẠI GIAO DỊCH (Hiển thị CHUẨN TIẾNG VIỆT: "Xuất kho thay thế" cho mã OUT với huy hiệu vàng/cam; "Nhập kho vật tư" cho mã IN với huy hiệu xanh lá; "Hoàn trả linh kiện" cho mã RETURN với huy hiệu xanh dương) | SỐ LƯỢNG | MÃ PHIẾU BẢO HÀNH (Ticket ID) | NGƯỜI THỰC HIỆN (performed_by) | TRUNG TÂM.'
content = content.replace(old_mgr_audit, new_mgr_audit)

with open('docs/thietke.md', 'w', encoding='utf-8') as f:
    f.write(content)

with open('thietke.md', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated docs/thietke.md and thietke.md successfully!')
