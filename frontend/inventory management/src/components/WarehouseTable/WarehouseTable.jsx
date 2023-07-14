import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseTable = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [editingWarehouseId, setEditingWarehouseId] = useState(null);
  const [updatedWarehouseName, setUpdatedWarehouseName] = useState('');
  const [updatedWarehouseLocation, setUpdatedWarehouseLocation] = useState('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleToggleInventories = async (warehouseId) => {
    if (editingWarehouseId === warehouseId) {
      setEditingWarehouseId(null);
    } else {
      setEditingWarehouseId(warehouseId);
    }
  };

  const handleEditWarehouse = (warehouseId, warehouseName, warehouseLocation) => {
    setEditingWarehouseId(warehouseId);
    setUpdatedWarehouseName(warehouseName);
    setUpdatedWarehouseLocation(warehouseLocation);
  };

  const handleSaveWarehouse = async (warehouseId) => {
    try {
      const warehouseToUpdate = warehouses.find((warehouse) => warehouse.id === warehouseId);
      const updatedWarehouse = {
        id: warehouseId,
        name: updatedWarehouseName,
        location: updatedWarehouseLocation,
        capacity: warehouseToUpdate.capacity,
      };
  
      await axios.put(`http://localhost:8080/api/warehouses/${warehouseId}`, updatedWarehouse);
  
      setWarehouses((prevWarehouses) =>
        prevWarehouses.map((warehouse) => {
          if (warehouse.id === warehouseId) {
            return {
              ...warehouse,
              name: updatedWarehouseName,
              location: updatedWarehouseLocation,
            };
          }
          return warehouse;
        })
      );
  
      setEditingWarehouseId(null);
      console.log('Warehouse updated successfully!');
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };
  

  const deleteWarehouse = async (warehouseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/warehouses/${warehouseId}`);
      setWarehouses((prevWarehouses) =>
        prevWarehouses.filter((warehouse) => warehouse.id !== warehouseId)
      );
      console.log('Warehouse deleted successfully!');
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  const sortedWarehouses = warehouses.slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <h2>Warehouse Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Inventories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedWarehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.id}</td>
              <td>
                {editingWarehouseId === warehouse.id ? (
                  <input
                    type="text"
                    value={updatedWarehouseName}
                    onChange={(e) => setUpdatedWarehouseName(e.target.value)}
                  />
                ) : (
                  warehouse.name
                )}
              </td>
              <td>
                {editingWarehouseId === warehouse.id ? (
                  <input
                    type="text"
                    value={updatedWarehouseLocation}
                    onChange={(e) => setUpdatedWarehouseLocation(e.target.value)}
                  />
                ) : (
                  warehouse.location
                )}
              </td>
              <td>{warehouse.capacity}</td>
              <td>
                <button onClick={() => handleToggleInventories(warehouse.id)}>
                  {editingWarehouseId === warehouse.id ? 'Hide Inventories' : 'Show Inventories'}
                </button>
                {editingWarehouseId === warehouse.id && (
                  <ul>
                    {warehouse.inventories.length > 0 ? (
                      warehouse.inventories.map((inventory) => (
                        <li key={inventory.id}>
                          <p>Inventory ID: {inventory.id}</p>
                          <p>Product Name: {productNames[inventory.productId]}</p>
                          <p>Quantity: {inventory.quantity}</p>
                        </li>
                      ))
                    ) : (
                      <li>Empty Warehouse</li>
                    )}
                  </ul>
                )}
              </td>
              <td>
                {editingWarehouseId === warehouse.id ? (
                  <>
                    <button onClick={() => handleSaveWarehouse(warehouse.id)}>Save</button>
                    <button onClick={() => setEditingWarehouseId(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditWarehouse(warehouse.id, warehouse.name, warehouse.location)}>
                    Edit
                  </button>
                )}
                <button onClick={() => deleteWarehouse(warehouse.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseTable;
