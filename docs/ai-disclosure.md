# PHỤ LỤC BẮT BUỘC: KHAI BÁO SỬ DỤNG CÔNG CỤ TRÍ TUỆ NHÂN TẠO (AI)

**Cam kết của sinh viên:** 
Tôi xin cam đoan tính minh bạch trong quá trình thực hiện Bài tập 1. Mọi công cụ Trí tuệ Nhân tạo (AI) được liệt kê dưới đây đóng vai trò là "trợ lý" hỗ trợ định dạng văn bản, tạo mã vẽ sơ đồ và phác thảo giao diện. Toàn bộ kiến trúc cốt lõi, quy tắc nghiệp vụ, bảng đối chiếu dữ liệu và quyết định thiết kế đều được tôi trực tiếp kiểm duyệt, tinh chỉnh và đối chiếu chặt chẽ với case study Luồng L5 (Quản lý Kho linh kiện). Tôi hoàn toàn hiểu và chịu trách nhiệm về mọi chi tiết trong tài liệu này.

**Bảng kê khai chi tiết mức độ sử dụng AI:**

| STT | Tên công cụ AI | Nhiệm vụ / Mục đích sử dụng | Thành phần áp dụng trong Bài tập | Cách sinh viên kiểm chứng & Chịu trách nhiệm |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Google Gemini** | Tinh chỉnh văn phong học thuật (SRS, Đặc tả Use Case); cấu trúc hóa các Yêu cầu phi chức năng (NFR) có ngưỡng số; sinh mã code PlantUML; gợi ý câu từ cho phần Lập luận kiến trúc và viết Prompt thiết kế UI. | Thành phần 1, 2, 3, 4 & 5. | Sinh viên cung cấp dữ liệu thô ban đầu. Sau khi AI trả kết quả, sinh viên tự đối chiếu lại 100% với Barem chấm điểm và ràng buộc của Luồng L5 để cắt bỏ các chi tiết thừa/sai lệch. |
| **2** | **Draw.io (qua Text-to-Code PlantUML)** | Render tự động các bản vẽ kỹ thuật (Use Case, Kiến trúc, ERD) dựa trên đoạn mã do Gemini cung cấp để đảm bảo tính thẩm mỹ và chuẩn hóa cấu trúc. | Thành phần 2 (Use Case), Thành phần 3 (Kiến trúc) & Thành phần 4 (ERD). | Sinh viên tự xác định danh sách bảng, khóa ngoại và luồng quan hệ. Sau khi Render, sinh viên rà soát lại các ký pháp (Crow's foot, Include/Extend, mũi tên một chiều) trước khi xuất ảnh. |
| **3** | **Stitch** | Sinh hình ảnh phác thảo giao diện (Wireframes) cho 3 màn hình cốt lõi dựa trên các câu lệnh (Prompt) mô tả cấu trúc Layout và trường dữ liệu. | Thành phần 5 (Wireframe 3 màn hình). | Sinh viên tự thiết kế cấu trúc Form, sau khi Stitch sinh ảnh, sinh viên tiến hành đối chiếu chéo thủ công từng trường nhập liệu trên ảnh với bảng ERD để đảm bảo tính "đóng vòng" dữ liệu. |