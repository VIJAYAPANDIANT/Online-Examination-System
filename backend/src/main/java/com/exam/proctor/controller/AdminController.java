package com.exam.proctor.controller;

import com.exam.proctor.entity.Question;
import com.exam.proctor.entity.User;
import com.exam.proctor.repository.QuestionRepository;
import com.exam.proctor.repository.UserRepository;
import com.exam.proctor.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private LeaderboardService leaderboardService;

    // ========== Student Management ==========

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(userRepo.findByRole(User.Role.STUDENT));
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudent(@PathVariable long id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable long id, @RequestBody User updates) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isEmpty())
            return ResponseEntity.notFound().build();

        User user = userOpt.get();
        if (updates.getName() != null)
            user.setName(updates.getName());
        if (updates.getEmail() != null)
            user.setEmail(updates.getEmail());
        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable long id) {
        userRepo.deleteById(id);
        return ResponseEntity.ok().body(Map.of("message", "Student deleted"));
    }

    // ========== Question Bank ==========

    @PostMapping("/questions")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        if (question == null) {
            return ResponseEntity.badRequest().build();
        }
        Question saved = questionRepo.save(question);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionRepo.findAll());
    }

    // ========== Leaderboard ==========

    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard() {
        return ResponseEntity.ok(leaderboardService.getTop10());
    }

    // ========== Student Results ==========

    @GetMapping("/results")
    public ResponseEntity<?> getAllResults() {
        return ResponseEntity.ok(leaderboardService.getAllStudentScores());
    }
}
