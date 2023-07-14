import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseTable = () => {
  // State variables
  const [warehouses, setWarehouses] = useState([]); // Holds the list of warehouses
  const [editingWarehouseId, setEditingWarehouseId] = useState(null); // Stores the ID of the warehouse being edited
  const [updatedWarehouseName, setUpdatedWarehouseName] = useState(''); // Stores the updated warehouse name
  const [updatedWarehouseLocation, setUpdatedWarehouseLocation] = useState(''); // Stores the updated warehouse location
  const [updatedWarehouseCapacity, setUpdatedWarehouseCapacity] = useState(0); // Stores the updated warehouse capacity
  const [productNames, setProductNames] = useState({}); // Holds the mapping of product IDs to product names
  const [showCreateForm, setShowCreateForm] = useState(false); // Controls the visibility of the create warehouse form
  const [showInventories, setShowInventories] = useState({}); // Controls the visibility of warehouse inventories

  // Fetch warehouses and product names on component mount
  useEffect(() => {
    fetchWarehouses();
    fetchProductNames();
  }, []);

  // Fetches the list of warehouses from the server
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  // Fetches the product names from the server and creates a mapping of product IDs to names
  const fetchProductNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      const products = response.data;
      const names = {};

      products.forEach((product) => {
        names[product.id] = product.name;
      });

      setProductNames(names);
    } catch (error) {
      console.error('Error fetching product names:', error);
    }
  };

  // Toggles the visibility of warehouse inventories
  const handleToggleInventories = (warehouseId) => {
    setShowInventories((prevState) => ({
      ...prevState,
      [warehouseId]: !prevState[warehouseId],
    }));
  };

  // Sets the state variables for editing a warehouse
  const handleEditWarehouse = (warehouseId, warehouseName, warehouseLocation, warehouseCapacity) => {
    setEditingWarehouseId(warehouseId);
    setUpdatedWarehouseName(warehouseName);
    setUpdatedWarehouseLocation(warehouseLocation);
    setUpdatedWarehouseCapacity(warehouseCapacity);
  };

  // Updates a warehouse on save
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

  // Deletes a warehouse
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

  // Creates a new warehouse
  const handleCreateWarehouse = async () => {
    try {
      const newWarehouse = {
        name: updatedWarehouseName,
        location: updatedWarehouseLocation,
        capacity: updatedWarehouseCapacity,
      };

      const response = await axios.post('http://localhost:8080/api/warehouses', newWarehouse);
      const createdWarehouse = response.data;

      setWarehouses((prevWarehouses) => [...prevWarehouses, createdWarehouse]);

      setUpdatedWarehouseName('');
      setUpdatedWarehouseLocation('');
      setUpdatedWarehouseCapacity(0);
      console.log('Warehouse created successfully!');
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  // Keeps the order of the table, so if the page ever refreshes it will keep that order.
  const sortedWarehouses = warehouses.slice().sort((a, b) => a.id - b.id);

  // Toggles the visibility of the create warehouse form
  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div className="container" style={{ paddingTop: '75px' }}>
      <h2>Warehouses</h2>
      {/* Conditional rendering for create warehouse form */}
      {!showCreateForm ? (
        <button className="btn btn-primary mb-3" onClick={handleToggleCreateForm}>Add New Warehouse</button>
      ) : (
        <div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={updatedWarehouseName}
            onChange={(e) => setUpdatedWarehouseName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Location"
            value={updatedWarehouseLocation}
            onChange={(e) => setUpdatedWarehouseLocation(e.target.value)}
          />
          <div className="d-flex align-items-center">
            <label htmlFor="capacity" className="me-2">Capacity:</label>
            <input
              type="range"
              className="form-range"
              id="capacity"
              min="0"
              max="100"
              step="1"
              value={updatedWarehouseCapacity}
              onChange={(e) => setUpdatedWarehouseCapacity(parseInt(e.target.value))}
            />
            <span>{updatedWarehouseCapacity}</span>
          </div>
          <button className="btn btn-primary me-2" onClick={handleCreateWarehouse}>Add Warehouse</button>
          <button className="btn btn-secondary" onClick={handleToggleCreateForm}>Cancel</button>
        </div>
      )}
      {/* Conditional rendering for warehouses */}
      {warehouses.length === 0 ? (
        <p>No warehouses</p>
      ) : (
        <table className="table table-striped">
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
                  {/* Conditional rendering for editing warehouse name */}
                  {editingWarehouseId === warehouse.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={updatedWarehouseName}
                      onChange={(e) => setUpdatedWarehouseName(e.target.value)}
                    />
                  ) : (
                    warehouse.name
                  )}
                </td>
                <td>
                  {/* Conditional rendering for editing warehouse location */}
                  {editingWarehouseId === warehouse.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={updatedWarehouseLocation}
                      onChange={(e) => setUpdatedWarehouseLocation(e.target.value)}
                    />
                  ) : (
                    warehouse.location
                  )}
                </td>
                <td>{warehouse.capacity}</td>
                <td>
                  {/* Toggle visibility of warehouse inventories */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleToggleInventories(warehouse.id)}
                  >
                    {showInventories[warehouse.id] ? 'Hide Inventories' : 'Show Inventories'}
                  </button>
                  {/* Conditional rendering for warehouse inventories */}
                  {showInventories[warehouse.id] && (
                    <ul className ="list-unstyled">
                      {warehouse.inventories.length > 0 ? (
                        warehouse.inventories.map((inventory) => (
                          <li key={inventory.id} className="mb-3">
                            <p className="mb-1">Inventory ID: {inventory.id}</p>
                            <p className="mb-1">Product Name: {productNames[inventory.productId]}</p>
                            <p className="mb-0">Quantity: {inventory.quantity}</p>
                          </li>
                        ))
                      ) : (
                        <li>Empty Warehouse</li>
                      )}
                    </ul>
                  )}
                </td>
                <td>
                  {/* Conditional rendering for warehouse actions */}
                  {editingWarehouseId === warehouse.id ? (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleSaveWarehouse(warehouse.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingWarehouseId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary me-2"
                      onClick={() =>
                        handleEditWarehouse(
                          warehouse.id,
                          warehouse.name,
                          warehouse.location,
                          warehouse.capacity
                        )
                      }
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteWarehouse(warehouse.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WarehouseTable;
