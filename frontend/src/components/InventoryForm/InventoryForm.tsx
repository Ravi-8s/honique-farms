import { useEffect, useState } from "react";
import "./InventoryForm.css";

import {
  addInventory,
  updateInventory,
  getProducts,
} from "../../services/api";

type Product = {
  id: number;
  name: string;
};

type Inventory = {
  id: number;
  productId: number;
  quantity: number;
  minimumStock: number;
  location: string;
};

type InventoryFormProps = {
  onClose: () => void;
  onInventoryAdded: () => void;
  inventory?: Inventory | null;
};

function InventoryForm({
  onClose,
  onInventoryAdded,
  inventory,
}: InventoryFormProps) {

  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    minimumStock: "",
    location: "Warehouse",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {

    if (inventory) {

      setFormData({
        productId: inventory.productId.toString(),
        quantity: inventory.quantity.toString(),
        minimumStock: inventory.minimumStock.toString(),
        location: inventory.location,
      });

    }

  }, [inventory]);

  async function loadProducts() {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }

  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit() {

    try {

      const payload = {
        productId: Number(formData.productId),
        quantity: Number(formData.quantity),
        minimumStock: Number(formData.minimumStock),
        location: formData.location,
      };

      if (inventory) {

        await updateInventory(
          inventory.id,
          payload
        );

      } else {

        await addInventory(payload);

      }

      onInventoryAdded();

      onClose();

    } catch (error: any) {

      alert(error.message);

    }

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {inventory ? "Edit Inventory" : "Add Inventory"}
        </h2>

        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
        >

          <option value="">
            Select Product
          </option>

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>

          ))}

        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          name="minimumStock"
          type="number"
          placeholder="Minimum Stock"
          value={formData.minimumStock}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <div className="button-group">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {inventory ? "Update Inventory" : "Save Inventory"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default InventoryForm;
