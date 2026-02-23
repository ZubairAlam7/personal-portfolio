import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, AlertCircle, Minimize2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const { messages, loading, error, sendMessage } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const SUGGESTED_QUESTIONS = [
        "What are your top skills?",
        "Tell me about your projects",
        "What's your work experience?",
        "Where did you study?",
    ];

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim() || loading) return;
        sendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleSuggestion = (q: string) => {
        sendMessage(q);
    };

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            {/* Chat panel */}
            <div className={`chat-widget ${isOpen ? 'chat-widget--open' : ''}`}>
                {/* Header */}
                <div className="chat-widget__header">
                    <div className="chat-widget__header-info">
                        <div className="chat-widget__avatar">
                            <Bot size={18} />
                            <span className="chat-widget__status-dot" />
                        </div>
                        <div>
                            <p className="chat-widget__name">AI Assistant</p>
                            <p className="chat-widget__tagline">Ask me about Zubair</p>
                        </div>
                    </div>
                    <button
                        className="chat-widget__close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        <Minimize2 size={16} />
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-widget__messages">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-msg ${msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--assistant'}`}
                        >
                            <div className="chat-msg__icon">
                                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                            </div>
                            <div>
                                <div className="chat-msg__bubble">{msg.content}</div>
                                <p className="chat-msg__time">{formatTime(msg.timestamp)}</p>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div className="chat-msg chat-msg--assistant">
                            <div className="chat-msg__icon"><Bot size={14} /></div>
                            <div className="chat-msg__bubble chat-msg__bubble--typing">
                                <span className="typing-dot" />
                                <span className="typing-dot" />
                                <span className="typing-dot" />
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="chat-error">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested questions (show only when few messages) */}
                {messages.length <= 1 && (
                    <div className="chat-widget__suggestions">
                        {SUGGESTED_QUESTIONS.map((q) => (
                            <button
                                key={q}
                                className="chat-widget__suggestion"
                                onClick={() => handleSuggestion(q)}
                                disabled={loading}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chat-widget__input-row">
                    <input
                        ref={inputRef}
                        className="chat-widget__input"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <button
                        className="chat-widget__send"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        aria-label="Send message"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                className={`chat-toggle ${isOpen ? 'chat-toggle--open' : ''}`}
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle AI chat"
            >
                {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
                {!isOpen && <span className="chat-toggle__label">Chat with AI</span>}
            </button>
        </>
    );
};

export default ChatWidget;
