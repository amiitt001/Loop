import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Trophy, Globe } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminCreateContestant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        platformHandle: '',
        points: 0,
        contestName: '' // Optional context
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "contestants"), {
                ...formData,
                points: Number(formData.points),
                createdAt: new Date()
            });
            alert("Contestant Added Successfully!");
            navigate('/admin/contestants');
        } catch (error) {
            console.error("Error adding contestant: ", error);
            alert("Error adding contestant: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/contestants')}
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
                <ArrowLeft size={18} /> Back to Contestants
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#fff' }}>Add New Contestant</h1>

            <form onSubmit={handleSubmit} style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                {/* Name */}
                <div className="form-group">
                    <label style={labelStyle}><User size={14} /> Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Alex Smith"
                        style={inputStyle}
                    />
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                    {/* Handle */}
                    <div className="form-group">
                        <label style={labelStyle}><Globe size={14} /> Platform Handle (ID)</label>
                        <input
                            type="text"
                            name="platformHandle"
                            value={formData.platformHandle}
                            onChange={handleChange}
                            required
                            placeholder="e.g. alex_code"
                            style={inputStyle}
                        />
                    </div>

                    {/* Points */}
                    <div className="form-group">
                        <label style={labelStyle}><Trophy size={14} /> Points / Score</label>
                        <input
                            type="number"
                            name="points"
                            value={formData.points}
                            onChange={handleChange}
                            required
                            min="0"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Contest Context (Optional) */}
                <div className="form-group">
                    <label style={labelStyle}>Contest Name (Optional)</label>
                    <input
                        type="text"
                        name="contestName"
                        value={formData.contestName}
                        onChange={handleChange}
                        placeholder="e.g. Winter Hackathon 2026"
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
                        {loading ? 'Adding...' : 'Add Contestant'}
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

export default AdminCreateContestant;
