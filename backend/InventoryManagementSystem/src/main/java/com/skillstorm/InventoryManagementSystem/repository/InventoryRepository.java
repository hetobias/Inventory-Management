package com.skillstorm.InventoryManagementSystem.repository;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
  // query methods here if needed
}
