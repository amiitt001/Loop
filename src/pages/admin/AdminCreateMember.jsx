import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Shield, Camera, Github, Linkedin } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminCreateMember = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: 'Member',
        active: true,
        img: '',
        linkedin: '',
        github: ''
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "members"), {
                name: formData.name,
                role: formData.role,
                active: formData.active,
                img: formData.img || '', // Optional photo
                social: { // Nested social links
                    linkedin: formData.linkedin || '',
                    github: formData.github || ''
                },
                createdAt: new Date()
            });
            alert("Member Added Successfully!");
            navigate('/admin/members');
        } catch (error) {
            console.error("Error adding member: ", error);
            alert("Error adding member: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/members')}
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
                <ArrowLeft size={18} /> Back to Members
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#fff' }}>Add New Member</h1>

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
                        placeholder="e.g. John Doe"
                        style={inputStyle}
                    />
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                    {/* Role */}
                    <div className="form-group">
                        <label style={labelStyle}><Shield size={14} /> Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Head">Head</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>


                </div>



                {/* Profile Image */}
                <div className="form-group">
                    <label style={labelStyle}><Camera size={14} /> Profile Photo URL (Optional)</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        placeholder="e.g. https://example.com/photo.jpg"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* LinkedIn */}
                    <div className="form-group">
                        <label style={labelStyle}><Linkedin size={14} /> LinkedIn URL (Optional)</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="e.g. https://linkedin.com/in/johndoe"
                            style={inputStyle}
                        />
                    </div>

                    {/* GitHub */}
                    <div className="form-group">
                        <label style={labelStyle}><Github size={14} /> GitHub URL (Optional)</label>
                        <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="e.g. https://github.com/johndoe"
                            style={inputStyle}
                        />
                    </div>
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
                        {loading ? 'Adding...' : 'Add Member'}
                    </button>
                </div>
            </form >
        </div >
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

export default AdminCreateMember;
