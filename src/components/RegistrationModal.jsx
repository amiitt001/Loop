import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RegistrationModal = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        enrollmentId: '',
        department: '',
        teamName: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Legacy Validation only if no custom questions
        if (!event.questions || event.questions.length === 0) {
            if (!formData.enrollmentId?.trim()) newErrors.enrollmentId = 'ID is required';
            if (!formData.department?.trim()) newErrors.department = 'Department is required';
        }
        // Dynamic Validation
        else {
            event.questions.forEach(q => {
                if (q.required) {
                    const val = formData[q.id];
                    if (!val || (Array.isArray(val) && val.length === 0)) {
                        newErrors[q.id] = 'This field is required';
                    }
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const registrationData = {
                eventId: event.id,
                eventTitle: event.title,
                name: formData.name,
                email: formData.email,
                createdAt: new Date(),
                // Save legacy fields if they exist, else N/A
                enrollmentId: formData.enrollmentId || 'N/A',
                department: formData.department || 'N/A',
                teamName: formData.teamName || '',
                // Save dynamic responses properly
                responses: event.questions ? event.questions.map(q => ({
                    question: q.label,
                    answer: formData[q.id] || (q.type === 'checkbox' ? [] : '') // Ensure empty value
                })) : []
            };

            await addDoc(collection(db, "registrations"), registrationData);
            setIsSubmitting(false);
            setIsSuccess(true);
        } catch (error) {
            console.error("Error registering: ", error);
            alert("Registration failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    return (
        <AnimatePresence>
            {event && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 10000
                        }}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '100%',
                            maxWidth: '500px',
                            height: '100%',
                            background: 'var(--bg-card)',
                            borderLeft: '1px solid var(--neon-cyan)',
                            zIndex: 10001,
                            padding: '2rem',
                            overflowY: 'auto',
                            boxShadow: '-10px 0 30px rgba(0, 243, 255, 0.1)'
                        }}
                    >
                        <button onClick={onClose} style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-dim)',
                            cursor: 'pointer'
                        }}>
                            <X size={24} />
                        </button>

                        {!isSuccess ? (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Register for Event</h2>
                                <p style={{ color: 'var(--neon-cyan)', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                    {event.title}
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Base Fields usually needed for everything */}
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        placeholder="John Doe"
                                    />
                                    <InputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        placeholder="john@example.com"
                                    />

                                    {/* Dynamic Questions (if any) */}
                                    {event.questions && event.questions.length > 0 ? (
                                        event.questions.map((q) => {
                                            if (q.type === 'text') {
                                                return (
                                                    <InputField
                                                        key={q.id}
                                                        label={q.label}
                                                        name={q.id}
                                                        value={formData[q.id] || ''}
                                                        onChange={handleChange}
                                                        required={q.required}
                                                        placeholder="Your answer"
                                                    />
                                                );
                                            }
                                            if (q.type === 'radio') {
                                                return (
                                                    <div key={q.id} className="mb-4">
                                                        <label className="block mb-2 text-zinc-400 text-sm">{q.label}</label>
                                                        <div className="flex flex-col gap-2">
                                                            {q.options.map((opt, idx) => (
                                                                <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                                                    <input
                                                                        type="radio"
                                                                        name={q.id}
                                                                        value={opt}
                                                                        onChange={handleChange}
                                                                        checked={formData[q.id] === opt}
                                                                        className="accent-[var(--neon-cyan)]"
                                                                    />
                                                                    <span className="text-sm text-zinc-300">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            if (q.type === 'checkbox') {
                                                return (
                                                    <div key={q.id} className="mb-4">
                                                        <label className="block mb-2 text-zinc-400 text-sm">{q.label}</label>
                                                        <div className="flex flex-col gap-2">
                                                            {q.options.map((opt, idx) => {
                                                                const checked = (formData[q.id] || []).includes(opt);
                                                                return (
                                                                    <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                                                        <input
                                                                            type="checkbox"
                                                                            name={q.id}
                                                                            value={opt}
                                                                            // Custom handler for checkbox array
                                                                            onChange={(e) => {
                                                                                const val = e.target.value;
                                                                                const current = formData[q.id] || [];
                                                                                const newVals = checked
                                                                                    ? current.filter(v => v !== val)
                                                                                    : [...current, val];
                                                                                setFormData(prev => ({ ...prev, [q.id]: newVals }));
                                                                            }}
                                                                            checked={checked}
                                                                            className="accent-[var(--neon-cyan)]"
                                                                        />
                                                                        <span className="text-sm text-zinc-300">{opt}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        /* Default Static Fields if no dynamic questions */
                                        <>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <InputField
                                                    label="Enrollment ID"
                                                    name="enrollmentId"
                                                    value={formData.enrollmentId}
                                                    onChange={handleChange}
                                                    error={errors.enrollmentId}
                                                    placeholder="123456"
                                                />
                                                <InputField
                                                    label="Department"
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleChange}
                                                    error={errors.department}
                                                    placeholder="CS / IT"
                                                />
                                            </div>

                                            <InputField
                                                label="Team Name (Optional)"
                                                name="teamName"
                                                value={formData.teamName}
                                                onChange={handleChange}
                                                placeholder="e.g. Code Warriors"
                                            />
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            marginTop: '1rem',
                                            background: isSubmitting ? 'var(--text-dim)' : 'var(--neon-cyan)',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isSubmitting ? 'Processing...' : 'CONFIRM REGISTRATION'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                >
                                    <CheckCircle size={80} color="var(--neon-green)" style={{ marginBottom: '1.5rem' }} />
                                </motion.div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Registered!</h3>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
                                    You have successfully registered for <br />
                                    <span style={{ color: '#fff' }}>{event.title}</span>.
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    A confirmation email has been sent to {formData.email}.
                                </p>
                                <button
                                    onClick={onClose}
                                    style={{
                                        marginTop: '2rem',
                                        padding: '0.8rem 2rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border-dim)',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.borderColor = '#fff'}
                                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--border-dim)'}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const InputField = ({ label, name, type = "text", value, onChange, error, placeholder }) => (
    <div style={{ marginBottom: '1.5rem', width: '100%' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            {label}
        </label>
        <div style={{ position: 'relative' }}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${error ? '#ff0055' : 'var(--border-dim)'}`,
                    padding: '1rem',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'var(--font-main)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                }}
                onFocus={(e) => !error && (e.target.style.borderColor = 'var(--neon-cyan)')}
                onBlur={(e) => !error && (e.target.style.borderColor = 'var(--border-dim)')}
            />
            {error && (
                <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#ff0055'
                }}>
                    <AlertCircle size={18} />
                </div>
            )}
        </div>
        {error && (
            <p style={{ color: '#ff0055', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>
        )}
    </div>
);

export default RegistrationModal;
