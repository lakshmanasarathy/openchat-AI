package com.openchat.dto;

public class LoginResponse {

    private String message;
    private String token;
    private String email;
    private String fullName;

    public LoginResponse(String message, String token,
                         String email, String fullName) {

        this.message = message;
        this.token = token;
        this.email = email;
        this.fullName = fullName;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }
}