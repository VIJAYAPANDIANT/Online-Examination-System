import React, { useEffect } from 'react';
import useExamStore from '../store/useExamStore';
import ExamJail from './ExamJail';

const ExamDashboard = ({ studentId, examId, sessionToken }) => {
  const { questions, answers, isNetworkHealthy, setAnswer, setQuestions, setNetworkStatus, setLastSaved, lastSavedAt } = useExamStore();

  // Mocking an initial load of questions for the UI preview
  useEffect(() => {
    // In reality this would fetch from /api/exam/${examId}/paper
    setQuestions([
      { id: 101, content: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"] },
      { id: 102, content: "Identify the correct JVM language.", options: ["Java", "Python", "C++", "Ruby"] },
      { id: 103, content: "Which is a NoSQL database?", options: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"] },
      { id: 104, content: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"] },
      { id: 105, content: "Which of these is a JavaScript framework?", options: ["React", "Django", "Flask", "Laravel"] },
      { id: 106, content: "What is 2 + 2?", options: ["4", "22", "8", "16"] },
      { id: 107, content: "Who wrote Romeo and Juliet?", options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"] },
      { id: 108, content: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Mars", "Earth"] },
      { id: 109, content: "Which element has the chemical symbol O?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"] },
      { id: 110, content: "What year did the Titanic sink?", options: ["1912", "1905", "1923", "1898"] }
    ]);
  }, []);

  const handleOptionSelect = async (questionId, option) => {
    setAnswer(questionId, option);
    
    // Simulate real-world optimistic save
    try {
      setNetworkStatus(true);
      
      const payload = {
        sessionToken,
        questionId,
        selectedOption: option
      };

      await fetch('/api/exam/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      setLastSaved();
    } catch (err) {
      console.error("Network failed", err);
      // Red dot indicator meaning answers are stuck locally in Zustand
      setNetworkStatus(false);
    }
  };

  const forceSync = async () => {
    // The "Emergency Save" pulls EVERYTHING from the Zustand store
    const currentAnswers = useExamStore.getState().answers;
    
    try {
      setNetworkStatus(true);
      console.log("Syncing offline cache to server...", currentAnswers);
      // await axios.post('/api/exam/bulk-sync', { sessionToken, answers: currentAnswers });
      setLastSaved();
      alert("Emergency sync complete!");
    } catch {
      setNetworkStatus(false);
      alert("Still cannot reach server. Do not close your browser.");
    }
  };

  // Smooth scroll logic wrapper
  const scrollToQuestion = (qId) => {
    const el = document.getElementById(`question-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <ExamJail studentId={studentId} examId={examId}>
      {/* 
        This div is injected INSIDE the ExamJail. 
        If ExamJail hasn't started full screen yet, it won't render this.
      */}
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f7f6', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
        
        {/* Left Panel: Question Palette */}
        <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '20px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Question Palette</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {questions.map((q, index) => {
              const isAnswered = !!answers[q.id];
              return (
                <button 
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  style={{
                    padding: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isAnswered ? '#28a745' : '#e9ecef',
                    color: isAnswered ? '#fff' : '#495057',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', color: '#721c24' }}>
            <h4 style={{ margin: 0, fontSize: '14px' }}>Having network issues?</h4>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>Your answers are saved locally.</p>
            <button onClick={forceSync} style={{ marginTop: '10px', padding: '8px 12px', width: '100%', border: 'none', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
              Emergency Save
            </button>
          </div>
        </div>

        {/* Right Panel: Exam Content */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Header Row */}
          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #ddd' }}>
            <h2>Spring Boot Architecture Exam</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {lastSavedAt ? `Last Saved: ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not saved yet'}
              </span>
              <div 
                title={isNetworkHealthy ? "Connected to Server" : "Offline - Trying to reconnect"}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  backgroundColor: isNetworkHealthy ? '#28a745' : '#dc3545',
                  boxShadow: `0 0 8px ${isNetworkHealthy ? '#28a745' : '#dc3545'}`,
                  transition: 'background-color 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question List */}
          <div style={{ width: '100%', maxWidth: '800px' }}>
            {questions.map((q, index) => (
              <div key={q.id} id={`question-${q.id}`} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
                  <span style={{ color: '#007bff', marginRight: '10px' }}>Q{index + 1}.</span> 
                  {q.content}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {q.options.map((opt) => (
                    <label 
                      key={opt} 
                      style={{
                        padding: '15px', 
                        border: `2px solid ${answers[q.id] === opt ? '#007bff' : '#eaedf1'}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: answers[q.id] === opt ? '#f8fbff' : 'white',
                        transition: 'all 0.1s ease-in-out'
                      }}
                    >
                      <input 
                        type="radio" 
                        name={`question-${q.id}`} 
                        value={opt} 
                        checked={answers[q.id] === opt}
                        onChange={() => handleOptionSelect(q.id, opt)}
                        style={{ marginRight: '15px', transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#444' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ExamJail>
  );
};

export default ExamDashboard;
