package com.exam.proctor.config;

import com.exam.proctor.entity.Question;
import com.exam.proctor.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private QuestionRepository questionRepo;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepo.count() == 0) {
            System.out.println("Loading sample questions for H2 database testing...");
            for (int i = 1; i <= 50; i++) {
                Question q = new Question();
                q.setTopicCategory(Question.TopicCategory.JAVA);
                q.setQuestionText("Sample Java MCQ Question " + i + "?");
                q.setOptionA("Option A for Java " + i);
                q.setOptionB("Option B for Java " + i);
                q.setOptionC("Option C for Java " + i);
                q.setOptionD("Option D for Java " + i);
                q.setCorrectOption("Option A for Java " + i);
                questionRepo.save(q);
            }
            for (int i = 1; i <= 50; i++) {
                Question q = new Question();
                q.setTopicCategory(Question.TopicCategory.PYTHON);
                q.setQuestionText("Sample Python MCQ Question " + i + "?");
                q.setOptionA("Option A for Python " + i);
                q.setOptionB("Option B for Python " + i);
                q.setOptionC("Option C for Python " + i);
                q.setOptionD("Option D for Python " + i);
                q.setCorrectOption("Option B for Python " + i);
                questionRepo.save(q);
            }
            // Add similar data for other topics if needed
            System.out.println("Loaded " + questionRepo.count() + " sample questions.");
        }
    }
}
