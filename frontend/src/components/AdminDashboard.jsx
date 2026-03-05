import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user, onLogout }) => {
  const [tab, setTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [newQ, setNewQ] = useState({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', topicCategory: 'JAVA' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await axios.get('/api/admin/results');
      setStudents(res1.data);
      const res2 = await axios.get('/api/admin/leaderboard');
      setLeaderboard(res2.data);
    } catch {
      // Mock data
      setStudents([
        { studentId: 1, name: 'John', email: 'john@test.com', score: 8, totalAttempted: 10 },
        { studentId: 2, name: 'Alice', email: 'alice@test.com', score: 9, totalAttempted: 10 },
      ]);
      setLeaderboard([
        { studentId: 2, name: 'Alice', score: 9 },
        { studentId: 1, name: 'John', score: 8 },
      ]);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/questions', newQ);
      alert('Question added!');
      setNewQ({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', topicCategory: 'JAVA' });
    } catch { alert('Failed to add question'); }
  };

  const handleDelete = async (id) => {
    try { await axios.delete(`/api/admin/students/${id}`); fetchData(); } catch { alert('Failed'); }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: '14px', marginBottom: '12px' };
  const tabBtn = (t, label) => (
    <button onClick={() => setTab(t)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: tab === t ? '#6366f1' : '#1e293b', color: '#fff', fontWeight: '600', fontSize: '14px' }}>{label}</button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#e2e8f0' }}>⚡ Admin Dashboard</h1>
          <button onClick={onLogout} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #475569', background: 'transparent', color: '#94a3b8' }}>Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
          {tabBtn('students', '👥 Students')}
          {tabBtn('leaderboard', '🏆 Leaderboard')}
          {tabBtn('questions', '📝 Add Question')}
        </div>

        {/* Students Tab */}
        {tab === 'students' && (
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#e2e8f0' }}>All Students & Scores</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  {['Name', 'Email', 'Score', 'Attempted', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.studentId} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '14px', fontWeight: '600', color: '#e2e8f0' }}>{s.name}</td>
                    <td style={{ padding: '14px', color: '#94a3b8' }}>{s.email}</td>
                    <td style={{ padding: '14px', fontWeight: '700', color: '#818cf8' }}>{s.score}</td>
                    <td style={{ padding: '14px', color: '#94a3b8' }}>{s.totalAttempted}</td>
                    <td style={{ padding: '14px' }}>
                      <button onClick={() => handleDelete(s.studentId)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Leaderboard Tab */}
        {tab === 'leaderboard' && (
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#e2e8f0' }}>🏆 Top 10 Leaderboard</h2>
            {leaderboard.map((entry, i) => (
              <div key={entry.studentId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '10px', marginBottom: '8px', background: '#0f172a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', width: '30px', color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#64748b' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{entry.name}</span>
                </div>
                <span style={{ fontWeight: '700', fontSize: '18px', color: '#818cf8' }}>{entry.score}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Question Tab */}
        {tab === 'questions' && (
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '30px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#e2e8f0' }}>Add New Question</h2>
            <form onSubmit={handleAddQuestion}>
              <textarea value={newQ.questionText} onChange={e => setNewQ({ ...newQ, questionText: e.target.value })} placeholder="Question Text" required rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input value={newQ.optionA} onChange={e => setNewQ({ ...newQ, optionA: e.target.value })} placeholder="Option A" required style={inputStyle} />
                <input value={newQ.optionB} onChange={e => setNewQ({ ...newQ, optionB: e.target.value })} placeholder="Option B" required style={inputStyle} />
                <input value={newQ.optionC} onChange={e => setNewQ({ ...newQ, optionC: e.target.value })} placeholder="Option C" required style={inputStyle} />
                <input value={newQ.optionD} onChange={e => setNewQ({ ...newQ, optionD: e.target.value })} placeholder="Option D" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                <select value={newQ.correctOption} onChange={e => setNewQ({ ...newQ, correctOption: e.target.value })} style={inputStyle}>
                  <option value="A">Correct: A</option><option value="B">Correct: B</option>
                  <option value="C">Correct: C</option><option value="D">Correct: D</option>
                </select>
                <select value={newQ.topicCategory} onChange={e => setNewQ({ ...newQ, topicCategory: e.target.value })} style={inputStyle}>
                  <option value="JAVA">Java</option><option value="PYTHON">Python</option>
                  <option value="CN">Computer Networks</option><option value="OS">Operating Systems</option>
                  <option value="SQL">SQL</option><option value="APTITUDE">Aptitude</option>
                </select>
              </div>
              <button type="submit" style={{ marginTop: '8px', width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: '16px', fontWeight: '700' }}>
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
