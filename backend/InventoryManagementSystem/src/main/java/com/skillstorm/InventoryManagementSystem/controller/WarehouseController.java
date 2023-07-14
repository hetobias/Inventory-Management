package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Warehouse;
import com.skillstorm.InventoryManagementSystem.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = "http://localhost:5173")
public class WarehouseController {

  @Autowired
  private WarehouseService warehouseService;

  // Retrieves all warehouses
  @GetMapping
  public ResponseEntity<List<Warehouse>> getAllWarehouses() {
    return ResponseEntity.ok(warehouseService.getAllWarehouses());
  }

  // Retrieves a specific warehouse by ID
  @GetMapping("/{id}")
  public ResponseEntity<Optional<Warehouse>> getWarehouseById(@PathVariable Long id) {
    return ResponseEntity.ok(warehouseService.getWarehouseById(id));
  }

  // Creates a new warehouse
  @PostMapping
  public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
    return ResponseEntity.status(HttpStatus.CREATED).body(warehouseService.createWarehouse(warehouse));
  }

  // Updates an existing warehouse
  @PutMapping("/{id}")
  public ResponseEntity<Warehouse> updateWarehouse(@PathVariable Long id, @RequestBody Warehouse updatedWarehouse) {
    Warehouse updated = warehouseService.updateWarehouse(id, updatedWarehouse);
    return ResponseEntity.ok(updated);
  }

  // Deletes a warehouse by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
    warehouseService.deleteWarehouse(id);
    return ResponseEntity.ok().build();
  }
}
