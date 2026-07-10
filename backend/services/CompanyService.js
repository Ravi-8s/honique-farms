const pool = require("../config/database");

// =====================================================
// Get Company Settings
// =====================================================

const getCompanySettings = async () => {

  const result = await pool.query(`
    SELECT *
    FROM company_settings
    LIMIT 1
  `);

  return result.rows[0];

};

// =====================================================
// Update Company Settings
// =====================================================

const updateCompanySettings = async (company) => {

  const result = await pool.query(
    `
    UPDATE company_settings
    SET
      company_name = $1,
      tagline = $2,
      owner_name = $3,
      phone = $4,
      email = $5,
      website = $6,
      address = $7,
      city = $8,
      state = $9,
      pincode = $10,
      fssai_number = $11,
      gst_number = $12,
      upi_id = $13
    WHERE id = 1
    RETURNING *;
    `,
    [
      company.company_name,
      company.tagline,
      company.owner_name,
      company.phone,
      company.email,
      company.website,
      company.address,
      company.city,
      company.state,
      company.pincode,
      company.fssai_number,
      company.gst_number,
      company.upi_id,
    ]
  );

  return result.rows[0];

};

module.exports = {
  getCompanySettings,
  updateCompanySettings,
};
