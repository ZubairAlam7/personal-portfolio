import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map((n) => n.href.replace('#', ''));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container">
                <a href="#hero" className="navbar__logo">
                    <span className="navbar__logo-bracket">&lt;</span>
                    ZA
                    <span className="navbar__logo-bracket">/&gt;</span>
                </a>

                {/* Desktop nav */}
                <ul className="navbar__links">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={`navbar__link ${activeSection === item.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="mailto:zubairalam9048@gmail.com" className="btn btn-primary navbar__cta">
                    Hire Me
                </a>

                {/* Mobile toggle */}
                <button
                    className="navbar__toggle"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="navbar__mobile">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="navbar__mobile-link"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a href="mailto:zubairalam9048@gmail.com" className="btn btn-primary">
                        Hire Me
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
