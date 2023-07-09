package com.skillstorm.InventoryManagementSystem.service;

import com.skillstorm.InventoryManagementSystem.entity.Product;
import com.skillstorm.InventoryManagementSystem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  @Autowired
  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Create a new product.
   */
  public Product createProduct(Product product) {
    return productRepository.save(product);
  }

  /**
   * Retrieve a product by ID.
   */
  public Optional<Product> getProductById(Long id) {
    return productRepository.findById(id);
  }

  /**
   * Retrieve all products.
   */
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  /**
   * Update an existing product.
   */
  public Product updateProduct(Product product) {
    return productRepository.save(product);
  }

  /**
   * Delete a product by ID.
   */
  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}
