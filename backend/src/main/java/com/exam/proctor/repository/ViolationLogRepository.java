package com.exam.proctor.repository;

import com.exam.proctor.entity.ViolationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViolationLogRepository extends JpaRepository<ViolationLog, Long> {
    List<ViolationLog> findByStudentIdAndExamId(Long studentId, Long examId);
}
