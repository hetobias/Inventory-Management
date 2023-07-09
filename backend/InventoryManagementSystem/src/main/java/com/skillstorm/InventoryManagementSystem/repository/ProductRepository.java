package com.skillstorm.InventoryManagementSystem.repository;

import com.skillstorm.InventoryManagementSystem.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  // query methods here if needed
}
