package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Warehouse;
import com.skillstorm.InventoryManagementSystem.exception.NotFoundException;
import com.skillstorm.InventoryManagementSystem.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

  private final WarehouseService warehouseService;

  @Autowired
  public WarehouseController(WarehouseService warehouseService) {
    this.warehouseService = warehouseService;
  }

  // Get all warehouses
  @GetMapping
  public List<Warehouse> getAllWarehouses() {
    return warehouseService.getAllWarehouses();
  }

  // Get all warehouse by ID
  @GetMapping("/{id}")
  public Warehouse getWarehouseById(@PathVariable Long id) {
    return warehouseService.getWarehouseById(id)
        .orElseThrow(() -> new NotFoundException("Warehouse not found with ID: " + id));
  }

  // Create a new warehouse
  @PostMapping
  public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
    return warehouseService.createWarehouse(warehouse);
  }

  // Update a warehouse by ID
  @PutMapping("/{id}")
  public Warehouse updateWarehouse(@PathVariable Long id, @RequestBody Warehouse updatedWarehouse) {
    Warehouse warehouse = warehouseService.getWarehouseById(id)
        .orElseThrow(() -> new NotFoundException("Warehouse not found with ID: " + id));

    // Update the warehouse properties
    warehouse.setName(updatedWarehouse.getName());
    warehouse.setLocation(updatedWarehouse.getLocation());
    warehouse.setCapacity(updatedWarehouse.getCapacity());

    return warehouseService.updateWarehouse(warehouse);
  }

  // Delete a warehouse by ID
  @DeleteMapping("/{id}")
  public void deleteWarehouse(@PathVariable Long id) {
    warehouseService.deleteWarehouse(id);
  }
}
