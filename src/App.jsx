import React, { useState, useRef, useEffect } from 'react';
// Import your new JSON file here!
import projectsData from './projects.json'; 
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { 
      command: '', 
      output: 'Welcome to my terminal portfolio. Type "help" to see available commands.' 
    }
  ]);
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

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
          output = 'Hi, I am a Fullstack Developer. I build cool, interactive web experiences using React, HTML, CSS, JS, and Node.js.';
          break;
        case 'projects':
          // We loop through the JSON data here to build the output dynamically
          output = (
            <div>
              {projectsData.map((project, index) => (
                <p key={project.id}>
                  {index + 1}. <a href={project.url} target="_blank" rel="noreferrer">{project.title}</a> - {project.tech}
                </p>
              ))}
            </div>
          );
          break;
        case 'contact':
          output = 'Email: has251429@ju.edu.jo | GitHub: github.com/quaint-racoon';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return; 
        case '':
          output = '';
          break;
        default:
          output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setHistory([...history, { command: cmd, output }]);
      setInput(''); 
    }
  };

  return (
    <div className="terminal-wrapper" onClick={handleTerminalClick}>
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="header-title">guest@portfolio:~</span>
        </div>
        
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
          <div ref={bottomRef} /> 
        </div>
      </div>
    </div>
  );
};

export default App;