package com.skillstorm.InventoryManagementSystem.entity;

import javax.persistence.*;
import java.util.List;

/*
 * This class represents the Product entity in the inventory management system.
 * It is mapped to the "Products" table in the database.
 */

@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Inventory> inventory;

    public Product(Long id, String name, String description, double price, List<Inventory> inventory) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.inventory = inventory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Inventory> getInventory() {
        return inventory;
    }

    public void setInventory(List<Inventory> inventory) {
        this.inventory = inventory;
    }

}
