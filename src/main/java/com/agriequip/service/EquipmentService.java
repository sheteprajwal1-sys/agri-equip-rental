package com.agriequip.service;

import com.agriequip.entity.Equipment;
import com.agriequip.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    //for adding equipment
    public Equipment saveEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    
    //for getting all equipments
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }


    //for updating equipment
    public Equipment updateEquipment(Long id, Equipment newData) {

        Equipment existing = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        
        if (newData.getName() != null) {
            existing.setName(newData.getName());
        }

        if (newData.getCategory() != null) {
            existing.setCategory(newData.getCategory());
        }

        if (newData.getPricePerDay() != null) {
            existing.setPricePerDay(newData.getPricePerDay());
        }

        if (newData.getAvailable() != null) {
            existing.setAvailable(newData.getAvailable());
        }

        
        return equipmentRepository.save(existing);
    }


    //for updating equipment image
    public Equipment updateEquipmentImage(Long id, String imageUrl) {

        Equipment existing = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        existing.setImageUrl(imageUrl);

        return equipmentRepository.save(existing);
    }

   
    //for deleting equipment
    public void deleteEquipment(Long id) {

        if (!equipmentRepository.existsById(id)) {
            throw new RuntimeException("Equipment not found");
        }

        equipmentRepository.deleteById(id);
    }
}
