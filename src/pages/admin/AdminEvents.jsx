import React from 'react';
import { Plus, Calendar, Clock, MoreVertical } from 'lucide-react';

const AdminEvents = () => {
    // Mock data
    const events = [
        { id: 1, title: 'HackNova 2026', date: 'March 15, 2026', status: 'Upcoming' },
        { id: 2, title: 'AI Workshop', date: 'Feb 20, 2026', status: 'Active' },
        { id: 3, title: 'Intro to Web3', date: 'Jan 10, 2026', status: 'Past' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Events</h1>
                <button style={{
                    background: 'var(--neon-violet)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                }}>
                    <Plus size={18} /> Create Event
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {events.map((event) => (
                    <div key={event.id} style={{
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        position: 'relative'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                            alignItems: 'start'
                        }}>
                            <span style={{
                                fontSize: '0.75rem',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '20px',
                                background: event.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : event.status === 'Upcoming' ? 'rgba(0, 243, 255, 0.1)' : '#27272a',
                                color: event.status === 'Active' ? '#22c55e' : event.status === 'Upcoming' ? 'var(--neon-cyan)' : '#71717a',
                                border: `1px solid ${event.status === 'Active' ? '#22c55e' : event.status === 'Upcoming' ? 'var(--neon-cyan)' : '#3f3f46'}`
                            }}>
                                {event.status}
                            </span>
                            <button style={{ background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}>
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{event.title}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={16} /> {event.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={16} /> 10:00 AM - 4:00 PM
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button style={{
                                background: '#27272a',
                                color: '#fff',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}>Edit</button>
                            <button style={{
                                background: 'rgba(0, 243, 255, 0.1)',
                                color: 'var(--neon-cyan)',
                                border: '1px solid rgba(0, 243, 255, 0.2)',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}>Manage</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEvents;
