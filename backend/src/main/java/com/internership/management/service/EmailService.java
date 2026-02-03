package com.internership.management.service;

import com.internership.management.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(User user, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(user.getEmail());
        helper.setSubject("Password Reset Request");
        String resetUrl = "http://localhost:5173/password-reset?token=" + token; // Frontend URL
        helper.setText(
                "<h1>Password Reset</h1>" +
                        "<p>Click the link below to reset your password:</p>" +
                        "<a href=\"" + resetUrl + "\">Reset Password</a>" +
                        "<p>This link will expire in 1 hour.</p>", true);
        mailSender.send(message);
    }

    public void sendTwoFactorCodeEmail(User user, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(user.getEmail());
        helper.setSubject("Two-Factor Authentication Code");
        helper.setText(
                "<h1>Your 2FA Code</h1>" +
                        "<p>Your verification code is: <strong>" + code + "</strong></p>" +
                        "<p>This code will expire in 5 minutes.</p>", true);
        mailSender.send(message);
    }
}