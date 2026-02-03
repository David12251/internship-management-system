package com.internership.management.controller;

import com.internership.management.DTOs.*;
import com.internership.management.config.JwtUtil;
import com.internership.management.entity.PasswordResetToken;
import com.internership.management.entity.User;
import com.internership.management.repository.PasswordResetTokenRepository;
import com.internership.management.repository.UserRepository;
import com.internership.management.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TwoFactorAuthService twoFactorAuthService;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) throws MessagingException {
        UserDTO userDTO = userService.createUser(signupRequest);
        if ("STUDENT".equals(signupRequest.getRole())) {
            User user = userService.findByEmail(signupRequest.getEmail());
            studentService.createStudent(user, signupRequest.getFirstName(), signupRequest.getLastName(),
                    signupRequest.getUniversity(), signupRequest.getMajor(), null);
        } else if ("COMPANY".equals(signupRequest.getRole())) {
            User user = userService.findByEmail(signupRequest.getEmail());
            companyService.createCompany(user, signupRequest.getCompanyName(), signupRequest.getCompanyDescription(),
                    signupRequest.getCompanyWebsite(), signupRequest.getCompanyLocation());
        }
        return ResponseEntity.ok("User registered successfully. Please login.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) throws MessagingException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        User user = userService.findByEmail(loginRequest.getEmail());
        if (user.isTwoFactorEnabled()) {
            twoFactorAuthService.generateAndSendTwoFactorCode(user);
            return ResponseEntity.ok("2FA code sent to email");
        }
        String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getRole()));
    }

    @PostMapping("/verify-2fa")
    public ResponseEntity<?> verifyTwoFactor(@Valid @RequestBody TwoFactorRequest twoFactorRequest) {
        User user = userService.findByEmail(twoFactorRequest.getEmail());
        if (twoFactorAuthService.verifyTwoFactorCode(user.getId(), twoFactorRequest.getCode())) {
            String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getRole()));
        } else {
            throw new com.internership.management.exception.BadRequestException("Invalid or expired 2FA code");
        }
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) throws MessagingException {
        User user = userService.findByEmail(request.getEmail());
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);
        emailService.sendPasswordResetEmail(user, token);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new com.internership.management.exception.BadRequestException("Invalid or expired token"));
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new com.internership.management.exception.BadRequestException("Token expired");
        }
        User user = resetToken.getUser();
        user.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
        return ResponseEntity.ok("Password reset successfully");
    }

    public static class AuthenticationResponse {
        private final String jwt;
        private final String role;

        public AuthenticationResponse(String jwt, String role) {
            this.jwt = jwt;
            this.role = role;
        }

        public String getJwt() {
            return jwt;
        }

        public String getRole() {
            return role;
        }
    }
}
