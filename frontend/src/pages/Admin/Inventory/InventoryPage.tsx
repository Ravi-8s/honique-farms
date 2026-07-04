import { useEffect, useState } from "react";

import InventoryForm from "../../../components/InventoryForm/InventoryForm";
import InventoryTable from "../../../components/InventoryTable/InventoryTable";

import "./InventoryPage.css";

import {
  getInventory,
  deleteInventory,
} from "../../../services/api";

function InventoryPage() {

  const [inventory, setInventory] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<any>(null);

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

  function handleEdit(item: any) {

    setSelectedInventory(item);

    setShowForm(true);

  }

  return (
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
  );
}

export default InventoryPage;
