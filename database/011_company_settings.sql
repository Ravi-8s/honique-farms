-- =====================================================
-- Company Settings
-- =====================================================

DROP TABLE IF EXISTS company_settings;

CREATE TABLE company_settings (

    id SERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    tagline VARCHAR(150),

    owner_name VARCHAR(150),

    phone VARCHAR(20),

    email VARCHAR(150),

    website VARCHAR(150),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    fssai_number VARCHAR(50),

    gst_number VARCHAR(50),

    upi_id VARCHAR(100),

    logo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- Default Company Record
-- =====================================================

INSERT INTO company_settings
(
    company_name,
    tagline,
    owner_name,
    phone,
    email,
    website,
    address,
    city,
    state,
    pincode,
    fssai_number,
    gst_number,
    upi_id,
    logo
)
VALUES
(
    'Honique Farms',
    'Hive to Home',
    'Ravi Shankar',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
);
