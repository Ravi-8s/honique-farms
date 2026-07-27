import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../components/AdminLayout/AdminLayout";

import "./OrdersPage.css";

import OrderForm from "../../../components/OrderForm/OrderForm";
import { getOrders } from "../../../services/api";

function OrdersPage() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

    try {

      const data = await getOrders();

      setOrders(data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <AdminLayout>

      <div className="orders-page">

        <h1>Order Management</h1>

        <p>
          Create customer orders and manage sales.
        </p>

        <OrderForm />

        <div style={{ marginTop: "50px" }}>

          <h2>Order History</h2>

          <table>

            <thead>

              <tr>

                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td>{order.id}</td>

                  <td>{order.customer}</td>

                  <td>
                    {new Date(order.order_date).toLocaleDateString("en-IN")}
                  </td>

                  <td>{order.status}</td>

                  <td>
                    ₹
                    {Number(order.total_amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td>

                    <button
                      className="add-btn"
                      onClick={() =>
                        navigate(`/admin/orders/${order.id}`)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default OrdersPage;
