import React, { useRef, useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15; // Divide by 15 to soften the effect
    const y = (e.clientY - top - height / 2) / 15;

    // Rotate Y based on X mouse position, Rotate X based on Y mouse position
    setTransformStyle(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    // Reset to original position smoothly
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div className="card-wrapper">
      <div
        className="project-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
      >
        <div className="card-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
          <a href={project.link} className="view-btn">View Project</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;