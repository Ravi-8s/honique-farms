const {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../services/CustomerService");

const getCustomers = async (req, res) => {
  try {

    const customers = await getAllCustomers();

    res.json(customers);

  } catch (error) {

    console.error("Error fetching customers:", error);

    res.status(500).json({
      message: "Failed to fetch customers",
    });

  }
};

const createCustomer = async (req, res) => {
  try {

    const customer = await addCustomer(req.body);

    res.status(201).json(customer);

  } catch (error) {

    console.error("Error creating customer:", error);

    res.status(500).json({
      message: "Failed to create customer",
    });

  }
};

const editCustomer = async (req, res) => {
  try {

    const customer = await updateCustomer(
      req.params.id,
      req.body
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);

  } catch (error) {

    console.error("Error updating customer:", error);

    res.status(500).json({
      message: "Failed to update customer",
    });

  }
};

const removeCustomer = async (req, res) => {
  try {

    await deleteCustomer(req.params.id);

    res.json({
      message: "Customer deleted successfully",
    });

  } catch (error) {

    console.error("Error deleting customer:", error);

    res.status(500).json({
      message: "Failed to delete customer",
    });

  }
};

module.exports = {
  getCustomers,
  createCustomer,
  editCustomer,
  removeCustomer,
};
