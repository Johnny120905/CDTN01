-- 1. Bảng lưu trữ Danh mục Trung tâm bảo hành
CREATE TABLE service_center (
    center_id VARCHAR(20) PRIMARY KEY,
    center_name VARCHAR(100) NOT NULL
);

-- 2. Bảng Danh mục Linh kiện gốc
CREATE TABLE part (
    part_code VARCHAR(20) PRIMARY KEY,
    part_name VARCHAR(120) NOT NULL,
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    min_threshold INT NOT NULL DEFAULT 5 CHECK (min_threshold >= 0) -- Phục vụ BR-05
);

-- 3. Bảng Tham chiếu Phiếu bảo hành (Từ phân hệ Lễ tân)
CREATE TABLE ticket (
    ticket_id VARCHAR(20) PRIMARY KEY,
    status VARCHAR(20) NOT NULL
);

-- 4. Bảng Tồn kho vật lý tại từng trung tâm (Lưu trạng thái Real-time)
CREATE TABLE part_stock (
    center_id VARCHAR(20) REFERENCES service_center(center_id),
    part_code VARCHAR(20) REFERENCES part(part_code),
    quantity INT NOT NULL CHECK (quantity >= 0), -- Phục vụ BR-01: Chống tồn kho âm
    PRIMARY KEY (center_id, part_code)
);

-- 5. Bảng Nhật ký Giao dịch (Sổ cái lưu vết)
CREATE TABLE part_transaction (
    transaction_id BIGSERIAL PRIMARY KEY,
    center_id VARCHAR(20) NOT NULL REFERENCES service_center(center_id),
    part_code VARCHAR(20) NOT NULL REFERENCES part(part_code),
    type VARCHAR(10) NOT NULL CHECK (type IN ('IN', 'OUT', 'RETURN')),
    quantity INT NOT NULL CHECK (quantity > 0),
    ticket_id VARCHAR(20) REFERENCES ticket(ticket_id), -- Phục vụ BR-02: Bắt buộc chứng từ
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- CÁC CHỈ MỤC (INDEXES) PHỤC VỤ HIỆU NĂNG (NFR-02)
-- ==========================================
-- Tăng tốc tra cứu Real-time số lượng linh kiện tại một trung tâm (< 500ms)
CREATE INDEX idx_stock_lookup ON part_stock(center_id, part_code);

-- Tăng tốc trích xuất lịch sử giao dịch mới nhất cho Quản lý kho
CREATE INDEX idx_transaction_history ON part_transaction(center_id, created_at DESC);
