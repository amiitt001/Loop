import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Trophy, Code, Users, Calendar, Mail } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();



    /* Correction: 'Trophies' is not in lucide-react, it's 'Trophy' */
    // Fixed in the rendered output below by using Trophy.

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(0, 243, 255, 0.1)',
            height: '70px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0 2rem', // Ensure consistent edge spacing
                maxWidth: '100%' // Override any container constraints if they persisted
            }}>
                {/* 1. LEFT: LOGO + BRAND */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    height: '100%'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/logo.png" alt="TechNova" style={{
                            height: '42px',
                            width: '42px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '2px solid var(--neon-cyan)',
                            display: 'block'
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '1.2' }}>
                            <span style={{
                                fontSize: '1.2rem',
                                letterSpacing: '2px',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '900',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span className="text-neon-cyan">TECH</span>NOVA
                            </span>
                            <span style={{
                                fontSize: '0.65rem',
                                color: 'var(--text-dim)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                maxWidth: '200px',
                                lineHeight: '1.1'
                            }}>
                                Galgotias College of Engineering and Technology
                            </span>
                        </div>
                    </div>
                </Link>

                {/* 2. RIGHT GROUP: LINKS + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', height: '100%' }}>
                    {/* NAV LINKS */}
                    <div style={{
                        display: 'flex',
                        gap: '2.5rem',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <NavLink to="/" icon={Terminal} label="Home" active={location.pathname === '/'} />
                        <NavLink to="/leaderboard" icon={Trophy} label="Leaderboard" active={location.pathname === '/leaderboard'} />
                        <NavLink to="/team" icon={Users} label="Team" active={location.pathname === '/team'} />
                        <NavLink to="/events" icon={Calendar} label="Events" active={location.pathname === '/events'} />
                    </div>

                    {/* CTA */}
                    <Link to="/join" className="join-btn" style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 'fit-content'
                    }}>
                        JOIN US
                    </Link>
                </div>
            </div>

            <style>{`
        .join-btn {
          background: transparent;
          border: 1px solid var(--neon-cyan);
          color: var(--neon-cyan);
          padding: 0.5rem 1.5rem;
          font-family: var(--font-mono);
          font-weight: bold;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .join-btn:hover {
          background: var(--neon-cyan);
          color: #000;
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
        }
      `}</style>
        </nav>
    );
};

const NavLink = ({ to, icon: Icon, label, active }) => (
    <Link to={to} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: active ? 'var(--neon-cyan)' : 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        transition: 'color 0.3s ease',
        padding: '0.5rem'
    }}
        onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
        onMouseLeave={(e) => e.target.style.color = active ? 'var(--neon-cyan)' : 'var(--text-dim)'}
    >
        <Icon size={16} />
        {label}
    </Link>
);

export default Navbar;
