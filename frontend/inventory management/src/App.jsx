import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import InventoryTable from './components/InventoryTable/InventoryTable';
import ProductTable from './components/ProductTable/ProductTable';
import WarehouseTable from './components/WarehouseTable/WarehouseTable';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/inventory" element={<InventoryTable />} />
              <Route path="/products" element={<ProductTable />} />
              <Route path="/warehouses" element={<WarehouseTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
