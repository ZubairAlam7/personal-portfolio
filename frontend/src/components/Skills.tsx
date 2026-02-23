import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { getSkills } from '../services/api';
import type { Skill } from '../types';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Tools'];

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        getSkills().then(setSkills).catch(() => { });
    }, []);

    const categories = ['All', ...CATEGORY_ORDER];
    const filtered =
        activeCategory === 'All'
            ? skills
            : skills.filter((s) => s.category === activeCategory);

    // Group for bar display
    const grouped: Record<string, Skill[]> = {};
    filtered.forEach((s) => {
        grouped[s.category] = grouped[s.category] ? [...grouped[s.category], s] : [s];
    });

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-header">
                    <div className="badge"><Zap size={12} /> Skills</div>
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with every day.
                    </p>
                </div>

                {/* Category filter */}
                <div className="skills__filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`skills__filter-btn ${activeCategory === cat ? 'skills__filter-btn--active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skill groups */}
                <div className="skills__groups">
                    {Object.entries(grouped).map(([cat, catSkills]) => (
                        <div key={cat} className="skills__group card">
                            <h3 className="skills__group-title">{cat}</h3>
                            <div className="skills__list">
                                {catSkills.map((skill) => (
                                    <div key={skill.name} className="skill-item">
                                        <div className="skill-item__header">
                                            <span className="skill-item__name">{skill.name}</span>
                                            <span className="skill-item__level">{skill.level}%</span>
                                        </div>
                                        <div className="skill-item__bar-bg">
                                            <div
                                                className="skill-item__bar-fill"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
