import React from 'react';

const topics = [
  { key: 'CN', label: 'Computer Networks', icon: '🌐', color: '#3b82f6', desc: '50 MCQs on OSI, TCP/IP, Routing & Security' },
  { key: 'OS', label: 'Operating Systems', icon: '💻', color: '#10b981', desc: '50 MCQs on Process, Memory, Deadlocks & I/O' },
  { key: 'JAVA', label: 'Java', icon: '☕', color: '#f59e0b', desc: '50 MCQs on OOP, Collections, Spring & JDBC' },
  { key: 'PYTHON', label: 'Python', icon: '🐍', color: '#8b5cf6', desc: '50 MCQs on Basics, OOP, Flask, Pandas & More' },
  { key: 'SQL', label: 'SQL', icon: '🗄️', color: '#ef4444', desc: '50 MCQs on Joins, Normalization, ACID & Triggers' },
  { key: 'APTITUDE', label: 'Aptitude', icon: '🧠', color: '#ec4899', desc: '50 MCQs on Arithmetic, Logic, Probability & DI' },
  { key: 'PUZZLE', label: 'Puzzles', icon: '🧩', color: '#f43f5e', desc: '10 MCQs on Logic, Math, and Brain Teasers' },
];

const TopicSelection = ({ user, onSelect, onLogout }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '950px', margin: '0 auto 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '36px' }}>🐛</span>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>BUG</h1>
            <p style={{ color: '#64748b', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Examination Platform</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '14px' }}>{user?.name}</p>
            <p style={{ color: '#64748b', fontSize: '12px' }}>{user?.email}</p>
          </div>
          <button onClick={onLogout} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #475569', background: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.target.style.borderColor = '#6366f1'} onMouseLeave={e => e.target.style.borderColor = '#475569'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div style={{ maxWidth: '950px', margin: '0 auto 36px', padding: '28px 32px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#e2e8f0', marginBottom: '6px' }}>Welcome back, {user?.name} 👋</h2>
        <p style={{ color: '#94a3b8', fontSize: '15px' }}>Choose a topic below to start your 50-question MCQ exam. Good luck! 🍀</p>
      </div>

      {/* Topic Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', maxWidth: '950px', margin: '0 auto' }}>
        {topics.map(t => (
          <div key={t.key} onClick={() => onSelect(t.key)}
            style={{
              padding: '32px', borderRadius: '18px', cursor: 'pointer',
              background: 'rgba(30, 41, 59, 0.7)', border: `1px solid ${t.color}33`,
              backdropFilter: 'blur(10px)', transition: 'all 0.3s ease',
              boxShadow: `0 4px 20px ${t.color}10`, position: 'relative', overflow: 'hidden'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 12px 40px ${t.color}25`; e.currentTarget.style.borderColor = `${t.color}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${t.color}10`; e.currentTarget.style.borderColor = `${t.color}33`; }}
          >
            {/* Glow circle */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `${t.color}10` }} />
            
            <div style={{ fontSize: '48px', marginBottom: '14px', position: 'relative' }}>{t.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e2e8f0', marginBottom: '6px', position: 'relative' }}>{t.label}</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.4', position: 'relative' }}>{t.desc}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '20px', background: `${t.color}15`, color: t.color, fontSize: '13px', fontWeight: '700', position: 'relative', transition: 'all 0.2s' }}>
              Start Exam <span style={{ fontSize: '16px' }}>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '48px', color: '#475569', fontSize: '13px' }}>
        <p>🐛 BUG Examination Platform — 310 Real MCQs Across 7 Topics</p>
      </div>
    </div>
  );
};

export default TopicSelection;
