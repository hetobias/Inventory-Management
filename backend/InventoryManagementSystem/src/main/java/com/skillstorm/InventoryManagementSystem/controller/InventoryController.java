package com.skillstorm.InventoryManagementSystem.controller;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import com.skillstorm.InventoryManagementSystem.exception.NotFoundException;
import com.skillstorm.InventoryManagementSystem.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

  private final InventoryService inventoryService;

  @Autowired
  public InventoryController(InventoryService inventoryService) {
    this.inventoryService = inventoryService;
  }

  // Get all inventory items
  @GetMapping
  public List<Inventory> getAllInventory() {
    return inventoryService.getAllInventory();
  }

  // Get an inventory item by ID
  @GetMapping("/{id}")
  public Inventory getInventoryById(@PathVariable Long id) {
    return inventoryService.getInventoryById(id)
        .orElseThrow(() -> new NotFoundException("Inventory item not found with ID: " + id));
  }

  // Create a new inventory item
  @PostMapping
  public Inventory createInventory(@RequestBody Inventory inventory) {
    return inventoryService.createInventory(inventory);
  }

  // Update an inventory item by ID
  @PutMapping("/{id}")
  public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
    Inventory inventory = inventoryService.getInventoryById(id)
        .orElseThrow(() -> new NotFoundException("Inventory item not found with ID: " + id));

    // Update the inventory item properties
    inventory.setQuantity(updatedInventory.getQuantity());

    return inventoryService.updateInventory(inventory);
  }

  // Delete an inventory item by ID
  @DeleteMapping("/{id}")
  public void deleteInventory(@PathVariable Long id) {
    inventoryService.deleteInventory(id);
  }
}
