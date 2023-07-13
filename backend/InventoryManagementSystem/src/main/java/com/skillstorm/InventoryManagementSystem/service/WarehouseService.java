package com.skillstorm.InventoryManagementSystem.service;

import com.skillstorm.InventoryManagementSystem.entity.Inventory;
import com.skillstorm.InventoryManagementSystem.entity.Warehouse;
import com.skillstorm.InventoryManagementSystem.exception.NotFoundException;
import com.skillstorm.InventoryManagementSystem.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.Optional;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    /**
     * Create a new warehouse.
     */
    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    /**
     * Retrieve a warehouse by ID.
     */
    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    /**
     * Retrieve all warehouses.
     */
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    /**
     * Update an existing warehouse.
     */
    public Warehouse updateWarehouse(Long id, Warehouse updatedWarehouse) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Warehouse not found with id: " + id));

        existingWarehouse.setName(updatedWarehouse.getName());
        existingWarehouse.setLocation(updatedWarehouse.getLocation());
        existingWarehouse.setCapacity(updatedWarehouse.getCapacity());

        // Update inventories
        Set<Inventory> updatedInventories = updatedWarehouse.getInventories();
        for (Inventory updatedInventory : updatedInventories) {
            Long inventoryId = updatedInventory.getId();
            Inventory existingInventory = existingWarehouse.getInventories().stream()
                    .filter(inv -> inv.getId().equals(inventoryId))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("Inventory not found with id: " + inventoryId));
            existingInventory.setQuantity(updatedInventory.getQuantity());
        }

        return warehouseRepository.save(existingWarehouse);
    }

    /**
     * Delete a warehouse by ID.
     */
    public void deleteWarehouse(Long id) {
        warehouseRepository.deleteById(id);
    }
}
