package com.internership.management.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SearchService {

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private StudentService studentService;

    public Map<String, Object> globalSearch(String keyword, Pageable pageable) {
        Map<String, Object> results = new HashMap<>();
        results.put("internships", internshipService.searchInternships(keyword, pageable));
        results.put("companies", companyService.searchCompanies(keyword, pageable));
        results.put("students", studentService.searchStudents(keyword, pageable));
        return results;
    }
}