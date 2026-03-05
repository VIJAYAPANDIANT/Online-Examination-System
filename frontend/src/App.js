import React, { useState } from 'react';
import ExamDashboard from './components/ExamDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('student'); // 'student' or 'admin'

  return (
    <div>
      {/* Simple Toggle */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        display: 'flex', justifyContent: 'center', gap: '10px',
        padding: '8px', backgroundColor: '#212529', borderBottom: '2px solid #343a40'
      }}>
        <button
          onClick={() => setView('student')}
          style={{
            padding: '8px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
            backgroundColor: view === 'student' ? '#0d6efd' : '#343a40',
            color: '#fff', transition: 'all 0.2s ease'
          }}
        >
          Student View
        </button>
        <button
          onClick={() => setView('admin')}
          style={{
            padding: '8px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
            backgroundColor: view === 'admin' ? '#dc3545' : '#343a40',
            color: '#fff', transition: 'all 0.2s ease'
          }}
        >
          Admin War Room
        </button>
      </div>

      {/* Main Content (pushed down to clear fixed nav) */}
      <div style={{ paddingTop: '50px' }}>
        {view === 'student' ? (
          <ExamDashboard studentId="STU4092" examId={1} sessionToken="token-abc-123" />
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
}

export default App;
