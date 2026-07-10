const {
  getCompanySettings,
  updateCompanySettings,
} = require("../services/CompanyService");

// =====================================================
// Get Company Settings
// =====================================================

const fetchCompanySettings = async (req, res) => {

  try {

    const company =
      await getCompanySettings();

    res.json(company);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch company settings",
    });

  }

};

// =====================================================
// Update Company Settings
// =====================================================

const updateSettings = async (req, res) => {

  try {

    const company =
      await updateCompanySettings(
        req.body
      );

    res.json(company);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to update company settings",
    });

  }

};

module.exports = {
  fetchCompanySettings,
  updateSettings,
};
