package com.agriequip.controller;

import java.io.File;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.agriequip.dto.ApiResponse;
import com.agriequip.entity.Equipment;
import com.agriequip.service.EquipmentService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    
    //add equipment (admin only)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Equipment> addEquipment(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("pricePerDay") Double pricePerDay,
            @RequestParam("available") Boolean available,
            @RequestParam("image") MultipartFile image
    ) {

        try {
            
        	// upload path
            String uploadPath = System.getProperty("user.dir") + "/uploads";
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File file = new File(uploadDir, fileName);
            image.transferTo(file);

            Equipment equipment = new Equipment();
            equipment.setName(name);
            equipment.setCategory(category);
            equipment.setPricePerDay(pricePerDay);
            equipment.setAvailable(available);
            equipment.setImageUrl("http://localhost:8080/uploads/" + fileName);

            Equipment saved = equipmentService.saveEquipment(equipment);

            return new ApiResponse<>("Equipment added successfully", saved);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add equipment");
        }
    }

    
   
    //get all equipment (for public)
    @GetMapping
    public ApiResponse<List<Equipment>> getAllEquipment() {
        return new ApiResponse<>(
                "Equipment fetched successfully",
                equipmentService.getAllEquipment()
        );
    }

    
    
    //update equipment (admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Equipment> updateEquipment(
            @PathVariable Long id,
            @RequestBody Equipment equipment
    ) {
        Equipment updated = equipmentService.updateEquipment(id, equipment);
        return new ApiResponse<>("Equipment updated successfully", updated);
    }

   
    
    //update equipment image (admin only)
    @PutMapping(
        value = "/{id}/image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Equipment> updateEquipmentImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            String uploadPath = System.getProperty("user.dir") + "/uploads";
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File file = new File(uploadDir, fileName);
            image.transferTo(file);

            Equipment updated =
                    equipmentService.updateEquipmentImage(
                            id,
                            "http://localhost:8080/uploads/" + fileName
                    );

            return new ApiResponse<>("Image updated successfully", updated);

        } catch (Exception e) {
            throw new RuntimeException("Failed to update image");
        }
    }

    
    
    // delete equipment (admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return new ApiResponse<>("Equipment deleted successfully", null);
    }
}
