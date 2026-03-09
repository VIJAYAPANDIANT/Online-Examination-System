import questionBank from './questionBank.js';

const STATIC_TOPICS = [
  { key: 'CN', label: 'Computer Networks', icon: '🌐', color: '#3b82f6', desc: '50 MCQs on OSI, TCP/IP, Routing & Security' },
  { key: 'OS', label: 'Operating Systems', icon: '💻', color: '#10b981', desc: '50 MCQs on Process, Memory, Deadlocks & I/O' },
  { key: 'JAVA', label: 'Java', icon: '☕', color: '#f59e0b', desc: '50 MCQs on OOP, Collections, Spring & JDBC' },
  { key: 'PYTHON', label: 'Python', icon: '🐍', color: '#8b5cf6', desc: '50 MCQs on Basics, OOP, Flask, Pandas & More' },
  { key: 'SQL', label: 'SQL', icon: '🗄️', color: '#ef4444', desc: '50 MCQs on Joins, Normalization, ACID & Triggers' },
  { key: 'APTITUDE', label: 'Aptitude', icon: '🧠', color: '#ec4899', desc: '50 MCQs on Arithmetic, Logic, Probability & DI' },
  { key: 'PUZZLE', label: 'Puzzles', icon: '🧩', color: '#f43f5e', desc: '10 MCQs on Logic, Math, and Brain Teasers' },
];

const STORAGE_KEYS = {
  TOPICS: 'exam_custom_topics',
  QUESTIONS: (key) => `exam_custom_questions_${key}`
};

const store = {
  getTopics: () => {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPICS) || '[]');
    return [...STATIC_TOPICS, ...custom];
  },

  addTopic: (topic) => {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPICS) || '[]');
    // Prevent duplicates
    if ([...STATIC_TOPICS, ...custom].some(t => t.key.toUpperCase() === topic.key.toUpperCase())) {
      throw new Error("Topic Key already exists!");
    }
    custom.push(topic);
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(custom));
  },

  getQuestions: (topicKey) => {
    const staticQs = questionBank[topicKey] || [];
    const customQs = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS(topicKey)) || '[]');
    return [...staticQs, ...customQs];
  },

  addQuestion: (q) => {
    const { topicCategory, ...questionData } = q;
    const key = topicCategory.toUpperCase();
    const customQs = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS(key)) || '[]');

    // Generate a unique ID (Static IDs are 1-50, we use timestamp for custom)
    const newQuestion = {
      ...questionData,
      id: Date.now(),
    };

    customQs.push(newQuestion);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS(key), JSON.stringify(customQs));
  }
};

export default store;
