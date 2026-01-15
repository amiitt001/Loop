import React, { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, Activity, RefreshCw } from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';

const AdminDashboard = () => {
    const [stats, setStats] = useState([
        { label: 'Total Members', value: '-', icon: Users, color: 'var(--neon-cyan)' },
        { label: 'Upcoming Events', value: '-', icon: Calendar, color: 'var(--neon-violet)' },
        { label: 'Total Events', value: '-', icon: Activity, color: 'var(--neon-green)' },
        { label: 'Top Contestant', value: '-', icon: Trophy, color: '#ff0055' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // 1. Members Listener (Just count)
        const unsubMembers = onSnapshot(collection(db, "members"), (snapshot) => {
            const memberCount = snapshot.size;
            setStats(prev => {
                const newStats = [...prev];
                newStats[0].value = memberCount.toString();
                return newStats;
            });
        });

        // 2. Contestants Listener (For Top Contestant)
        const unsubContestants = onSnapshot(collection(db, "contestants"), (snapshot) => {
            let topContestant = '-';
            if (!snapshot.empty) {
                const contestants = snapshot.docs.map(doc => doc.data());
                contestants.sort((a, b) => (b.points || 0) - (a.points || 0));
                topContestant = contestants[0].name;
            }
            setStats(prev => {
                const newStats = [...prev];
                newStats[3].value = topContestant;
                return newStats;
            });
        });

        // 2. Events Listener
        const unsubEvents = onSnapshot(collection(db, "events"), (snapshot) => {
            const totalEvents = snapshot.size;
            const upcomingCount = snapshot.docs.filter(doc => {
                const data = doc.data();
                // Check if status is NOT 'Past'
                return data.status !== 'Past';
            }).length;

            setStats(prev => {
                const newStats = [...prev];
                newStats[1].value = upcomingCount.toString();
                newStats[2].value = totalEvents.toString();
                return newStats;
            });
            setLoading(false);
        });

        return () => {
            unsubMembers();
            unsubEvents();
            unsubContestants();
        };
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
                {loading && <RefreshCw className="spin" size={20} color="var(--text-dim)" />}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{
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
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={stat.value}>
                                {stat.value}
                            </h3>
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
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
