package com.skillstorm.InventoryManagementSystem.repository;

import com.skillstorm.InventoryManagementSystem.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    // query methods here if needed
}
