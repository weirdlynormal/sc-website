package com.yourapp.repository;

import com.yourapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmployeeId(String employeeId);
    User findByEmail(String email);
}
