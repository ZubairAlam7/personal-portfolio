import React, { useEffect, useState } from 'react';
import { FolderGit2, ExternalLink, Github, Star } from 'lucide-react';
import { getProjects } from '../services/api';
import type { Project } from '../types';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        getProjects().then(setProjects).catch(() => { });
    }, []);

    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);
    const visible = showAll ? [...featured, ...others] : featured;

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-header">
                    <div className="badge"><FolderGit2 size={12} /> Portfolio</div>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        These projects were built as part of my college curriculum,
                        showcasing hands-on experience in Java and web application development.
                    </p>
                </div>

                <div className="projects__grid">
                    {visible.map((project) => (
                        <div key={project.id} className="project-card card">
                            {project.featured && (
                                <div className="project-card__featured">
                                    <Star size={12} fill="currentColor" /> Featured
                                </div>
                            )}

                            <h3 className="project-card__name">{project.name}</h3>
                            <p className="project-card__desc">{project.description}</p>

                            <div className="project-card__tags">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="tag">{tech}</span>
                                ))}
                            </div>

                            <div className="project-card__links">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-card__link"
                                    >
                                        <Github size={15} /> Code
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-card__link project-card__link--live"
                                    >
                                        <ExternalLink size={15} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {others.length > 0 && (
                    <div className="projects__more">
                        <button
                            className="btn btn-outline"
                            onClick={() => setShowAll((v) => !v)}
                        >
                            {showAll ? 'Show Less' : `Show All Projects (${others.length} more)`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
