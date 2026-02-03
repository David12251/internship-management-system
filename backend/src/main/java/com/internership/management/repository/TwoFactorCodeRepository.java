package com.internership.management.repository;

import com.internership.management.entity.TwoFactorCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TwoFactorCodeRepository extends JpaRepository<TwoFactorCode, Long> {
    Optional<TwoFactorCode> findByCodeAndUserId(String code, Long userId);
}
