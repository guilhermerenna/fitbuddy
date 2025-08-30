package com.fitbuddy.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@Entity
@Table
public class Exercise implements Serializable {
    private UUID id;
    private String exercise;
    private List<ExerciseSet> exerciseSets;
    private boolean template;
    private String description;
    //TODO: add muscle groups
}
