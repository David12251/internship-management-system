package com.internership.management.controller;


import com.internership.management.DTOs.ApplicationDTO;
import com.internership.management.DTOs.DashboardSummaryDTO;
import com.internership.management.DTOs.InternshipDTO;
import com.internership.management.DTOs.StudentDTO;
import com.internership.management.entity.User;
import com.internership.management.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private ApplicationService applicationService;

    // Dashboard Summary
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    // Get Student Profile
    @GetMapping("/profile")
    public ResponseEntity<StudentDTO> getStudentProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(studentService.getStudentByUserId(user.getId()));
    }

    // View Internships
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

    // Apply to Internship
    @PostMapping("/applications")
    public ResponseEntity<ApplicationDTO> applyToInternship(@RequestParam Long internshipId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        StudentDTO student = studentService.getStudentByUserId(user.getId());
        return ResponseEntity.ok(applicationService.createApplication(student.getId(), internshipId));
    }

    // View Applications
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDTO>> getStudentApplications() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);
        StudentDTO student = studentService.getStudentByUserId(user.getId());
        return ResponseEntity.ok(applicationService.getApplicationsByStudentId(student.getId()));
    }
}
