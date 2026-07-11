const API_BASE_URL = "http://localhost:5000";

// -------------------- Products --------------------

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getAvailableProducts() {
  const response = await fetch(
    `${API_BASE_URL}/products/available`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch available products"
    );
  }

  return response.json();
}

export async function addProduct(product: any) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateProduct(id: number, product: any) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// -------------------- Categories --------------------

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function addCategory(category: any) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateCategory(id: number, category: any) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteCategory(id: number) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}


export async function getInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
}

export async function addInventory(inventory: any) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateInventory(
  id: number,
  inventory: any
) {
  const response = await fetch(
    `${API_BASE_URL}/inventory/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteInventory(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/inventory/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}


// -------------------- Customers --------------------

export async function getCustomers() {
  const response = await fetch(`${API_BASE_URL}/customers`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function addCustomer(customer: any) {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateCustomer(
  id: number,
  customer: any
) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteCustomer(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}


// -------------------- Orders --------------------

export async function createOrder(order: any) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function getOrderById(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/orders/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

export async function updateOrderStatus(
  id: number,
  status: string
) {

  const response = await fetch(
    `${API_BASE_URL}/orders/${id}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;

}

// -------------------- Invoices --------------------

export async function getInvoices() {

  const response = await fetch(
    `${API_BASE_URL}/invoices`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch invoices"
    );

  }

  return response.json();

}

export async function getInvoiceById(
  id: number
) {

  const response = await fetch(
    `${API_BASE_URL}/invoices/${id}`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch invoice"
    );

  }

  return response.json();

}
