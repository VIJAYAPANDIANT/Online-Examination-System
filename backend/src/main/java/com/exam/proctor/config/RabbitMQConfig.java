package com.exam.proctor.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String SUBMISSION_QUEUE = "exam.submission.queue";

    @Bean
    public Queue submissionQueue() {
        return new Queue(SUBMISSION_QUEUE, true); // durable = true
    }
}
