import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productIndex, productName, productPrice) => {
    setEditingProductIndex(productIndex);
    setUpdatedProductName(productName);
    setUpdatedProductPrice(productPrice);
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${productId}`, {
        name: updatedProductName,
        price: updatedProductPrice,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              name: updatedProductName,
              price: updatedProductPrice,
            };
          }
          return product;
        })
      );

      setEditingProductIndex(null);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const sortedProducts = products.slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <h2>Product Table</h2>
      {products.length === 0 ? (
        <p>No products</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editingProductIndex === index ? (
                    <input
                      type="text"
                      value={updatedProductName}
                      onChange={(e) => setUpdatedProductName(e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProductIndex === index ? (
                    <input
                      type="text"
                      value={updatedProductPrice}
                      onChange={(e) => setUpdatedProductPrice(e.target.value)}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProductIndex === index ? (
                    <>
                      <button onClick={() => handleUpdateProduct(product.id)}>Save</button>
                      <button onClick={() => setEditingProductIndex(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditProduct(index, product.name, product.price)}>
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
