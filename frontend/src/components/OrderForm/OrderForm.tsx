import { useEffect, useState } from "react";
import "./OrderForm.css";

import {
  getCustomers,
  getAvailableProducts,
  createOrder,
} from "../../services/api";

function OrderForm() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  async function loadCustomers() {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function loadProducts() {

    try {

      const data = await getAvailableProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }

  }

  function addProduct() {

    if (!productId) {
      alert("Please select a product.");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) {
      return;
    }

    const existingProduct = orderItems.find(
      (item) => item.productId === product.id
    );

    if (existingProduct) {

      const updatedItems = orderItems.map((item) => {

        if (item.productId === product.id) {

          const newQuantity =
            item.quantity + quantity;

          return {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.price,
          };

        }

        return item;

      });

      setOrderItems(updatedItems);

    } else {

      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity,
          subtotal: Number(product.price) * quantity,
        },
      ]);

    }

    setProductId("");
    setQuantity(1);

  }

  function removeProduct(index: number) {

    setOrderItems(
      orderItems.filter((_, i) => i !== index)
    );

  }

  async function handlePlaceOrder() {

    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    try {

      await createOrder({

        customerId: Number(customerId),

        items: orderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),

      });

      alert("Order placed successfully!");

      setCustomerId("");
      setProductId("");
      setQuantity(1);
      setOrderItems([]);

      // Reload products to refresh available stock
      loadProducts();

    } catch (error: any) {

      alert(error.message);

    }

  }

  const total = orderItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (

    <div className="order-form">

      <h2>Create Order</h2>

      <div className="form-group">

        <label>Customer</label>

        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >

          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (

            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>

          ))}

        </select>

      </div>

      <div className="form-group">

        <label>Product</label>

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >

          <option value="">
            Select Product
          </option>

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name} ({product.stock} available)
            </option>

          ))}

        </select>

      </div>

      <div className="form-group">

        <label>Quantity</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
        />

      </div>

      <button
        className="add-btn"
        onClick={addProduct}
      >
        + Add Product
      </button>

      <table>

        <thead>

          <tr>

            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {orderItems.map((item, index) => (

            <tr key={index}>

              <td>{item.name}</td>

              <td>{item.quantity}</td>

              <td>₹{item.price}</td>

              <td>₹{item.subtotal}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => removeProduct(index)}
                >
                  ❌ Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2>
        Total : ₹{total}
      </h2>

      <button
        className="save-btn"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

    </div>

  );

}

export default OrderForm;
