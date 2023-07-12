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
public class InventoryController {

  @Autowired
  private InventoryService inventoryService;

  @GetMapping
  public ResponseEntity<List<Inventory>> getAllInventory() {
    return ResponseEntity.ok(inventoryService.getAllInventory());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Inventory>> getInventoryById(@PathVariable Long id) {
    return ResponseEntity.ok(inventoryService.getInventoryById(id));
  }

  @PostMapping
  public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
    return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createInventory(inventory));
  }

  @PutMapping
  public ResponseEntity<Inventory> updateInventory(@RequestBody Inventory inventory) {
    return ResponseEntity.ok(inventoryService.updateInventory(inventory));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
    inventoryService.deleteInventory(id);
    return ResponseEntity.ok().build();
  }
}
