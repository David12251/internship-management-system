package com.internership.management.DTOs;
import java.util.List;

public class DashboardSummaryDTO {
    private long totalInternships;
    private long totalApplications;
    private long totalCompanies;
    private long totalStudents;
    private List<String> recentActivities;

    // Constructors
    public DashboardSummaryDTO() {}

    public DashboardSummaryDTO(long totalInternships, long totalApplications, long totalCompanies, long totalStudents, List<String> recentActivities) {
        this.totalInternships = totalInternships;
        this.totalApplications = totalApplications;
        this.totalCompanies = totalCompanies;
        this.totalStudents = totalStudents;
        this.recentActivities = recentActivities;
    }

    // Getters and Setters
    public long getTotalInternships() {
        return totalInternships;
    }

    public void setTotalInternships(long totalInternships) {
        this.totalInternships = totalInternships;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getTotalCompanies() {
        return totalCompanies;
    }

    public void setTotalCompanies(long totalCompanies) {
        this.totalCompanies = totalCompanies;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public List<String> getRecentActivities() {
        return recentActivities;
    }

    public void setRecentActivities(List<String> recentActivities) {
        this.recentActivities = recentActivities;
    }
}
