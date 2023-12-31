import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

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

  const handleCreateProduct = async () => {
    try {
      const newProduct = {
        name: newProductName,
        price: newProductPrice,
      };

      const response = await axios.post("http://localhost:8080/api/products", newProduct);
      const createdProduct = response.data;

      setProducts((prevProducts) => [...prevProducts, createdProduct]);

      setNewProductName("");
      setNewProductPrice("");
      setShowCreateForm(false);
      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const sortedProducts = products.slice().sort((a, b) => a.id - b.id);

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div>
      <div className="container" style={{ paddingTop: '75px' }}>
      <h2>Products</h2>
      {!showCreateForm ? (
        <button onClick={handleToggleCreateForm} className="btn btn-primary mb-3">
          Add New Product
        </button>
      ) : (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={handleCreateProduct}>
            Create
          </button>
          <button className="btn btn-secondary" onClick={handleToggleCreateForm}>
            Cancel
          </button>
        </div>
      )}
      {products.length === 0 ? (
        <p>No products</p>
      ) : (
        <table className="table table-striped">
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
                      className="form-control"
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
                      className="form-control"
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
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdateProduct(product.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingProductIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleEditProduct(index, product.name, product.price)
                      }
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
};

export default ProductTable;
