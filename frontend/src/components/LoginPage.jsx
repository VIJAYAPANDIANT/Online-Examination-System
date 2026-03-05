import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  // ── Helpers: read/write registered users from localStorage ──────────
  const getStoredUsers = () => {
    try { return JSON.parse(localStorage.getItem('exam_users') || '[]'); }
    catch { return []; }
  };

  const saveUser = (user) => {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('exam_users', JSON.stringify(users));
  };

  // Built-in demo accounts (always available)
  const DEMO_USERS = [
    { id: 1, name: 'Demo Student', email: 'demo@exam.com',     password: 'demo',     role: 'STUDENT' },
    { id: 2, name: 'Student One',  email: 'student1@exam.com', password: 'student1', role: 'STUDENT' },
  ];

  // ── Notification: Send email to admin using EmailJS ──────────────────
  const notifyAdmin = (userAction, userData) => {
    // NOTE: These are placeholder IDs. User needs to replace them with their own EmailJS account details.
    const SERVICE_ID = 'service_default'; 
    const TEMPLATE_ID = 'template_login_alert';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // User must provide this

    const templateParams = {
      admin_email: 'vijayapandian112007@gmail.com',
      user_name: userData.name,
      user_email: userData.email,
      action: userAction,
      timestamp: new Date().toLocaleString()
    };

    if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.log(`[Notification Simulation] To: Admin, Action: ${userAction}, User: ${userData.name} (${userData.email})`);
      return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => console.log('Admin notified successfully'))
      .catch((err) => console.error('Failed to notify admin:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // ── Admin bypass ───────────────────────────────────────────────────
    const ADMIN_EMAIL = 'vijayapandian112007@gmail.com';
    if (!isRegister && email.toLowerCase() === ADMIN_EMAIL && password === 'admin') {
      const adminUser = { id: 0, name: 'Vijayapandian (Admin)', email: ADMIN_EMAIL, role: 'ADMIN' };
      notifyAdmin('Admin Login', adminUser);
      onLogin(adminUser);
      return;
    }

    if (isRegister) {
      // ── Register ──────────────────────────────────────────────────
      if (!name.trim())     { setError('Name is required');     return; }
      if (!email.trim())    { setError('Email is required');    return; }
      if (!password.trim()) { setError('Password is required'); return; }
      if (password.length < 4) { setError('Password must be at least 4 characters'); return; }

      const allUsers = [...DEMO_USERS, ...getStoredUsers()];
      if (allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError('Email already registered. Please login.');
        return;
      }

      // If registered email is the admin email, assign ADMIN role, otherwise STUDENT
      const role = email.toLowerCase() === ADMIN_EMAIL ? 'ADMIN' : 'STUDENT';
      const newUser = { id: Date.now(), name: name.trim(), email: email.trim().toLowerCase(), password, role };
      saveUser(newUser);
      const { password: _p, ...safeUser } = newUser;
      notifyAdmin('New Account Registration', safeUser);
      onLogin(safeUser);

    } else {
      // ── Login ─────────────────────────────────────────────────────
      const allUsers = [...DEMO_USERS, ...getStoredUsers()];
      const found = allUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (found) {
        const { password: _p, ...safeUser } = found;
        notifyAdmin('User Login', safeUser);
        onLogin(safeUser);
        return;
      }
      setError('Invalid email or password');
    }
  };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      
      {/* Floating particles */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%', opacity: 0.06,
            background: i % 2 === 0 ? '#818cf8' : '#c084fc',
            width: `${120 + i * 60}px`, height: `${120 + i * 60}px`,
            top: `${10 + i * 15}%`, left: `${5 + i * 16}%`,
            animation: `float${i} ${6 + i * 2}s ease-in-out infinite alternate`
          }} />
        ))}
        <style>{`
          @keyframes float0 { from { transform: translateY(0px) scale(1); } to { transform: translateY(-30px) scale(1.1); } }
          @keyframes float1 { from { transform: translateY(0px) scale(1); } to { transform: translateY(20px) scale(0.9); } }
          @keyframes float2 { from { transform: translateX(0px); } to { transform: translateX(-20px); } }
          @keyframes float3 { from { transform: translateY(0px); } to { transform: translateY(-40px); } }
          @keyframes float4 { from { transform: translate(0,0); } to { transform: translate(15px,-15px); } }
          @keyframes float5 { from { transform: scale(1); } to { transform: scale(1.15); } }
        `}</style>
      </div>

      <div style={{ width: '440px', padding: '44px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(99, 102, 241, 0.25)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}>
        
        {/* BUG Logo */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '52px', display: 'inline-block', animation: 'bugBounce 2s ease-in-out infinite' }}>🐛</span>
        </div>
        <style>{`@keyframes bugBounce { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(-5deg); } 75% { transform: translateY(-4px) rotate(5deg); } }`}</style>

        <h1 style={{ textAlign: 'center', fontSize: '42px', fontWeight: '900', marginBottom: '4px', background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
          BUG
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '500' }}>
          Online Examination System
        </p>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '32px', fontSize: '14px' }}>
          {isRegister ? 'Create your account to get started' : 'Sign in to start your exam'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: '15px', outline: 'none', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>
          )}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: '15px', outline: 'none', transition: 'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#334155'}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" required
              style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: '15px', outline: 'none', transition: 'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#334155'}
            />
          </div>
          {error && <p style={{ color: '#f87171', marginBottom: '16px', fontSize: '14px', textAlign: 'center', padding: '10px', borderRadius: '8px', background: 'rgba(248, 113, 113, 0.1)' }}>{error}</p>}
          <button type="submit"
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.4)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)'; }}
          >
            {isRegister ? '🚀 Create Account' : '🔑 Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ color: '#818cf8', cursor: 'pointer', fontWeight: '700' }}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>

        <div style={{ marginTop: '20px', padding: '12px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Admin Access</p>
          <p style={{ fontSize: '11px', color: '#818cf8', fontWeight: '600', marginBottom: '8px' }}>vijayapandian112007@gmail.com</p>
          <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Student Access</p>
          <p style={{ fontSize: '11px', color: '#34d399', fontWeight: '600', marginBottom: '2px' }}>demo@exam.com / demo</p>
          <p style={{ fontSize: '11px', color: '#64748b' }}>Register your own account to start testing</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
