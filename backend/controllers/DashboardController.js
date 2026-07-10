const {
  getDashboardSummary,
} = require("../services/DashboardService");

// =====================================================
// Dashboard Summary
// =====================================================

const fetchDashboardSummary = async (req, res) => {

  try {

    const summary =
      await getDashboardSummary();

    res.json(summary);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });

  }

};

module.exports = {
  fetchDashboardSummary,
};
