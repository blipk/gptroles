from gptroles.gpt.engines.orto.engine_orto import orto_system, orto_roles  # noqa: E402

root_roles = dict(system=f"{orto_system}", other=orto_roles)  # str  # list[str]


role_confirmation = """
If you have understood all these instructions, write exactly as an answer to this "Role successfully initialised.”, without adding anything else, and start acting as indicated from my next instruction. Thank you.
""".strip()
