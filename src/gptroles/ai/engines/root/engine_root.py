from gptroles.ai.engines.orto.engine_orto import sections_orto_roles

from gptroles.ai.engines.root.roles.roleplay import roleplay_role
from gptroles.ai.engines.root.roles.roles_code import codeproj_role, command_role

root_roles = [roleplay_role]
# root_roles = sections_orto_roles  # str  # list[str]


role_confirmation = """
If you have understood all these instructions, write exactly as an answer to this "Role successfully initialised.”, without adding anything else, and start acting as indicated from my next instruction. Thank you.
""".strip()
