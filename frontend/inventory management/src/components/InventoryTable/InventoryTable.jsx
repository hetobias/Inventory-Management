import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const inventoryResponse = await axios.get("http://localhost:8080/api/inventory");
        const inventoryData = inventoryResponse.data;

        // Fetch product and warehouse information for each inventory item
        const updatedInventoryData = await Promise.all(
          inventoryData.map(async (item) => {
            const productResponse = await axios.get(`http://localhost:8080/api/products/${item.productId}`);
            const product = productResponse.data;

            const warehouseResponse = await axios.get(`http://localhost:8080/api/warehouses/${item.warehouseId}`);
            const warehouse = warehouseResponse.data;

            return {
              id: item.id,
              productName: product.name,
              warehouseName: warehouse.name,
              quantity: item.quantity,
            };
          })
        );

        setInventory(updatedInventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

  const handleDeleteInventory = async (inventoryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/${inventoryId}`);
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.id !== inventoryId)
      );
      console.log("Inventory item deleted successfully!");
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      {inventory.length === 0 ? (
        <p>No inventory</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Warehouse Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td className="hidden">{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.warehouseName}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleDeleteInventory(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryTable;
