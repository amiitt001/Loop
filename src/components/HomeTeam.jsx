import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM_PREVIEW = [
    { name: 'Amit', role: 'Club Lead', color: 'var(--neon-cyan)', img: '/amit.jpg' },
    { name: 'Vijay Singh', role: 'Tech Lead', color: 'var(--neon-violet)', img: '/vijay.png' },
    { name: 'Jhanak', role: 'Marketing Lead', color: '#ff0055', img: '/jhanak.jpg' },
    { name: 'Arpita', role: 'Event Lead', color: 'var(--neon-green)', img: '/arpita.jpg' },
];

const HomeTeam = () => {
    return (
        <div style={{ padding: '6rem 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, #050505 100%)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>CORE <span style={{ color: 'var(--text-dim)' }}>TEAM</span></h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    margin: '3rem 0'
                }}>
                    {TEAM_PREVIEW.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            style={{
                                width: '200px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-dim)',
                                borderRadius: '16px',
                                padding: '2rem 1rem',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: '#111',
                                border: `2px solid ${member.color}`,
                                margin: '0 auto 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: member.color,
                                overflow: 'hidden'
                            }}>
                                {member.img ? (
                                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    member.name.charAt(0)
                                )}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: member.color, marginBottom: '1rem' }}>{member.role}</p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <Github size={16} color="var(--text-dim)" style={{ cursor: 'pointer' }} />
                                <Linkedin size={16} color="var(--text-dim)" style={{ cursor: 'pointer' }} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Link to="/team">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-dim)',
                            color: '#fff',
                            padding: '0.8rem 2rem',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        MEET THE FULL SQUAD <ArrowRight size={16} />
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default HomeTeam;
