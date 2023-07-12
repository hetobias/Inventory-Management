package com.skillstorm.InventoryManagementSystem.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/*
 * This class represents the Warehouse entity in the inventory management system.
 * It is mapped to the "Warehouse" table in the database.
 */

import java.util.Set;

@Entity
@Table(name = "warehouse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Warehouse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "location")
  private String location;

  @Column(name = "capacity")
  private Integer capacity;

  @OneToMany(mappedBy = "warehouse", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonManagedReference(value = "warehouse-inventory")
  private Set<Inventory> inventories;
}
