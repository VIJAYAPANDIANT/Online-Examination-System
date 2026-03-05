package com.exam.proctor.event;

import org.springframework.context.ApplicationEvent;

public class ExamAutoSubmitEvent extends ApplicationEvent {
    private final Long studentId;
    private final Long examId;

    public ExamAutoSubmitEvent(Object source, Long studentId, Long examId) {
        super(source);
        this.studentId = studentId;
        this.examId = examId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public Long getExamId() {
        return examId;
    }
}
