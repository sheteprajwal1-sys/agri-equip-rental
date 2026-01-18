package com.agriequip.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriequip.dto.ApiResponse;
import com.agriequip.dto.DashboardStatsDTO;
import com.agriequip.entity.Rental;
import com.agriequip.entity.User;
import com.agriequip.repository.UserRepository;
import com.agriequip.service.RentalService;

@RestController
@RequestMapping("/rentals")
@CrossOrigin(origins = "http://localhost:5173")
public class RentalController {

    private final RentalService rentalService;
    private final UserRepository userRepository;

    public RentalController(
            RentalService rentalService,
            UserRepository userRepository
    ) {
        this.rentalService = rentalService;
        this.userRepository = userRepository;
    }

    
    // create rental (for user)
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Rental>> createRental(
            @RequestBody Rental rental,
            Authentication authentication
    ) {
        String email = authentication.getName();

        //fetch logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //Set farmer details
        rental.setUserId(user.getId());
        rental.setUserName(user.getName());
        rental.setUserEmail(user.getEmail());

        //call service with email
        Rental saved = rentalService.createRental(rental, email);

        return ResponseEntity.ok(
                new ApiResponse<>("Rental created successfully", saved)
        );
    }

   
    
    // for users: own rentals
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponse<List<Rental>> getMyRentals(Authentication authentication) {
        return new ApiResponse<>(
                "Your rentals fetched successfully",
                rentalService.getRentalsByEmail(authentication.getName())
        );
    }

    
    //for admin: all rentals
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<Rental>> getAllRentalsForAdmin() {
        return new ApiResponse<>(
                "All bookings fetched for owner",
                rentalService.getAllRentals()
        );
    }

    
    
    //for admin to return rental
    @PutMapping("/{id}/return")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Rental> returnRental(@PathVariable Long id) {
        return new ApiResponse<>(
                "Equipment returned successfully",
                rentalService.returnRental(id)
        );
    }

    
    //for admins dashboard
    @GetMapping("/dashboard-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<DashboardStatsDTO> getDashboardStats() {
        return new ApiResponse<>(
                "Dashboard stats fetched successfully",
                rentalService.getDashboardStats()
        );
    }
}
