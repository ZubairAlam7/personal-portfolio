import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { getExperience, getEducation } from '../services/api';
import type { Experience as ExpType, Education } from '../types';

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState<ExpType[]>([]);
    const [education, setEducation] = useState<Education[]>([]);

    useEffect(() => {
        getExperience().then(setExperiences).catch(() => { });
        getEducation().then(setEducation).catch(() => { });
    }, []);

    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-header">
                    <div className="badge"><Briefcase size={12} /> Career</div>
                    <h2 className="section-title">Experience & Education</h2>
                    <p className="section-subtitle">My professional journey so far.</p>
                </div>

                <div className="experience__grid">
                    {/* Work Experience */}
                    <div>
                        <h3 className="experience__col-title">Work Experience</h3>
                        <div className="timeline">
                            {experiences.map((exp, i) => (
                                <div key={exp.id} className={`timeline__item ${i === 0 ? 'timeline__item--current' : ''}`}>
                                    <div className="timeline__dot" />
                                    <div className="timeline__content card">
                                        <div className="timeline__header">
                                            <h4 className="timeline__role">{exp.role}</h4>
                                            {i === 0 && <span className="timeline__current-badge">Current</span>}
                                        </div>
                                        <p className="timeline__company">{exp.company}</p>
                                        <div className="timeline__meta">
                                            <span className="timeline__meta-item">
                                                <Calendar size={13} />{exp.duration}
                                            </span>
                                            <span className="timeline__meta-item">
                                                <MapPin size={13} />{exp.location}
                                            </span>
                                        </div>
                                        <p className="timeline__desc">{exp.description}</p>
                                        <div className="timeline__tags">
                                            {exp.technologies.map((tech) => (
                                                <span key={tech} className="tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="experience__col-title">Education</h3>
                        <div className="timeline">
                            {education.map((edu, i) => (
                                <div key={i} className="timeline__item">
                                    <div className="timeline__dot timeline__dot--edu" />
                                    <div className="timeline__content card">
                                        <h4 className="timeline__role">{edu.degree}</h4>
                                        <p className="timeline__company">{edu.institution}</p>
                                        <div className="timeline__meta">
                                            <span className="timeline__meta-item">
                                                <Calendar size={13} /> {edu.duration}
                                            </span>
                                            <span className="timeline__meta-item">
                                                <MapPin size={13} /> {edu.location}
                                            </span>
                                        </div>
                                        <p className="timeline__desc">GPA: {edu.gpa}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
