# backend/init_db.py
from db import get_connection
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SQL_FILE = BASE_DIR / "menu_seed.sql"

def init_db():
    conn = get_connection()
    with open(SQL_FILE, "r", encoding="utf-8") as f:
        sql_script = f.read()
        conn.executescript(sql_script)
    conn.commit()
    conn.close()
    print("✅ Database initialized: restaurant.db")

if __name__ == "__main__":
    init_db()
