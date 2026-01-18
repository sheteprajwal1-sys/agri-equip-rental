package com.agriequip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class AgriEquipRentalApplication {
    public static void main(String[] args) {
        SpringApplication.run(AgriEquipRentalApplication.class, args);
    }
}
