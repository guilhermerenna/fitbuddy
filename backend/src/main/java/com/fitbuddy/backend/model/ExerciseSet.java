package com.fitbuddy.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@Entity
@Table
public class ExerciseSet implements Serializable {
    private UUID id;
    private UUID exerciseId;
    private Integer repCount;
    private Double weight;
}
