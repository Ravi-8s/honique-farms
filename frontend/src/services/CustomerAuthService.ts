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

export const registerCustomer = async (
  customer: RegisterCustomer
) => {

  const response = await fetch(
    `${API_URL}/register`,
    {

      method: "POST",

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

};
