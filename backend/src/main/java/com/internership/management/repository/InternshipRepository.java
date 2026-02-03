package com.internership.management.repository;
import com.internership.management.entity.Internship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByCompanyId(Long companyId);

    @Query("SELECT i FROM Internship i WHERE i.title LIKE %:keyword% OR i.description LIKE %:keyword%")
    Page<Internship> searchInternships(String keyword, Pageable pageable);
}