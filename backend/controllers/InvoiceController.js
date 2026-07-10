const {
  getInvoiceDetails,
} = require("../services/InvoiceService");

// =====================================================
// Get Invoice Details
// =====================================================

const fetchInvoiceDetails = async (
  req,
  res
) => {

  try {

    const invoice =
      await getInvoiceDetails(
        req.params.id
      );

    if (!invoice) {

      return res.status(404).json({
        message: "Invoice not found",
      });

    }

    res.json(invoice);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch invoice",
    });

  }

};

module.exports = {

  fetchInvoiceDetails,

};
