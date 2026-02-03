package com.internership.management.DTOs;
public class CompanyDTO {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private String website;
    private String location;

    // Constructors
    public CompanyDTO() {}

    public CompanyDTO(Long id, Long userId, String name, String description, String website, String location) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.website = website;
        this.location = location;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}