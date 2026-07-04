CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    weight VARCHAR(30),
    price NUMERIC(10,2),
    stock INTEGER,
    description TEXT,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products
(name, category, weight, price, stock, description)
VALUES
(
'Wild Forest Honey',
'Honey',
'1 kg',
1000,
25,
'Collected from wild hives'
),
(
'Golden Nectar',
'Honey',
'500 g',
550,
40,
'Pure Multiflora Honey'
);

CREATE TABLE IF NOT EXISTS categories (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO categories
(name, description)

VALUES
(
    'Honey',
    'Natural honey products'
),
(
    'Organic Products',
    'Farm fresh organic products'
)

ON CONFLICT (name) DO NOTHING;


-- =====================================================
-- Inventory
-- =====================================================

CREATE TABLE IF NOT EXISTS inventory (

    id SERIAL PRIMARY KEY,

    product_id INTEGER NOT NULL UNIQUE,

    quantity INTEGER NOT NULL DEFAULT 0,

    minimum_stock INTEGER DEFAULT 10,

    location VARCHAR(100) DEFAULT 'Warehouse',

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE

);


-- =====================================================
-- Inventory Sample Data
-- =====================================================

INSERT INTO inventory (
    product_id,
    quantity,
    minimum_stock,
    location
)
VALUES
(1, 120, 20, 'Warehouse'),
(3, 60, 10, 'Warehouse')
ON CONFLICT (product_id) DO NOTHING;

-- =====================================================
-- Customers
-- =====================================================

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    phone VARCHAR(15) UNIQUE NOT NULL,

    email VARCHAR(150),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customers (
    name,
    phone,
    email,
    address,
    city,
    state,
    pincode
)
VALUES
(
    'Ravi Shankar',
    '8500001065',
    'ravi@example.com',
    'Main Road',
    'Rajahmundry',
    'Andhra Pradesh',
    '533101'
),
(
    'Suresh Kumar',
    '9876543210',
    'suresh@example.com',
    'Market Street',
    'Kakinada',
    'Andhra Pradesh',
    '533001'
)
ON CONFLICT (phone) DO NOTHING;


-- =====================================================
-- Orders
-- =====================================================

CREATE TABLE IF NOT EXISTS orders (

    id SERIAL PRIMARY KEY,

    customer_id INTEGER NOT NULL,

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(30) DEFAULT 'Pending',

    total_amount DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT

);

-- =====================================================
-- Order Items
-- =====================================================

CREATE TABLE IF NOT EXISTS order_items (

    id SERIAL PRIMARY KEY,

    order_id INTEGER NOT NULL,

    product_id INTEGER NOT NULL,

    quantity INTEGER NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT

);
