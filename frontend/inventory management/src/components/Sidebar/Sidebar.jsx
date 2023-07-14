import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the custom CSS file

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/inventory" className="nav-link">Inventory</Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/warehouses" className="nav-link">Warehouses</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
