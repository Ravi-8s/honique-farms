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
