package com.exam.proctor.service;

import com.exam.proctor.entity.ProctorLog;
import com.exam.proctor.event.ExamAutoSubmitEvent;
import com.exam.proctor.repository.ProctorLogRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProctorService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ProctorLogRepository proctorLogRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final SimpMessagingTemplate messagingTemplate;

    public ProctorService(RedisTemplate<String, Object> redisTemplate,
                          ProctorLogRepository proctorLogRepository,
                          ApplicationEventPublisher eventPublisher,
                          SimpMessagingTemplate messagingTemplate) {
        this.redisTemplate = redisTemplate;
        this.proctorLogRepository = proctorLogRepository;
        this.eventPublisher = eventPublisher;
        this.messagingTemplate = messagingTemplate;
    }

    private static final String REDIS_KEY_PREFIX = "violation_pts:";

    /**
     * Records a violation against a session.
     * Updates violation points and logs it to the database for future review.
     */
    public void recordViolation(Long sessionId, Long studentId, Long examId, String violationType) {
        int points = getPointsForViolation(violationType);

        // Save violation to Database (PostgreSQL)
        ProctorLog log = new ProctorLog();
        log.setSessionId(sessionId);
        log.setViolationCode(violationType);
        log.setSeverityLevel(points);
        proctorLogRepository.save(log);

        // Ping the Admin WebSocket Dashboard
        messagingTemplate.convertAndSend("/topic/admin-alerts",
                "VIOLATION: Session " + sessionId + " triggered " + violationType);

        // Update real-time Points in Redis
        String redisKey = REDIS_KEY_PREFIX + sessionId;
        Long currentPoints = redisTemplate.opsForValue().increment(redisKey, points);

        // Optional: Could set an expiration for the key based on exam duration
        // redisTemplate.expire(redisKey, Duration.ofHours(3));

        // If the student reaches 50 points, trigger ExamAutoSubmitEvent
        if (currentPoints != null && currentPoints >= 50) {
            triggerAutoSubmit(studentId, examId);
        }
    }

    private int getPointsForViolation(String type) {
        switch (type) {
            case "TAB_SWITCH":
                return 10;
            case "FULLSCREEN_EXIT":
                return 20;
            case "COPY_ATTEMPT":
                return 5;
            case "RIGHT_CLICK":
                return 5;
            default:
                return 0;
        }
    }

    private void triggerAutoSubmit(Long studentId, Long examId) {
        eventPublisher.publishEvent(new ExamAutoSubmitEvent(this, studentId, examId));
    }
}
