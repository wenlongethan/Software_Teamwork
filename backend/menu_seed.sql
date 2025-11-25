-- backend/menu_seed.sql

CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_phone TEXT,
    total REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    menu_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(menu_id) REFERENCES menu(id)
);

INSERT INTO menu (name, price, category, image) VALUES
('Margherita Pizza', 12.5, 'pizza', 'margherita.jpg'),
('Pepperoni Pizza', 13.9, 'pizza', 'pepperoni.jpg'),
('Caesar Salad', 8.5, 'salad', 'caesar.jpg'),
('Orange Juice', 3.5, 'drinks', 'orange-juice.jpg');
