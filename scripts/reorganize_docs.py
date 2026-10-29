import os
import shutil

def run():
    workspace = os.path.abspath(".")
    docs_dir = os.path.join(workspace, "docs")
    
    print(f"Workspace: {workspace}")
    print(f"Docs dir: {docs_dir}")
    
    # 1. Update docs/thaydoithietke.md with latest adjustments
    root_thaydoi = os.path.join(workspace, "thaydoithietke.md")
    docs_thaydoi = os.path.join(docs_dir, "thaydoithietke.md")
    
    with open(root_thaydoi, "r", encoding="utf-8") as f:
        thaydoi_content = f.read()
    
    # Enhance thaydoi_content to include latest refinement notes
    if "LẦN 5" not in thaydoi_content:
        extra_iteration = """| STT | Thành Phần / Giao Diện | Trạng Thái Thiết Kế Cũ (Trước Thay Đổi) | Trạng Thái Thiết Kế Mới (Sau Hoàn Thiện) | Tác Động Tới Hệ Thống |
| :---: | :--- | :--- | :--- | :--- |
| **11** | **Tra cứu Kỹ thuật viên (Bỏ nút Tra cứu & Enter trực tiếp)** | Phải bấm nút "Tra cứu", khi bấm nút "Đặt lại biểu mẫu" vẫn còn lưu giữ thông tin cũ gây hiểu nhầm. | - **Loại bỏ hoàn toàn nút "Tra cứu"** khỏi form xuất linh kiện.<br>- Tìm kiếm thông minh: Gõ từ khóa tự động hiện danh sách gợi ý; **bấm phím `Enter` tự động chọn và tra cứu ngay**.<br>- **Nút "Đặt lại biểu mẫu" khôi phục sạch sẽ 100%:** Xóa trắng ô tìm kiếm, xóa linh kiện, khung tồn kho trở về hướng dẫn ban đầu (*"Chưa chọn linh kiện"*), xóa mã phiếu bảo hành, đưa số lượng về 1, xóa toàn bộ các dòng báo lỗi đỏ. | Thao tác mượt mà, tối giản hành vi người dùng, biểu mẫu luôn trong trạng thái rõ ràng. |
| **12** | **Loại bỏ nút Quay lại trang ở Sổ cái & Quản lý nhân sự** | Giao diện Sổ cái Nhật ký và Quản lý nhân sự có nút "Quay lại trang" gây dư thừa vì đã nằm sẵn trên Sidebar. | - **Loại bỏ nút "Quay lại trang"** ở cả hai giao diện Nhật ký Giao dịch Kho và Quản lý nhân sự.<br>- Chỉ duy trì duy nhất nút "Quay lại trang" tại **Báo cáo Xuất Nhập Tồn** để Quản lý kho quay về Dashboard Tổng quan. | Cấu trúc điều hướng tinh gọn, chuẩn nghiệp vụ phân cấp. |
| **13** | **Loại trừ triệt để chuỗi undefined** | Một số thuộc tính thiếu giá trị có nguy cơ hiển thị chuỗi `undefined` trên giao diện người dùng. | Tích hợp cơ chế Fallback an toàn 100% bằng tiếng Việt chuẩn cho tất cả các trường dữ liệu (`Mã LK`, `Linh kiện thay thế`, `Họ tên`,...). | Giao diện chuyên nghiệp, sạch sẽ, không có lỗi hiển thị thô. |
"""
        thaydoi_content = thaydoi_content.replace(
            "| **10** | **Quy chuẩn Mật khẩu** | Bảng checklist 4 tiêu chí hiện thô trên màn hình gây rối mắt. | Ẩn mặc định (class `hidden`), chỉ xuất hiện và báo lỗi khi người dùng nhập sai quy chuẩn 8 ký tự (Hoa, thường, số, ký hiệu). Thêm nút con mắt bật/tắt mật khẩu. | Giao diện hiện đại, tinh tế, chuẩn công nghiệp. |\n",
            "| **10** | **Quy chuẩn Mật khẩu** | Bảng checklist 4 tiêu chí hiện thô trên màn hình gây rối mắt. | Ẩn mặc định (class `hidden`), chỉ xuất hiện và báo lỗi khi người dùng nhập sai quy chuẩn 8 ký tự (Hoa, thường, số, ký hiệu). Thêm nút con mắt bật/tắt mật khẩu. | Giao diện hiện đại, tinh tế, chuẩn công nghiệp. |\n" + extra_iteration
        )
    
    with open(docs_thaydoi, "w", encoding="utf-8") as f:
        f.write(thaydoi_content)
    print("Updated docs/thaydoithietke.md")
    
    # Remove old docs/thay-doi-thiet-ke.md if exists
    old_hyphen_file = os.path.join(docs_dir, "thay-doi-thiet-ke.md")
    if os.path.exists(old_hyphen_file):
        os.remove(old_hyphen_file)
        print("Removed old docs/thay-doi-thiet-ke.md")

    # 2. Ensure docs/test.md has the comprehensive content and clean lowercase name
    docs_Test = os.path.join(docs_dir, "Test.md")
    docs_test = os.path.join(docs_dir, "test.md")
    
    test_content = ""
    if os.path.exists(docs_Test):
        with open(docs_Test, "r", encoding="utf-8") as f:
            test_content = f.read()
    else:
        with open(os.path.join(workspace, "test.md"), "r", encoding="utf-8") as f:
            test_content = f.read()

    # Write to a temp file, remove Test.md, write to test.md
    temp_test = os.path.join(docs_dir, "test_temp.md")
    with open(temp_test, "w", encoding="utf-8") as f:
        f.write(test_content)
    
    if os.path.exists(docs_Test):
        os.remove(docs_Test)
    if os.path.exists(docs_test):
        os.remove(docs_test)
    shutil.move(temp_test, docs_test)
    print("Ensured docs/test.md with comprehensive content")

    # 3. Ensure docs/thietke.md is updated
    root_thietke = os.path.join(workspace, "thietke.md")
    docs_thietke = os.path.join(docs_dir, "thietke.md")
    with open(root_thietke, "r", encoding="utf-8") as f:
        thietke_content = f.read()
    with open(docs_thietke, "w", encoding="utf-8") as f:
        f.write(thietke_content)
    print("Updated docs/thietke.md")

    # 4. Ensure docs/BT2.md is updated
    root_bt2 = os.path.join(workspace, "BT2.md")
    docs_bt2 = os.path.join(docs_dir, "BT2.md")
    with open(root_bt2, "r", encoding="utf-8") as f:
        bt2_content = f.read()
    with open(docs_bt2, "w", encoding="utf-8") as f:
        f.write(bt2_content)
    print("Updated docs/BT2.md")

    # 5. Clean up redundant files in workspace root
    root_cleanup_files = [
        "test.md",
        "thaydoithietke.md",
        "thietke.md",
        "BT2.md",
        "Thietkethaydoi.md"
    ]
    for rf in root_cleanup_files:
        p = os.path.join(workspace, rf)
        if os.path.exists(p):
            os.remove(p)
            print(f"Removed root duplicate: {rf}")

    print("\nDocumentation reorganization completed successfully!")

if __name__ == "__main__":
    run()
