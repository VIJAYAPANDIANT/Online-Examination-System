package com.exam.proctor.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "content_type", nullable = false)
    private String contentType; // MCQ, TEXT

    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel;

    @ElementCollection
    @CollectionTable(name = "Question_Options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private java.util.List<String> options;

    public Question() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public java.util.List<String> getOptions() {
        return options;
    }

    public void setOptions(java.util.List<String> options) {
        this.options = options;
    }
}
