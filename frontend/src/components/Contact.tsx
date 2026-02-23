import React from 'react';
import { Mail, Github, Linkedin, MapPin, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-header">
                    <div className="badge"><MessageSquare size={12} /> Contact</div>
                    <h2 className="section-title">Let's Work Together</h2>
                    <p className="section-subtitle">
                        I am looking for internship or full-time opportunities to apply my technical skills.
                    </p>
                </div>

                <div className="contact__grid">
                    <div className="contact__info card">
                        <h3 className="contact__info-title">Get In Touch</h3>
                        <p className="contact__info-text">
                            MCA final-year student at New Horizon College of Engineering, actively
                            seeking internship or full-time opportunities to apply my technical skills.
                        </p>

                        <div className="contact__links">
                            <a href="mailto:zubairalam9048@gmail.com" className="contact__link">
                                <div className="contact__link-icon">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="contact__link-label">Email</p>
                                    <p className="contact__link-value">zubairalam9048@gmail.com</p>
                                </div>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/zubairalam1123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__link"
                            >
                                <div className="contact__link-icon contact__link-icon--linkedin">
                                    <Linkedin size={20} />
                                </div>
                                <div>
                                    <p className="contact__link-label">LinkedIn</p>
                                    <p className="contact__link-value">Zubair Alam</p>
                                </div>
                            </a>

                            <a
                                href="https://github.com/zubairalam7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__link"
                            >
                                <div className="contact__link-icon contact__link-icon--github">
                                    <Github size={20} />
                                </div>
                                <div>
                                    <p className="contact__link-label">GitHub</p>
                                    <p className="contact__link-value">Zubair Alam</p>
                                </div>
                            </a>

                            <div className="contact__link">
                                <div className="contact__link-icon contact__link-icon--location">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="contact__link-label">Location</p>
                                    <p className="contact__link-value">Bengaluru, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact__cta card">
                        <div className="contact__cta-icon">💬</div>
                        <h3 className="contact__cta-title">Chat With My AI</h3>
                        <p className="contact__cta-text">
                            Can't wait to connect? Use the AI assistant in the bottom-right corner
                            to instantly learn about my skills, projects, and experience!
                        </p>
                        <div className="contact__cta-hint">
                            <span>Try asking:</span>
                            <em>"What are your top skills?"</em>
                            <em>"Tell me about your projects"</em>
                            <em>"What's your work experience?"</em>
                        </div>
                    </div>
                </div>

                <div className="contact__footer">
                    <p>Designed & built with ❤️ by <strong>Zubair Alam</strong></p>
                    <p className="contact__footer-stack">React · TypeScript · Python · FastAPI · SQLite </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
