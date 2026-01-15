import React, { useState, useEffect } from 'react';
import { RefreshCw, Search, Check, X, Trash2, Mail, Github, GraduationCap } from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        // Order by date desc
        const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApplications(list);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching applications:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filtered = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this application?")) return;
        try {
            await deleteDoc(doc(db, "applications", id));
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "applications", id), { status: newStatus });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Membership Applications</h1>
                    {loading && <RefreshCw className="spin" size={20} color="var(--neon-violet)" />}
                </div>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            background: '#18181b',
                            border: '1px solid #27272a',
                            borderRadius: '50px',
                            padding: '0.6rem 1rem 0.6rem 2.5rem',
                            color: '#fff',
                            outline: 'none',
                            width: '250px'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {!loading && filtered.length === 0 && <p style={{ color: '#71717a' }}>No applications found.</p>}

                {filtered.map((app) => (
                    <div key={app.id} style={{
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        gap: '1rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Status Stripe */}
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            background: app.status === 'Approved' ? '#22c55e' :
                                app.status === 'Rejected' ? '#ef4444' : 'var(--neon-cyan)'
                        }} />

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{app.name}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '20px',
                                    background: '#27272a',
                                    color: 'var(--neon-violet)',
                                    border: '1px solid #3f3f46'
                                }}>
                                    {app.domain}
                                </span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#71717a'
                                }}>
                                    {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#a1a1aa' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Mail size={14} />
                                    <a href={`mailto:${app.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{app.email}</a>
                                </div>
                                {(app.branch || app.year) && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <GraduationCap size={14} />
                                        <span>{app.branch || 'Unknown'} - {app.year || ''}</span>
                                    </div>
                                )}
                                {app.github && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Github size={14} />
                                        <a href={app.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>GitHub Profile</a>
                                    </div>
                                )}
                            </div>

                            {app.college && (
                                <p style={{ fontSize: '0.85rem', color: '#71717a', marginBottom: '1rem' }}>
                                    {app.college}
                                </p>
                            )}

                            <div style={{ background: '#09090b', padding: '1rem', borderRadius: '8px', color: '#d4d4d8', fontSize: '0.95rem' }}>
                                {app.reason}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {app.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, 'Approved')}
                                        title="Approve"
                                        style={{
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            color: '#22c55e',
                                            border: '1px solid rgba(34, 197, 94, 0.2)',
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}>
                                        <Check size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                                        title="Reject"
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}>
                                        <X size={18} />
                                    </button>
                                </>
                            )}

                            {app.status !== 'Pending' && (
                                <span style={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    color: app.status === 'Approved' ? '#22c55e' : '#ef4444',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    background: app.status === 'Approved' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    marginBottom: '0.5rem'
                                }}>
                                    {app.status}
                                </span>
                            )}

                            <button
                                onClick={() => handleDelete(app.id)}
                                title="Delete"
                                style={{
                                    background: 'transparent',
                                    color: '#71717a',
                                    border: '1px solid #27272a',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminApplications;
