import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Tech Nova assistant online. Ask about projects, events, leaderboard, or joining.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Process input (Simulated AI)
        const lowerInput = inputText.toLowerCase();
        let botResponseText = "";

        if (lowerInput.includes('join') || lowerInput.includes('member') || lowerInput.includes('recruit')) {
            botResponseText = "To join Tech Nova, fill out the application form on the 'Join Us' page. We recruit new members at the start of every semester based on technical skills and passion.";
        } else if (lowerInput.includes('leaderboard') || lowerInput.includes('rank') || lowerInput.includes('points')) {
            botResponseText = "Our Leaderboard tracks member contributions. You earn points by committing code, organizing events, and completing challenges. Top 3 members get special recognition!";
        } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('tech')) {
            botResponseText = "We work on cutting-edge projects in AI, Web3, and Mobile Dev. Check out the 'Projects' page to see our latest work like the Neon AI Assistant and Quantum Ledger.";
        } else if (lowerInput.includes('event') || lowerInput.includes('hackathon') || lowerInput.includes('workshop')) {
            botResponseText = "We host monthly hackathons and weekly workshops. The next big event is the 'Technova Hackathon 2026' on March 15th. Check the Events tab for details.";
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            botResponseText = "System online. accessing protocol... Hello! How can I assist you with Tech Nova today?";
        } else {
            botResponseText = "Command not recognized. I can provide info on: Projects, Events, The Leaderboard, or How to Join.";
        }

        // Delay bot response slightly for realism
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponseText, sender: 'bot' }]);
        }, 600);

        setInputText('');
    };

    return (
        <>
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            style={{
                                width: '350px',
                                height: '500px',
                                background: 'rgba(10, 10, 10, 0.95)',
                                backdropFilter: 'blur(16px)',
                                borderRadius: '16px',
                                border: '1px solid var(--neon-cyan)',
                                boxShadow: '0 0 30px rgba(0, 243, 255, 0.15)',
                                marginBottom: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(0, 243, 255, 0.1)',
                                borderBottom: '1px solid rgba(0, 243, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Bot size={18} color="var(--neon-cyan)" />
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '1px' }}>NOVA ASSISTANT</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '80%',
                                            padding: '0.8rem 1rem',
                                            borderRadius: '12px',
                                            background: msg.sender === 'user' ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
                                            color: msg.sender === 'user' ? '#000' : '#fff',
                                            border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                            fontSize: '0.9rem',
                                            borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                            borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px'
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSend} style={{
                                padding: '1rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                gap: '0.5rem'
                            }}>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a command..."
                                    style={{
                                        flex: 1,
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--border-dim)',
                                        borderRadius: '8px',
                                        padding: '0.8rem',
                                        color: '#fff',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.8rem',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--neon-cyan)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-dim)'}
                                />
                                <button type="submit" style={{
                                    background: 'var(--neon-cyan)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    width: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#000'
                                }}>
                                    <Send size={18} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--neon-cyan)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--neon-cyan)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 10px rgba(0, 243, 255, 0.5)',
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                >
                    {isOpen ? <X size={28} color="#000" /> : <MessageSquare size={28} color="#000" />}
                </motion.button>
            </div>
        </>
    );
};

export default Chatbot;
