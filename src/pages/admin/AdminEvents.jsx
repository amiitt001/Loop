import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, MoreVertical, RefreshCw, Trash2, Users } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AdminRegistrationsModal from '../../components/admin/AdminRegistrationsModal';

const AdminEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState(null);

    // Real-time Events Listener
    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "events"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const eventsList = snapshot.docs.map(doc => {
                const data = doc.data();
                const dateDisplay = data.date?.toDate ? data.date.toDate().toLocaleDateString() : data.date;
                return {
                    id: doc.id,
                    ...data,
                    dateDisplay
                };
            });
            // Sort client-side or use orderBy in query if simple. 
            // Sorting by date descending (newest first) usually makes sense.
            // For now, let's keep it simple or sort by date object if available for better order.
            eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));

            setEvents(eventsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching events: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Create Event (Navigation)
    const handleCreate = () => {
        navigate('/admin/events/new');
    };

    // Edit Event
    const handleEdit = async (event) => {
        const title = prompt("Edit Title:", event.title);
        if (title === null) return;
        const dateStr = prompt("Edit Date (YYYY-MM-DD):", event.dateDisplay);
        const status = prompt("Edit Status (Upcoming/Active/Past):", event.status);

        try {
            await updateDoc(doc(db, "events", event.id), {
                title: title || event.title,
                date: dateStr ? new Date(dateStr) : event.date,
                status: status || event.status
            });
        } catch (error) {
            console.error("Error updating event: ", error);
            alert("Error updating event.");
        }
    };

    // Manage Event (Toggle Registration)
    const handleManage = async (event) => {
        const newStatus = !event.registrationOpen;
        if (!window.confirm(`Turn registration ${newStatus ? "ON" : "OFF"} for "${event.title}"?`)) return;

        try {
            await updateDoc(doc(db, "events", event.id), {
                registrationOpen: newStatus
            });
            alert(`Registration is now ${newStatus ? "OPEN" : "CLOSED"}`);
        } catch (error) {
            console.error("Error managing event: ", error);
        }
    };

    // Delete Event
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        try {
            await deleteDoc(doc(db, "events", id));
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Events</h1>
                    {loading && <RefreshCw className="spin" size={20} color="var(--neon-violet)" />}
                </div>
                <button
                    onClick={handleCreate}
                    style={{
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
                {events.length === 0 && !loading && <p style={{ color: '#71717a' }}>No events found.</p>}

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
                            <button
                                onClick={() => handleDelete(event.id)}
                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{event.title}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={16} /> {event.dateDisplay}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={16} /> {event.location || 'TBD'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: event.registrationOpen ? '#22c55e' : '#ef4444' }}>
                                {event.registrationOpen ? "• Registration Open" : "• Registration Closed"}
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(event)}
                                style={{
                                    background: '#27272a',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}>Edit</button>
                            <button
                                onClick={() => handleManage(event)}
                                style={{
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    color: 'var(--neon-cyan)',
                                    border: '1px solid rgba(0, 243, 255, 0.2)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}>Manage</button>
                            <button
                                onClick={() => setSelectedEventForRegistrations(event)}
                                style={{
                                    background: 'rgba(168, 85, 247, 0.1)',
                                    color: 'var(--neon-violet)',
                                    border: '1px solid rgba(168, 85, 247, 0.2)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                <Users size={14} /> View Reg.
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>

            <AdminRegistrationsModal
                event={selectedEventForRegistrations}
                onClose={() => setSelectedEventForRegistrations(null)}
            />
        </div>
    );
};

export default AdminEvents;
