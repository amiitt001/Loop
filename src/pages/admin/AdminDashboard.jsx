import React from 'react';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';

const AdminDashboard = () => {
    // Mock data for now - will be replaced by Firestore data
    const stats = [
        { label: 'Total Members', value: '42', icon: Users, color: 'var(--neon-cyan)' },
        { label: 'Active Events', value: '3', icon: Calendar, color: 'var(--neon-violet)' },
        { label: 'Registrations', value: '156', icon: Activity, color: 'var(--neon-green)' },
        { label: 'Leaderboard', value: 'Active', icon: Trophy, color: '#ff0055' },
    ];

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {stats.map((stat) => (
                    <div key={stat.label} style={{
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: `${stat.color}15`,
                            color: stat.color
                        }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: 1 }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '2rem'
            }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>System Status</h2>
                <div style={{ display: 'flex', gap: '1rem', color: '#a1a1aa', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                        Firestore Connected
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                        Auth Service Online
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
