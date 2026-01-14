import React from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const AdminMembers = () => {
    // Mock data
    const members = [
        { id: 1, name: 'Alex Chen', role: 'President', points: 1200 },
        { id: 2, name: 'Sarah Jones', role: 'Vice President', points: 1150 },
        { id: 3, name: 'Mike Ross', role: 'Tech Lead', points: 980 },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Members</h1>
                <button style={{
                    background: 'var(--neon-cyan)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                }}>
                    <Plus size={18} /> Add Member
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '2rem', position: 'relative', maxWidth: '400px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                <input
                    type="text"
                    placeholder="Search members..."
                    style={{
                        width: '100%',
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        padding: '0.8rem 1rem 0.8rem 3rem',
                        color: '#fff',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Table */}
            <div style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#27272a', color: '#a1a1aa', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Role</th>
                            <th style={{ padding: '1rem' }}>Points</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id} style={{ borderBottom: '1px solid #27272a' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{member.name}</td>
                                <td style={{ padding: '1rem', color: '#a1a1aa' }}>{member.role}</td>
                                <td style={{ padding: '1rem', color: 'var(--neon-cyan)' }}>{member.points} XP</td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer', marginRight: '0.5rem' }}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMembers;
