package com.yourapp.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "employee_id", unique = true, nullable = false, length = 50)
    private String employeeId;

    @Column(length = 100)
    private String name;

    @Column(unique = true, length = 100)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(nullable = false)
    private Integer role; // 1 = highest, 2 = medium, 3 = lowest

    @Column(nullable = false)
    private Boolean isLocked = false;

    @Column(nullable = false)
    private Integer failedAttempts = 0;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();
}
