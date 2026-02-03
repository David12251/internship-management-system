package com.internership.management.service;


import com.internership.management.DTOs.CompanyDTO;
import com.internership.management.entity.Company;
import com.internership.management.entity.User;
import com.internership.management.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyDTO createCompany(User user, String name, String description, String website, String location) {
        Company company = new Company(user, name, description, website, location);
        Company savedCompany = companyRepository.save(company);
        return new CompanyDTO(savedCompany.getId(), savedCompany.getUser().getId(), savedCompany.getName(),
                savedCompany.getDescription(), savedCompany.getWebsite(), savedCompany.getLocation());
    }

    public Page<CompanyDTO> getAllCompanies(Pageable pageable) {
        return companyRepository.findAll(pageable)
                .map(company -> new CompanyDTO(company.getId(), company.getUser().getId(), company.getName(),
                        company.getDescription(), company.getWebsite(), company.getLocation()));
    }

    public Page<CompanyDTO> searchCompanies(String keyword, Pageable pageable) {
        return companyRepository.searchCompanies(keyword, pageable)
                .map(company -> new CompanyDTO(company.getId(), company.getUser().getId(), company.getName(),
                        company.getDescription(), company.getWebsite(), company.getLocation()));
    }

    public CompanyDTO getCompanyByUserId(Long userId) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Company not found"));
        return new CompanyDTO(company.getId(), company.getUser().getId(), company.getName(),
                company.getDescription(), company.getWebsite(), company.getLocation());
    }
}
