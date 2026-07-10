import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOrderById,
  updateOrderStatus,
} from "../../../services/api";

import "./OrdersPage.css";

function OrderDetailsPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const [status, setStatus] = useState("");

  useEffect(() => {

    loadOrder();

  }, []);

  async function loadOrder() {

    try {

      const data = await getOrderById(
        Number(id)
      );

      setOrder(data);

      setStatus(data.status);

    } catch (error) {

      console.error(error);

    }

  }

  async function saveStatus() {

    try {

      await updateOrderStatus(
        Number(id),
        status
      );

      alert("Order status updated successfully.");

      loadOrder();

    } catch (error: any) {

      alert(error.message);

    }

  }

  if (!order) {

    return (

      <div className="orders-page">

        <h2>Loading...</h2>

      </div>

    );

  }

  return (

    <div className="orders-page">

      <button
        className="add-btn"
        onClick={() => navigate("/admin/orders")}
      >
        ← Back
      </button>

      <h1>
        Order #{order.id}
      </h1>

      <br />

      <table>

        <tbody>

          <tr>

            <th>Customer</th>

            <td>{order.customer}</td>

          </tr>

          <tr>

            <th>Phone</th>

            <td>{order.phone}</td>

          </tr>

          <tr>

            <th>Email</th>

            <td>{order.email}</td>

          </tr>

          <tr>

            <th>Date</th>

            <td>
              {new Date(
                order.order_date
              ).toLocaleDateString("en-IN")}
            </td>

          </tr>

          <tr>

            <th>Status</th>

            <td>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Packed">
                  Packed
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </td>

          </tr>

        </tbody>

      </table>

      <br />

      <button
        className="save-btn"
        onClick={saveStatus}
      >
        Save Status
      </button>

      <br />
      <br />

      <h2>Products</h2>

      <table>

        <thead>

          <tr>

            <th>Product</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>

          </tr>

        </thead>

        <tbody>

          {order.items.map(
            (item: any, index: number) => (

              <tr key={index}>

                <td>{item.name}</td>

                <td>{item.weight}</td>

                <td>{item.quantity}</td>

                <td>
                  ₹
                  {Number(item.price).toLocaleString(
                    "en-IN"
                  )}
                </td>

                <td>
                  ₹
                  {Number(
                    item.subtotal
                  ).toLocaleString("en-IN")}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      <br />

      <h2>

        Grand Total : ₹

        {Number(
          order.total_amount
        ).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}

      </h2>

    </div>

  );

}

export default OrderDetailsPage;
