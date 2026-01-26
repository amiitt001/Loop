import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '16px',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 0 40px rgba(0,0,0,0.8)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        background: 'rgba(0, 243, 255, 0.1)',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        border: '1px solid rgba(0, 243, 255, 0.2)'
                    }}>
                        <Lock size={32} color="var(--accent)" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Admin Access</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Secure gateway for authorized personnel.</p>
                </div>

                {error && <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                background: '#111',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = '#333'}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                background: '#111',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = '#333'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '1rem',
                            padding: '0.8rem',
                            background: 'var(--accent)',
                            color: '#000',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            fontSize: '1rem'
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Initialize Session'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
