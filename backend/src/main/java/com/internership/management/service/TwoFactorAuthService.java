package com.internership.management.service;
import com.internership.management.config.TwoFactorAuthUtil;
import com.internership.management.entity.TwoFactorCode;
import com.internership.management.entity.User;
import com.internership.management.repository.TwoFactorCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.time.LocalDateTime;

@Service
public class TwoFactorAuthService {

    @Autowired
    private TwoFactorAuthUtil twoFactorAuthUtil;

    @Autowired
    private TwoFactorCodeRepository twoFactorCodeRepository;

    @Autowired
    private EmailService emailService;

    public void generateAndSendTwoFactorCode(User user) throws MessagingException {
        String code = twoFactorAuthUtil.generateTwoFactorCode();
        TwoFactorCode twoFactorCode = new TwoFactorCode(code, user, LocalDateTime.now().plusMinutes(5));
        twoFactorCodeRepository.save(twoFactorCode);
        emailService.sendTwoFactorCodeEmail(user, code);
    }

    public boolean verifyTwoFactorCode(Long userId, String code) {
        return twoFactorCodeRepository.findByCodeAndUserId(code, userId)
                .map(twoFactorCode -> {
                    boolean isValid = twoFactorCode.getExpiryDate().isAfter(LocalDateTime.now());
                    if (isValid) {
                        twoFactorCodeRepository.delete(twoFactorCode);
                    }
                    return isValid;
                })
                .orElse(false);
    }
}
