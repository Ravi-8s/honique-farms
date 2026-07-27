const API_URL = "http://localhost:5000/customer-auth";

export interface RegisterCustomer {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface LoginCustomer {
  email: string;
  password: string;
}

export interface CustomerProfile {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export const registerCustomer = async (
  customer: RegisterCustomer
) => {

  const response = await fetch(`${API_URL}/register`, {
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
};

export const loginCustomer = async (
  customer: LoginCustomer
) => {

  const response = await fetch(`${API_URL}/login`, {
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
};

export const getCustomerProfile = async () => {

  const token = localStorage.getItem("customerToken");

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("customerToken");
    return null;
  }

  return await response.json();

};
