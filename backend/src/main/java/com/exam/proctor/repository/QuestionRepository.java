package com.exam.proctor.repository;

import com.exam.proctor.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTopicCategory(Question.TopicCategory topicCategory);

    @Query(value = "SELECT * FROM questions WHERE topic_category = :topic ORDER BY RANDOM() LIMIT 50", nativeQuery = true)
    List<Question> findRandom50ByTopic(@Param("topic") String topic);
}
