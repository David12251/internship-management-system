package com.internership.management.controller;
import com.internership.management.DTOs.ApplicationDTO;
import com.internership.management.DTOs.CompanyDTO;
import com.internership.management.DTOs.DashboardSummaryDTO;
import com.internership.management.DTOs.InternshipDTO;
import com.internership.management.entity.User;
import com.internership.management.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    // Dashboard Summary
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    // Get Company Profile
    @GetMapping("/profile")
    public ResponseEntity<CompanyDTO> getCompanyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(companyService.getCompanyByUserId(user.getId()));
    }

    // Manage Internships
    @PostMapping("/internships")
    public ResponseEntity<InternshipDTO> createInternship(@RequestBody InternshipDTO internshipDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        CompanyDTO company = companyService.getCompanyByUserId(user.getId());
        return ResponseEntity.ok(internshipService.createInternship(company.getId(), internshipDTO));
    }

    @GetMapping("/internships")
    public ResponseEntity<List<InternshipDTO>> getCompanyInternships() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        CompanyDTO company = companyService.getCompanyByUserId(user.getId());
        return ResponseEntity.ok(internshipService.getInternshipsByCompanyId(company.getId()));
    }

    // Manage Applications
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForCompanyInternships() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        CompanyDTO company = companyService.getCompanyByUserId(user.getId());
        List<InternshipDTO> internships = internshipService.getInternshipsByCompanyId(company.getId());
        List<ApplicationDTO> applications = internships.stream()
                .flatMap(internship -> applicationService.getApplicationsByInternshipId(internship.getId()).stream())
                .collect(Collectors.toList());
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody String status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}