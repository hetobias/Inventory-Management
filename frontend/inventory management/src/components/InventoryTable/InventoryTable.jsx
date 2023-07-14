import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [newProductId, setNewProductId] = useState("");
  const [newWarehouseId, setNewWarehouseId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [editingInventoryId, setEditingInventoryId] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  useEffect(() => {
    fetchInventoryData();
    fetchProducts();
    fetchWarehouses();
  }, []);

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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

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

  const handleCreateInventory = async () => {
    try {
      const newInventoryItem = {
        product: {
          id: newProductId,
        },
        warehouse: {
          id: newWarehouseId,
        },
        quantity: newQuantity,
      };

      const response = await axios.post("http://localhost:8080/api/inventory", newInventoryItem);
      const createdInventoryItem = response.data;

      const productResponse = await axios.get(`http://localhost:8080/api/products/${createdInventoryItem.productId}`);
      const product = productResponse.data;

      const warehouseResponse = await axios.get(`http://localhost:8080/api/warehouses/${createdInventoryItem.warehouseId}`);
      const warehouse = warehouseResponse.data;

      const updatedInventoryItem = {
        id: createdInventoryItem.id,
        productName: product.name,
        warehouseName: warehouse.name,
        quantity: createdInventoryItem.quantity,
      };

      setInventory((prevInventory) => [...prevInventory, updatedInventoryItem]);

      setNewProductId("");
      setNewWarehouseId("");
      setNewQuantity("");
      console.log("Inventory item created successfully!");
    } catch (error) {
      console.error("Error creating inventory item:", error.response.data.message);
    }
  };

  const handleEditInventory = (inventoryId, quantity) => {
    setEditingInventoryId(inventoryId);
    setUpdatedQuantity(quantity);
  };

  const handleSaveInventory = async (inventoryId) => {
    try {
      const updatedInventoryItem = {
        id: inventoryId,
        quantity: updatedQuantity,
      };

      await axios.put(`http://localhost:8080/api/inventory/${inventoryId}`, updatedInventoryItem);

      setInventory((prevInventory) =>
        prevInventory.map((item) => {
          if (item.id === inventoryId) {
            return {
              ...item,
              quantity: updatedQuantity,
            };
          }
          return item;
        })
      );

      setEditingInventoryId(null);
      console.log("Inventory item updated successfully!");
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingInventoryId(null);
    setUpdatedQuantity("");
  };

  const sortedInventories = inventory.slice().sort((a, b) => a.id - b.id);

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventories.map((item) => (
              <tr key={item.id}>
                <td className="hidden">{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.warehouseName}</td>
                <td>
                  {editingInventoryId === item.id ? (
                    <input
                      type="text"
                      value={updatedQuantity}
                      onChange={(e) => setUpdatedQuantity(e.target.value)}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {editingInventoryId === item.id ? (
                    <>
                      <button onClick={() => handleSaveInventory(item.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditInventory(item.id, item.quantity)}>Edit</button>
                  )}
                  <button onClick={() => handleDeleteInventory(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <h2>Create Inventory</h2>
        <label>Product:</label>
        <select value={newProductId} onChange={(e) => setNewProductId(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label>Warehouse:</label>
        <select value={newWarehouseId} onChange={(e) => setNewWarehouseId(e.target.value)}>
          <option value="">Select Warehouse</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
        <label>Quantity:</label>
        <input type="text" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
        <button onClick={handleCreateInventory}>Create</button>
      </div>
    </div>
  );
};

export default InventoryTable;
