package com.exam.proctor.controller;

import com.exam.proctor.entity.Question;
import com.exam.proctor.entity.Submission;
import com.exam.proctor.repository.QuestionRepository;
import com.exam.proctor.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private SubmissionRepository submissionRepo;

    /**
     * GET /api/exam/questions?topic=JAVA
     * Fetches 50 random MCQs filtered by topic category.
     */
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions(@RequestParam String topic) {
        List<Question> questions = questionRepo.findRandom50ByTopic(topic.toUpperCase());
        return ResponseEntity.ok(questions);
    }

    /**
     * POST /api/exam/submit
     * Submit one answer at a time. Auto-checks correctness.
     * Body: { "studentId": 1, "questionId": 5, "selectedOption": "A" }
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitAnswer(@NonNull @RequestBody Map<String, Object> body) {
        if (body.get("studentId") == null || body.get("questionId") == null || body.get("selectedOption") == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: studentId, questionId, or selectedOption"));
        }

        Long studentId = Long.parseLong(body.get("studentId").toString());
        Long questionId = Long.parseLong(body.get("questionId").toString());
        String selectedOption = body.get("selectedOption").toString();

        // Check if already submitted
        List<Submission> existing = submissionRepo.findByStudentIdAndQuestionId(studentId, questionId);
        if (!existing.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Already submitted this question"));
        }

        // Fetch question to check correctness
        Optional<Question> qOpt = questionRepo.findById(questionId);
        if (qOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Question not found"));
        }

        Question question = qOpt.get();
        boolean isCorrect = question.getCorrectOption().equalsIgnoreCase(selectedOption);

        Submission submission = new Submission();
        submission.setStudentId(studentId);
        submission.setQuestionId(questionId);
        submission.setSelectedOption(selectedOption);
        submission.setIsCorrect(isCorrect);
        submission.setSubmittedAt(LocalDateTime.now());

        submissionRepo.save(submission);

        return ResponseEntity.ok(Map.of(
                "correct", isCorrect,
                "message", isCorrect ? "Correct!" : "Wrong answer."));
    }

    /**
     * GET /api/exam/results/{studentId}
     * Returns all submissions for a student.
     */
    @GetMapping("/results/{studentId}")
    public ResponseEntity<?> getResults(@PathVariable Long studentId) {
        List<Submission> submissions = submissionRepo.findByStudentId(studentId);
        long correct = submissions.stream().filter(Submission::getIsCorrect).count();
        return ResponseEntity.ok(Map.of(
                "totalQuestions", submissions.size(),
                "correctAnswers", correct,
                "score", correct,
                "submissions", submissions));
    }
}
