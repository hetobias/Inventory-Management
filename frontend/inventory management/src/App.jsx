import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import InventoryTable from './components/InventoryTable/InventoryTable';
import ProductTable from './components/ProductTable/ProductTable';
import WarehouseTable from './components/WarehouseTable/WarehouseTable';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryTable />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/warehouses" element={<WarehouseTable />} />
      </Routes>
    </Router>
  );
}

export default App;
