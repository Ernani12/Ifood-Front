package com.example.deliveryservice.domain;

import java.util.UUID;

public class Delivery {
    private UUID id;
    private UUID orderId;
    private String address;
    private DeliveryStatus status;

    public enum DeliveryStatus {
        PENDING, OUT_FOR_DELIVERY, DELIVERED, FAILED
    }

    // getters/setters omitted
}