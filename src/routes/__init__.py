"""
File: src/routes/__init__.py
Mục đích: Module export cho Lớp Điều phối (Routes/Controllers).
Tải động tệp inventory.routes.py để Python có thể import trực tiếp.
"""

import os
import importlib.util

_file_path = os.path.join(os.path.dirname(__file__), "inventory.routes.py")
_spec = importlib.util.spec_from_file_location("inventory_routes_mod", _file_path)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

router = getattr(_mod, "router")
auth_router = getattr(_mod, "auth_router")
get_current_user = getattr(_mod, "get_current_user")

__all__ = ["router", "auth_router", "get_current_user"]
