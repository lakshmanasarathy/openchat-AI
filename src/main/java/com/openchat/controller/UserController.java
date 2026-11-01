package com.openchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.openchat.dto.RegisterRequest;
import com.openchat.entity.User;
import com.openchat.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        String response = userService.registerUser(request);

        return ResponseEntity.ok(response);
    }

    // Get Logged-in User Profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                    .body("Unauthorized: Please login first");
        }

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                new UserProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole(),
                        user.getCreatedAt()
                )
        );
    }

    // Safe response class for profile
    public record UserProfileResponse(
            Long id,
            String fullName,
            String email,
            String role,
            java.time.LocalDateTime createdAt
    ) {
    }
}