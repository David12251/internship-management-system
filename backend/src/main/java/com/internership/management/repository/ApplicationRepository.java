package com.internership.management.repository;

import com.internership.management.entity.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByInternshipId(Long internshipId);

    @Query("SELECT a FROM Application a WHERE a.status LIKE %:status%")
    Page<Application> findByStatus(String status, Pageable pageable);
}
