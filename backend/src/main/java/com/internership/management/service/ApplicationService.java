package com.internership.management.service;


import com.internership.management.DTOs.ApplicationDTO;
import com.internership.management.entity.Application;
import com.internership.management.entity.Internship;
import com.internership.management.entity.Student;
import com.internership.management.repository.ApplicationRepository;
import com.internership.management.repository.InternshipRepository;
import com.internership.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    public ApplicationDTO createApplication(Long studentId, Long internshipId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Student not found"));
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Internship not found"));
        Application application = new Application(student, internship, "PENDING", LocalDateTime.now());
        Application savedApplication = applicationRepository.save(application);
        return new ApplicationDTO(savedApplication.getId(), savedApplication.getStudent().getId(),
                savedApplication.getInternship().getId(), savedApplication.getStatus(),
                savedApplication.getAppliedDate(), savedApplication.getUpdatedAt());
    }

    public ApplicationDTO updateApplicationStatus(Long applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Application not found"));
        application.setStatus(status);
        application.setUpdatedAt(LocalDateTime.now());
        Application updatedApplication = applicationRepository.save(application);
        return new ApplicationDTO(updatedApplication.getId(), updatedApplication.getStudent().getId(),
                updatedApplication.getInternship().getId(), updatedApplication.getStatus(),
                updatedApplication.getAppliedDate(), updatedApplication.getUpdatedAt());
    }

    public Page<ApplicationDTO> getAllApplications(Pageable pageable) {
        return applicationRepository.findAll(pageable)
                .map(application -> new ApplicationDTO(application.getId(), application.getStudent().getId(),
                        application.getInternship().getId(), application.getStatus(),
                        application.getAppliedDate(), application.getUpdatedAt()));
    }

    public List<ApplicationDTO> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudentId(studentId)
                .stream()
                .map(application -> new ApplicationDTO(application.getId(), application.getStudent().getId(),
                        application.getInternship().getId(), application.getStatus(),
                        application.getAppliedDate(), application.getUpdatedAt()))
                .collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsByInternshipId(Long internshipId) {
        return applicationRepository.findByInternshipId(internshipId)
                .stream()
                .map(application -> new ApplicationDTO(application.getId(), application.getStudent().getId(),
                        application.getInternship().getId(), application.getStatus(),
                        application.getAppliedDate(), application.getUpdatedAt()))
                .collect(Collectors.toList());
    }

    public Page<ApplicationDTO> getApplicationsByStatus(String status, Pageable pageable) {
        return applicationRepository.findByStatus(status, pageable)
                .map(application -> new ApplicationDTO(application.getId(), application.getStudent().getId(),
                        application.getInternship().getId(), application.getStatus(),
                        application.getAppliedDate(), application.getUpdatedAt()));
    }
}
