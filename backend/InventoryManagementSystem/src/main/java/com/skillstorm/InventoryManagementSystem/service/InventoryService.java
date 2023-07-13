package com.skillstorm.InventoryManagementSystem.service;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import com.skillstorm.InventoryManagementSystem.entity.Product;
import com.skillstorm.InventoryManagementSystem.entity.Warehouse;
import com.skillstorm.InventoryManagementSystem.repository.InventoryRepository;
import com.skillstorm.InventoryManagementSystem.repository.ProductRepository;
import com.skillstorm.InventoryManagementSystem.repository.WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

  private final InventoryRepository inventoryRepository;
  private final ProductRepository productRepository;
  private final WarehouseRepository warehouseRepository;

  @Autowired
  public InventoryService(InventoryRepository inventoryRepository, ProductRepository productRepository,
      WarehouseRepository warehouseRepository) {
    this.inventoryRepository = inventoryRepository;
    this.productRepository = productRepository;
    this.warehouseRepository = warehouseRepository;
  }

  /**
   * Create a new inventory item.
   */
  public Inventory createInventory(Inventory inventory) {
    // Retrieve the product by ID
    Product product = productRepository.findById(inventory.getProduct().getId()).orElse(null);
    // Retrieve the warehouse by ID
    Warehouse warehouse = warehouseRepository.findById(inventory.getWarehouse().getId()).orElse(null);

    if (product != null && warehouse != null) {
      // Set the product and warehouse in the inventory
      inventory.setProduct(product);
      inventory.setWarehouse(warehouse);
      inventory.setProductId(product.getId());
      inventory.setWarehouseId(warehouse.getId());
    }
    // Save the inventory
    Inventory savedInventory = inventoryRepository.save(inventory);

    // Set product and warehouse to null in the response to avoid nested object
    // references
    savedInventory.setProduct(null); // Set product to null in the response
    savedInventory.setWarehouse(null); // Set warehouse to null in the response

    return savedInventory;
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