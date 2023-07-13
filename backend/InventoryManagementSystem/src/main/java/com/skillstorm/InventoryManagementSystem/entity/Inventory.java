package com.skillstorm.InventoryManagementSystem.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

/*
 * This class represents the Inventory entity in the inventory management system.
 * It is mapped to the "inventory" table in the database.
 */

@Entity
@Table(name = "inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "product_id", insertable = false, updatable = false)
  private Long productId;

  @Column(name = "warehouse_id", insertable = false, updatable = false)
  private Long warehouseId;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "product_id", nullable = false)
  @JsonBackReference(value = "product-inventory")
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "warehouse_id", nullable = false)
  @JsonBackReference(value = "warehouse-inventory")
  private Warehouse warehouse;

  @Column(name = "quantity")
  private Integer quantity;

}
