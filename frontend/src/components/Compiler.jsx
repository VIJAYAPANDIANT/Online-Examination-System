import React, { useState } from 'react';

const Compiler = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here...\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨', defaultCode: '// JavaScript Code\nconsole.log("Hello from JS!");' },
    { id: 'python', name: 'Python', icon: '🟦', defaultCode: '# Python Code\nprint("Hello from Python!")' },
    { id: 'java', name: 'Java', icon: '🟥', defaultCode: '// Java Code\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}' },
    { id: 'cpp', name: 'C++', icon: '🟦', defaultCode: '// C++ Code\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}' },
    { id: 'c', name: 'C', icon: '📎', defaultCode: '// C Code\n#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}' },
  ];

  const handleLanguageChange = (langId) => {
    const selected = languages.find(l => l.id === langId);
    setLanguage(langId);
    setCode(selected.defaultCode);
    setOutput('');
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Compiling and running...');
    
    // Simulating execution for demo purposes as real back-end compilation requires an external API or Docker
    setTimeout(() => {
      if (language === 'javascript') {
        try {
          // Capture console.log
          let logs = [];
          const originalLog = console.log;
          console.log = (msg) => logs.push(msg);
          
          eval(code);
          
          console.log = originalLog;
          setOutput(logs.join('\n') || 'Program executed successfully (no output).');
        } catch (err) {
          setOutput(`Error: ${err.message}`);
        }
      } else {
        setOutput(`Success: Output for ${language.toUpperCase()} execution environment simulation.\n\n[SIMULATED OUTPUT]\nHello from the ${language} compiler!\n\nProcess finished with exit code 0`);
      }
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .editor-textarea {
          width: 100%;
          height: 400px;
          background: #0f172a;
          color: #94a3b8;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 14px;
          padding: 20px;
          border: 1px solid #334155;
          border-radius: 0 0 12px 12px;
          resize: none;
          outline: none;
          line-height: 1.6;
        }
        .editor-textarea:focus {
          border-color: #6366f1;
          color: #e2e8f0;
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Online Compiler</h2>
          <p style={{ color: '#94a3b8' }}>Practice coding across multiple languages in a real-time environment.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: '10px', background: '#1e293b',
              border: '1px solid #334155', color: '#e2e8f0', cursor: 'pointer', outline: 'none'
            }}
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.icon} {lang.name}</option>
            ))}
          </select>
          
          <button 
            onClick={runCode}
            disabled={isRunning}
            style={{
              padding: '10px 24px', borderRadius: '10px', border: 'none',
              background: isRunning ? '#334155' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontWeight: '700', cursor: isRunning ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            {isRunning ? '⏳ Running...' : '🚀 Run Code'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
        {/* Editor Area */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
          <div style={{ background: '#1e293b', padding: '12px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Main.{language === 'cpp' ? 'cpp' : (language === 'javascript' ? 'js' : (language === 'python' ? 'py' : language))}</span>
          </div>
          <textarea 
            className="editor-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Output Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ flex: 1, background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#1e293b', padding: '12px 20px', borderBottom: '1px solid #334155', fontSize: '13px', fontWeight: '700', color: '#94a3b8' }}>
              TERMINAL OUTPUT
            </div>
            <div style={{ flex: 1, padding: '16px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '13px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
              {output || '> Waiting for code execution...'}
            </div>
          </div>
          
          <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>Practice Tip 💡</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>
              Use the compiler to test logic for your DSA questions. Try implementing a Quick Sort or a Linked List from scratch!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
