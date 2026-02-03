package com.internership.management.DTOs;
import java.time.LocalDateTime;

public class ApplicationDTO {
    private Long id;
    private Long studentId;
    private Long internshipId;
    private String status;
    private LocalDateTime appliedDate;
    private LocalDateTime updatedAt;

    // Constructors
    public ApplicationDTO() {}

    public ApplicationDTO(Long id, Long studentId, Long internshipId, String status, LocalDateTime appliedDate, LocalDateTime updatedAt) {
        this.id = id;
        this.studentId = studentId;
        this.internshipId = internshipId;
        this.status = status;
        this.appliedDate = appliedDate;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Long internshipId) {
        this.internshipId = internshipId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
