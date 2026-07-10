-- =====================================================
-- Invoices
-- =====================================================

CREATE TABLE IF NOT EXISTS invoices (

    id SERIAL PRIMARY KEY,

    order_id INTEGER NOT NULL UNIQUE,

    invoice_number VARCHAR(30) NOT NULL UNIQUE,

    invoice_date DATE DEFAULT CURRENT_DATE,

    pdf_path VARCHAR(255),

    email_sent BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoice_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE

);

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_invoice_order
ON invoices(order_id);

CREATE INDEX IF NOT EXISTS idx_invoice_number
ON invoices(invoice_number);
