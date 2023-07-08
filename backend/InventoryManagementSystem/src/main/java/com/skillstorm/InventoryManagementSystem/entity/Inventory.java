package com.skillstorm.InventoryManagementSystem.entity;

import javax.persistence.*;

/*
 * This class represents the Inventory entity in the inventory management system.
 * It is mapped to the "Inventory" table in the database.
 */

@Entity
@Table(name = "Inventory")
public class Inventory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "warehouse_id", nullable = false)
  private Warehouse warehouse;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private int quantity;

  public Inventory(Long id, Warehouse warehouse, Product product, int quantity) {
    this.id = id;
    this.warehouse = warehouse;
    this.product = product;
    this.quantity = quantity;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Warehouse getWarehouse() {
    return warehouse;
  }

  public void setWarehouse(Warehouse warehouse) {
    this.warehouse = warehouse;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

}
