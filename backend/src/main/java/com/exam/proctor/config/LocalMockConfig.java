package com.exam.proctor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Configuration
public class LocalMockConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        return new RedisTemplate<String, Object>() {
            // No-op implementation for local dev
            @Override
            public void afterPropertiesSet() {
            }
        };
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        return new RabbitTemplate() {
            // No-op implementation for local dev
            @Override
            public void afterPropertiesSet() {
            }
        };
    }
}
