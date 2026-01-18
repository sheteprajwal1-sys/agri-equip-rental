package com.agriequip.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriequip.dto.ApiResponse;
import com.agriequip.dto.LoginRequest;
import com.agriequip.entity.User;
import com.agriequip.security.JwtUtil;
import com.agriequip.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    //for registering name to save in DB)
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(
            @RequestBody @Valid User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(
                new ApiResponse<>("User registered successfully", savedUser)
        );
    }

   
   // for getting all users
    @GetMapping
    public ApiResponse<List<User>> getAllUsers() {
        return new ApiResponse<>(
                "Users fetched successfully",
                userService.getAllUsers()
        );
    }

    
    //for login (JWT + USER INFO)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("name", user.getName());   // ✅ IMPORTANT
        response.put("role", user.getRole());   // ✅ IMPORTANT

        return ResponseEntity.ok(response);
    }
}
