import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, MapPin, User, FileText, Globe } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminCreateEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        speaker: '',
        description: '',
        registrationLink: '',
        status: 'Upcoming'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "events"), {
                ...formData,
                date: new Date(formData.date), // Convert string to Date
                registrationOpen: formData.status === 'Upcoming',
                createdAt: new Date()
            });
            alert("Event Created Successfully!");
            navigate('/admin/events');
        } catch (error) {
            console.error("Error creating event: ", error);
            alert("Error creating event: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/events')}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a1a1aa',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}>
                <ArrowLeft size={18} /> Back to Events
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#fff' }}>Create New Event</h1>

            <form onSubmit={handleSubmit} style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                {/* Title */}
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. AI Workshop 2026"
                        style={inputStyle}
                    />
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                    {/* Date */}
                    <div className="form-group">
                        <label style={labelStyle}><Calendar size={14} /> Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    {/* Time */}
                    <div className="form-group">
                        <label style={labelStyle}><Clock size={14} /> Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    {/* Location */}
                    <div className="form-group">
                        <label style={labelStyle}><MapPin size={14} /> Venue / Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Main Auditorium"
                            style={inputStyle}
                        />
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label style={labelStyle}>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Active">Active (Live)</option>
                            <option value="Past">Past</option>
                        </select>
                    </div>
                </div>

                {/* Speaker */}
                <div className="form-group">
                    <label style={labelStyle}><User size={14} /> Speaker (Optional)</label>
                    <input
                        type="text"
                        name="speaker"
                        value={formData.speaker}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Jane Doe"
                        style={inputStyle}
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label style={labelStyle}><FileText size={14} /> Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Project detailed agenda, prerequisites, etc."
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />
                </div>

                {/* Registration Link (External) */}
                <div className="form-group">
                    <label style={labelStyle}><Globe size={14} /> External Registration Link (Optional)</label>
                    <input
                        type="url"
                        name="registrationLink"
                        value={formData.registrationLink}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={inputStyle}
                    />
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--neon-cyan)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.8rem 2rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        <Save size={18} />
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: '#a1a1aa',
    fontSize: '0.9rem'
};

const inputStyle = {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '0.8rem 1rem',
    color: '#fff',
    outline: 'none',
    fontSize: '0.95rem'
};

export default AdminCreateEvent;
