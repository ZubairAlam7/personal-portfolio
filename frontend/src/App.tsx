import './index.css';
import './components.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

function App() {
    return (
        <>
            {/* Background decorations */}
            <div className="bg-grid" />
            <div className="bg-blur bg-blur-1" />
            <div className="bg-blur bg-blur-2" />
            <div className="bg-blur bg-blur-3" />

            {/* App */}
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>

            {/* AI Chat Widget — always visible */}
            <ChatWidget />
        </>
    );
}

export default App;
