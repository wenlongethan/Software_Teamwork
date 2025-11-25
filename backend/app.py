# backend/app.py Flask main process

from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)


@app.route("/api/menu", methods=["GET"])
def get_menu():
    conn = get_connection()
    cur = conn.execute("SELECT id, name, price, category, image FROM menu")
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows), 200

@app.route("/api/checkout", methods=["POST"])
def checkout():
    data = request.get_json()
    name = data.get("customer_name")
    phone = data.get("customer_phone")
    items = data.get("items", [])

    if not items:
        return jsonify({"error": "cart is empty"}), 400

    conn = get_connection()
    cur = conn.cursor()

    total = 0
    for it in items:
        cur.execute("SELECT price FROM menu WHERE id = ?", (it["menu_id"],))
        row = cur.fetchone()
        if row:
            total += row["price"] * it["qty"]

    cur.execute(
        "INSERT INTO orders (customer_name, customer_phone, total) VALUES (?, ?, ?)",
        (name, phone, total)
    )
    order_id = cur.lastrowid

    for it in items:
        cur.execute(
            "INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)",
            (order_id, it["menu_id"], it["qty"])
        )

    conn.commit()
    conn.close()
    return jsonify({"status": "ok", "order_id": order_id, "total": total}), 201

#if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)

