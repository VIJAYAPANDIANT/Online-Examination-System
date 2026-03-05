package com.exam.proctor.service;

import com.exam.proctor.config.RabbitMQConfig;
import com.exam.proctor.dto.AnswerDTO;
import com.exam.proctor.entity.ExamSession;
import com.exam.proctor.entity.StudentResponse;
import com.exam.proctor.repository.ExamSessionRepository;
import com.exam.proctor.repository.StudentResponseRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubmissionWorkerService {

    @Autowired
    private StudentResponseRepository responseRepo;

    @Autowired
    private ExamSessionRepository sessionRepo;

    @RabbitListener(queues = RabbitMQConfig.SUBMISSION_QUEUE)
    public void consumeSubmission(AnswerDTO answer) {
        if (answer.getSessionToken() == null) {
            return;
        }

        Optional<ExamSession> sessionOpt = sessionRepo.findBySessionToken(answer.getSessionToken());
        if (sessionOpt.isPresent()) {
            ExamSession session = sessionOpt.get();

            StudentResponse response = new StudentResponse();
            response.setSessionId(session.getId());
            response.setQuestionId(answer.getQuestionId());
            response.setSelectedOption(answer.getSelectedOption());
            response.setIsFlagged(false);

            // Saves to PostgreSQL efficiently in the background
            responseRepo.save(response);
        }
    }
}
