import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Github, Send } from 'lucide-react';

const HomeContact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setTimeout(() => {
            setIsSent(true);
            setFormState({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div style={{ padding: '6rem 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-dim)' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>

                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ flex: '1 1 300px', maxWidth: '400px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>GET IN <span style={{ color: 'var(--neon-cyan)' }}>TOUCH</span></h2>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
                        Have a project idea? Want to partner for a hackathon?
                        Or just want to geek out about the latest tech? Drop us a line.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#fff' }}>
                        <a href="mailto:loop.gcetclub@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'inherit', textDecoration: 'none' }}>
                            <Mail color="var(--neon-cyan)" /> loop.gcetclub@gmail.com
                        </a>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                        <a href="https://github.com/amiitt001/Loop-Technova" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Github style={{ cursor: 'pointer' }} /></a>
                        <a href="https://www.instagram.com/gcetloop" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Instagram style={{ cursor: 'pointer' }} /></a>
                        <a href="https://www.linkedin.com/company/loop-technova" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Linkedin style={{ cursor: 'pointer' }} /></a>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ flex: '1 1 300px', maxWidth: '500px' }}
                >
                    {!isSent ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-dim)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        outline: 'none'
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--neon-cyan)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-dim)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        outline: 'none'
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--neon-cyan)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="What's on your mind?"
                                    rows="4"
                                    required
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-dim)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--neon-cyan)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-btn" style={{
                                padding: '1rem',
                                background: 'var(--neon-cyan)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}>
                                SEND MESSAGE <Send size={18} />
                            </button>
                        </form>
                    ) : (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            border: '1px solid var(--neon-green)',
                            background: 'rgba(0,255,0,0.05)',
                            borderRadius: '16px',
                            padding: '2rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--neon-green)' }}>Message Sent!</h3>
                            <p style={{ color: 'var(--text-dim)' }}>We'll get back to you shortly.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default HomeContact;
