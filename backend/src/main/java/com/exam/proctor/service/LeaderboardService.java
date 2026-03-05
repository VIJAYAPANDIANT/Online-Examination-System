package com.exam.proctor.service;

import com.exam.proctor.entity.Submission;
import com.exam.proctor.entity.User;
import com.exam.proctor.repository.SubmissionRepository;
import com.exam.proctor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    @Autowired
    private SubmissionRepository submissionRepo;

    @Autowired
    private UserRepository userRepo;

    /**
     * Java Stream-based leaderboard:
     * 1. Group submissions by studentId
     * 2. Filter correct answers
     * 3. Sum the points (1 point per correct answer)
     * 4. Sort descending
     * 5. Return top 10
     */
    public List<Map<String, Object>> getTop10() {
        List<Submission> allSubmissions = submissionRepo.findAll();

        Map<Long, Long> studentScores = allSubmissions.stream()
                .filter(Submission::getIsCorrect)
                .collect(Collectors.groupingBy(Submission::getStudentId, Collectors.counting()));

        return studentScores.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(10)
                .map(entry -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("studentId", entry.getKey());
                    row.put("score", entry.getValue());

                    // Attach student name if available
                    userRepo.findById(entry.getKey()).ifPresent(u -> row.put("name", u.getName()));

                    return row;
                })
                .collect(Collectors.toList());
    }

    /**
     * Returns all student scores (not just top 10).
     */
    public List<Map<String, Object>> getAllStudentScores() {
        List<Submission> allSubmissions = submissionRepo.findAll();
        List<User> students = userRepo.findByRole(User.Role.STUDENT);

        Map<Long, Long> studentScores = allSubmissions.stream()
                .filter(Submission::getIsCorrect)
                .collect(Collectors.groupingBy(Submission::getStudentId, Collectors.counting()));

        Map<Long, Long> totalAttempts = allSubmissions.stream()
                .collect(Collectors.groupingBy(Submission::getStudentId, Collectors.counting()));

        return students.stream().map(student -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("studentId", student.getId());
            row.put("name", student.getName());
            row.put("email", student.getEmail());
            row.put("score", studentScores.getOrDefault(student.getId(), 0L));
            row.put("totalAttempted", totalAttempts.getOrDefault(student.getId(), 0L));
            return row;
        }).sorted((a, b) -> Long.compare((Long) b.get("score"), (Long) a.get("score")))
                .collect(Collectors.toList());
    }
}
