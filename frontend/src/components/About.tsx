import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Code2, Heart } from 'lucide-react';
import { getProfile } from '../services/api';
import type { Profile } from '../types';

const About: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        getProfile().then(setProfile).catch(() => { });
    }, []);

    const bio = profile?.bio ?? '';
    const location = profile?.location ?? '';
    const email = profile?.email ?? '';

    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="section-header">
                    <div className="badge"><Code2 size={12} /> About Me</div>
                    <h2 className="section-title">Who Am I?</h2>
                    <p className="section-subtitle">
                        A bit more about my background, values, and what drives me.
                    </p>
                </div>

                <div className="about__grid">
                    <div className="about__text">
                        <p className="about__bio">{bio}</p>
                        <p className="about__secondary">
                            When I'm not writing code, you'll find me exploring new technologies,
                            contributing to open source, or leveling up in gaming. I believe great
                            software is built at the intersection of technical excellence and human empathy.
                        </p>

                        <div className="about__meta">
                            {location && (
                                <div className="about__meta-item">
                                    <MapPin size={16} className="about__meta-icon" />
                                    <span>{location}</span>
                                </div>
                            )}
                            {email && (
                                <div className="about__meta-item">
                                    <Mail size={16} className="about__meta-icon" />
                                    <a href={`mailto:${email}`} className="about__meta-link">{email}</a>
                                </div>
                            )}
                            {profile?.phone && (
                                <div className="about__meta-item">
                                    <Phone size={16} className="about__meta-icon" />
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                        </div>

                        {profile?.interests && profile.interests.length > 0 && (
                            <div className="about__interests">
                                <p className="about__interests-label">
                                    <Heart size={14} /> Interests
                                </p>
                                <div className="about__tags">
                                    {profile.interests.map((i) => (
                                        <span key={i} className="tag">{i}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="about__stats">
                        <div className="about__stat-card">
                            <span className="about__stat-number">0+</span>
                            <span className="about__stat-label">Years Experience</span>
                        </div>
                        <div className="about__stat-card">
                            <span className="about__stat-number">3+</span>
                            <span className="about__stat-label">Projects Built</span>
                        </div>
                        <div className="about__stat-card">
                            <span className="about__stat-number">10+</span>
                            <span className="about__stat-label">Technologies</span>
                        </div>
                        <div className="about__stat-card">
                            <span className="about__stat-number">100%</span>
                            <span className="about__stat-label">Passion</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
