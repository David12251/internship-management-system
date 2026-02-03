package com.internership.management.config;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class TwoFactorAuthUtil {
    private static final String DIGITS = "0123456789";
    private static final int CODE_LENGTH = 4;

    public String generateTwoFactorCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        }
        return code.toString();
    }
}