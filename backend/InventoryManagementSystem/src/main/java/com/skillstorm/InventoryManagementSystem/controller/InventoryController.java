package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import com.skillstorm.InventoryManagementSystem.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

  @Autowired
  private InventoryService inventoryService;

  // Retrieves all inventory items
  @GetMapping
  public ResponseEntity<List<Inventory>> getAllInventory() {
    return ResponseEntity.ok(inventoryService.getAllInventory());
  }

  // Retrieves a specific inventory item by ID
  @GetMapping("/{id}")
  public ResponseEntity<Optional<Inventory>> getInventoryById(@PathVariable Long id) {
    return ResponseEntity.ok(inventoryService.getInventoryById(id));
  }

  // Creates a new inventory item
  @PostMapping
  public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
    return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createInventory(inventory));
  }

  // Updates an existing inventory item
  @PutMapping("/{id}")
  public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
    // Retrieve the existing inventory by ID
    Optional<Inventory> existingInventoryOptional = inventoryService.getInventoryById(id);

    if (existingInventoryOptional.isPresent()) {
      Inventory existingInventory = existingInventoryOptional.get();

      // Update the necessary attributes of the existing inventory
      existingInventory.setProductId(updatedInventory.getProductId());
      existingInventory.setWarehouseId(updatedInventory.getWarehouseId());
      existingInventory.setQuantity(updatedInventory.getQuantity());

      // Save the updated inventory in the database
      Inventory savedInventory = inventoryService.updateInventory(existingInventory);

      return ResponseEntity.ok(savedInventory);
    } else {
      // Inventory with the given ID does not exist
      return ResponseEntity.notFound().build();
    }
  }

  // Deletes an inventory item by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
    inventoryService.deleteInventory(id);
    return ResponseEntity.ok().build();
  }
}
