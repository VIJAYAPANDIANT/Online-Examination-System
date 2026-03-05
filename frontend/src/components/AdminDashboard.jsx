import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    // 1. Initialize STOMP client over SockJS
    const stompClient = new Client({
      // Match the Spring Boot server port
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-admin'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected to Admin WebSocket: ' + frame);

      // 2. Subscribe to the topics we exposed in ProctorService
      stompClient.subscribe('/topic/admin-alerts', (message) => {
        // When a new violation occurs, it pushes here
        const newAlert = message.body;
        setAlerts((prev) => [
          { id: Date.now(), text: newAlert, time: new Date().toLocaleTimeString() },
          ...prev
        ]);
      });

      // (Optional) Subscribe to a general stats topic
      stompClient.subscribe('/topic/active-sessions', (message) => {
        setActiveSessions(parseInt(message.body, 10));
      });
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    // 3. Connect
    stompClient.activate();

    // 4. Cleanup
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Navbar */}
      <div style={{ padding: '20px 40px', backgroundColor: '#212529', borderBottom: '1px solid #343a40', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#dc3545' }}>⚡</span> War Room Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ backgroundColor: '#2c3034', padding: '10px 20px', borderRadius: '8px' }}>
            <span style={{ color: '#adb5bd', fontSize: '14px' }}>Active Exams</span>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{activeSessions || 1}</div>
          </div>
          <div style={{ backgroundColor: '#2c3034', padding: '10px 20px', borderRadius: '8px' }}>
            <span style={{ color: '#adb5bd', fontSize: '14px' }}>System Status</span>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>Healthy</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px', display: 'flex', gap: '40px' }}>
        
        {/* Left Column: Live Grid (Simulated) */}
        <div style={{ flex: 2 }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#adb5bd' }}>Live Student Feeds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            
            {/* Example Student Card */}
            <div style={{ backgroundColor: '#212529', borderRadius: '8px', padding: '20px', border: '1px solid #343a40' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontWeight: 'bold' }}>Student #4092</span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28a745', marginTop: '4px' }} />
              </div>
              <div style={{ fontSize: '12px', color: '#adb5bd', marginBottom: '10px' }}>Exam: Java Arch 101</div>
              
              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: '#343a40', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: '#0d6efd' }} />
              </div>
              <div style={{ fontSize: '11px', textAlign: 'right', marginTop: '5px', color: '#6c757d' }}>65% Complete</div>
              
              <button style={{ width: '100%', padding: '8px', marginTop: '15px', backgroundColor: 'transparent', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}>
                Terminate Session
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Violation Alerts Stream */}
        <div style={{ flex: 1, backgroundColor: '#212529', borderRadius: '8px', border: '1px solid #343a40', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #343a40', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#adb5bd' }}>Real-time Violations</h2>
            <span style={{ backgroundColor: '#dc3545', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              {alerts.length} New
            </span>
          </div>
          
          <div style={{ padding: '20px', overflowY: 'auto', flex: 1, maxHeight: '600px' }}>
            {alerts.length === 0 ? (
              <div style={{ color: '#6c757d', textAlign: 'center', marginTop: '40px' }}>
                Listening for security events...
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} style={{ 
                  backgroundColor: '#2c3034', 
                  padding: '15px', 
                  borderRadius: '6px', 
                  marginBottom: '10px',
                  borderLeft: '4px solid #dc3545',
                  animation: 'fadeIn 0.3s ease-in-out'
                }}>
                  <div style={{ fontSize: '12px', color: '#adb5bd', marginBottom: '5px' }}>{alert.time}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{alert.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
