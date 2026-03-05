package com.exam.proctor.repository;

import com.exam.proctor.entity.StudentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentResponseRepository extends JpaRepository<StudentResponse, Long> {
    List<StudentResponse> findBySessionId(Long sessionId);
}
