package com.skillstorm.InventoryManagementSystem.service;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import com.skillstorm.InventoryManagementSystem.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

  @Autowired
  private InventoryRepository inventoryRepository;

  /**
   * Create a new inventory item.
   */
  public Inventory createInventory(Inventory inventory) {
    return inventoryRepository.save(inventory);
  }

  /**
   * Retrieve an inventory item by ID.
   */
  public Optional<Inventory> getInventoryById(Long id) {
    return inventoryRepository.findById(id);
  }

  /**
   * Retrieve all inventory items.
   */
  public List<Inventory> getAllInventory() {
    return inventoryRepository.findAll();
  }

  /**
   * Update an existing inventory item.
   */
  public Inventory updateInventory(Inventory inventory) {
    return inventoryRepository.save(inventory);
  }

  /**
   * Delete an inventory item by ID.
   */
  public void deleteInventory(Long id) {
    inventoryRepository.deleteById(id);
  }
}