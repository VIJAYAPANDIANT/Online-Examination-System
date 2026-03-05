package com.exam.proctor.repository;

import com.exam.proctor.entity.ExamSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {
    Optional<ExamSession> findBySessionToken(String sessionToken);

    Optional<ExamSession> findByStudentIdAndStatus(Long studentId, String status);
}
