import { useEffect, useState } from "react";

import AdminLayout from "../../../components/AdminLayout/AdminLayout";

import InventoryForm from "../../../components/InventoryForm/InventoryForm";
import InventoryTable from "../../../components/InventoryTable/InventoryTable";

import "./InventoryPage.css";

import {
  getInventory,
  deleteInventory,
} from "../../../services/api";

import type { Inventory } from "../../../types/Inventory";

function InventoryPage() {

  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedInventory, setSelectedInventory] =
    useState<Inventory | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {

    const confirmed = window.confirm(
      "Delete this inventory record?"
    );

    if (!confirmed) return;

    await deleteInventory(id);

    loadInventory();

  }

  function handleEdit(item: Inventory) {

    setSelectedInventory(item);

    setShowForm(true);

  }

  return (

    <AdminLayout>

      <div className="inventory-page">

        <h1>Inventory Management</h1>

        <p>
          Manage stock levels for all products.
        </p>

        <button
          onClick={() => {
            setSelectedInventory(null);
            setShowForm(true);
          }}
        >
          Add Inventory
        </button>

        <InventoryTable
          inventory={inventory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (

          <InventoryForm
            inventory={selectedInventory}
            onClose={() => {
              setShowForm(false);
              setSelectedInventory(null);
            }}
            onInventoryAdded={loadInventory}
          />

        )}

      </div>

    </AdminLayout>

  );

}

export default InventoryPage;
