"""
File: src/services/__init__.py
Mục đích: Module export cho Lớp Nghiệp vụ (Services).
Tải động tệp inventory.service.py để Python có thể import trực tiếp.
"""

import os
import importlib.util

_file_path = os.path.join(os.path.dirname(__file__), "inventory.service.py")
_spec = importlib.util.spec_from_file_location("inventory_service_mod", _file_path)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

InventoryService = getattr(_mod, "InventoryService")
inventory_service = getattr(_mod, "inventory_service")

__all__ = ["InventoryService", "inventory_service"]
