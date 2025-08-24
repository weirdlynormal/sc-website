package com.yourapp.controller;

import com.yourapp.model.User;
import com.yourapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        return userService.authenticate(loginRequest.getEmployeeId(), loginRequest.getPassword());
    }
}
