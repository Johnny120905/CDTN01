with open("src/static/app.js", "r", encoding="utf-8") as f:
    js = f.read().replace("\r\n", "\n")

print("1. not manager_reports:", '{ id: "manager_reports"' not in js)
print("2. manager_dashboard:", '{ id: "manager_dashboard", label: "Dashboard Tổng quan"' in js)
print("3. manager_audit:", '{ id: "manager_audit", label: "Nhật ký Giao dịch Kho"' in js)
print("4. manager_users:", '{ id: "manager_users", label: "Quản lý nhân sự"' in js)
print("5. Quay lai trang:", "Quay lại trang" in js)
print("6. navigateToTab:", "navigateToTab('manager_dashboard')" in js)
