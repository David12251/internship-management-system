package com.internership.management.service;


import com.internership.management.DTOs.InternshipDTO;
import com.internership.management.entity.Company;
import com.internership.management.entity.Internship;
import com.internership.management.repository.CompanyRepository;
import com.internership.management.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public InternshipDTO createInternship(Long companyId, InternshipDTO internshipDTO) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Company not found"));
        Internship internship = new Internship(company, internshipDTO.getTitle(), internshipDTO.getDescription(),
                internshipDTO.getRequirements(), internshipDTO.getDeadline(), internshipDTO.isActive());
        Internship savedInternship = internshipRepository.save(internship);
        return new InternshipDTO(savedInternship.getId(), savedInternship.getCompany().getId(), savedInternship.getTitle(),
                savedInternship.getDescription(), savedInternship.getRequirements(), savedInternship.getDeadline(),
                savedInternship.isActive());
    }

    public Page<InternshipDTO> getAllInternships(Pageable pageable) {
        return internshipRepository.findAll(pageable)
                .map(internship -> new InternshipDTO(internship.getId(), internship.getCompany().getId(),
                        internship.getTitle(), internship.getDescription(), internship.getRequirements(),
                        internship.getDeadline(), internship.isActive()));
    }

    public List<InternshipDTO> getInternshipsByCompanyId(Long companyId) {
        return internshipRepository.findByCompanyId(companyId)
                .stream()
                .map(internship -> new InternshipDTO(internship.getId(), internship.getCompany().getId(),
                        internship.getTitle(), internship.getDescription(), internship.getRequirements(),
                        internship.getDeadline(), internship.isActive()))
                .collect(Collectors.toList());
    }

    public Page<InternshipDTO> searchInternships(String keyword, Pageable pageable) {
        return internshipRepository.searchInternships(keyword, pageable)
                .map(internship -> new InternshipDTO(internship.getId(), internship.getCompany().getId(),
                        internship.getTitle(), internship.getDescription(), internship.getRequirements(),
                        internship.getDeadline(), internship.isActive()));
    }
}