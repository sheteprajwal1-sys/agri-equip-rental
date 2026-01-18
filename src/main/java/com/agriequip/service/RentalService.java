package com.agriequip.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.agriequip.dto.DashboardStatsDTO;
import com.agriequip.entity.Equipment;
import com.agriequip.entity.Rental;
import com.agriequip.repository.EquipmentRepository;
import com.agriequip.repository.RentalRepository;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final EquipmentRepository equipmentRepository;

    public RentalService(RentalRepository rentalRepository,
                         EquipmentRepository equipmentRepository) {
        this.rentalRepository = rentalRepository;
        this.equipmentRepository = equipmentRepository;
    }

    
    //create rental
    public Rental createRental(Rental rental, String userEmail) {

        Equipment equipment = equipmentRepository.findById(
                rental.getEquipment().getId()
        ).orElseThrow(() -> new RuntimeException("Equipment not found"));

        if (!Boolean.TRUE.equals(equipment.getAvailable())) {
            throw new RuntimeException("Equipment already rented");
        }

        rental.setPricePerDay(equipment.getPricePerDay());
        rental.setEquipment(equipment);

        //user email for jwt
        rental.setUserEmail(userEmail);

        rental.setStatus("BOOKED");

        equipment.setAvailable(false);
        equipmentRepository.save(equipment);

        return rentalRepository.save(rental);
    }

   
    
    //User: get own rentals
    public List<Rental> getRentalsByEmail(String email) {
        return rentalRepository.findByUserEmail(email);
    }

    
    
    //Admin: get all rentals
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    
    
    //Admin: return rental
    public Rental returnRental(Long rentalId) {

        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        Equipment equipment = rental.getEquipment();

        equipment.setAvailable(true);
        equipmentRepository.save(equipment);

        rental.setStatus("RETURNED");

        return rentalRepository.save(rental);
    }

    
    //Admin: dashboard stats
    public DashboardStatsDTO getDashboardStats() {

        List<Rental> rentals = rentalRepository.findAll();
        double totalEarnings = 0;

        for (Rental r : rentals) {

            if (r.getStartDate() != null
                    && r.getEndDate() != null
                    && r.getPricePerDay() != null) {

                long days = ChronoUnit.DAYS.between(
                        r.getStartDate(),
                        r.getEndDate()
                ) + 1;

                totalEarnings += days * r.getPricePerDay();
            }
        }

        long totalRentals = rentals.size();
        long activeRentals = rentalRepository.countByStatus("BOOKED");

        return new DashboardStatsDTO(
                totalEarnings,
                totalRentals,
                activeRentals
        );
    }
}
