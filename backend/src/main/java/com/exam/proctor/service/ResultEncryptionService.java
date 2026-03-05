package com.exam.proctor.service;

import com.exam.proctor.entity.Certificate;
import com.exam.proctor.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class ResultEncryptionService {

    @Value("${exam.signature.secret:defaultSecretKey123}")
    private String secretKey;

    @Autowired
    private CertificateRepository certificateRepo;

    public Certificate signAndSaveResult(Long sessionId, Long studentId, Long examId, Integer finalScore) {
        String dataToSign = studentId + ":" + examId + ":" + finalScore;
        String signature = generateHmacSha256(dataToSign, secretKey);

        Certificate certificate = new Certificate();
        certificate.setSessionId(sessionId);
        certificate.setStudentId(studentId);
        certificate.setExamId(examId);
        certificate.setFinalScore(finalScore);
        certificate.setDigitalSignature(signature);
        certificate.setIssuedAt(LocalDateTime.now());

        return certificateRepo.save(certificate);
    }

    public boolean verifySignature(Certificate certificate) {
        String dataToSign = certificate.getStudentId() + ":" + certificate.getExamId() + ":"
                + certificate.getFinalScore();
        String expectedSignature = generateHmacSha256(dataToSign, secretKey);
        return expectedSignature.equals(certificate.getDigitalSignature());
    }

    private String generateHmacSha256(String data, String key) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKeySpec);
            byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate HMAC SHA256 signature", e);
        }
    }
}
