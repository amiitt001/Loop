import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Network, Code, ArrowRight } from 'lucide-react';

const SYSTEM_MODULES = [
    {
        id: '01',
        title: 'HACKATHONS',
        icon: <Terminal size={24} />,
        desc: 'High-intensity engineering marathons. We build 48-hour prototypes that solve real problems.',
        color: 'var(--neon-cyan)'
    },
    {
        id: '02',
        title: 'R&D PROJECTS',
        icon: <Cpu size={24} />,
        desc: 'Experimental labs for AI, IoT, and Blockchain. Turning theoretical concepts into deployable code.',
        color: 'var(--neon-violet)'
    },
    {
        id: '03',
        title: 'WORKSHOPS',
        icon: <Network size={24} />,
        desc: 'Peer-to-peer knowledge transfer. Senior devs training the next generation of architects.',
        color: 'var(--neon-green)'
    },
    {
        id: '04',
        title: 'OPEN SOURCE',
        icon: <Code size={24} />,
        desc: 'Contributing to the global ecosystem. We maintain libraries and tools used by developers worldwide.',
        color: '#ff0055' // A new accent for variety, or could reuse neon-cyan
    }
];

const HomeAbout = () => {
    return (
        <section style={{
            padding: '8rem 0',
            background: '#030303',
            position: 'relative',
            borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
            {/* Background Tech Grid */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.3,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.5fr',
                    gap: '4rem',
                    alignItems: 'start'
                }} className="about-grid">

                    {/* Left Column: Mission Statement */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '2px', background: 'var(--neon-cyan)' }}></div>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', letterSpacing: '2px', fontSize: '0.9rem' }}>SYSTEM: ONLINE</span>
                        </div>

                        <h2 style={{
                            fontSize: '3.5rem',
                            lineHeight: '1.1',
                            marginBottom: '2rem',
                            fontWeight: '900',
                            textTransform: 'uppercase'
                        }}>
                            THE <span style={{ color: 'transparent', WebkitTextStroke: '1px #fff' }}>TECH NOVA</span><br />
                            SYSTEM
                        </h2>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-dim)',
                            lineHeight: '1.8',
                            marginBottom: '2rem',
                            maxWidth: '500px',
                            fontFamily: 'var(--font-main)'
                        }}>
                            We are not just a club; we are an engineering collective.
                            Our mission is to deconstruct complex problems and reassemble them into elegant solutions.
                            Built by students, for the future.
                        </p>

                        <button style={{
                            background: 'transparent',
                            border: '1px solid var(--border-dim)',
                            padding: '1rem 2rem',
                            color: '#fff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-dim)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            INITIALIZE PROTOCOLS <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    {/* Right Column: Modules Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {SYSTEM_MODULES.map((mod, i) => (
                            <motion.div
                                key={mod.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-dim)',
                                    padding: '2rem',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                whileHover={{ y: -5, borderColor: mod.color }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '3rem',
                                    opacity: 0.05,
                                    fontWeight: '900'
                                }}>
                                    {mod.id}
                                </div>

                                <div style={{
                                    color: mod.color,
                                    marginBottom: '1.5rem',
                                    display: 'inline-flex',
                                    padding: '10px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '4px'
                                }}>
                                    {mod.icon}
                                </div>

                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', letterSpacing: '1px' }}>{mod.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>{mod.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
};

export default HomeAbout;
