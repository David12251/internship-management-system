package com.internership.management.controller;


import com.internership.management.DTOs.*;
import com.internership.management.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private ApplicationService applicationService;

    // Dashboard Summary
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    // Manage Students
    @GetMapping("/students")
    public ResponseEntity<Page<StudentDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(studentService.getAllStudents(pageable));
    }

    @GetMapping("/students/search")
    public ResponseEntity<Page<StudentDTO>> searchStudents(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(studentService.searchStudents(keyword, pageable));
    }

    // Manage Companies
    @GetMapping("/companies")
    public ResponseEntity<Page<CompanyDTO>> getAllCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(companyService.getAllCompanies(pageable));
    }

    @GetMapping("/companies/search")
    public ResponseEntity<Page<CompanyDTO>> searchCompanies(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(companyService.searchCompanies(keyword, pageable));
    }

    // Manage Internships
    @GetMapping("/internships")
    public ResponseEntity<Page<InternshipDTO>> getAllInternships(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(internshipService.getAllInternships(pageable));
    }

    @GetMapping("/internships/search")
    public ResponseEntity<Page<InternshipDTO>> searchInternships(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(internshipService.searchInternships(keyword, pageable));
    }

    // Manage Applications
    @GetMapping("/applications")
    public ResponseEntity<Page<ApplicationDTO>> getAllApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(applicationService.getAllApplications(pageable));
    }

    @GetMapping("/applications/search")
    public ResponseEntity<Page<ApplicationDTO>> searchApplications(
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(applicationService.getApplicationsByStatus(status, pageable));
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody String status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}