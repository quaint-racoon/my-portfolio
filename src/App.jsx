import React from 'react';
import ProjectCard from './ProjectCard';
import './App.css';

const projects = [
  {
    title: 'E-Commerce App',
    description: 'A fully responsive storefront built with React and CSS Grid.',
    tags: ['React', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather data visualization using a public API.',
    tags: ['HTML', 'JS', 'API'],
    link: '#',
  },
  {
    title: 'Task Manager',
    description: 'A drag-and-drop Kanban board for organizing daily tasks.',
    tags: ['React', 'HTML', 'CSS'],
    link: '#',
  }
];

function App() {
  return (
    <div className="app-container">
      <header className="hero">
        <h1>Hi, I'm a <span className="highlight">Frontend Developer</span></h1>
        <p>I build interactive, responsive, and cool web experiences.</p>
      </header>

      <section className="projects-section">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      <footer className="contact">
        <h2>Let's Connect</h2>
        <p>Check out my work or get in touch!</p>
        <div className="links">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:your.email@example.com">Email</a>
        </div>
      </footer>
    </div>
  );
}

export default App;