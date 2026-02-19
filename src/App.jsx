import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  // History stores what the user typed and what the terminal outputs back
  const [history, setHistory] = useState([
    { 
      command: '', 
      output: 'Welcome to my terminal portfolio. Type "help" to see available commands.' 
    }
  ]);
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll to the bottom whenever a new command is entered
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep the hidden input focused if the user clicks anywhere in the window
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // The logic engine: what happens when you press Enter
  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let output = '';

      switch (cmd) {
        case 'help':
          output = (
            <div>
              <p>Available commands:</p>
              <ul>
                <li><b>about</b>    - Learn more about me</li>
                <li><b>projects</b> - View my recent work</li>
                <li><b>contact</b>  - Get my contact info</li>
                <li><b>clear</b>    - Clear the terminal screen</li>
              </ul>
            </div>
          );
          break;
        case 'about':
          output = 'Hi, I am a Frontend Developer. I build cool, interactive web experiences using React, HTML, CSS, and JS.';
          break;
        case 'projects':
          output = (
            <div>
              <p>1. <a href="https://github.com/yourusername/project1" target="_blank" rel="noreferrer">E-Commerce App</a> - React, CSS Grid</p>
              <p>2. <a href="https://github.com/yourusername/project2" target="_blank" rel="noreferrer">Weather Dashboard</a> - HTML, JS, API</p>
              <p>3. <a href="https://github.com/yourusername/project3" target="_blank" rel="noreferrer">Task Manager</a> - React, Drag-and-Drop</p>
            </div>
          );
          break;
        case 'contact':
          output = 'Email: your.email@example.com | GitHub: github.com/yourusername';
          break;
        case 'clear':
          setHistory([]); // Wipes the screen clean
          setInput('');
          return; 
        case '':
          output = '';
          break;
        default:
          output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      // Add the new command and output to the history log
      setHistory([...history, { command: cmd, output }]);
      setInput(''); // Clear the input line
    }
  };

  return (
    <div className="terminal-wrapper" onClick={handleTerminalClick}>
      <div className="terminal-window">
        {/* The fake window top bar */}
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="header-title">guest@portfolio:~</span>
        </div>
        
        {/* The actual terminal screen */}
        <div className="terminal-body">
          {history.map((line, index) => (
            <div key={index} className="history-line">
              {line.command && (
                <div className="prompt-line">
                  <span className="prompt">guest@portfolio:~$</span> {line.command}
                </div>
              )}
              <div className="output-line">{line.output}</div>
            </div>
          ))}
          
          {/* The active typing line */}
          <div className="input-line">
            <span className="prompt">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          {/* An invisible div we use to anchor the auto-scroll */}
          <div ref={bottomRef} /> 
        </div>
      </div>
    </div>
  );
};

export default App;