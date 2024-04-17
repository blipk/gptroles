import os
import base64
import sqlite3
import threading

from contextlib import nullcontext
from cryptography.fernet import Fernet, InvalidToken

from streamlitextras.logger import log, bind_log

from appconfig import settings

import streamlit as st

locks = {}


@st.cache_resource
def get_db_lock(db_path: str) -> threading.Lock:
    global locks
    # print("XX", locks)
    locks[db_path] = locks.get(db_path, None) or threading.Lock()
    # print("YY", locks)
    return locks[db_path]


class ManagerDB:
    def __init__(
        self, session_id: str, use_encryption: bool = True, debug: bool = False
    ) -> None:
        self.session_id = session_id
        self.use_encryption = use_encryption
        self.debug = debug
        # self.key = Fernet.generate_key()
        self.key = base64.urlsafe_b64encode(str("salt" + session_id).encode()[:32])
        self.fernet = Fernet(self.key)
        self._create_temp_db()

    @property
    def lock(self) -> threading.Lock:
        return get_db_lock(self.db_path)

    @property
    def logbind(self) -> dict:
        return {"db_session_id": self.session_id}

    @property
    def db_dir(self) -> str:
        user_session_dir = os.path.join(
            settings.tmp_folder, "sessions", self.session_id
        )
        os.makedirs(user_session_dir, exist_ok=True)
        return user_session_dir

    @property
    def db_path(self) -> str:
        db_path = os.path.join(self.db_dir, f"{self.session_id}.db")
        return db_path

    @property
    def db_exists(self) -> bool:
        return os.path.exists(self.db_path)

    @property
    def conn(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        return conn

    def _create_temp_db(self) -> None:
        conn = self.conn
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_data BLOB
            )
            """
        )
        conn.close()

        if self.debug:
            log.debug(f"Initialized db file and table {self.db_path}", **self.logbind)

    def _reset_temp_db(self) -> None:
        conn = self.conn
        conn.execute("DROP TABLE IF EXISTS sessions;")
        conn.close()

        if self.debug:
            log.debug(f"Reset db table {self.db_path}", **self.logbind)

    def _encrypt_data(self, data: bytes) -> bytes:
        if not self.use_encryption:
            return data

        return self.fernet.encrypt(data)

    def _decrypt_data(self, encrypted_data: bytes) -> bytes | None:
        if not self.use_encryption:
            return encrypted_data

        try:
            data = self.fernet.decrypt(encrypted_data)
        except InvalidToken:
            log.warning("Invalid decryption key", **self.logbind)
            self.delete_db_file(False)
            return None

        return data

    def save_session(self, data: bytes, use_lock: bool = True) -> bool:
        encrypted_data = self._encrypt_data(data)
        with self.lock if use_lock else nullcontext():
            self._reset_temp_db()
            self._create_temp_db()

            conn = self.conn
            conn.execute(
                "INSERT INTO sessions (session_data) VALUES (?)", (encrypted_data,)
            )
            conn.commit()
            conn.close()

        if self.debug:
            log.debug(
                f"Saved db for {self.session_id} {len(data)} {len(encrypted_data)} {self.db_path}",
                **self.logbind,
            )

        return True

    def load_session(self, use_lock: bool = True) -> bytes | None:
        if not self.db_exists:
            log.debug(f"No db file for {self.session_id}", **self.logbind)
            return None

        with self.lock if use_lock else nullcontext():
            conn = sqlite3.connect(self.db_path)
            cursor = conn.execute(
                "SELECT session_data FROM sessions ORDER BY id DESC LIMIT 1"
            )
            result = cursor.fetchone()
            conn.close()
            if self.debug:
                log.debug(
                    f"Loaded db for {self.session_id} {bool(result)} {len(result[0]) if result else None} {self.db_path}",
                    **self.logbind,
                )

            if result:
                encrypted_data = result[0]
                return self._decrypt_data(encrypted_data)

            return None

    def delete_db_file(self, use_lock: bool = True) -> bool:
        with self.lock if use_lock else nullcontext():
            if not os.path.exists(self.db_path):
                if self.debug:
                    log.warning(
                        f"Session database does not exist ({self.db_path})",
                        **self.logbind,
                    )
                return False

            os.remove(self.db_path)
            if self.debug:
                log.info(f"Session database deleted ({self.db_path})", **self.logbind)
            return True
