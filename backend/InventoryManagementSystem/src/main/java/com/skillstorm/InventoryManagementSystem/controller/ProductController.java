package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Product;
import com.skillstorm.InventoryManagementSystem.exception.NotFoundException;
import com.skillstorm.InventoryManagementSystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  public ResponseEntity<List<Product>> getAllProducts() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Product>> getProductById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getProductById(id));
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
    // Retrieve the existing product by ID
    Optional<Product> existingProductOptional = productService.getProductById(id);

    if (existingProductOptional.isPresent()) {
      Product existingProduct = existingProductOptional.get();

      // Update the necessary attributes of the existing product
      existingProduct.setName(updatedProduct.getName());
      existingProduct.setDescription(updatedProduct.getDescription());
      existingProduct.setPrice(updatedProduct.getPrice());

      // Save the updated product in the database
      Product savedProduct = productService.updateProduct(existingProduct);

      return ResponseEntity.ok(savedProduct);
    } else {
      // Product with the given ID does not exist
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.ok().build();
  }
}