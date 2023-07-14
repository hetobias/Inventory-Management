import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const [totalWarehouses, setTotalWarehouses] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventories, setTotalInventories] = useState(0);

  useEffect(() => {
    fetchTotalWarehouses(); // Fetch the total number of warehouses
    fetchTotalProducts(); // Fetch the total number of products
    fetchTotalInventories(); // Fetch the total number of inventories
  }, []);

  const fetchTotalWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      const warehouses = response.data;
      setTotalWarehouses(warehouses.length); // Set the total number of warehouses
    } catch (error) {
      console.error("Error fetching total warehouses:", error);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      const products = response.data;
      setTotalProducts(products.length); // Set the total number of products
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  const fetchTotalInventories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventory");
      const inventories = response.data;
      setTotalInventories(inventories.length); // Set the total number of inventories
    } catch (error) {
      console.error("Error fetching total inventories:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "18rem", margin: "0 10px" }}>
        <Card.Body className="text-center">
          <Card.Title>Total Warehouses</Card.Title>
          <Card.Text>
            <h2>{totalWarehouses}</h2> {/* Display the total number of warehouses */}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem", margin: "0 10px" }}>
        <Card.Body className="text-center">
          <Card.Title>Total Products</Card.Title>
          <Card.Text>
            <h2>{totalProducts}</h2> {/* Display the total number of products */}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem", margin: "0 10px" }}>
        <Card.Body className="text-center">
          <Card.Title>Total Inventories</Card.Title>
          <Card.Text>
            <h2>{totalInventories}</h2> {/* Display the total number of inventories */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
