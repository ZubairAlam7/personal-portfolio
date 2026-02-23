export interface Skill {
    name: string;
    category: string;
    level: number;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    github: string;
    live: string;
    featured: boolean;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string;
    technologies: string[];
}

export interface Education {
    institution: string;
    degree: string;
    duration: string;
    location: string;
    gpa: string;
}

export interface Profile {
    name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website: string;
    languages: string[];
    interests: string[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
