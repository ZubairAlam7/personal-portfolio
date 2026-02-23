import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const TYPING_TITLES = [
    'Full Stack Developer',
    'React & TypeScript Expert',
    'Python Backend Engineer',
    'Open Source Enthusiast',
];

const Hero: React.FC = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = TYPING_TITLES[titleIndex];
        const speed = isDeleting ? 50 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(current.slice(0, displayText.length + 1));
                if (displayText.length === current.length) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
            } else {
                setDisplayText(current.slice(0, displayText.length - 1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setTitleIndex((i) => (i + 1) % TYPING_TITLES.length);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, titleIndex]);

    return (
        <section id="hero" className="hero">
            <div className="hero__content">
                <div className="badge">
                    <Sparkles size={12} />
                    Available for hire
                </div>

                <h1 className="hero__name">
                    Hi, I'm <span className="hero__name-accent">Zubair Alam</span>
                </h1>

                <p className="hero__title">
                    <span className="hero__typing">{displayText}</span>
                    <span className="hero__cursor">|</span>
                </p>

                <p className="hero__bio">
                    I build beautiful, scalable web applications that solve real problems.
                    Passionate about clean code, great UX, and the power of AI.
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="btn btn-primary">
                        View My Work <ArrowDown size={16} />
                    </a>
                    <a href="#contact" className="btn btn-outline">
                        Get In Touch
                    </a>
                </div>

                <div className="hero__socials">
                    <a
                        href="https://github.com/zubairalam7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__social-link"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/zubairalam1123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__social-link"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:zubairalam9048@gmail.com"
                        className="hero__social-link"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>

            <div className="hero__visual">
                <div className="hero__avatar-ring">
                    <div className="hero__avatar">
                        <img
                            src="https://avatars.githubusercontent.com/u/145364795?v=4"
                            alt="Zubair Alam"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                </div>
                <div className="hero__orbit hero__orbit--1">
                    <div className="hero__orbit-dot" />
                </div>
                <div className="hero__orbit hero__orbit--2">
                    <div className="hero__orbit-dot hero__orbit-dot--2" />
                </div>
                <div className="hero__code-snippet">
                    <span className="code-keyword">const</span>{' '}
                    <span className="code-var">developer</span>{' '}
                    <span className="code-op">=</span>{' '}
                    <span className="code-string">"Zubair Alam"</span>
                    <span className="code-op">;</span>
                </div>
            </div>

            <a href="#about" className="hero__scroll-hint" aria-label="Scroll down">
                <div className="hero__scroll-dot" />
            </a>
        </section>
    );
};

export default Hero;
