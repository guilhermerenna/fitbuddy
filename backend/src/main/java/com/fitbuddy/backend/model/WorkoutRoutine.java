package com.fitbuddy.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class WorkoutRoutine implements Serializable {
    private UUID id;
    private List<Exercise> exercises;

    //TODO: make the object below more trackable
    private List<String> muscles;
    private boolean template;
    private LocalDateTime dateTime;


}
