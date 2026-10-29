# BẢN ĐẶC TẢ FRONTEND VÀ BỘ PROMPT CHUẨN GOOGLE STITCH TÁI TẠO 100% GIAO DIỆN GỐC (DARK 3D ELEVATION)
**Dự án:** Hệ thống Smart CRM – Mekong Mobile (Phân hệ Luồng 05: Quản lý Kho linh kiện thay thế)  
**Chi nhánh vận hành:** Chi nhánh Quận 1  
**Phông chữ bắt buộc toàn hệ thống:** **Be Vietnam Pro** (`'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif`)  
**Bộ biểu tượng:** Google Material Symbols Outlined & Inline SVG (Eye Toggle, Validation Icons)  
**Ngôn ngữ thiết kế:** Dark 3D Elevation (Deep Space `#070b14`, Dark Slate `#0b1329`, Matte Card `rgba(15, 23, 42, 0.88)`), Kính mờ đa lớp (Glassmorphism `backdrop-filter: blur(18px)`), Nút bấm xúc giác 3D Tactile (`.btn-3d-primary`, `.btn-3d-secondary`), Đổ bóng 3D đa tầng và Bo góc mềm mại (`16px` / `12px`).  
**Tài liệu liên quan:** [README.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/README.md) | [BT2.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/BT2.md) | [thaydoithietke.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/thaydoithietke.md) | [test.md](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/docs/test.md)

---

> [!IMPORTANT]
> **RÀNG BUỘC TÁI TẠO NGUYÊN BẢN TUYỆT ĐỐI CHO STITCH (STRICT ZERO-ADDITION & ZERO-OMISSION GUARANTEE):**  
> Tài liệu này được biên soạn theo đúng cấu trúc DOM thực tế của bộ mã nguồn Frontend ([src/static/index.html](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/static/index.html), [src/static/styles.css](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/static/styles.css), [src/static/app.js](file:///d:/Hoc/DH/N4/N4.HK01/Chuyende1/CDTN01/src/static/app.js)).  
> Khi người đọc sao chép (copy-paste) từng khối Prompt bên dưới vào **Google Stitch**, công cụ AI thiết kế sẽ bị khóa cứng bởi khối lệnh **`[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]`** đi kèm trong mỗi Prompt để:
> 1. **Không bị mất bất kỳ thành phần nào đang có trên website hiện tại** (giữ nguyên từng câu chữ tiếng Việt, từng cột bảng, từng thẻ KPI, từng bộ lọc, từng hiệu ứng 3D).
> 2. **Tuyệt đối không tự ý thêm vào bất kỳ thành phần ngoại lai nào nếu bản gốc không có** (không tự thêm Breadcrumbs, không tự thêm nút "Tra cứu" ở trang giao dịch Kỹ thuật viên, không tự thêm nút "Tạo lệnh Nhập kho mới" ở Dashboard Vật tư, không tự thêm mục "Báo cáo Xuất Nhập Tồn" trên Sidebar Quản lý kho, không tự thêm nút "Quay lại trang" ở Sổ cái và Quản lý nhân sự, không tự thêm khung xám "LUỒNG 05" trên Header).

---

## PHẦN I: HƯỚNG DẪN SỬ DỤNG & MASTER SYSTEM PROMPT CHO STITCH

### 1.1. Cách dán Prompt vào Google Stitch để đạt độ chính xác 100%
- **Bước 1:** Khi tạo dự án mới trên Google Stitch (chế độ **Web / Desktop App - 1440x900px**), hãy dán **Master System Prompt & Design Tokens (Mục 1.2)** vào phần thiết lập ngữ cảnh chung (Global Style / Theme Context) hoặc dán kèm ở đầu mỗi lần sinh giao diện.
- **Bước 2:** Muốn tái tạo màn hình nào trong **14 giao diện của hệ thống**, chỉ cần copy nguyên khối văn bản trong khung `text` của màn hình đó tại **Phần II** và **Phần III** rồi dán trực tiếp vào ô Prompt của Stitch.

### 1.2. Master System Prompt & Hệ thống Design Tokens 3D (Dùng chung toàn trang)

```text
[STITCH MASTER SYSTEM PROMPT — STRICT REPLICATION MODE]
You are reconstructing an existing production Single Page Application (SPA): "L5 SMART CRM — MEKONG MOBILE (Chi nhánh: Quận 1)".
You MUST follow a STRICT 1:1 EXACT REPLICATION POLICY:
1. DO NOT invent, hallucinate, or add any extra buttons, icons, breadcrumbs, search bars, charts, avatars, or navigation links that are not explicitly listed in the prompt.
2. DO NOT omit, rename, or abbreviate any Vietnamese labels, table columns, KPI cards, or form inputs specified in the prompt.
3. FONT FAMILY: Strictly use "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" for ALL text elements, headings, buttons, inputs, and tables. Use monospace font ("ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace") ONLY for elements marked as `code-badge` or `font-mono`.
4. COLOR PALETTE & 3D ELEVATION THEME:
   - Page Canvas Background (`--bg-deep-space`): `#070b14` with fixed ambient radial gradients:
     `radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.12) 0%, transparent 45%)`,
     `radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.08) 0%, transparent 45%)`.
   - 3D Card Container (`.card-3d`):
     `background: linear-gradient(145deg, rgba(15, 23, 42, 0.88) 0%, rgba(10, 17, 33, 0.94) 100%)`,
     `border: 1px solid rgba(255, 255, 255, 0.10)`,
     `border-top: 1px solid rgba(255, 255, 255, 0.18)`,
     `border-radius: 16px (1rem)`,
     `backdrop-filter: blur(16px)`,
     `box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)`.
   - Glass Panel (`.glass-panel`):
     `background: rgba(15, 23, 42, 0.88)`, `backdrop-filter: blur(18px)`, `border: 1px solid rgba(255, 255, 255, 0.12)`, `box-shadow: 0 12px 35px 0 rgba(0, 0, 0, 0.65)`.
   - Primary 3D Tactile Button (`.btn-3d-primary`):
     `background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)`, `color: #ffffff`, `border-radius: 12px (0.75rem)`, `border-top: 1px solid rgba(255, 255, 255, 0.35)`, `box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.45), 0 2px 4px 0 rgba(0, 0, 0, 0.4)`.
   - Secondary 3D Tactile Button (`.btn-3d-secondary`):
     `background: linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)`, `color: #e2e8f0`, `border-radius: 12px (0.75rem)`, `border: 1px solid rgba(255, 255, 255, 0.12)`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)`.
   - Form Inputs & Selects:
     `background: rgba(2, 6, 23, 0.60)` or `rgba(2, 6, 23, 0.70)`, `border: 1px solid #334155`, `border-radius: 12px (0.75rem)`, `color: #ffffff`, focus border `#3b82f6`.
   - 4 Semantic Status Badges (8px border-radius, inline-flex, items-center, gap 6px, 8px glowing dot indicator `.dot-indicator`):
     1. `.status-badge-green`: bg `rgba(16, 185, 129, 0.15)`, text `#34d399`, border `rgba(16, 185, 129, 0.35)`, dot `#10b981`.
     2. `.status-badge-yellow`: bg `rgba(245, 158, 11, 0.15)`, text `#fbbf24`, border `rgba(245, 158, 11, 0.35)`, dot `#f59e0b`.
     3. `.status-badge-red`: bg `rgba(239, 68, 68, 0.15)`, text `#f87171`, border `rgba(239, 68, 68, 0.35)`, dot `#ef4444`.
     4. `.status-badge-terminated`: bg `rgba(153, 27, 27, 0.25)`, text `#fca5a5`, border `rgba(239, 68, 68, 0.45)`, dot `#b91c1c`.
   - Inline Field Validation Error (`.field-error-text`):
     Red input border `#ef4444` with `rgba(239, 68, 68, 0.1)` background; error text `#f87171`, font-size `12px`, font-weight `600`, margin-top `6px` with a 16px warning circle SVG icon.
5. GLOBAL PROHIBITIONS:
   - NEVER render any secondary breadcrumb trail (e.g., NO "Kho vận & Kỹ thuật > ...").
   - NEVER render internal software requirement codes (`BR-01..05`, `FR-01..07`, `NFR-01..04`) anywhere on the UI.
   - NEVER render raw English enum codes (`OUT`, `IN`, `RETURN`, `OPEN`, `IN_PROGRESS`, `RESOLVED`, `COMPLETED`) in tables; always use the exact Vietnamese badges specified.
```

---

## PHẦN II: ĐẶC TẢ & PROMPT KHUNG GIAO DIỆN CHUNG (GLOBAL WORKSPACE SHELL)

Khung giao diện chung (`#appWorkspace`) bao bọc toàn bộ các màn hình sau khi người dùng đăng nhập thành công ở cả 3 vai trò (`TECH_STAFF`, `MATERIAL_STAFF`, `MANAGER`), bao gồm: **Top Header cố định 64px**, **Left Sidebar cố định 256px**, **Main Content Workspace (`ml-64 pt-16 p-8 pb-20`)** và **Global Footer (`ml-64`)**.

```text
PROMPT STITCH — GLOBAL WORKSPACE SHELL (HEADER + SIDEBAR + FOOTER)
Canvas: Desktop Web 1440x900px, Dark 3D Elevation theme, background #070b14, font "Be Vietnam Pro".

1. FIXED TOP HEADER (`header`, fixed top-0 left-0 right-0, height: 64px / h-16, z-index: 50):
   - Styling: Background `rgba(2, 6, 23, 0.90)` (`bg-slate-950/90`), `backdrop-filter: blur(24px)`, `border-bottom: 1px solid rgba(255, 255, 255, 0.10)`, `padding: 0 24px`, Flexbox `justify-between items-center`, `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)`.
   - LEFT BRANDING GROUP (Flexbox items-center, gap 12px):
     * 3D Logo Badge: 40x40px (`w-10 h-10`), `rounded-xl` (12px), `bg-gradient-to-br from-blue-600 to-indigo-900`, `border: 1px solid rgba(255, 255, 255, 0.20)`, `shadow-lg shadow-blue-600/30`, centered bold white text `"L5"` (font-black, 18px).
     * Brand Text Stack (Flex column, leading-tight):
       - Line 1: `"SMART CRM — MEKONG MOBILE"` (font-black, 16px, uppercase, text-white, tracking-tight).
       - Line 2: `"Chi nhánh: Quận 1"` (12px, text-slate-400 font-medium, where `"Quận 1"` is bold white `#f1f5f9`).
   - RIGHT USER PROFILE TRIGGER (`#profileDropdownBtn`):
     * Interactive button: Flex items-center, gap 10px, padding `6px`, `rounded-xl`, `hover:bg-slate-800/80`.
     * Left Text Column (right-aligned):
       - Line 1 (`#headerUserName`): User's real full name (e.g., `"Lê Văn Kỹ Thuật"`), 12px, font-bold, text-white.
       - Line 2 (`#headerUserRole`): Role name in Vietnamese (e.g., `"Nhân viên Kỹ thuật"` or `"Nhân viên Vật tư"` or `"Quản lý Kho"`), 11px, font-semibold, text-emerald-400, preceded by a 6px pulsing green dot (`bg-emerald-500 animate-pulse`).
     * Center Avatar Box: 36x36px (`w-9 h-9`), `rounded-xl`, `bg-gradient-to-br from-blue-600 to-indigo-950`, `border: 1px solid rgba(96, 165, 250, 0.30)`, centered uppercase initial letter (e.g., `"L"`), 14px, font-bold, text-white.
     * Right Icon: Material Symbol `"expand_more"`, 18px, text-slate-400.
   - PROFILE DROPDOWN MENU (`#profileDropdownMenu`, opens on click below button, absolute right-0 mt-2, width: 320px / w-80, `rounded-2xl` 16px, `.glass-panel` `bg-slate-900/95`, `border: 1px solid rgba(255,255,255,0.15)`, padding 16px, shadow-2xl):
     * Top Section (pb-3, border-b border-white/10, flex items-center gap 12px):
       - 44x44px (`w-11 h-11`) rounded-xl gradient avatar with initial letter.
       - Full name (14px font-bold text-white) and Email address (12px text-slate-400) stacked.
     * Middle Info Rows (py-3, border-b border-white/10, flex-col gap 10px, 12px):
       - Row 1: Left `"Vai trò được cấp:"` (text-slate-400) | Right `.status-badge-green` (`11px`) showing role label.
       - Row 2: Left `"Khu vực điều hành:"` (text-slate-400) | Right `"Chi nhánh Quận 1"` (font-bold text-white).
       - Row 3: Left `"Trạng thái phiên:"` (text-slate-400) | Right pulsing green dot + `"Đang hoạt động"` (font-semibold text-emerald-400).
     * Bottom Action (pt-3):
       - Full-width button: Material icon `"logout"` (18px) + exact text `"Đăng xuất tài khoản"`, 12px, font-bold, `text-red-400 hover:bg-red-500/15`, `rounded-xl`, padding `8px 12px`, left-aligned.

2. FIXED LEFT SIDEBAR (`aside`, fixed top-16 bottom-0 left-0, width: 256px / w-64, z-index: 40):
   - Styling: Background `rgba(2, 6, 23, 0.85)` (`bg-slate-950/85`), `backdrop-filter: blur(24px)`, `border-right: 1px solid rgba(255, 255, 255, 0.10)`, padding `16px`.
   - Section Header (px-3 mb-2.5): Exact text `"PHÂN HỆ NGHIỆP VỤ"`, 11px, font-extrabold, uppercase, tracking-wider, `text-blue-400`.
   - Navigation Stack (`#dynamicNav`, flex-col gap 6px):
     * Active Tab Style: `bg-gradient-to-r from-blue-600/30 to-blue-500/10`, `text-blue-400`, `border: 1px solid rgba(59, 130, 246, 0.30)`, `shadow-lg shadow-blue-500/10`, `font-bold`, `rounded-xl`, padding `10px 14px`, flex items-center gap 12px, 19px Material Symbol icon on left.
     * Inactive Tab Style: `text-slate-400 hover:text-white hover:bg-slate-800/60`, `font-semibold`, `rounded-xl`, padding `10px 14px`, flex items-center gap 12px, 19px Material Symbol icon on left.
     * STRICT ROLE-BASED MENU ITEMS (Exactly 3 items per role):
       - If Role == `TECH_STAFF` (Nhân viên Kỹ thuật):
         1. Icon `dashboard` | Label: `"Bảng tin Kỹ thuật viên"`
         2. Icon `swap_horiz` | Label: `"Tra cứu & Giao dịch"`
         3. Icon `history` | Label: `"Lịch sử tiếp nhận phiếu"`
       - If Role == `MATERIAL_STAFF` (Nhân viên Vật tư):
         1. Icon `inventory` | Label: `"Bảng tin Quản lý vật tư"`
         2. Icon `add_box` | Label: `"Nhập kho linh kiện mới"`
         3. Icon `storefront` | Label: `"Nhà cung cấp đối tác"`
       - If Role == `MANAGER` (Quản lý Kho):
         1. Icon `analytics` | Label: `"Dashboard Tổng quan"`
         2. Icon `receipt_long` | Label: `"Nhật ký Giao dịch Kho"`
         3. Icon `group` | Label: `"Quản lý nhân sự"`
         (STRICT: DO NOT include "Báo cáo Xuất Nhập Tồn" in the Manager Sidebar).

3. GLOBAL FOOTER (`footer`, margin-left: 256px / ml-64, background `rgba(2, 6, 23, 0.90)`, `border-top: 1px solid rgba(255, 255, 255, 0.10)`, padding `14px 32px`, Flexbox justify-between items-center, 12px text-slate-400):
   - Left Group: `"© 2026 MEKONG MOBILE"` (font-extrabold text-white) + `" • Smart CRM — Quản lý Kho linh kiện thay thế"`.
   - Right Group (gap 16px, 11px):
     * Pulsing green dot + `"Hệ thống trực tuyến 24/7"` (text-emerald-400 font-bold)
     * `"Hotline: 1800 6868"` (`1800 6868` in bold white)
     * `"Khu vực: Quận 1"` (`Quận 1` in bold white)

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- DO NOT add a gray badge "LUỒNG 05: KHO LINH KIỆN" or center code "(L5-WH-890)" in the Top Header.
- DO NOT add notification bells, search inputs, or theme switchers in the Top Header.
- DO NOT add a 4th menu item in the Left Sidebar for any role.
- DO NOT change the logout button text from "Đăng xuất tài khoản".
```

---

## PHẦN III: ĐẶC TẢ CHI TIẾT & PROMPT STITCH CHO TỪNG TRANG VÀ TỪNG VAI TRÒ (14 MÀN HÌNH)

---

### A. PHÂN HỆ XÁC THỰC CÔNG KHAI (PUBLIC AUTHENTICATION PORTAL — 3 MÀN HÌNH)

Khi người dùng chưa đăng nhập, hệ thống ẩn `#appWorkspace` và hiển thị toàn màn hình `#authContainer` với bố cục chia đôi 50% Trái (Banner Không gian số 3D) và 50% Phải (Khung kính mờ Glass Form).

---

#### 1. Màn hình 01 (`#authViewLogin`): Đăng nhập Hệ thống
- **Vai trò sử dụng:** Tất cả nhân sự (`TECH_STAFF`, `MATERIAL_STAFF`, `MANAGER`).
- **Đặc điểm giao diện bản gốc:**
  - Chia 2 cột 50/50 toàn màn hình (`min-h-screen`).
  - Cột trái: Nền gradient `#070b14` -> `#0b1329` -> `#0f172a` với 2 quầng sáng mờ 3D xanh dương và xanh ngọc; khối lập phương 3D `L5` (`64x64px`); dòng chữ `L5 - SMART CRM`; tiêu đề lớn `Nền tảng điều hành kho tập trung.`; mô tả phân quyền 3 vai trò; 3 nhãn trạng thái dưới cùng (`Không gian số 3D • Bảo mật vai trò • Chi nhánh Quận 1`).
  - Cột phải: Thẻ kính mờ `max-w-[440px] rounded-3xl p-8 bg-slate-900/80 border-white/10`; tiêu đề `Đăng nhập`; ô nhập Email (`#loginEmail`); ô nhập Mật khẩu (`#loginPassword`) có nút con mắt `.eye-toggle-btn` bật/tắt xem mật khẩu; dòng báo lỗi đỏ ẩn mặc định bên dưới mỗi ô; nút `ĐĂNG NHẬP` 3D màu xanh; 2 liên kết điều hướng `Quên mật khẩu?` và `Chưa có tài khoản? Đăng ký cấp quyền`; chân trang `© 2026 Mekong Mobile — Chi nhánh Quận 1`.

```text
PROMPT STITCH — SCREEN 01: 3D DARK LOGIN VIEW (#authViewLogin)
Role: Public Authentication Portal (All Roles)
Viewport: 1440x900px, Full-screen Split Layout (50% Left 3D Brand Banner / 50% Right Glass Login Card).
Background: `#070b14`. Font: "Be Vietnam Pro".

[LEFT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen`)]:
- Container: `bg-gradient-to-br from-[#070b14] via-[#0b1329] to-[#0f172a]`, `border-right: 1px solid rgba(255, 255, 255, 0.10)`, Flexbox column centered, text-center, padding `0 64px`, relative overflow-hidden.
- Ambient 3D Glow Orbs:
  * Top-left orb (`-top-24 -left-24`): `w-96 h-96 bg-blue-600/20 rounded-full blur-3xl`.
  * Bottom-right orb (`-bottom-24 -right-24`): `w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl`.
- Centered Content Stack:
  1. 3D Floating Cube Badge: `64x64px` (`w-16 h-16`), `rounded-2xl`, `bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900`, `border: 1px solid rgba(255, 255, 255, 0.20)`, `shadow-2xl shadow-blue-600/30`, mb-6, centered text `"L5"` (font-black, 24px, text-white).
  2. Eyebrow Subtitle: `"L5 - SMART CRM"`, 12px, font-semibold, uppercase, `tracking-[0.25em]`, `text-blue-400`, mb-3.
  3. Main Hero Heading: `"Nền tảng điều hành kho tập trung."`, 36px (`lg:text-4xl`), font-extrabold, text-white, tracking-tight, leading-tight, `max-w-md`.
  4. Description Paragraph: `"Hệ thống phân quyền độc lập theo chuyên môn nghiệp vụ: Kỹ thuật viên, Quản lý vật tư và Quản lý kho chi nhánh."`, 12px (`text-xs`), `text-slate-400`, mt-4, `max-w-sm`, leading-relaxed.
  5. Bottom Feature Row (mt-6, flex items-center gap 12px, 12px `text-slate-400` font-medium):
     - Pulsing green dot (`w-2 h-2 rounded-full bg-emerald-500`) + `"Không gian số 3D"`
     - `"•"`
     - `"Bảo mật vai trò"`
     - `"•"`
     - `"Chi nhánh Quận 1"`

[RIGHT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen bg-[#070b14]/90 p-16 flex flex-col justify-between`)]:
- Top spacer: empty `div`.
- Center 3D Glass Card (`w-full max-w-[440px] mx-auto my-auto p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl`):
  1. Card Heading: `"Đăng nhập"`, 30px (`lg:text-3xl`), font-extrabold, text-white, mb-2.
  2. Card Subtitle: `"Vui lòng nhập email cá nhân hoặc tài khoản nội bộ để truy cập đúng vai trò."`, 14px (`text-sm`), `text-slate-400`, mb-8.
  3. Form (`flex-col gap-4.5`):
     - Field 1 (Email):
       * Label: `"Email cá nhân hoặc tài khoản nội bộ *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Input (`#loginEmail`): `w-full px-4 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"email.canhan@gmail.com hoặc ten.nv@mekongmobile.vn"`.
       * Error Placeholder (`#loginEmailError`): Hidden by default; when triggered, displays red text below input.
     - Field 2 (Password with Eye Toggle):
       * Label: `"Mật khẩu *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Input Wrapper (`relative flex items-center`):
         - Input (`#loginPassword`): `w-full px-4 pr-12 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, type password, placeholder `"Nhập mật khẩu của bạn"`.
         - Eye Toggle Button (`.eye-toggle-btn`, absolute right-3, 20x20px SVG crossed-eye icon, color `#94a3b8`, hover `#ffffff`).
       * Error Placeholder (`#loginPasswordError`): Hidden by default; when triggered, displays red text below input.
     - Submit Button:
       * `.btn-3d-primary`, `w-full py-3 text-sm font-bold tracking-wider uppercase mt-3`, exact label: `"ĐĂNG NHẬP"`.
     - Bottom Navigation Links (`flex items-center justify-between mt-5 text-xs`):
       * Left Link: `"Quên mật khẩu?"` (`text-slate-400 hover:text-blue-400 font-medium`).
       * Right Link: `"Chưa có tài khoản? Đăng ký cấp quyền"` (`text-blue-400 font-bold underline underline-offset-4`).
- Bottom Copyright Footer (`w-full text-center pb-2 text-xs text-slate-500`):
  * Exact text: `"© 2026 Mekong Mobile — Chi nhánh Quận 1"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- DO NOT add "Remember me" checkboxes, social login buttons (Google/Facebook/Apple), or language selectors.
- DO NOT remove the eye-toggle icon inside the password input.
- DO NOT alter any Vietnamese text strings.
```

---

#### 2. Màn hình 02 (`#authViewRegister`): Đăng ký Cấp quyền theo Vai trò
- **Vai trò sử dụng:** Nhân sự mới khởi tạo tài khoản cá nhân và chọn 1 trong 3 vai trò chuyên môn.
- **Đặc điểm giao diện bản gốc:**
  - Chia 2 cột 50/50. Cột trái có logo `L5`, dòng `L5 - SMART CRM`, tiêu đề `Yêu cầu cấp quyền hệ thống.` và mô tả quy chuẩn bảo mật.
  - Cột phải: Thẻ kính mờ `max-w-[460px] rounded-3xl p-8`; nút `← Quay lại đăng nhập`; tiêu đề `Đăng ký cấp quyền`; 4 trường dữ liệu:
    1. `Họ và tên cá nhân *` (`#regFullName`).
    2. `Email cá nhân (Email thật) *` (`#regEmail`) kèm dòng chú thích nhỏ `Lưu ý: 1 email chỉ được gắn với 1 vai trò duy nhất trong hệ thống.`.
    3. `Mật khẩu cá nhân (Bắt buộc tối thiểu 8 ký tự) *` (`#regPassword`) có nút con mắt `.eye-toggle-btn`. Đặc biệt: Khung `#regPasswordChecklist` **được ẩn mặc định (`class="hidden"`)**, chỉ hiện dòng báo lỗi đỏ `#regPasswordError` bên dưới ô nhập khi người dùng gõ mật khẩu chưa đủ 4 điều kiện (8 ký tự, chữ hoa, chữ thường, số, ký hiệu đặc biệt).
    4. `Cấp quyền vai trò chuyên môn *` (`#regRole`) với 3 lựa chọn rõ ràng.
  - Nút `ĐĂNG KÝ VÀ TRUY CẬP VAI TRÒ` và liên kết `Đã có tài khoản? Đăng nhập ngay`.

```text
PROMPT STITCH — SCREEN 02: 3D ROLE REGISTRATION VIEW (#authViewRegister)
Role: Public Authentication Portal — Account & Role Registration
Viewport: 1440x900px, Full-screen Split Layout (50% Left 3D Banner / 50% Right Glass Registration Card).
Background: `#070b14`. Font: "Be Vietnam Pro".

[LEFT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen`)]:
- Container: `bg-gradient-to-br from-[#070b14] via-[#0b1329] to-[#0f172a]`, `border-right: 1px solid rgba(255, 255, 255, 0.10)`, Flexbox column centered, text-center, padding `0 64px`.
- Centered Stack:
  1. 3D Cube Badge: `64x64px`, `rounded-2xl`, `bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900`, `border: 1px solid rgba(255, 255, 255, 0.20)`, `shadow-2xl shadow-blue-600/30`, mb-6, bold white text `"L5"` (24px).
  2. Eyebrow: `"L5 - SMART CRM"`, 12px, font-semibold, uppercase, `tracking-[0.25em]`, `text-blue-400`, mb-3.
  3. Main Heading: `"Yêu cầu cấp quyền hệ thống."`, 36px, font-extrabold, text-white, tracking-tight, `max-w-md`.
  4. Description: `"Mỗi email cá nhân được cấp 1 vai trò chuyên môn duy nhất. Vui lòng thiết lập mật khẩu an toàn theo quy chuẩn bảo mật."`, 12px, `text-slate-400`, mt-4, `max-w-sm`.

[RIGHT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen bg-[#070b14]/90 p-16 flex flex-col justify-between`)]:
- Center 3D Glass Card (`w-full max-w-[460px] mx-auto my-auto p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl`):
  1. Back Link (mb-6): `"← Quay lại đăng nhập"`, 12px, `text-slate-400 hover:text-white font-semibold`.
  2. Heading: `"Đăng ký cấp quyền"`, 30px, font-extrabold, text-white, mb-2.
  3. Subtitle: `"Điền thông tin thật để khởi tạo tài khoản và được cấp quyền theo vai trò."`, 14px, `text-slate-400`, mb-6.
  4. Form (`flex-col gap-4`):
     - Input 1 (Full Name):
       * Label: `"Họ và tên cá nhân *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Input (`#regFullName`): `w-full px-4 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"Nhập họ và tên đầy đủ của bạn"`.
       * Error Line (`#regFullNameError`): Hidden by default (`.field-error-text`).
     - Input 2 (Personal Email):
       * Label: `"Email cá nhân (Email thật) *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Input (`#regEmail`): `w-full px-4 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"your.name@gmail.com hoặc email cá nhân"`.
       * Error Line (`#regEmailError`): Hidden by default.
       * Helper Note below input: `"Lưu ý: 1 email chỉ được gắn với 1 vai trò duy nhất trong hệ thống."` (11px, `text-slate-500`, mt-1).
     - Input 3 (Password with Eye Toggle & Hidden Checklist):
       * Label: `"Mật khẩu cá nhân (Bắt buộc tối thiểu 8 ký tự) *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Relative Input Box:
         - Input (`#regPassword`): `w-full px-4 pr-12 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"Nhập mật khẩu an toàn"`.
         - Eye Toggle Button (`.eye-toggle-btn`, absolute right-3, 20x20px SVG eye icon).
       * Inline Red Error (`#regPasswordError`): Hidden when empty or valid; shows red warning text (e.g., `"Hãy tạo mật khẩu đúng 8 ký tự (Hoa, thường, số, ký tự đặc biệt)."`) when invalid.
       * Password Checklist (`#regPasswordChecklist`): MUST BE HIDDEN BY DEFAULT (`class="hidden"`). Do NOT display the checklist box on the clean form.
     - Input 4 (Role Select Dropdown):
       * Label: `"Cấp quyền vai trò chuyên môn *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Select (`#regRole`): `w-full px-4 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950 font-semibold`, custom right chevron icon, with 3 exact options:
         1. `"Nhân viên Kỹ thuật (Tra cứu tồn kho & Lập phiếu xuất/hoàn trả)"` (selected by default)
         2. `"Nhân viên Vật tư (Nhập kho hàng mới từ NCC & Quản lý nguồn cung)"`
         3. `"Quản lý Kho (Điều hành toàn diện, Cấu hình ngưỡng & Quản lý nhân sự)"`
     - Submit Button:
       * `.btn-3d-primary`, `w-full py-3 text-sm font-bold tracking-wider uppercase mt-2`, exact label: `"ĐĂNG KÝ VÀ TRUY CẬP VAI TRÒ"`.
     - Bottom Switch Text (`text-center pt-2 text-xs text-slate-400`):
       * `"Đã có tài khoản? "` + `"Đăng nhập ngay"` (`text-blue-400 font-bold hover:underline`).
- Bottom Copyright Footer: `"© 2026 Mekong Mobile — Chi nhánh Quận 1"` (12px, `text-slate-500`).

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- DO NOT render the password checklist box visible by default (it must remain `hidden`).
- DO NOT add "Confirm Password" or "Phone Number" fields.
- DO NOT remove the eye-toggle button on the password input.
```

---

#### 3. Màn hình 03 (`#authViewForgot`): Khôi phục Mật khẩu & Đếm ngược OTP 10 Phút
- **Vai trò sử dụng:** Nhân sự quên mật khẩu cần lấy mã OTP 6 chữ số để đặt lại mật khẩu mới.
- **Đặc điểm giao diện bản gốc:**
  - Chia 2 cột 50/50. Cột trái có tiêu đề `Khôi phục quyền truy cập an toàn.`.
  - Cột phải: Thẻ kính mờ `max-w-[460px] rounded-3xl p-8`:
    - Liên kết `← Quay lại đăng nhập`; tiêu đề `Khôi phục mật khẩu`.
    - **Bước 1:** Nhãn `Email cá nhân cần khôi phục *`, ô nhập `#forgotEmail` nằm ngang cùng nút `Gửi mã OTP` (`.btn-3d-primary`).
    - **Khung trạng thái OTP (`#otpStatusSection`):** Khi bấm `Gửi mã OTP`, khung màu xanh ngọc (`bg-emerald-950/40 border-emerald-500/30 rounded-xl p-3.5`) xuất hiện gồm:
      - Dòng trên: Chấm xanh nhấp nháy `animate-ping` + `"Đã tạo mã OTP xác thực thành công!"` bên trái; Đồng hồ đếm ngược thời gian thực `#countdownTimer` **`10:00`** (font-mono bold emerald-400, đếm ngược từng giây từ `10:00` xuống `00:00`) bên phải.
      - Dòng dưới: `"Mã OTP (Đã tự động điền vào ô bên dưới):"` kèm huy hiệu `#demoOtpBadge` hiển thị mã 6 số (ví dụ `123456`) và tự động điền thẳng vào ô `#resetOtp`.
    - **Bước 2:** Ô nhập `Mã xác thực OTP (6 chữ số) *` (`#resetOtp`, căn giữa, `tracking-[0.3em]`, font-mono); Ô nhập `Mật khẩu mới (Tối thiểu 8 ký tự: hoa, thường, số, ký hiệu) *` (`#resetNewPassword`) có nút con mắt `.eye-toggle-btn` và `#resetPasswordChecklist` ẩn mặc định; Nút `XÁC NHẬN MÃ OTP VÀ ĐẶT LẠI MẬT KHẨU`.

```text
PROMPT STITCH — SCREEN 03: 3D FORGOT PASSWORD & 10-MINUTE LIVE OTP RESET (#authViewForgot)
Role: Public Authentication Portal — Password Recovery
Viewport: 1440x900px, Full-screen Split Layout (50% Left 3D Banner / 50% Right Glass OTP Recovery Card).
Background: `#070b14`. Font: "Be Vietnam Pro".

[LEFT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen`)]:
- Container: `bg-gradient-to-br from-[#070b14] via-[#0b1329] to-[#0f172a]`, `border-right: 1px solid rgba(255, 255, 255, 0.10)`, Flexbox column centered, text-center, padding `0 64px`.
- Centered Stack:
  1. 3D Cube Badge: `64x64px`, `rounded-2xl`, `bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900`, `border: 1px solid rgba(255, 255, 255, 0.20)`, mb-6, bold white text `"L5"`.
  2. Eyebrow: `"L5 - SMART CRM"`, 12px, font-semibold, uppercase, `tracking-[0.25em]`, `text-blue-400`, mb-3.
  3. Main Heading: `"Khôi phục quyền truy cập an toàn."`, 36px, font-extrabold, text-white, `max-w-md`.
  4. Description: `"Mã xác thực một lần (OTP) sẽ được gửi đến email cá nhân của bạn để xác thực danh tính."`, 12px, `text-slate-400`, mt-4, `max-w-sm`.

[RIGHT COLUMN — 50% WIDTH (`lg:w-1/2 min-h-screen bg-[#070b14]/90 p-16 flex flex-col justify-between`)]:
- Center 3D Glass Card (`w-full max-w-[460px] mx-auto my-auto p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl`):
  1. Back Link (mb-6): `"← Quay lại đăng nhập"`, 12px, `text-slate-400 hover:text-white font-semibold`.
  2. Heading: `"Khôi phục mật khẩu"`, 30px, font-extrabold, text-white, mb-2.
  3. Subtitle: `"Nhập email cá nhân để nhận mã xác thực (OTP) và đặt lại mật khẩu mới."`, 14px, `text-slate-400`, mb-6.
  4. Step 1 — Request OTP Group (`flex-col gap-2 mb-6`):
     - Label: `"Email cá nhân cần khôi phục *"` (12px, font-semibold, `text-slate-300`).
     - Horizontal Row (`flex gap-2`):
       * Input (`#forgotEmail`): `w-full px-4 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"your.email@gmail.com"`.
       * Button: `.btn-3d-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0`, exact label: `"Gửi mã OTP"`.
     - Error Line (`#forgotEmailError`): Hidden by default.
  5. Live 10-Minute OTP Countdown Banner (`#otpStatusSection`, `p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 mb-6 flex-col gap-2`):
     - Top Row (`flex items-center justify-between font-bold`):
       * Left: Pulsing green dot (`w-2 h-2 rounded-full bg-emerald-500 animate-ping`) + `"Đã tạo mã OTP xác thực thành công!"` (`text-emerald-400`).
       * Right (`#countdownTimer`): `"10:00"` (`font-mono text-emerald-400 font-bold`, live second-by-second countdown from 10:00 to 00:00).
     - Bottom Row (`pt-1.5 border-t border-emerald-500/20 flex items-center justify-between text-[12px]`):
       * Left: `"Mã OTP (Đã tự động điền vào ô bên dưới):"`
       * Right (`#demoOtpBadge`): `"123456"` (`font-mono text-base px-3 py-0.5 bg-slate-900 border border-emerald-500/50 rounded-lg text-emerald-400 tracking-widest font-bold`).
  6. Step 2 — Verify OTP & Set New Password Form (`flex-col gap-4`):
     - Field 1 (OTP Input):
       * Label: `"Mã xác thực OTP (6 chữ số) *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Input (`#resetOtp`): `w-full py-2.5 px-3 text-center text-base tracking-[0.3em] font-mono font-bold text-white border border-slate-700 rounded-xl bg-slate-950/60`, maxlength 6, placeholder `"• • • • • •"` (auto-filled with `"123456"` when OTP is requested).
       * Error Line (`#resetOtpError`): Hidden by default.
     - Field 2 (New Password with Eye Toggle):
       * Label: `"Mật khẩu mới (Tối thiểu 8 ký tự: hoa, thường, số, ký hiệu) *"` (12px, font-semibold, `text-slate-300`, mb-1.5).
       * Relative Input Wrapper:
         - Input (`#resetNewPassword`): `w-full px-4 pr-12 py-2.5 text-sm text-white border border-slate-700 rounded-xl bg-slate-950/60`, placeholder `"Nhập ít nhất 8 ký tự an toàn"`.
         - Eye Toggle Button (`.eye-toggle-btn`, absolute right-3, 20x20px SVG eye icon).
       * Error Line (`#resetNewPasswordError`): Hidden by default; shows red error text when password violates the 8-char 4-group rule.
       * Checklist (`#resetPasswordChecklist`): MUST BE HIDDEN BY DEFAULT (`class="hidden"`).
     - Submit Button:
       * `.btn-3d-primary w-full py-3 text-sm font-bold tracking-wider uppercase mt-2`, exact label: `"XÁC NHẬN MÃ OTP VÀ ĐẶT LẠI MẬT KHẨU"`.
- Bottom Copyright Footer: `"© 2026 Mekong Mobile — Chi nhánh Quận 1"` (12px, `text-slate-500`).

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- Countdown timer MUST start at `"10:00"` (10 minutes), NEVER `"15:00"`.
- DO NOT display the password checklist box unless triggered; keep `#resetPasswordChecklist` hidden.
- DO NOT separate Step 1 and Step 2 into two different pages; both reside in the same card.
```

---

### B. VAI TRÒ 1: NHÂN VIÊN KỸ THUẬT (`TECH_STAFF` — 3 MÀN HÌNH)

Khi đăng nhập bằng tài khoản `TECH_STAFF` (ví dụ `kythuat.test@gmail.com`), Sidebar bên trái hiển thị đúng 3 mục:
1. `Bảng tin Kỹ thuật viên` (`tech_dashboard`)
2. `Tra cứu & Giao dịch` (`tech_transaction`)
3. `Lịch sử tiếp nhận phiếu` (`tech_history`)

---

#### 4. Màn hình 04 (`tech_dashboard`): Bảng tin Kỹ thuật viên
- **Vai trò sử dụng:** Nhân viên Kỹ thuật (`TECH_STAFF`).
- **Đặc điểm giao diện bản gốc:**
  - Khu vực Header trang: Tiêu đề `Bảng tin Kỹ thuật viên`, mô tả `Tổng hợp công việc bảo hành và các phiếu sửa chữa trong ca trực.`; bên phải có khung `Ca làm việc: 08:00 - 16:30` (icon `schedule`) và nút `Làm mới` (`.btn-3d-secondary`).
  - Hàng 3 thẻ KPI 3D (`grid-cols-3 gap-5`):
    1. `Linh kiện xuất trong ngày`: Số lớn `12` + `vật tư / 4 thiết bị`, dòng chân `Tiến độ hạn mức ca trực: 75%` (xanh lá), icon `inventory_2` xanh dương.
    2. `Phiếu chờ tiếp nhận`: Số lớn `${cachedTickets.length}` + `yêu cầu cần linh kiện`, dòng chân `Thời gian chờ bình quân: 18 phút` (vàng cam), icon `pending_actions` vàng cam.
    3. `Trạng thái kho trực tuyến`: Huy hiệu xanh lá `.status-badge-green` `HOẠT ĐỘNG ỔN ĐỊNH`, dòng chân `Độ trễ phản hồi API: 14 ms`, icon `wifi_tethering` xanh lá.
  - Bảng `DANH SÁCH PHIẾU YÊU CẦU LINH KIỆN CẦN XỬ LÝ`:
    - Thanh tiêu đề bảng có bộ chọn phân trang `Hiển thị: [10 phiếu | 20 phiếu | 50 phiếu | Tất cả]`.
    - 5 cột: `MÃ PHIẾU` (`#TK-...`), `KHÁCH HÀNG / THIẾT BỊ`, `LINH KIỆN ĐỀ NGHỊ`, `TRẠNG THÁI` (hiển thị 100% tiếng Việt qua `formatTicketStatus`: `Chờ tiếp nhận`, `Đang xử lý`, `Đã hoàn thành`, `Đã hủy`), `THAO TÁC` (Nút `.btn-3d-primary` `Xuất ngay` có icon `send`).
    - Thanh chân bảng: `Hiển thị X / Y phiếu bảo hành` và nút `Trước` / `Trang 1 / 1` / `Sau`.

```text
PROMPT STITCH — SCREEN 04: TECH STAFF DASHBOARD (tech_dashboard)
Role: Nhân viên Kỹ thuật (`TECH_STAFF`)
Layout: Inside Global Workspace Shell (Top Header 64px + Left Sidebar 256px with "Bảng tin Kỹ thuật viên" active + Main Workspace `ml-64 pt-16 p-8 pb-20` + Global Footer).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Bảng tin Kỹ thuật viên"`, 24px (`text-2xl`), font-extrabold, text-white.
  * Subtitle: `"Tổng hợp công việc bảo hành và các phiếu sửa chữa trong ca trực."`, 12px (`text-xs`), `text-slate-400`, mt-1.
- Right (`flex items-center gap-2.5`):
  * Shift Badge: `px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5`, Material icon `"schedule"` (16px, `text-blue-400`) + `"Ca làm việc: 08:00 - 16:30"`.
  * Refresh Button: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"refresh"` (16px) + `"Làm mới"`.

[2. THREE 3D KPI CARDS (`grid grid-cols-3 gap-5 mt-6`)]:
- Card 1 (`.card-3d p-5 flex-col justify-between`):
  * Top Row: Left label `"LINH KIỆN XUẤT TRONG NGÀY"` (11px, font-bold, uppercase, `text-slate-400`), value `"12"` (30px, font-extrabold, text-white) + `"vật tư / 4 thiết bị"` (12px, `text-slate-400`) | Right icon box `40x40px rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30` with Material icon `"inventory_2"`.
  * Bottom Row (`mt-4 pt-3 border-t border-white/5 flex justify-between text-xs`): `"Tiến độ hạn mức ca trực"` (`text-slate-400`) | `"75%"` (`font-extrabold text-emerald-400`).
- Card 2 (`.card-3d p-5 flex-col justify-between`):
  * Top Row: Left label `"PHIẾU CHỜ TIẾP NHẬN"` (11px, font-bold, uppercase, `text-slate-400`), value `"3"` (30px, font-extrabold, text-white) + `"yêu cầu cần linh kiện"` (12px, `text-slate-400`) | Right icon box `40x40px rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30` with Material icon `"pending_actions"`.
  * Bottom Row (`mt-4 pt-3 border-t border-white/5 flex justify-between text-xs`): `"Thời gian chờ bình quân"` (`text-slate-400`) | `"18 phút"` (`font-extrabold text-amber-400`).
- Card 3 (`.card-3d p-5 flex-col justify-between`):
  * Top Row: Left label `"TRẠNG THÁI KHO TRỰC TUYẾN"` (11px, font-bold, uppercase, `text-slate-400`), `.status-badge-green` mt-2 with green dot + `"HOẠT ĐỘNG ỔN ĐỊNH"` | Right icon box `40x40px rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30` with Material icon `"wifi_tethering"`.
  * Bottom Row (`mt-4 pt-3 border-t border-white/5 flex justify-between text-xs`): `"Độ trễ phản hồi API"` (`text-slate-400`) | `"14 ms"` (`font-extrabold text-emerald-400`).

[3. REPAIR TICKETS TABLE CARD (`.card-3d overflow-hidden mt-6`)]:
- Card Header (`px-6 py-4 border-b border-white/10 bg-slate-950/60 flex justify-between items-center`):
  * Left: Material icon `"build"` (20px, `text-blue-400`) + `"DANH SÁCH PHIẾU YÊU CẦU LINH KIỆN CẦN XỬ LÝ"` (12px, font-bold, uppercase, tracking-wider, text-white).
  * Right: `"Hiển thị:"` (12px, `text-slate-400`) + Select dropdown (`bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-white`) with options: `"10 phiếu"`, `"20 phiếu"`, `"50 phiếu"`, `"Tất cả"`.
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    Columns: `MÃ PHIẾU` | `KHÁCH HÀNG / THIẾT BỊ` | `LINH KIỆN ĐỀ NGHỊ` | `TRẠNG THÁI` | `THAO TÁC` (right-aligned).
  * Table Body (`divide-y divide-white/5`):
    - Row 1: `#TK-1092` (bold blue-400 monospace) | `"Nguyễn Minh Tuấn"` (bold white) + `"iPhone 14 Pro Max"` (11px slate-400) | `"SCR-IP14-01"` (monospace slate-300) | `.status-badge-yellow` `"Chờ tiếp nhận"` | Right button `.btn-3d-primary px-3 py-1.5 text-xs font-bold` with icon `"send"` + `"Xuất ngay"`.
    - Row 2: `#TK-1095` | `"Trần Thị Hồng Ngọc"` + `"iPhone 13 Pro"` | `"BAT-IP13-02"` | `.status-badge-yellow` `"Đang xử lý"` | Right button `"Xuất ngay"`.
    - Row 3: `#TK-1098` | `"Lê Hoàng Nam"` + `"Samsung Galaxy S24 Ultra"` | `"SCR-SS24U-01"` | `.status-badge-green` `"Đã hoàn thành"` | Right button `"Xuất ngay"`.
- Table Footer (`px-6 py-3 border-t border-white/10 bg-slate-950/60 flex justify-between items-center text-xs text-slate-400`):
  * Left: `"Hiển thị 3 / 3 phiếu bảo hành"`.
  * Right: Button `"Trước"` (`.btn-3d-secondary px-2.5 py-1`) | `"Trang 1 / 1"` (font-semibold text-white) | Button `"Sau"` (`.btn-3d-secondary px-2.5 py-1`).

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- DO NOT render any breadcrumb above "Bảng tin Kỹ thuật viên".
- DO NOT render raw English ticket statuses ("OPEN", "IN_PROGRESS", "COMPLETED"); strictly use Vietnamese badges ("Chờ tiếp nhận", "Đang xử lý", "Đã hoàn thành").
```

---

#### 5. Màn hình 05 (`tech_transaction`): Tra cứu & Giao dịch Kho (Tìm kiếm Thông minh + Phím Enter, Không có nút Tra cứu)
- **Vai trò sử dụng:** Nhân viên Kỹ thuật (`TECH_STAFF`).
- **Đặc điểm giao diện bản gốc (Rất quan trọng - đã tinh chỉnh qua 5 đợt):**
  - Header trang: Tiêu đề `Tra cứu & Giao dịch Kho`; bên phải là thẻ 3D `Danh mục: 40 loại | Tổng tồn khả dụng: 865 cái`.
  - Bố cục lưới 12 cột (`grid-cols-12 gap-6`):
    - **Cột trái (7 cột - `.lg:col-span-7 card-3d p-6`): `Biểu mẫu Xuất / Hoàn linh kiện`** + huy hiệu xanh `Kho Quận 1`:
      1. **Ô tìm kiếm thông minh hợp nhất (`#smartPartSearch`):**
         - Nhãn trái: `Tra cứu & Chọn linh kiện *` | Nhãn phải: `Gõ để xem gợi ý hoặc bấm Enter để chọn`.
         - **TUYỆT ĐỐI KHÔNG CÓ NÚT "TRA CỨU" NẰM CẠNH Ô INPUT.**
         - Ô input ban đầu **rỗng (`value=""`)**, có icon kính lúp `search` bên trái, placeholder chính xác: `"Nhập thông tin linh kiện (Mã hoặc Tên), bấm Enter để chọn..."`.
         - Khi click hoặc gõ từ khóa, hộp gợi ý `#partSuggestionsDropdown` mở ra bên dưới hiển thị danh sách linh kiện kèm huy hiệu 3 màu (`An toàn` xanh lá / `Gần cảnh báo` vàng / `Cảnh báo` đỏ) và số lượng tồn. Nếu từ khóa không khớp, hiển thị dòng `"Không tìm thấy linh kiện phù hợp với từ khóa."`. Khi bấm phím `Enter`, tự động chọn linh kiện khớp đầu tiên.
      2. **Khung hiển thị tồn kho tức thời (`#liveStockBox`):**
         - Trạng thái ban đầu khi chưa chọn linh kiện: Bên trái hiển thị `Tồn kho hiện tại:` -> **`Chưa chọn linh kiện`**; Bên phải `#displayBadge` hiển thị huy hiệu vàng **`Nhập từ khóa hoặc bấm Enter`**.
         - Khi đã chọn linh kiện: Bên trái hiển thị số lượng tồn thực tế; Bên phải hiển thị huy hiệu 3 màu ngữ nghĩa (`TỒN KHO AN TOÀN` / `GẦN CHẠM CẢNH BÁO` / `CẢNH BÁO THIẾU HÀNG`).
      3. **Mã phiếu bảo hành (`#ticketIdInput`):** Nhãn `Mã phiếu bảo hành (Ticket ID) *Bắt buộc khi xuất kho` | `Tối đa 30 ký tự`, icon `confirmation_number`, placeholder `"Ví dụ: TK-1092, TK-2026-8892"`.
      4. **Số lượng linh kiện (`#txQtyInput`):** Nhãn `Số lượng linh kiện *` | `Từ 1 đến 1.000.000 cái`, giá trị mặc định `1`.
      5. **Loại giao dịch (`txType`):** 2 ô Radio: `Xuất kho thay thế` (`Trừ trực tiếp số lượng tồn`) và `Hoàn trả linh kiện` (`Cộng trả lại kho linh kiện`).
      6. **Dự tính sau giao dịch (`#stockCalculationPreview`):** Ban đầu hiển thị `Chưa chọn linh kiện`; sau khi chọn linh kiện hiển thị công thức `[Tồn] —/+ [Số lượng] = [Tồn mới] cái`. Nếu xuất vượt tồn, hiện hộp cảnh báo đỏ `#negativeStockAlert` (`CẢNH BÁO: VƯỢT QUÁ SỐ LƯỢNG TỒN KHẢ DỤNG`) và khóa nút xác nhận.
      7. **2 Nút hành động 3D ở chân biểu mẫu:**
         - Nút `Đặt lại biểu mẫu` (`#btnResetForm`, icon `restart_alt`): Xóa sạch ô tìm kiếm về rỗng `""`, trả khung tồn kho về `Chưa chọn linh kiện` & `Nhập từ khóa hoặc bấm Enter`, xóa mã phiếu, đặt số lượng về `1`, xóa mọi báo lỗi đỏ.
         - Nút `Xác nhận Giao dịch` (`#submitTxBtn`, icon `check`).
    - **Cột phải (5 cột - `.lg:col-span-5 card-3d p-5`): `DANH MỤC TỒN KHẢ DỤNG`** (`40 loại | 865 cái`): Danh sách cuộn dọc 40 mặt hàng linh kiện; mỗi dòng có mã linh kiện, huy hiệu trạng thái 3 màu, tên linh kiện và số lượng tồn (`X cái`).

```text
PROMPT STITCH — SCREEN 05: TECH STAFF SMART LOOKUP & TRANSACTION FORM (tech_transaction)
Role: Nhân viên Kỹ thuật (`TECH_STAFF`)
Layout: Inside Global Workspace Shell (Left Sidebar "Tra cứu & Giao dịch" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Tra cứu & Giao dịch Kho"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Xử lý xuất kho thay thế theo phiếu bảo hành hoặc hoàn trả linh kiện chưa dùng."`, 12px, `text-slate-400`, mt-1.
- Right (`.card-3d flex items-center gap-2.5 px-3.5 py-1.5 text-xs`):
  * Material icon `"category"` (18px, `text-blue-400`) + `"Danh mục: 40 loại"` (`40 loại` bold white)
  * Divider `"|"` (`text-slate-600`)
  * Material icon `"inventory_2"` (18px, `text-emerald-400`) + `"Tổng tồn khả dụng: 865 cái"` (`865 cái` extrabold emerald-400).

[2. MAIN 12-COLUMN GRID (`grid grid-cols-12 gap-6 items-start mt-6`)]:

[LEFT COLUMN — 7 COLS (`col-span-7 .card-3d p-6 flex-col gap-4`)]:
- Card Header (`flex justify-between items-center border-b border-white/10 pb-3`):
  * Left: Material icon `"swap_horiz"` (20px, `text-blue-400`) + `"BIỂU MẪU XUẤT / HOÀN LINH KIỆN"` (14px, font-bold, uppercase, text-white).
  * Right: `.status-badge-green text-[10px] py-0.5 px-2` with green dot + `"Kho Quận 1"`.
- Form Fields (`flex-col gap-4`):
  1. Unified Smart Search Input (NO "Tra cứu" button):
     * Top Label Row (`flex justify-between items-center`):
       - Left: `"Tra cứu & Chọn linh kiện *"` (12px, font-bold, `text-slate-300`, red asterisk).
       - Right: `"Gõ để xem gợi ý hoặc bấm Enter để chọn"` (11px, `text-slate-500`).
     * Full-width Input Box (`relative w-full`):
       - Input (`#smartPartSearch`): `w-full h-10 pl-10 pr-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white`, empty initial value, exact placeholder: `"Nhập thông tin linh kiện (Mã hoặc Tên), bấm Enter để chọn..."`.
       - Left Icon: Material icon `"search"` (18px, `text-slate-400`, absolute left-3 top-2.5).
       - (STRICT: DO NOT render any "Tra cứu" button next to this input).
     * Autocomplete Suggestions Dropdown (`#partSuggestionsDropdown`, opens below input on focus/typing, `.glass-panel bg-slate-900 border border-slate-700 rounded-2xl max-h-64 overflow-y-auto p-1.5`):
       - Displays matching parts from the 40-item catalog: Part Code (`SCR-IP14-01`, bold white monospace) + compact 3-color badge (`An toàn` green / `Gần cảnh báo` yellow / `Cảnh báo` red) + Part Name (`Màn hình OLED iPhone 14 Pro Max`, 11px slate-400) on left; Quantity (`12 cái`, bold white) on right.
       - If no match: centered text `"Không tìm thấy linh kiện phù hợp với từ khóa."` (12px, `text-slate-500`).
  2. Live Stock Status Box (`#liveStockBox`, `p-4 bg-slate-950/70 border border-white/10 rounded-2xl flex items-center justify-between`):
     * Left (`flex items-center gap-2.5`): Material icon `"inventory_2"` (22px, `text-blue-400`) + stacked text `"Tồn kho hiện tại:"` (12px, `text-slate-400`) and `#displayQty` `"Chưa chọn linh kiện"` (14px, font-bold, `text-slate-300`).
     * Right (`#displayBadge`): `.status-badge-yellow text-[10px] py-1 px-2.5` with yellow dot + `"Nhập từ khóa hoặc bấm Enter"`.
  3. Ticket ID Input:
     * Top Label Row: Left `"Mã phiếu bảo hành (Ticket ID) *Bắt buộc khi xuất kho"` (`*Bắt buộc khi xuất kho` in `text-red-400`) | Right `"Tối đa 30 ký tự"` (11px, `text-slate-500`).
     * Input (`#ticketIdInput`): `w-full h-10 pl-10 pr-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white font-mono`, left Material icon `"confirmation_number"`, placeholder `"Ví dụ: TK-1092, TK-2026-8892"`.
  4. Quantity Input:
     * Top Label Row: Left `"Số lượng linh kiện *"` | Right `"Từ 1 đến 1.000.000 cái"` (11px, `text-slate-500`).
     * Input (`#txQtyInput`): `w-full h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white font-bold`, value `"1"`.
  5. Transaction Type Radio Group:
     * Label: `"Loại giao dịch *"` (12px, font-bold, `text-slate-300`).
     * 2-Column Grid (`grid-cols-2 gap-3`):
       - Radio Card 1 (Checked): `p-3 border border-white/10 bg-slate-950/60 rounded-xl flex items-center gap-2.5`, radio checked blue, title `"Xuất kho thay thế"` (12px bold white), subtitle `"Trừ trực tiếp số lượng tồn"` (11px slate-400).
       - Radio Card 2: `p-3 border border-white/10 bg-slate-950/60 rounded-xl flex items-center gap-2.5`, title `"Hoàn trả linh kiện"` (12px bold white), subtitle `"Cộng trả lại kho linh kiện"` (11px slate-400).
  6. Post-Transaction Calculation Preview (`#stockCalculationPreview`, `p-3 bg-slate-950/70 border border-white/10 rounded-xl text-xs flex justify-between items-center`):
     * Left: Material icon `"calculate"` (16px, `text-blue-400`) + `"Dự tính sau giao dịch:"` (`text-slate-400`).
     * Right (`#stockCalculationText`): `"Chưa chọn linh kiện"` (font-extrabold text-white; updates to `"12 — 1 = 11 cái"` when a part is selected).
  7. Form Footer Action Buttons (`flex justify-end gap-2.5 pt-2 border-t border-white/10`):
     * Button 1 (`#btnResetForm`): `.btn-3d-secondary px-4 py-2 text-xs font-bold flex items-center gap-1`, Material icon `"restart_alt"` (15px) + `"Đặt lại biểu mẫu"`.
     * Button 2 (`#submitTxBtn`): `.btn-3d-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5`, Material icon `"check"` (16px) + `"Xác nhận Giao dịch"`.

[RIGHT COLUMN — 5 COLS (`col-span-5 .card-3d p-5 flex-col gap-3`)]:
- Header (`flex justify-between items-center border-b border-white/10 pb-2.5`):
  * Left: Material icon `"table_view"` (18px, `text-blue-400`) + `"DANH MỤC TỒN KHẢ DỤNG"` (12px, font-bold, uppercase, text-white).
  * Right (`#tableItemCount`): `"40 loại | 865 cái"` (11px, `text-slate-400 font-semibold`).
- Scrollable Stock List (`max-h-[520px] overflow-y-auto flex-col gap-2`):
  * Each item card (`p-3 border border-white/10 bg-slate-950/40 rounded-xl flex justify-between items-center hover:border-blue-500/60`):
    - Left: Part Code (`SCR-IP14-01`, 12px bold white monospace) + compact semantic badge (`An toàn` green / `Gần cảnh báo` yellow / `Cảnh báo` red) on top line; Part Name (`Màn hình OLED iPhone 14 Pro Max`, 11px `text-slate-400`) below.
    - Right: Quantity number (`12`, 14px extrabold white) + `"cái"` (10px `text-slate-500` block).

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- STRICTLY DO NOT add a "Tra cứu" button next to the `#smartPartSearch` input. Selection works via autocomplete dropdown and pressing the `Enter` key.
- Initial state of `#smartPartSearch` MUST be empty (`""`), and `#liveStockBox` MUST display `"Chưa chọn linh kiện"` and `"Nhập từ khóa hoặc bấm Enter"`.
- DO NOT remove the `"Đặt lại biểu mẫu"` button.
```

---

#### 6. Màn hình 06 (`tech_history`): Lịch sử Giao dịch Kỹ thuật viên
- **Vai trò sử dụng:** Nhân viên Kỹ thuật (`TECH_STAFF` — truy cập qua mục `Lịch sử tiếp nhận phiếu` trên Sidebar).
- **Đặc điểm giao diện bản gốc:**
  - Header trang: Tiêu đề `Lịch sử Giao dịch Kỹ thuật viên`, mô tả `Danh sách các phiếu xuất linh kiện và hoàn trả phụ tùng đã xác nhận.`, bên phải là nút `Cập nhật` (`.btn-3d-secondary`, icon `refresh`).
  - Bảng 3D (`.card-3d overflow-hidden`) gồm 6 cột: `MÃ GIAO DỊCH`, `THỜI GIAN`, `LINH KIỆN`, `LOẠI GD` (hiển thị huy hiệu tiếng Việt `Xuất kho thay thế` màu vàng hoặc `Hoàn trả linh kiện` màu xanh dương), `SỐ LƯỢNG` (`X cái`), `PHIẾU BẢO HÀNH` (`TK-...`).

```text
PROMPT STITCH — SCREEN 06: TECH STAFF TRANSACTION HISTORY (tech_history)
Role: Nhân viên Kỹ thuật (`TECH_STAFF`)
Layout: Inside Global Workspace Shell (Left Sidebar "Lịch sử tiếp nhận phiếu" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Lịch sử Giao dịch Kỹ thuật viên"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Danh sách các phiếu xuất linh kiện và hoàn trả phụ tùng đã xác nhận."`, 12px, `text-slate-400`, mt-1.
- Right:
  * Button: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"refresh"` (16px) + `"Cập nhật"`.

[2. HISTORY TABLE CARD (`.card-3d overflow-hidden mt-5`)]:
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold`):
    6 Exact Columns:
    1. `MÃ GIAO DỊCH`
    2. `THỜI GIAN`
    3. `LINH KIỆN`
    4. `LOẠI GD`
    5. `SỐ LƯỢNG`
    6. `PHIẾU BẢO HÀNH`
  * Table Body (`divide-y divide-white/5`):
    - Row 1: `#884920` (bold blue-400 monospace) | `"2026-10-28 14:20:15"` (`text-slate-400`) | `"SCR-IP14-01"` (bold white) | `.status-badge-yellow` `"Xuất kho thay thế"` | `"1 cái"` (extrabold white) | `"TK-1092"` (monospace `text-slate-400`).
    - Row 2: `#884915` | `"2026-10-28 11:05:40"` | `"BAT-IP13-02"` | Blue badge (`bg-blue-500/15 border-blue-500/40 text-blue-400`) `"Hoàn trả linh kiện"` | `"1 cái"` | `"TK-1088"`.
  * Empty State (if 0 rows): Centered cell `p-8 text-center text-slate-500` with exact text `"Chưa có giao dịch nào được ghi nhận."`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- DO NOT add a "Quay lại trang" button on this screen.
- DO NOT display raw "OUT" or "RETURN" text; always use `"Xuất kho thay thế"` and `"Hoàn trả linh kiện"`.
```

---

### C. VAI TRÒ 2: NHÂN VIÊN QUẢN LÝ VẬT TƯ (`MATERIAL_STAFF` — 3 MÀN HÌNH)

Khi đăng nhập bằng tài khoản `MATERIAL_STAFF` (ví dụ `vattu.test@gmail.com`), Sidebar bên trái hiển thị đúng 3 mục:
1. `Bảng tin Quản lý vật tư` (`material_dashboard`)
2. `Nhập kho linh kiện mới` (`material_stock_in`)
3. `Nhà cung cấp đối tác` (`material_suppliers`)

---

#### 7. Màn hình 07 (`material_dashboard`): Bảng tin Quản lý Vật tư
- **Vai trò sử dụng:** Nhân viên Vật tư (`MATERIAL_STAFF`).
- **Đặc điểm giao diện bản gốc:**
  - Header trang: Bên trái là tiêu đề `Bảng tin Quản lý Vật tư` và mô tả `Theo dõi tốc độ tiêu thụ, tiếp nhận lô hàng mới và kiểm soát lượng vật tư cung ứng.`. Bên phải là thẻ `.card-3d` chứa huy hiệu xanh lá `Trung tâm Vật tư Quận 1` (**TUYỆT ĐỐI KHÔNG có nút "Tạo lệnh Nhập kho mới"** ở Main Content vì đã có mục Nhập kho trên Sidebar).
  - Hàng 3 thẻ KPI 3D (`grid-cols-3 gap-5`):
    1. `Tổng danh mục linh kiện`: `40 loại`, huy hiệu xanh `100% được gắn mã định danh`.
    2. `Tổng lượng tồn kho thực tế`: `865 cái`, dòng phụ `Toàn bộ chi nhánh Quận 1`.
    3. `Nhà cung cấp đối tác`: `2 đơn vị`, dòng phụ `Kho tổng Mekong Mobile & OEM Á Châu`.
  - Bảng `TỒN KHO CHI TIẾT THEO DANH MỤC` có bộ chọn phân trang `10 dòng / 20 dòng / 50 dòng / Tất cả`, gồm 5 cột: `MÃ LINH KIỆN`, `TÊN LINH KIỆN`, `SỐ LƯỢNG TỒN`, `NGƯỠNG DỰ TRỮ`, `TRẠNG THÁI` (huy hiệu 3 màu `An toàn` / `Gần cảnh báo` / `Cảnh báo`).

```text
PROMPT STITCH — SCREEN 07: MATERIAL STAFF DASHBOARD (material_dashboard)
Role: Nhân viên Vật tư (`MATERIAL_STAFF`)
Layout: Inside Global Workspace Shell (Left Sidebar "Bảng tin Quản lý vật tư" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Bảng tin Quản lý Vật tư"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Theo dõi tốc độ tiêu thụ, tiếp nhận lô hàng mới và kiểm soát lượng vật tư cung ứng."`, 12px, `text-slate-400`, mt-1.
- Right (`.card-3d px-3.5 py-1.5 text-xs`):
  * `.status-badge-green text-[10px] py-0 px-1.5` with green dot + `"Trung tâm Vật tư Quận 1"`.
  * (STRICT: DO NOT render a "Tạo lệnh Nhập kho mới" button in this header).

[2. THREE 3D KPI CARDS (`grid grid-cols-3 gap-5 mt-5`)]:
- Card 1 (`.card-3d p-5`):
  * Label: `"TỔNG DANH MỤC LINH KIỆN"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"40 loại"` (30px, font-extrabold, text-white, mt-2).
  * Sub-badge: `.status-badge-green text-[10px] mt-2` with green dot + `"100% được gắn mã định danh"`.
- Card 2 (`.card-3d p-5`):
  * Label: `"TỔNG LƯỢNG TỒN KHO THỰC TẾ"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"865 cái"` (30px, font-extrabold, text-white, mt-2).
  * Subtitle: `"Toàn bộ chi nhánh Quận 1"` (12px, `text-slate-400`, mt-2).
- Card 3 (`.card-3d p-5`):
  * Label: `"NHÀ CUNG CẤP ĐỐI TÁC"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"2 đơn vị"` (30px, font-extrabold, text-white, mt-2).
  * Subtitle: `"Kho tổng Mekong Mobile & OEM Á Châu"` (12px, `text-slate-400`, mt-2).

[3. DETAILED STOCK TABLE CARD (`.card-3d overflow-hidden mt-5`)]:
- Table Header (`px-6 py-4 border-b border-white/10 bg-slate-950/60 flex justify-between items-center`):
  * Left: `"TỒN KHO CHI TIẾT THEO DANH MỤC"` (12px, font-bold, uppercase, tracking-wider, text-white).
  * Right: `"Hiển thị:"` + Select dropdown (`10 dòng`, `20 dòng`, `50 dòng`, `Tất cả`).
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    5 Exact Columns: `MÃ LINH KIỆN` | `TÊN LINH KIỆN` | `SỐ LƯỢNG TỒN` | `NGƯỠNG DỰ TRỮ` | `TRẠNG THÁI`.
  * Table Body (`divide-y divide-white/5`):
    - Rows showing part code (bold blue-400 monospace), part name (`text-slate-200`), stock quantity (`24 cái` extrabold white), threshold (`15 cái` `text-slate-400`), and 3-color semantic badge (`An toàn` green / `Gần cảnh báo` yellow / `Cảnh báo` red).
- Table Footer (`px-6 py-3 border-t border-white/10 bg-slate-950/60 flex justify-between items-center text-xs text-slate-400`):
  * Left: `"Hiển thị 10 / 40 linh kiện"`.
  * Right: Pagination buttons `"Trước"` | `"Trang 1 / 4"` | `"Sau"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- STRICTLY DO NOT add the button "Tạo lệnh Nhập kho mới" anywhere in the main content area.
- DO NOT add breadcrumbs or action columns (edit/delete) to this table.
```

---

#### 8. Màn hình 08 (`material_stock_in`): Nhập kho Linh kiện mới (Bố cục 2 Cột: Biểu mẫu Tiếp nhận + Bảng Thống kê 40 Linh kiện)
- **Vai trò sử dụng:** Nhân viên Vật tư (`MATERIAL_STAFF`).
- **Đặc điểm giao diện bản gốc:**
  - Header trang: Tiêu đề `Nhập kho linh kiện mới`, mô tả `Tiếp nhận lô hàng vật tư từ Tổng công ty và cập nhật tồn kho thực tế vào hệ thống.`, bên phải là huy hiệu `Kho chi nhánh Quận 1`.
  - **Bố cục lưới 2 cột song song (`grid-cols-12 gap-6 items-start`):**
    - **Cột trái (7 cột - `.lg:col-span-7 card-3d p-6`): `PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ`** (`Mã phiếu tự sinh`):
      1. Dropdown `Chọn mã linh kiện cần nhập *` (`#inPartSelect`) liệt kê 40 mã linh kiện kèm số lượng hiện có.
      2. Hộp 3 chỉ số (`grid-cols-3 gap-3 p-3.5 bg-slate-950/70 rounded-xl`): `Tồn trước nhập:` (`#inCurrentQty`), `Ngưỡng an toàn:` (`#inThreshold`), `Dự kiến sau nhập:` (`#inFutureQty`, chữ xanh lá đậm).
      3. Ô nhập `Số lượng nhập kho *` (`#inQtyInput`, mặc định `10`, từ `1 đến 1.000.000 cái`) kèm chú thích `Nhập số lượng hàng thực tế vừa khui kiện kiểm đếm.`.
      4. Ô nhập `Nguồn cấp hàng / Số vận đơn` (`#inSourceInput`, mặc định `"Lô hàng định kỳ Tổng kho Mekong Mobile #TK-1082"`).
      5. Nút `.btn-3d-primary` `Ghi nhận Nhập kho` (icon `add_circle`).
    - **Cột phải (5 cột - `.lg:col-span-5 card-3d p-5`): `THỐNG KÊ TỒN KHO LINH KIỆN`** + huy hiệu xanh `40 mặt hàng`:
      1. 2 thẻ tóm tắt nhanh (`grid-cols-2 gap-3`): `Tổng tồn khả dụng:` (`865 cái` xanh lá) và `Cần nhập bổ sung:` (`N mã <= ngưỡng` vàng cam).
      2. Khung bảng cuộn dọc (`max-h-[340px] overflow-y-auto`) gồm 3 cột: `LINH KIỆN`, `TỒN/NGƯỠNG`, `CHỌN` (Nút `.btn-3d-secondary` `Chọn` giúp nạp nhanh linh kiện sang biểu mẫu bên trái).

```text
PROMPT STITCH — SCREEN 08: MATERIAL STOCK-IN 2-COLUMN VIEW (material_stock_in)
Role: Nhân viên Vật tư (`MATERIAL_STAFF`)
Layout: Inside Global Workspace Shell (Left Sidebar "Nhập kho linh kiện mới" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Nhập kho linh kiện mới"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Tiếp nhận lô hàng vật tư từ Tổng công ty và cập nhật tồn kho thực tế vào hệ thống."`, 12px, `text-slate-400`, mt-1.
- Right (`.card-3d px-3.5 py-1.5 text-xs`):
  * `.status-badge-green text-[10px] py-0 px-1.5` with green dot + `"Kho chi nhánh Quận 1"`.

[2. TWO-COLUMN PARALLEL GRID (`grid grid-cols-12 gap-6 items-start mt-5`)]:

[LEFT COLUMN — 7 COLS (`col-span-7 .card-3d p-6 flex-col gap-5`)]:
- Card Header (`flex justify-between items-center border-b border-white/10 pb-3`):
  * Left: Material icon `"move_to_inbox"` (20px, `text-blue-400`) + `"PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ"` (14px, font-bold, uppercase, text-white).
  * Right: `"Mã phiếu tự sinh"` (12px, `text-slate-400 font-semibold`).
- Form (`flex-col gap-4`):
  1. Select Part Dropdown:
     * Label: `"Chọn mã linh kiện cần nhập *"` (12px, font-bold, `text-slate-300`).
     * Select (`#inPartSelect`): `h-10 px-3 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white font-medium`, showing `"SCR-IP14-01 — Màn hình OLED iPhone 14 Pro Max (Hiện có: 12)"`.
  2. Three-Metric Preview Box (`grid grid-cols-3 gap-3 p-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-xs`):
     * Col 1: `"Tồn trước nhập:"` (11px `text-slate-400`) -> `"12 cái"` (14px bold white).
     * Col 2: `"Ngưỡng an toàn:"` (11px `text-slate-400`) -> `"15 cái"` (14px bold `text-slate-300`).
     * Col 3: `"Dự kiến sau nhập:"` (11px `text-slate-400`) -> `"22 cái"` (14px extrabold `text-emerald-400`).
  3. Stock-In Quantity Input:
     * Top Label Row: Left `"Số lượng nhập kho *"` | Right `"Từ 1 đến 1.000.000 cái"` (11px `text-slate-500`).
     * Input (`#inQtyInput`): `h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white font-bold`, value `"10"`.
     * Helper Note: `"Nhập số lượng hàng thực tế vừa khui kiện kiểm đếm."` (11px `text-slate-500`).
  4. Supplier / Waybill Input:
     * Label: `"Nguồn cấp hàng / Số vận đơn"` (12px, font-bold, `text-slate-300`).
     * Input (`#inSourceInput`): `h-10 px-3.5 text-xs bg-slate-950/70 border border-slate-700 rounded-xl text-white`, value `"Lô hàng định kỳ Tổng kho Mekong Mobile #TK-1082"`.
  5. Submit Row (`flex justify-end pt-3 border-t border-white/10`):
     * Button: `.btn-3d-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"add_circle"` (18px) + `"Ghi nhận Nhập kho"`.

[RIGHT COLUMN — 5 COLS (`col-span-5 .card-3d p-5 flex-col gap-4`)]:
- Card Header (`flex justify-between items-center border-b border-white/10 pb-3`):
  * Left: Material icon `"analytics"` (20px, `text-blue-400`) + `"THỐNG KÊ TỒN KHO LINH KIỆN"` (12px, font-bold, uppercase, text-white).
  * Right: `.status-badge-green text-[10px] py-0.5 px-2` with green dot + `"40 mặt hàng"`.
- Two Summary Mini-Cards (`grid grid-cols-2 gap-3 text-xs`):
  * Mini-Card 1 (`p-3 bg-slate-950/60 border border-white/10 rounded-xl`): `"Tổng tồn khả dụng:"` (11px `text-slate-400`) -> `"865 cái"` (16px extrabold `text-emerald-400`).
  * Mini-Card 2 (`p-3 bg-slate-950/60 border border-white/10 rounded-xl`): `"Cần nhập bổ sung:"` (11px `text-slate-400`) -> `"5 mã <= ngưỡng"` (16px extrabold `text-amber-400`).
- Scrollable Parts Reference Table (`max-h-[340px] overflow-y-auto border border-white/10 rounded-xl bg-slate-950/40`):
  * Sticky Table Head (`bg-slate-950 text-slate-400 text-[11px] uppercase font-bold border-b border-white/10`):
    Columns: `LINH KIỆN` | `TỒN/NGƯỠNG` (centered) | `CHỌN` (right-aligned).
  * Table Rows (`divide-y divide-white/5 text-xs`):
    Each row shows Part Code (11px bold white monospace) + Part Name (10px `text-slate-400` truncated) on left; `quantity/min_threshold` (e.g., `12/15`, amber if `<= threshold`, white otherwise) in center; `.btn-3d-secondary px-2.5 py-1 text-[11px] font-bold` button `"Chọn"` on right.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- MUST render the 2-column layout (Col 7 Form on Left + Col 5 Statistics Table on Right). Never render a single-column form.
- DO NOT add a "Quay lại trang" button on this screen.
```

---

#### 9. Màn hình 09 (`material_suppliers`): Đối tác Cung ứng Linh kiện
- **Vai trò sử dụng:** Nhân viên Vật tư (`MATERIAL_STAFF` — truy cập qua mục `Nhà cung cấp đối tác` trên Sidebar).
- **Đặc điểm giao diện bản gốc:**
  - Header trang: Tiêu đề `Đối tác Cung ứng Linh kiện`, mô tả `Danh mục các nhà phân phối ủy quyền và trung tâm cung cấp phụ tùng.`.
  - Lưới 2 cột (`grid-cols-1 md:grid-cols-2 gap-5`) hiển thị 2 thẻ 3D (`.card-3d p-6`):
    1. **Thẻ 1:** Huy hiệu xanh `Đối tác chiến lược`; Tiêu đề `Tổng kho Phụ tùng Mekong Mobile miền Nam`; Mô tả `Cung cấp toàn bộ linh kiện màn hình, pin và cụm sạc dòng iPhone 14/15.`; Icon `hub` xanh dương; Chân thẻ: `Thời gian cấp hàng: Trong 2 giờ` | `Trực tuyến` (xanh lá).
    2. **Thẻ 2:** Huy hiệu xanh `Nhà sản xuất OEM`; Tiêu đề `Công ty TNHH Linh kiện Công nghệ Á Châu`; Mô tả `Cung ứng linh kiện thay thế chuẩn công nghiệp, cáp sạc và micro phụ trợ.`; Icon `precision_manufacturing` xanh dương; Chân thẻ: `Thời gian giao hàng: 24 giờ` | `Ký kết hợp đồng` (xanh lá).

```text
PROMPT STITCH — SCREEN 09: MATERIAL SUPPLIERS DIRECTORY (material_suppliers)
Role: Nhân viên Vật tư (`MATERIAL_STAFF`)
Layout: Inside Global Workspace Shell (Left Sidebar "Nhà cung cấp đối tác" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`pb-4 border-b border-white/10`)]:
- Heading: `"Đối tác Cung ứng Linh kiện"`, 24px, font-extrabold, text-white.
- Subtitle: `"Danh mục các nhà phân phối ủy quyền và trung tâm cung cấp phụ tùng."`, 12px, `text-slate-400`, mt-1.

[2. TWO SUPPLIER 3D CARDS (`grid grid-cols-2 gap-5 mt-5`)]:
- Supplier Card 1 (`.card-3d p-6 flex-col justify-between`):
  * Top Area (`flex items-start justify-between`):
    - Left:
      * `.status-badge-green text-[10px] mb-2` with green dot + `"Đối tác chiến lược"`.
      * Title: `"Tổng kho Phụ tùng Mekong Mobile miền Nam"`, 16px (`text-base`), font-bold, text-white.
      * Description: `"Cung cấp toàn bộ linh kiện màn hình, pin và cụm sạc dòng iPhone 14/15."`, 12px, `text-slate-400`, mt-1.
    - Right Icon Box: `48x48px` (`w-12 h-12`), `rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center`, Material icon `"hub"` (24px).
  * Bottom Footer (`mt-6 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-slate-400`):
    - Left: `"Thời gian cấp hàng: Trong 2 giờ"` (`Trong 2 giờ` bold).
    - Right: `"Trực tuyến"` (`text-emerald-400 font-bold`).

- Supplier Card 2 (`.card-3d p-6 flex-col justify-between`):
  * Top Area (`flex items-start justify-between`):
    - Left:
      * `.status-badge-green text-[10px] mb-2` with green dot + `"Nhà sản xuất OEM"`.
      * Title: `"Công ty TNHH Linh kiện Công nghệ Á Châu"`, 16px, font-bold, text-white.
      * Description: `"Cung ứng linh kiện thay thế chuẩn công nghiệp, cáp sạc và micro phụ trợ."`, 12px, `text-slate-400`, mt-1.
    - Right Icon Box: `48x48px`, `rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center`, Material icon `"precision_manufacturing"` (24px).
  * Bottom Footer (`mt-6 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-slate-400`):
    - Left: `"Thời gian giao hàng: 24 giờ"` (`24 giờ` bold).
    - Right: `"Ký kết hợp đồng"` (`text-emerald-400 font-bold`).

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- Render ONLY these 2 supplier cards. DO NOT add "Add Supplier" buttons, search bars, or extra cards.
```

---

### D. VAI TRÒ 3: QUẢN LÝ KHO CHI NHÁNH (`MANAGER` — 4 MÀN HÌNH)

Khi đăng nhập bằng tài khoản `MANAGER` (ví dụ `quanlykho.test@gmail.com`), Sidebar bên trái chỉ hiển thị **3 mục**:
1. `Dashboard Tổng quan` (`manager_dashboard`)
2. `Nhật ký Giao dịch Kho` (`manager_audit`)
3. `Quản lý nhân sự` (`manager_users`)
*(Lưu ý quan trọng: Màn hình thứ 4 là `Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng` (`manager_reports`) đã được gỡ khỏi Sidebar và được mở trực tiếp từ nút `Xem Báo cáo Chi tiết` hoặc `Sửa cấu hình ngưỡng` trên `Dashboard Tổng quan`, đồng thời có nút `Quay lại trang` để trở về Dashboard).*

---

#### 10. Màn hình 10 (`manager_dashboard`): Tổng quan Điều hành Kho Chi nhánh
- **Vai trò sử dụng:** Quản lý Kho (`MANAGER`).
- **Đặc điểm giao diện bản gốc:**
  - Header trang: Tiêu đề `Tổng quan điều hành kho chi nhánh`, mô tả `Giám sát tổng thể luồng xuất nhập tồn, các chỉ số KPI và cảnh báo thiếu hàng.`, bên phải là nút `.btn-3d-primary` **`Xem Báo cáo Chi tiết`** (điều hướng sang `manager_reports`).
  - Hàng 4 thẻ KPI cấp Quản trị (`grid-cols-4 gap-5`):
    1. `Tổng danh mục`: `40` + `mã phụ tùng hoạt động`.
    2. `Cảnh báo thiếu hàng`: Số lượng cảnh báo (chữ vàng cam `text-amber-400`) + huy hiệu đỏ `.status-badge-red` `Dưới ngưỡng an toàn`.
    3. `Giao dịch ghi nhận`: Số giao dịch + huy hiệu xanh `.status-badge-green` `Lưu vết bất biến`.
    4. `Tỷ lệ sai lệch`: `0.0%` (chữ xanh lá) + huy hiệu xanh `.status-badge-green` `Toàn vẹn dữ liệu`.
  - Bảng `CẢNH BÁO LINH KIỆN DƯỚI NGƯỠNG AN TOÀN` (`.card-3d border-red-500/40`):
    - Header bảng nền đỏ sẫm `bg-red-950/30`, icon `warning` đỏ, bên phải là huy hiệu đỏ `${alerts.length} linh kiện cần bổ sung`.
    - 6 cột: `MÃ PHỤ TÙNG`, `TÊN LINH KIỆN`, `TỒN THỰC TẾ` (chữ đỏ đậm), `NGƯỠNG TỐI THIỂU`, `MỨC ĐỘ THIẾU HỤT` (huy hiệu đỏ `Thiếu X cái`), `THAO TÁC` (Nút `.btn-3d-secondary` `Sửa cấu hình ngưỡng` dẫn sang `manager_reports`).

```text
PROMPT STITCH — SCREEN 10: WAREHOUSE MANAGER EXECUTIVE DASHBOARD (manager_dashboard)
Role: Quản lý Kho (`MANAGER`)
Layout: Inside Global Workspace Shell (Left Sidebar with ONLY 3 items: "Dashboard Tổng quan" [ACTIVE], "Nhật ký Giao dịch Kho", "Quản lý nhân sự" + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Tổng quan điều hành kho chi nhánh"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Giám sát tổng thể luồng xuất nhập tồn, các chỉ số KPI và cảnh báo thiếu hàng."`, 12px, `text-slate-400`, mt-1.
- Right:
  * Button: `.btn-3d-primary px-4 py-2 text-xs font-bold`, exact label: `"Xem Báo cáo Chi tiết"`.

[2. FOUR EXECUTIVE KPI 3D CARDS (`grid grid-cols-4 gap-5 mt-5`)]:
- Card 1 (`.card-3d p-5`):
  * Label: `"TỔNG DANH MỤC"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"40"` (30px, font-extrabold, text-white, mt-1).
  * Subtext: `"mã phụ tùng hoạt động"` (12px, `text-slate-400`, mt-1).
- Card 2 (`.card-3d p-5`):
  * Label: `"CẢNH BÁO THIẾU HÀNG"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"5"` (30px, font-extrabold, `text-amber-400`, mt-1).
  * Badge: `.status-badge-red text-[10px] mt-1` with red dot + `"Dưới ngưỡng an toàn"`.
- Card 3 (`.card-3d p-5`):
  * Label: `"GIAO DỊCH GHI NHẬN"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"20"` (30px, font-extrabold, text-white, mt-1).
  * Badge: `.status-badge-green text-[10px] mt-1` with green dot + `"Lưu vết bất biến"`.
- Card 4 (`.card-3d p-5`):
  * Label: `"TỶ LỆ SAI LỆCH"` (11px, font-bold, uppercase, `text-slate-400`).
  * Value: `"0.0%"` (30px, font-extrabold, `text-emerald-400`, mt-1).
  * Badge: `.status-badge-green text-[10px] mt-1` with green dot + `"Toàn vẹn dữ liệu"`.

[3. LOW-STOCK THRESHOLD ALARM TABLE CARD (`.card-3d overflow-hidden border-red-500/40 mt-5`)]:
- Card Header (`px-6 py-4 bg-red-950/30 border-b border-white/10 flex justify-between items-center`):
  * Left: Material icon `"warning"` (20px, `text-red-400`) + `"CẢNH BÁO LINH KIỆN DƯỚI NGƯỠNG AN TOÀN"` (12px, font-bold, uppercase, tracking-wider, text-white).
  * Right: `.status-badge-red text-[11px]` with red dot + `"5 linh kiện cần bổ sung"`.
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    6 Exact Columns: `MÃ PHỤ TÙNG` | `TÊN LINH KIỆN` | `TỒN THỰC TẾ` | `NGƯỠNG TỐI THIỂU` | `MỨC ĐỘ THIẾU HỤT` | `THAO TÁC` (right-aligned).
  * Table Body (`divide-y divide-white/5`):
    - Row 1: `SCR-IP14-01` (bold blue-400 monospace) | `"Màn hình OLED iPhone 14 Pro Max"` (`font-semibold text-slate-200`) | `"12 cái"` (`font-extrabold text-red-400`) | `"15 cái"` (`font-bold text-slate-300`) | `.status-badge-red text-[10px]` `"Thiếu 3 cái"` | Right button `.btn-3d-secondary px-3 py-1 text-xs font-bold` `"Sửa cấu hình ngưỡng"`.
    - Row 2: `BAT-IP13-02` | `"Pin dung lượng chuẩn iPhone 13 Pro"` | `"4 cái"` (`text-red-400`) | `"10 cái"` | `.status-badge-red` `"Thiếu 6 cái"` | Right button `"Sửa cấu hình ngưỡng"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- Left Sidebar MUST ONLY show 3 items ("Dashboard Tổng quan", "Nhật ký Giao dịch Kho", "Quản lý nhân sự"). DO NOT show "Báo cáo Xuất Nhập Tồn" in the sidebar.
- DO NOT add a "Quay lại trang" button on this main dashboard.
```

---

#### 11. Màn hình 11 (`manager_reports`): Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng (Có nút "Quay lại trang")
- **Vai trò sử dụng:** Quản lý Kho (`MANAGER` — truy cập khi bấm `Xem Báo cáo Chi tiết` hoặc `Sửa cấu hình ngưỡng` từ `Dashboard Tổng quan`).
- **Đặc điểm giao diện bản gốc:**
  - Header trang:
    - Bên trái: Tiêu đề `Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng`, mô tả `Quản lý kho có toàn quyền cấu hình lại ngưỡng cảnh báo an toàn cho từng linh kiện.`.
    - Bên phải (`flex items-center gap-2`):
      1. **Nút `Quay lại trang`** (`.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 text-blue-400 hover:text-white`, có icon `arrow_back` bên trái, bấm vào điều hướng về `manager_dashboard`). *(Đây là màn hình duy nhất trong toàn hệ thống có nút `Quay lại trang`)*.
      2. Nút Dropdown `Xuất dữ liệu` (icon `file_download` + `expand_more`, mở menu gồm: `Xuất tệp Excel (.csv)`, `In / Xuất PDF báo cáo`, `Nhập tệp dữ liệu`).
      3. Nút icon `refresh` (`.btn-3d-secondary`).
  - Bảng `DANH MỤC LINH KIỆN VÀ CẤU HÌNH NGƯỠNG AN TOÀN`:
    - Có bộ chọn phân trang `10 dòng / 20 dòng / 50 dòng / Tất cả`.
    - 7 cột: `MÃ LINH KIỆN`, `TÊN PHỤ TÙNG`, `ĐƠN GIÁ (VNĐ)`, `TỒN THỰC TẾ`, `NGƯỠNG AN TOÀN`, `ĐÁNH GIÁ TỒN` (huy hiệu 3 màu), `CẬP NHẬT NGƯỠNG` (ô input số `w-16 h-8` + nút `.btn-3d-primary` `Lưu`).

```text
PROMPT STITCH — SCREEN 11: MANAGER REPORTS & THRESHOLD CONFIGURATION (manager_reports)
Role: Quản lý Kho (`MANAGER`)
Layout: Inside Global Workspace Shell (Left Sidebar with 3 items: "Dashboard Tổng quan", "Nhật ký Giao dịch Kho", "Quản lý nhân sự" + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Báo cáo Xuất Nhập Tồn & Cấu hình Ngưỡng"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Quản lý kho có toàn quyền cấu hình lại ngưỡng cảnh báo an toàn cho từng linh kiện."`, 12px, `text-slate-400`, mt-1.
- Right (`flex items-center gap-2`):
  1. Back Button (MANDATORY ON THIS SCREEN): `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 text-blue-400 hover:text-white`, Material icon `"arrow_back"` (16px) + exact label `"Quay lại trang"`.
  2. Data Actions Dropdown Button: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"file_download"` (16px) + `"Xuất dữ liệu"` + Material icon `"expand_more"` (16px).
     * Dropdown Menu (`#dataActionsMenu`, `w-52 bg-slate-900 border border-white/15 rounded-2xl p-2 .glass-panel`):
       - Item 1: Icon `"table_view"` (emerald-400) + `"Xuất tệp Excel (.csv)"`
       - Item 2: Icon `"picture_as_pdf"` (red-400) + `"In / Xuất PDF báo cáo"`
       - Divider `border-t border-white/10 my-1`
       - Item 3: Icon `"upload_file"` (blue-400) + `"Nhập tệp dữ liệu"`
  3. Refresh Icon Button: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold`, Material icon `"refresh"` (16px).

[2. REPORTS & INLINE THRESHOLD CONFIG TABLE CARD (`.card-3d overflow-hidden mt-5`)]:
- Table Header (`px-6 py-4 border-b border-white/10 bg-slate-950/60 flex justify-between items-center`):
  * Left: `"DANH MỤC LINH KIỆN VÀ CẤU HÌNH NGƯỠNG AN TOÀN"` (12px, font-bold, uppercase, tracking-wider, text-white).
  * Right: `"Hiển thị:"` + Select dropdown (`10 dòng`, `20 dòng`, `50 dòng`, `Tất cả`).
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    7 Exact Columns:
    1. `MÃ LINH KIỆN`
    2. `TÊN PHỤ TÙNG`
    3. `ĐƠN GIÁ (VNĐ)`
    4. `TỒN THỰC TẾ`
    5. `NGƯỠNG AN TOÀN`
    6. `ĐÁNH GIÁ TỒN`
    7. `CẬP NHẬT NGƯỠNG` (right-aligned)
  * Table Body (`divide-y divide-white/5`):
    - Row 1: `SCR-IP14-01` (bold blue-400 monospace) | `"Màn hình OLED iPhone 14 Pro Max"` (`text-slate-200`) | `"6.500.000 đ"` (`font-mono text-slate-300`) | `"12 cái"` (extrabold white) | `"15 cái"` (bold `text-slate-200`) | `.status-badge-red` `"Cảnh báo"` | Right inline group: number input (`w-16 h-8 px-2 text-center text-xs bg-slate-950/70 border border-slate-700 rounded-lg text-white font-bold`, value `15`) + button `.btn-3d-primary h-8 px-2.5 text-xs font-bold` `"Lưu"`.
    - Row 2: `CAM-IP15PM-01` | `"Cụm Camera chính iPhone 15 Pro Max"` | `"4.200.000 đ"` | `"28 cái"` | `"10 cái"` | `.status-badge-green` `"An toàn"` | Right inline input (`10`) + button `"Lưu"`.
- Table Footer (`px-6 py-3 border-t border-white/10 bg-slate-950/60 flex justify-between items-center text-xs text-slate-400`):
  * Left: `"Hiển thị 10 / 40 linh kiện"`.
  * Right: Buttons `"Trước"` | `"Trang 1 / 4"` | `"Sau"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- MUST include the `"Quay lại trang"` button in the top-right action bar of this screen.
- DO NOT add "Báo cáo Xuất Nhập Tồn" to the Left Sidebar.
```

---

#### 12. Màn hình 12 (`manager_audit`): Nhật ký Giao dịch Kho (Audit Log — Không có nút "Quay lại trang")
- **Vai trò sử dụng:** Quản lý Kho (`MANAGER` — truy cập từ mục `Nhật ký Giao dịch Kho` trên Sidebar).
- **Đặc điểm giao diện bản gốc:**
  - Header trang:
    - Bên trái: Tiêu đề `Nhật ký Giao dịch Kho (Audit Log)`, mô tả `Sổ cái lưu vết giao dịch minh bạch, tự động bảo chứng theo thời gian thực.`.
    - Bên phải: Chỉ có nút Dropdown `Xuất dữ liệu` và nút icon `refresh` (**TUYỆT ĐỐI KHÔNG có nút "Quay lại trang"**).
  - Bảng `SỔ CÁI BẢO CHỨNG GIAO DỊCH XUẤT NHẬP KHO`:
    - Bộ chọn phân trang `10 giao dịch / 20 giao dịch / 50 giao dịch / Tất cả`.
    - **8 cột chuẩn xác:** `MÃ GIAO DỊCH`, `THỜI GIAN`, `LINH KIỆN`, `LOẠI GIAO DỊCH` (huy hiệu vàng `Xuất kho thay thế`, huy hiệu xanh lá `Nhập kho vật tư`, huy hiệu xanh dương `Hoàn trả linh kiện`), `SỐ LƯỢNG`, `MÃ PHIẾU BẢO HÀNH`, `NGƯỜI THỰC HIỆN`, `TRUNG TÂM` (`Chi nhánh Quận 1`).

```text
PROMPT STITCH — SCREEN 12: IMMUTABLE WAREHOUSE AUDIT LOG (manager_audit)
Role: Quản lý Kho (`MANAGER`)
Layout: Inside Global Workspace Shell (Left Sidebar "Nhật ký Giao dịch Kho" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Nhật ký Giao dịch Kho (Audit Log)"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Sổ cái lưu vết giao dịch minh bạch, tự động bảo chứng theo thời gian thực."`, 12px, `text-slate-400`, mt-1.
- Right (`flex items-center gap-2`):
  * Button 1: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"file_download"` + `"Xuất dữ liệu"` + `"expand_more"`.
  * Button 2: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold`, Material icon `"refresh"` (16px).
  * (STRICT: DO NOT render a "Quay lại trang" button on this screen).

[2. AUDIT LOG TABLE CARD (`.card-3d overflow-hidden mt-5`)]:
- Table Header (`px-6 py-4 border-b border-white/10 bg-slate-950/60 flex justify-between items-center`):
  * Left: `"SỔ CÁI BẢO CHỨNG GIAO DỊCH XUẤT NHẬP KHO"` (12px, font-bold, uppercase, tracking-wider, text-white).
  * Right: `"Hiển thị:"` + Select dropdown (`10 giao dịch`, `20 giao dịch`, `50 giao dịch`, `Tất cả`).
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    8 Exact Columns:
    1. `MÃ GIAO DỊCH`
    2. `THỜI GIAN`
    3. `LINH KIỆN`
    4. `LOẠI GIAO DỊCH`
    5. `SỐ LƯỢNG`
    6. `MÃ PHIẾU BẢO HÀNH`
    7. `NGƯỜI THỰC HIỆN`
    8. `TRUNG TÂM`
  * Table Body (`divide-y divide-white/5`):
    - Row 1 (OUT): `#884920` (bold blue-400 monospace) | `"2026-10-28 14:20:15"` (`text-slate-400`) | `"SCR-IP14-01"` (bold white monospace) | `.status-badge-yellow` `"Xuất kho thay thế"` | `"1 cái"` (extrabold white) | `"TK-1092"` (bold blue-400 monospace) | `"kythuat.test@gmail.com"` (`text-slate-300 font-medium`) | `"Chi nhánh Quận 1"` (`text-slate-400`).
    - Row 2 (IN): `#884918` | `"2026-10-28 10:15:00"` | `"BAT-IP14-01"` | `.status-badge-green` `"Nhập kho vật tư"` | `"10 cái"` | `"—"` | `"vattu.test@gmail.com"` | `"Chi nhánh Quận 1"`.
    - Row 3 (RETURN): `#884912` | `"2026-10-27 16:40:22"` | `"CAM-IP13-01"` | Blue badge `"Hoàn trả linh kiện"` | `"1 cái"` | `"TK-1085"` | `"kythuat.test@gmail.com"` | `"Chi nhánh Quận 1"`.
- Table Footer (`px-6 py-3 border-t border-white/10 bg-slate-950/60 flex justify-between items-center text-xs text-slate-400`):
  * Left: `"Hiển thị 10 / 20 giao dịch"`.
  * Right: Buttons `"Trước"` | `"Trang 1 / 2"` | `"Sau"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- STRICTLY DO NOT render any "Quay lại trang" button on this screen.
- MUST include the 7th column `"NGƯỜI THỰC HIỆN"` and 8th column `"TRUNG TÂM"`.
- DO NOT display raw "OUT", "IN", "RETURN" strings; use the exact Vietnamese badges.
```

---

#### 13. Màn hình 13 (`manager_users`): Danh sách Nhân sự Cấp dưới (Không có nút "Quay lại trang")
- **Vai trò sử dụng:** Quản lý Kho (`MANAGER` — truy cập từ mục `Quản lý nhân sự` trên Sidebar).
- **Đặc điểm giao diện bản gốc:**
  - Header trang:
    - Bên trái: Tiêu đề `Danh sách Nhân sự cấp dưới`, mô tả `Quản lý kho chỉ điều hành Nhân viên kỹ thuật và Nhân viên vật tư trực thuộc chi nhánh.`.
    - Bên phải: Chỉ có nút Dropdown `Xuất dữ liệu` và nút icon `refresh` (**TUYỆT ĐỐI KHÔNG có nút "Quay lại trang"**).
  - Thanh tìm kiếm & Bộ lọc đa năng (`.card-3d p-4 bg-slate-950/60`):
    - Ô tìm kiếm `#userSearchInput` (`Tìm kiếm theo tên nhân viên, email hoặc mã ID...`).
    - Bộ lọc `Vai trò:` (`#userRoleFilter`): `Tất cả vai trò`, `Nhân viên kỹ thuật`, `Nhân viên vật tư`.
    - Bộ lọc `Trạng thái:` (`#userStatusFilter`) gồm 4 trạng thái chuẩn xác:
      1. `Đang hoạt động (Xanh)` (`ONLINE`)
      2. `Tạm dừng hoạt động (Vàng)` (`AWAY`)
      3. `Nghỉ sau ca làm (Cam/Đỏ)` (`OFF_SHIFT`)
      4. `Đã thôi việc (Đỏ sẫm)` (`TERMINATED`)
    - Bộ chọn `Hiển thị:` (`#userPageSize`): `10 / trang`, `20 / trang`, `50 / trang`, `Tất cả`.
  - Bảng nhân sự (`.card-3d overflow-hidden`) gồm 6 cột: `HỌ VÀ TÊN` (kèm Avatar chữ cái đầu), `EMAIL CÁ NHÂN`, `VAI TRÒ CHUYÊN MÔN` (huy hiệu xanh `KỸ THUẬT VIÊN` / `NHÂN VIÊN VẬT TƯ`), `CHI NHÁNH` (`Chi nhánh Quận 1`), `TRẠNG THÁI HOẠT ĐỘNG` (huy hiệu 4 màu trạng thái), `MÃ ĐỊNH DANH`.

```text
PROMPT STITCH — SCREEN 13: SUBORDINATE PERSONNEL MANAGEMENT (manager_users)
Role: Quản lý Kho (`MANAGER`)
Layout: Inside Global Workspace Shell (Left Sidebar "Quản lý nhân sự" active + Main Workspace `ml-64 pt-16 p-8 pb-20`).
Background: `#070b14`. Font: "Be Vietnam Pro".

[1. PAGE HEADER BAR (`flex justify-between items-end pb-4 border-b border-white/10`)]:
- Left:
  * Heading: `"Danh sách Nhân sự cấp dưới"`, 24px, font-extrabold, text-white.
  * Subtitle: `"Quản lý kho chỉ điều hành Nhân viên kỹ thuật và Nhân viên vật tư trực thuộc chi nhánh."` (`Nhân viên kỹ thuật` and `Nhân viên vật tư` bold), 12px, `text-slate-400`, mt-1.
- Right (`flex items-center gap-2`):
  * Button 1: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5`, Material icon `"file_download"` + `"Xuất dữ liệu"` + `"expand_more"`.
  * Button 2: `.btn-3d-secondary px-3.5 py-1.5 text-xs font-bold`, Material icon `"refresh"` (16px).
  * (STRICT: DO NOT render a "Quay lại trang" button on this screen).

[2. SEARCH & MULTI-FILTER TOOLBAR CARD (`.card-3d p-4 flex items-center justify-between gap-3 bg-slate-950/60 mt-5`)]:
- Search Input (`relative flex-1`):
  * Input (`#userSearchInput`): `w-full h-10 pl-10 pr-3.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white`, left Material icon `"search"`, placeholder `"Tìm kiếm theo tên nhân viên, email hoặc mã ID..."`.
- Right Filter Controls (`flex items-center gap-2.5 text-xs`):
  1. Role Filter: Label `"Vai trò:"` (`text-slate-400`) + Select (`#userRoleFilter`, `h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold`):
     - `"Tất cả vai trò"`
     - `"Nhân viên kỹ thuật"`
     - `"Nhân viên vật tư"`
  2. Status Filter: Label `"Trạng thái:"` (`text-slate-400`) + Select (`#userStatusFilter`, `h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold`):
     - `"Tất cả trạng thái"`
     - `"Đang hoạt động (Xanh)"`
     - `"Tạm dừng hoạt động (Vàng)"`
     - `"Nghỉ sau ca làm (Cam/Đỏ)"`
     - `"Đã thôi việc (Đỏ sẫm)"`
  3. Page Size Selector: Label `"Hiển thị:"` (`text-slate-400`) + Select (`#userPageSize`, `h-10 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold`):
     - `"10 / trang"`, `"20 / trang"`, `"50 / trang"`, `"Tất cả"`.

[3. SUBORDINATE PERSONNEL TABLE CARD (`.card-3d overflow-hidden mt-5`)]:
- Table (`w-full text-left border-collapse text-xs`):
  * Table Head (`bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase font-bold`):
    6 Exact Columns:
    1. `HỌ VÀ TÊN`
    2. `EMAIL CÁ NHÂN`
    3. `VAI TRÒ CHUYÊN MÔN`
    4. `CHI NHÁNH`
    5. `TRẠNG THÁI HOẠT ĐỘNG`
    6. `MÃ ĐỊNH DANH` (right-aligned)
  * Table Body (`divide-y divide-white/5`):
    - Row 1 (ONLINE): `28x28px` rounded-xl blue-indigo avatar `"L"` + `"Lê Văn Kỹ Thuật"` (bold white) | `"kythuat.test@gmail.com"` (`text-slate-400`) | `.status-badge-green` `"KỸ THUẬT VIÊN"` | `"Chi nhánh Quận 1"` (`text-slate-300`) | `.status-badge-green` `"Đang hoạt động"` | `"04A1DDA4"` (monospace `text-slate-500` right-aligned).
    - Row 2 (AWAY): Avatar `"N"` + `"Nguyễn Thị Vật Tư"` | `"vattu.test@gmail.com"` | `.status-badge-green` `"NHÂN VIÊN VẬT TƯ"` | `"Chi nhánh Quận 1"` | `.status-badge-yellow` `"Tạm dừng hoạt động"` | `"04A1DDA3"`.
    - Row 3 (OFF_SHIFT): Avatar `"V"` + `"Vũ Thế Long"` | `"vuthelong1009@gmail.com"` | `.status-badge-green` `"KỸ THUẬT VIÊN"` | `"Chi nhánh Quận 1"` | `.status-badge-red` `"Nghỉ sau ca làm"` | `"773EF86F"`.
    - Row 4 (TERMINATED): Avatar `"P"` + `"Phạm Nguyễn Hoàng Anh"` | `"anhpham712002@gmail.com"` | `.status-badge-green` `"NHÂN VIÊN VẬT TƯ"` | `"Chi nhánh Quận 1"` | `.status-badge-terminated` `"Đã thôi việc (Vĩnh viễn)"` | `"AF3299D3"`.
- Table Footer (`px-6 py-3 border-t border-white/10 bg-slate-950/60 flex justify-between items-center text-xs text-slate-400`):
  * Left: `"Hiển thị 4 / 4 nhân sự"`.
  * Right: Buttons `"Trước"` | `"Trang 1 / 1"` | `"Sau"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- STRICTLY DO NOT render any "Quay lại trang" button on this screen.
- Never display any `MANAGER` role rows in this subordinate table (only `KỸ THUẬT VIÊN` and `NHÂN VIÊN VẬT TƯ`).
- Render all 4 distinct status badges (`Đang hoạt động`, `Tạm dừng hoạt động`, `Nghỉ sau ca làm`, `Đã thôi việc (Vĩnh viễn)`).
```

---

### E. THÀNH PHẦN DÙNG CHUNG: MODAL NHẬP TỆP DỮ LIỆU ĐA NĂNG 3D (`#fileImportModal`)

#### 14. Màn hình / Component 14 (`#fileImportModal`): Cửa sổ Nhập Tệp Dữ Liệu Đa Năng 3D
- **Vai trò sử dụng:** Quản lý Kho (`MANAGER` — mở ra khi chọn `Nhập tệp dữ liệu` trong menu `Xuất dữ liệu` tại trang Báo cáo, Nhật ký hoặc Quản lý nhân sự).

```text
PROMPT STITCH — SCREEN 14: MULTI-FORMAT FILE IMPORT 3D MODAL (#fileImportModal)
Role: Quản lý Kho (`MANAGER`)
Overlay: `fixed inset-0 bg-black/75 backdrop-blur-md z-[9995] flex items-center justify-center p-4`.
Modal Container: `bg-slate-900 border border-white/15 rounded-3xl shadow-2xl max-w-lg w-full p-6 .glass-panel`.
Font: "Be Vietnam Pro".

[1. MODAL HEADER (`flex items-center justify-between pb-3 border-b border-white/10`)]:
- Left (`flex items-center gap-2`):
  * Icon Badge: `32x32px` (`w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center`), Material icon `"upload_file"` (20px).
  * Title: `"NHẬP TÀI LIỆU & TỆP DỮ LIỆU"` (14px, font-bold, uppercase, tracking-wide, text-white).
- Right: Close button with Material icon `"close"` (18px, `text-slate-400 hover:text-white`).

[2. MODAL BODY FORM (`flex-col gap-4 mt-4`)]:
- Format Radio Selector:
  * Label: `"Chọn định dạng tệp cần đẩy lên *"` (12px, font-bold, `text-slate-300`).
  * 2-Column Grid (`grid-cols-2 gap-3`):
    - Option 1 (Checked): `p-3 border border-white/10 bg-slate-950/60 rounded-xl flex items-center gap-2.5`, radio checked, Material icon `"table_view"` (16px, `text-emerald-400`) + `"Bảng tính Excel (.csv, .xlsx)"` (12px bold white), subtext `"Nạp nhân sự hoặc tồn kho"` (10px `text-slate-400`).
    - Option 2: `p-3 border border-white/10 bg-slate-950/60 rounded-xl flex items-center gap-2.5`, Material icon `"picture_as_pdf"` (16px, `text-red-400`) + `"Tài liệu PDF (.pdf)"` (12px bold white), subtext `"Chứng từ / Phiếu giao / Hóa đơn"` (10px `text-slate-400`).
- Drag & Drop Upload Zone (`#modalDropZone`):
  * Label: `"Tải lên tệp tài liệu *"` (12px, font-bold, `text-slate-300`).
  * Dashed Box: `border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-6 flex-col items-center justify-center gap-2 bg-slate-950/60`:
    - Material icon `"cloud_upload"` (36px, `text-slate-500`).
    - Text: `"Nhấp để chọn tệp"` (bold white) + `" hoặc kéo thả tệp vào đây"` (`text-slate-400`), 12px.
    - Hint (`#modalFileHint`): `"Định dạng hỗ trợ: .csv, .xlsx, .json"` (11px, `text-slate-500`).
- Selected File Preview Box (`#modalFilePreviewBox`, `p-3 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-between text-xs`):
  * Left: Material icon `"description"` (20px, `text-emerald-400`) + filename `"danh_sach_nhan_su.json"` (bold white) + size `"4.2 KB"` (10px `text-slate-400`).
  * Right: Delete button with Material icon `"delete"` (16px, `text-red-400`).

[3. MODAL FOOTER (`flex items-center justify-end gap-2.5 pt-3 border-t border-white/10`)]:
- Button 1: `.btn-3d-secondary px-4 py-2 text-xs font-semibold`, exact label: `"Hủy bỏ"`.
- Button 2 (`#submitModalImportBtn`): `.btn-3d-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5`, Material icon `"upload"` (16px) + `"Xác nhận tải lên & Xử lý"`.

[STRICT CONSTRAINTS — DO NOT ADD / DO NOT REMOVE]:
- Keep exact labels and 2 radio options (`EXCEL` and `PDF`). Do not add extra form inputs inside the modal.
```

---

## PHẦN IV: MA TRẬN ĐỐI CHIẾU ĐỒNG BỘ 100% GIỮA PROMPT STITCH VÀ SOURCE CODE WEBSITE

| STT | Hạng mục Giao diện / Ràng buộc | Đặc tả trong Prompt Stitch (`docs/thietke.md`) | Mã nguồn thực tế (`index.html`, `styles.css`, `app.js`) | Trạng thái Đồng bộ |
| :-: | :--- | :--- | :--- | :-: |
| **1** | **Phông chữ toàn hệ thống** | `Be Vietnam Pro` trên mọi thành phần | `styles.css`: `--font-main: 'Be Vietnam Pro'` | **100% Khớp** |
| **2** | **Tông màu & Hiệu ứng 3D** | Deep Space `#070b14`, `.card-3d`, `.glass-panel`, `.btn-3d-primary` | `styles.css` dòng 15–190 & `index.html` dòng 17–44 | **100% Khớp** |
| **3** | **Header Top Bar** | Logo `L5` + `SMART CRM — MEKONG MOBILE` + `Chi nhánh: Quận 1`; Không có khung xám Luồng 05; Nút `Đăng xuất tài khoản` | `index.html` dòng 408–479 (`test_03`, `test_06`) | **100% Khớp** |
| **4** | **Loại bỏ Breadcrumbs & Mã kỹ thuật** | 0 breadcrumbs, 0 mã `BR/FR/NFR` trên toàn bộ 14 màn hình | `app.js` toàn tệp (`test_05`) | **100% Khớp** |
| **5** | **Nút con mắt & Checklist mật khẩu ẩn** | Có `.eye-toggle-btn` ở cả 3 form; `#regPasswordChecklist` & `#resetPasswordChecklist` ẩn mặc định (`hidden`) | `index.html` dòng 111, 201, 214, 349, 362 (`test_09`) | **100% Khớp** |
| **6** | **Đếm ngược OTP 10 phút** | `#countdownTimer` bắt đầu ở `10:00`, đếm ngược từng giây `startOtpCountdown(600)`, tự động điền `#resetOtp` | `index.html` dòng 327 & `app.js` dòng 170–200, 2690–2701 (`test_10`) | **100% Khớp** |
| **7** | **Tra cứu Kỹ thuật viên (Screen 05)** | Bỏ nút `Tra cứu`; `#smartPartSearch` ban đầu rỗng, hỗ trợ phím `Enter`; khung tồn kho ban đầu `Chưa chọn linh kiện`; nút `Đặt lại biểu mẫu` xóa sạch 100% | `app.js` dòng 813–860, 1017–1177 (`test_07`, `test_15`) | **100% Khớp** |
| **8** | **Bảng tin Vật tư (Screen 07)** | Không có nút `Tạo lệnh Nhập kho mới` ở Main Content; hiển thị huy hiệu `Trung tâm Vật tư Quận 1` | `app.js` dòng 1369–1377 (`test_12`) | **100% Khớp** |
| **9** | **Nhập kho Vật tư (Screen 08)** | Lưới 2 cột: Cột 7 `PHIẾU TIẾP NHẬN NHẬP KHO VẬT TƯ` + Cột 5 `THỐNG KÊ TỒN KHO LINH KIỆN` 40 mặt hàng kèm nút `Chọn` | `app.js` dòng 1487–1625 (`test_12`) | **100% Khớp** |
| **10** | **Sidebar Quản lý kho & Nút Quay lại trang** | Sidebar `MANAGER` chỉ có 3 mục (bỏ Báo cáo); chỉ duy nhất `Screen 11` (Báo cáo) có nút `Quay lại trang`; `Screen 12` (Sổ cái) và `Screen 13` (Nhân sự) không có nút `Quay lại trang` | `app.js` dòng 457–463, 1889–1892, 2016–2027, 2140–2151 (`test_13`) | **100% Khớp** |
| **11** | **Chuyển ngữ tiếng Việt & Biểu diễn OUT** | `OUT` -> `Xuất kho thay thế`, `IN` -> `Nhập kho vật tư`, `RETURN` -> `Hoàn trả linh kiện`; Sổ cái có cột `NGƯỜI THỰC HIỆN` và `MÃ PHIẾU BẢO HÀNH` | `app.js` dòng 202–226, 2046–2075 (`test_11`) | **100% Khớp** |
| **12** | **Quản lý nhân sự 4 trạng thái (Screen 13)** | Tìm kiếm + Lọc vai trò + Lọc 4 trạng thái (`ONLINE`, `AWAY`, `OFF_SHIFT`, `TERMINATED`) + Phân trang `10/20/50/Tất cả` | `app.js` dòng 2107–2315 (`test_08`) | **100% Khớp** |
