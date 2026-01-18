package com.agriequip.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriequip.entity.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByEquipmentIdAndStatus(
            Long equipmentId,
            String status
    );
   
    
    List<Rental> findByUserId(Long userId);
    
    
    List<Rental> findByUserEmail(String email);
    long countByStatus(String status);

}
