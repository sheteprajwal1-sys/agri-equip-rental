package com.agriequip.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {

    private double totalEarnings;
    private long totalRentals;
    private long activeRentals;
}
