"""
File: src/repositories/__init__.py
Mục đích: Module export cho Lớp Truy cập Dữ liệu.
Tải động tệp inventory.repository.py để Python có thể import trực tiếp.
"""

import os
import importlib.util

_file_path = os.path.join(os.path.dirname(__file__), "inventory.repository.py")
_spec = importlib.util.spec_from_file_location("inventory_repo_mod", _file_path)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

# Export các biểu tượng ra cấp module
InventoryRepository = getattr(_mod, "InventoryRepository")
inventory_repository = getattr(_mod, "inventory_repository")

__all__ = ["InventoryRepository", "inventory_repository"]
