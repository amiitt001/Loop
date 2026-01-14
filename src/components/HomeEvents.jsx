import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeEvents = () => {
    return (
        <div style={{ padding: '6rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-dim)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>UPCOMING <span style={{ color: 'var(--neon-green)' }}>EVENTS</span></h2>
                        <p style={{ color: 'var(--text-dim)' }}>Join the action. Learn, compete, win.</p>
                    </div>
                    <Link to="/events" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-green)', fontWeight: 'bold' }}>
                        VIEW ALL <ArrowRight size={18} />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Main Featured Event */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,243,255,0.1), rgba(0,0,0,0))',
                            border: '1px solid var(--neon-cyan)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{
                            display: 'inline-block',
                            background: 'var(--neon-cyan)',
                            color: '#000',
                            fontWeight: 'bold',
                            padding: '0.2rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            marginBottom: '1rem',
                            width: 'fit-content'
                        }}>
                            FEATURED
                        </div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(0,243,255,0.3)' }}>Technova Hackathon 2026</h3>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', flex: 1 }}>
                            Our flagship 24-hour coding marathon. 50+ teams. $5000 prize pool.
                            Build the future with us.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: '#fff', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} color="var(--neon-cyan)" /> March 15</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} color="var(--neon-cyan)" /> 24 Hours</div>
                        </div>
                        <Link to="/events">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--neon-cyan)',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                REGISTER NOW
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Secondary Events List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { title: 'AI Workshop: Neons', date: 'Feb 28', type: 'Workshop' },
                            { title: 'CyberSec CTF Qualifiers', date: 'Jan 20', type: 'Competition' },
                            { title: 'Open Source Meetup', date: 'Jan 10', type: 'Community' }
                        ].map((evt, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-dim)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{evt.title}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{evt.type} • {evt.date}</span>
                                </div>
                                <ArrowRight size={20} color="var(--border-dim)" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEvents;
