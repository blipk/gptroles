from gptroles.ai.engines.orto.engine_orto import sections_orto_roles  # noqa: E402

root_roles = sections_orto_roles  # str  # list[str]


role_confirmation = """
If you have understood all these instructions, write exactly as an answer to this "Role successfully initialised.”, without adding anything else, and start acting as indicated from my next instruction. Thank you.
""".strip()
