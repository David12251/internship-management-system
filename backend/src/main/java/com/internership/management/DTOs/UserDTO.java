package com.internership.management.DTOs;


public class UserDTO {
    private Long id;
    private String email;
    private String role;
    private boolean isTwoFactorEnabled;

    // Constructors
    public UserDTO() {}

    public UserDTO(Long id, String email, String role, boolean isTwoFactorEnabled) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.isTwoFactorEnabled = isTwoFactorEnabled;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isTwoFactorEnabled() {
        return isTwoFactorEnabled;
    }

    public void setTwoFactorEnabled(boolean twoFactorEnabled) {
        this.isTwoFactorEnabled = twoFactorEnabled;
    }
}