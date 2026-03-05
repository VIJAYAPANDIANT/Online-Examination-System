package com.exam.proctor.service;

import com.exam.proctor.dto.ExamPaperDTO;
import com.exam.proctor.dto.QuestionDTO;
import com.exam.proctor.entity.Exam;
import com.exam.proctor.entity.Question;
import com.exam.proctor.repository.ExamRepository;
import com.exam.proctor.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class ExamPaperService {

    @Autowired
    private ExamRepository examRepo;

    @Autowired
    private QuestionRepository questionRepo;

    public ExamPaperDTO generatePersonalizedExam(Long examId, String studentId) {
        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> allQuestions = questionRepo.findByExamId(examId);

        // 1. Shuffle the Questions using the studentId's hashCode as a seed
        // This ensures the permutation is unique to the student but consistent on page
        // refresh
        Collections.shuffle(allQuestions, new Random(studentId.hashCode()));

        // 2. Convert to DTOs and shuffle the Options within each question
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question q : allQuestions) {
            QuestionDTO dto = new QuestionDTO();
            dto.setId(q.getId());
            dto.setContentType(q.getContentType());
            dto.setDifficultyLevel(q.getDifficultyLevel());

            List<String> options = new ArrayList<>(q.getOptions());
            Collections.shuffle(options, new Random(studentId.hashCode() + q.getId().hashCode()));
            dto.setOptions(options);

            questionDTOs.add(dto);
        }

        ExamPaperDTO paper = new ExamPaperDTO();
        paper.setExamId(exam.getId());
        paper.setTitle(exam.getTitle());
        paper.setQuestions(questionDTOs);

        return paper;
    }
}
