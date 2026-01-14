import React from 'react';
import { Send } from 'lucide-react';

const Join = () => {
    return (
        <div className="container" style={{ padding: '8rem 0 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
                <h1 className="text-neon-cyan" style={{ fontSize: '3rem', marginBottom: '1rem' }}>JOIN THE SQUAD</h1>
                <p style={{ color: 'var(--text-dim)', maxWidth: '500px' }}>
                    Ready to build the future? Fill out the form below to apply for membership.
                </p>
            </div>

            <form style={{
                width: '100%',
                maxWidth: '500px',
                background: 'var(--bg-card)',
                padding: '3rem',
                borderRadius: '16px',
                border: '1px solid var(--border-dim)'
            }} className="animate-fade-in form-glow">

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" className="input-field" placeholder="John Doe" />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>College Email</label>
                    <input type="email" className="input-field" placeholder="john@college.edu" />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Domain Interest</label>
                    <select className="input-field">
                        <option>Full Stack Development</option>
                        <option>AI / ML</option>
                        <option>Cybersecurity</option>
                        <option>Cloud / DevOps</option>
                        <option>UI / UX Design</option>
                    </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Why do you want to join?</label>
                    <textarea className="input-field" rows="4" placeholder="Tell us about your passion..."></textarea>
                </div>

                <button type="button" className="submit-btn">
                    SUBMIT APPLICATION <Send size={18} />
                </button>

            </form>

            <style>{`
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          padding: 1rem;
          border-radius: 8px;
          color: #fff;
          font-family: var(--font-main);
          outline: none;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          border-color: var(--neon-cyan);
          background: rgba(0, 243, 255, 0.05);
        }

        .submit-btn {
          width: 100%;
          background: var(--neon-cyan);
          color: #000;
          font-weight: bold;
          font-family: var(--font-display);
          padding: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
          transform: translateY(-2px);
        }
      `}</style>
        </div>
    );
};

export default Join;
