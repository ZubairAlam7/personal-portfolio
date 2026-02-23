import axios, { AxiosResponse } from 'axios';
import type { Profile, Skill, Project, Experience, Education } from '../types';

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Chat response interface
interface ChatResponse {
    reply: string;
    session_id: string;
}

// Portfolio endpoints
export const getProfile = (): Promise<Profile> =>
    api.get<Profile>('/portfolio/profile').then((r: AxiosResponse<Profile>) => r.data);

export const getSkills = (): Promise<Skill[]> =>
    api.get<Skill[]>('/portfolio/skills').then((r: AxiosResponse<Skill[]>) => r.data);

export const getProjects = (): Promise<Project[]> =>
    api.get<Project[]>('/portfolio/projects').then((r: AxiosResponse<Project[]>) => r.data);

export const getExperience = (): Promise<Experience[]> =>
    api.get<Experience[]>('/portfolio/experience').then((r: AxiosResponse<Experience[]>) => r.data);

export const getEducation = (): Promise<Education[]> =>
    api.get<Education[]>('/portfolio/education').then((r: AxiosResponse<Education[]>) => r.data);

// Chat endpoint
export const sendChatMessage = (
    message: string,
    sessionId: string
): Promise<ChatResponse> =>
    api.post<ChatResponse>('/chat', { message, session_id: sessionId }).then(
        (r: AxiosResponse<ChatResponse>) => r.data
    );
