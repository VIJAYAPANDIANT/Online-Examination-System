package com.exam.proctor.repository;

import com.exam.proctor.entity.ProctorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProctorLogRepository extends JpaRepository<ProctorLog, Long> {
    List<ProctorLog> findBySessionId(Long sessionId);
}
