package com.skillstorm.InventoryManagementSystem.entity;

import java.util.List;
import javax.persistence.*;

/*
 * This class represents the Warehouse entity in the inventory management system.
 * It is mapped to the "Warehouse" table in the database.
 */

@Entity
@Table(name = "Warehouse")

public class Warehouse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private String location;

  @Column(nullable = false)
  private int capacity;

  @OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL)
  private List<Inventory> inventory;

  // Default constructors
  public Warehouse() {
  }

  public Warehouse(String name, String location, int capacity) {
    this.name = name;
    this.location = location;
    this.capacity = capacity;
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

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }

}
