"""
File: src/errors/AppError.py
Dự án: Hệ thống Smart CRM – Mekong Mobile (Luồng 05: Kho linh kiện thay thế)
Mục đích: Định nghĩa lớp ngoại lệ nghiệp vụ chuẩn hóa (Custom Application Error).
Vai trò trong kiến trúc phân lớp:
  - Được ném ra (raise) từ Lớp Nghiệp vụ (inventory.service.py) và Lớp Kiểm tra (inventory.validator.py).
  - Được bắt (catch) và xử lý tập trung tại app.py thông qua FastAPI Exception Handler để trả về mã HTTP chuẩn
    kèm thông điệp tiếng Việt thân thiện, triệt tiêu 100% lỗi hệ thống 500 lộ ra ngoài giao diện (NFR-04).
"""

class AppError(Exception):
    """
    Lớp ngoại lệ tùy chỉnh cho các lỗi nghiệp vụ và xác thực dữ liệu.
    
    Các thuộc tính:
      - status_code (int): Mã trạng thái HTTP tương ứng (400, 401, 403, 404, 409, 422).
      - error_code (str): Mã lỗi định danh theo hợp đồng API (VD: ERR_NEGATIVE_STOCK, ERR_INVALID_TICKET).
      - message (str): Thông điệp mô tả lỗi bằng Tiếng Việt trực quan cho người dùng.
    
    Kết hợp với:
      - inventory.service.py: Ném ra khi vi phạm các quy tắc nghiệp vụ BR-01, BR-02, BR-04, BR-05.
      - inventory.validator.py: Ném ra khi dữ liệu đầu vào không hợp lệ.
      - app.py: Bắt lỗi và chuyển thành JSON response dạng {"status": "error", "error_code": ..., "message": ...}.
    """
    def __init__(self, status_code: int, error_code: str, message: str):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message

    def to_dict(self) -> dict:
        """Chuyển đổi lỗi thành định dạng từ điển (Dictionary) phục vụ serialize JSON."""
        return {
            "status": "error",
            "error_code": self.error_code,
            "message": self.message
        }


# ==============================================================================
# CÁC LỚP LỖI NGHIỆP VỤ TIÊU BIỂU ÁNH XẠ VỚI CÁC QUY TẮC NGHIỆP VỤ (BR) VÀ NGOẠI LỆ (EX)
# ==============================================================================

class NegativeStockError(AppError):
    """Lỗi vi phạm quy tắc BR-01 & Ngoại lệ EX-04: Số lượng xuất vượt quá tồn kho thực tế."""
    def __init__(self, message: str = "Số lượng xuất vượt quá tồn kho thực tế. Giao dịch bị từ chối."):
        super().__init__(
            status_code=400,
            error_code="ERR_NEGATIVE_STOCK",
            message=message
        )

class InvalidTicketError(AppError):
    """Lỗi vi phạm quy tắc BR-02 & Ngoại lệ EX-03: Mã phiếu bảo hành bắt buộc khi xuất kho không hợp lệ hoặc đã đóng."""
    def __init__(self, message: str = "Mã phiếu bảo hành không tồn tại hoặc đã đóng."):
        super().__init__(
            status_code=422,
            error_code="ERR_INVALID_TICKET",
            message=message
        )

class ConcurrentUpdateError(AppError):
    """Lỗi Ngoại lệ EX-05: Xung đột phiên bản tài liệu (Optimistic Locking) khi 2 người xuất cùng lúc."""
    def __init__(self, message: str = "Linh kiện này vừa được cập nhật bởi một giao dịch khác. Vui lòng tải lại."):
        super().__init__(
            status_code=409,
            error_code="ERR_CONCURRENT_UPDATE",
            message=message
        )

class UnauthorizedCenterError(AppError):
    """Lỗi vi phạm quy tắc BR-04 & Ngoại lệ EX-02: Truy cập trái phép vào dữ liệu kho của trung tâm khác."""
    def __init__(self, message: str = "Bạn không có quyền thao tác trên dữ liệu của trung tâm này."):
        super().__init__(
            status_code=403,
            error_code="ERR_UNAUTHORIZED_CENTER",
            message=message
        )

class UnauthorizedRoleError(AppError):
    """Lỗi phân quyền vai trò người dùng (VD: Kỹ thuật viên cố tình sửa ngưỡng cảnh báo an toàn)."""
    def __init__(self, message: str = "Tài khoản của bạn không có quyền sửa đổi thông số này."):
        super().__init__(
            status_code=403,
            error_code="ERR_UNAUTHORIZED_ROLE",
            message=message
        )

class ResourceNotFoundError(AppError):
    """Lỗi tài nguyên không tìm thấy (Mã linh kiện hoặc Trung tâm không tồn tại trong CSDL)."""
    def __init__(self, message: str = "Không tìm thấy dữ liệu yêu cầu."):
        super().__init__(
            status_code=404,
            error_code="ERR_NOT_FOUND",
            message=message
        )
