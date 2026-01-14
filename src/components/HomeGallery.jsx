import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Code, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
    {
        id: 1,
        title: 'Hackathon 2025',
        year: '2025',
        icon: <Code size={40} color="var(--neon-cyan)" />,
        color: 'var(--neon-cyan)',
        desc: '48 hours of non-stop coding.'
    },
    {
        id: 2,
        title: 'Tech Talk: AI',
        year: '2025',
        icon: <Zap size={40} color="var(--neon-violet)" />,
        color: 'var(--neon-violet)',
        desc: 'Exploring the future of LLMs.'
    },
    {
        id: 3,
        title: 'Team Bond',
        year: '2024',
        icon: <Users size={40} color="var(--neon-green)" />,
        color: 'var(--neon-green)',
        desc: 'Weekend getaway & brainstorming.'
    },
    {
        id: 4,
        title: 'Robotics Workshop',
        year: '2024',
        icon: <Camera size={40} color="#ff0055" />,
        color: '#ff0055',
        desc: 'Building autonomous drones.'
    }
];

const HomeGallery = () => {
    return (
        <div style={{ padding: '6rem 0', background: 'var(--bg-dark)', position: 'relative', zIndex: 2 }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>MOMENTS WE BUILD</h2>
                    <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Inside Tech Nova</p>
                </motion.div>

                <div className="gallery-grid">
                    {GALLERY_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="gallery-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <div className="card-icon" style={{ borderColor: item.color }}>
                                {item.icon}
                            </div>
                            <div className="card-content">
                                <span style={{ fontSize: '0.8rem', color: item.color, fontFamily: 'var(--font-mono)' }}>{item.year}</span>
                                <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link to="/events">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--text-dim)',
                                color: '#fff',
                                padding: '0.8rem 2rem',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-main)'
                            }}
                        >
                            VIEW ALL EVENTS
                        </motion.button>
                    </Link>
                </div>
            </div>

            <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 0 1rem;
        }

        .gallery-card {
          background: var(--bg-card);
          border: 1px solid var(--border-dim);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .gallery-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .card-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: rgba(0,0,0,0.3);
          box-shadow: 0 0 30px rgba(0,0,0,0.5);
        }

        .gallery-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default HomeGallery;
