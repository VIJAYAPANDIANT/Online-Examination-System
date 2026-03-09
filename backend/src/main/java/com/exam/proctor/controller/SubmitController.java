package com.exam.proctor.controller;

import com.exam.proctor.dto.AnswerDTO;
import com.exam.proctor.entity.ExamSession;
import com.exam.proctor.repository.ExamSessionRepository;
import com.exam.proctor.service.SubmissionProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;
import java.util.Objects;

import java.security.Principal;
import java.time.ZoneOffset;

@RestController
@RequestMapping("/api/exam")
public class SubmitController {

    @Autowired
    private ExamSessionRepository sessionRepo;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SubmissionProducerService producerService;

    @PostMapping("/submit-answer")
    public ResponseEntity<?> saveProgress(@NonNull @RequestBody AnswerDTO answer, Principal principal) {
        // Find session using session token or student ID from principal
        String identifier = principal != null ? principal.getName() : answer.getSessionToken();

        ExamSession session = sessionRepo.findBySessionToken(identifier).orElse(null);

        if (session == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
        }

        // SERVER-SIDE TIME VALIDATION (Anti-Gravity)
        long currentTime = System.currentTimeMillis();
        long sessionEndTimeMillis = session.getEndTime() != null
                ? session.getEndTime().toInstant(ZoneOffset.UTC).toEpochMilli()
                : Long.MAX_VALUE;

        if (currentTime > sessionEndTimeMillis + 30000) { // 30s grace period
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Exam time expired. Access denied.");
        }

        // Save to Redis first for speed
        String redisKey = "session:" + session.getId() + ":question:" + answer.getQuestionId();
        String val = String.valueOf(answer.getSelectedOption());
        redisTemplate.opsForValue().set(redisKey, Objects.requireNonNull((Object) val));

        // Send to queue for async database saving
        producerService.queueSubmission(answer);

        return ResponseEntity.ok("Progress Saved");
    }
}
