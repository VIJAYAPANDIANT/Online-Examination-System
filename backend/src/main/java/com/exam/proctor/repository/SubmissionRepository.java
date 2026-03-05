package com.exam.proctor.repository;

import com.exam.proctor.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudentId(Long studentId);

    List<Submission> findByStudentIdAndQuestionId(Long studentId, Long questionId);
}
