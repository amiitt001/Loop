import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, Calendar, LogOut, Menu, X, Trophy } from 'lucide-react';

const AdminLayout = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!currentUser) {
        return <Navigate to="/admin/login" />;
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/members', icon: Users, label: 'Members' },

        { path: '/admin/contestants', icon: Trophy, label: 'Contestants' },
        { path: '/admin/applications', icon: Calendar, label: 'Applications' },
        { path: '/admin/events', icon: Calendar, label: 'Events' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#09090b', color: '#fff' }}>
            {/* Sidebar */}
            <aside style={{
                width: sidebarOpen ? '250px' : '80px',
                background: '#18181b', // Zinc-900
                borderRight: '1px solid #27272a',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'space-between' : 'center', marginBottom: '3rem' }}>
                    {sidebarOpen && (
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                            <span className="text-neon-cyan">TECH</span> ADMIN
                        </span>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    color: isActive ? '#fff' : '#a1a1aa',
                                    background: isActive ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
                                    border: isActive ? '1px solid rgba(0, 243, 255, 0.2)' : '1px solid transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    overflow: 'hidden',
                                    justifyContent: sidebarOpen ? 'flex-start' : 'center'
                                }}
                            >
                                <item.icon size={20} color={isActive ? 'var(--neon-cyan)' : 'currentColor'} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.8rem',
                        marginTop: 'auto',
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        justifyContent: sidebarOpen ? 'flex-start' : 'center',
                        width: '100%'
                    }}
                >
                    <LogOut size={20} />
                    {sidebarOpen && <span>Logout</span>}
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
