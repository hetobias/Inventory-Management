package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Product;
import com.skillstorm.InventoryManagementSystem.exception.NotFoundException;
import com.skillstorm.InventoryManagementSystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

  private final ProductService productService;

  @Autowired
  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  // Get all products
  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  // Get a product by ID
  @GetMapping("/{id}")
  public Product getProductById(@PathVariable Long id) {
    return productService.getProductById(id)
        .orElseThrow(() -> new NotFoundException("Product not found with ID: " + id));
  }

  // Create a new product
  @PostMapping
  public Product createProduct(@RequestBody Product product) {
    return productService.createProduct(product);
  }

  // Update a product by ID
  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
    Product product = productService.getProductById(id)
        .orElseThrow(() -> new NotFoundException("Product not found with ID: " + id));

    // Update the product properties
    product.setName(updatedProduct.getName());
    product.setDescription(updatedProduct.getDescription());
    product.setPrice(updatedProduct.getPrice());

    return productService.updateProduct(product);
  }

  // Delete a product by ID
  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
  }
}
