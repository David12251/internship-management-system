package com.internership.management.service;
import com.internership.management.DTOs.DashboardSummaryDTO;
import com.internership.management.repository.ApplicationRepository;
import com.internership.management.repository.CompanyRepository;
import com.internership.management.repository.InternshipRepository;
import com.internership.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StudentRepository studentRepository;

    public DashboardSummaryDTO getDashboardSummary() {
        long totalInternships = internshipRepository.count();
        long totalApplications = applicationRepository.count();
        long totalCompanies = companyRepository.count();
        long totalStudents = studentRepository.count();
        List<String> recentActivities = Arrays.asList(
                "New internship posted: Software Engineer Intern",
                "Application submitted by John Doe",
                "Company XYZ registered",
                "Application status updated to APPROVED"
        );

        return new DashboardSummaryDTO(totalInternships, totalApplications, totalCompanies, totalStudents, recentActivities);
    }
}
