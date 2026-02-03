package com.internership.management.DTOs;

public class PasswordResetRequest {
    private String email;
    private String token;
    private String newPassword;


    public PasswordResetRequest() {}

    public PasswordResetRequest(String email) {
        this.email = email;
    }

    public PasswordResetRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
