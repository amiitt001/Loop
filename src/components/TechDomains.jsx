import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Smartphone, Cloud, Database } from 'lucide-react';

const DOMAINS = [
    { id: 1, title: 'Web Development', icon: <Globe size={40} />, color: 'var(--accent)', desc: 'Building modern, sculpted experiences using React, Next.js, and WebGL.' },
    { id: 2, title: 'AI & Machine Learning', icon: <Cpu size={40} />, color: 'var(--accent)', desc: 'Training models, neural networks, and deploying intelligent agents.' },
    { id: 3, title: 'App Development', icon: <Smartphone size={40} />, color: 'var(--accent)', desc: 'Cross-platform mobile apps with Flutter and React Native.' },
    { id: 4, title: 'Cloud & DevOps', icon: <Cloud size={40} />, color: '#ff0055', desc: 'Scalable infrastructure, CI/CD pipelines, and containerization.' },
    { id: 5, title: 'Blockchain', icon: <Database size={40} />, color: '#ffd700', desc: 'Smart contracts, DApps, and decentralized systems architecture.' },
];

const TechDomains = () => {
    return (
        <div style={{ padding: '6rem 0', background: 'var(--bg-dark)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>WHAT WE <span style={{ color: 'var(--accent)' }}>BUILD</span></h2>
                    <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>
                        We dive deep into diverse technical domains. No hello worlds here—only production-grade code.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {DOMAINS.map((domain, i) => (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{
                                y: -10,
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                boxShadow: `0 0 20px -5px ${domain.color}`
                            }}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-dim)',
                                padding: '2rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                cursor: 'default',
                                transition: 'border-color 0.3s'
                            }}
                        >
                            <div style={{
                                marginBottom: '1.5rem',
                                color: domain.color,
                                display: 'inline-block',
                                padding: '1rem',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.03)'
                            }}>
                                {domain.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>{domain.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: '1.5' }}>{domain.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechDomains;
