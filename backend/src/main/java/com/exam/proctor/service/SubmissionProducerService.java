package com.exam.proctor.service;

import com.exam.proctor.config.RabbitMQConfig;
import com.exam.proctor.dto.AnswerDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubmissionProducerService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void queueSubmission(AnswerDTO answer) {
        // Enqueues the answer for asynchronous consumption
        rabbitTemplate.convertAndSend(RabbitMQConfig.SUBMISSION_QUEUE, answer);
    }
}
