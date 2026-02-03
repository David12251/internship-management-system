package com.internership.management.repository;

import com.internership.management.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUserId(Long userId);

    @Query("SELECT c FROM Company c WHERE c.name LIKE %:keyword% OR c.description LIKE %:keyword%")
    Page<Company> searchCompanies(String keyword, Pageable pageable);
}
