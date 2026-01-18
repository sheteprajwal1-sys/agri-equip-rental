package com.agriequip.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "rentals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Farmer/User who booked
    private Long userId;
    
    private String userName;
    
    private String userEmail;


    // Equipment relation
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 500)
    private String deliveryAddress;
    
    @Column(length = 15)
    private String contactNumber;

    private Double pricePerDay;

    private String status; //Booked/Return
}
