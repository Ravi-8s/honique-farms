const {
  getSummary,
} = require("../services/ReportService");

// =====================================================
// Dashboard Summary Report
// =====================================================

const fetchSummary = async (req, res) => {

  try {

    const summary = await getSummary();

    res.json(summary);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch report summary",
    });

  }

};

module.exports = {
  fetchSummary,
};
