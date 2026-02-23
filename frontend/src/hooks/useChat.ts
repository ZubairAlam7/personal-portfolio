import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendChatMessage } from '../services/api';
import type { ChatMessage } from '../types';

export const useChat = () => {
    const sessionId = useRef<string>(uuidv4());
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: uuidv4(),
            role: 'assistant',
            content: "Hi! I'm Zubair's AI assistant. Ask me anything about his skills, projects, or experience! 👋",
            timestamp: new Date(),
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || loading) return;

        const userMsg: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev: ChatMessage[]) => [...prev, userMsg]);
        setLoading(true);
        setError(null);

        try {
            const data = await sendChatMessage(text.trim(), sessionId.current);
            const assistantMsg: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: data.reply,
                timestamp: new Date(),
            };
            setMessages((prev: ChatMessage[]) => [...prev, assistantMsg]);
        } catch (err: unknown) {
            let msg = 'Failed to get response. Make sure the backend is running.';
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as { response?: { data?: { detail?: string } } };
                if (axiosErr.response?.data?.detail) {
                    msg = axiosErr.response.data.detail;
                }
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    return { messages, loading, error, sendMessage };
};
