import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Type, List, CheckSquare } from 'lucide-react';

const FormBuilder = ({ questions, setQuestions }) => {

    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now().toString(),
            type,
            label: '',
            required: true,
            options: type === 'text' ? null : ['Option 1']
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addOption = (qId) => {
        setQuestions(questions.map(q =>
            q.id === qId ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] } : q
        ));
    };

    const updateOption = (qId, idx, value) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            const newOptions = [...q.options];
            newOptions[idx] = value;
            return { ...q, options: newOptions };
        }));
    };

    const removeOption = (qId, idx) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            return { ...q, options: q.options.filter((_, i) => i !== idx) };
        }));
    };

    return (
        <div className="flex flex-col gap-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h3 className="text-xl font-bold text-white">Registration Form Builder</h3>

            {/* Question List */}
            <div className="flex flex-col gap-4">
                {questions.map((q, index) => (
                    <div key={q.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex flex-col gap-3 relative group">

                        {/* Header: Label & Type Icon */}
                        <div className="flex items-start gap-3">
                            <span className="text-zinc-600 mt-2"><GripVertical size={16} /></span>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={q.label}
                                    onChange={(e) => updateQuestion(q.id, 'label', e.target.value)}
                                    placeholder="Enter Question (e.g. What is your experience?)"
                                    className="w-full bg-transparent text-white font-medium outline-none border-b border-zinc-800 focus:border-[var(--neon-cyan)] pb-1 transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider flex items-center gap-1">
                                    {q.type === 'text' && <Type size={12} />}
                                    {q.type === 'radio' && <List size={12} />}
                                    {q.type === 'checkbox' && <CheckSquare size={12} />}
                                    {q.type}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(q.id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Options Editor (Radio/Checkbox) */}
                        {(q.type === 'radio' || q.type === 'checkbox') && (
                            <div className="pl-8 flex flex-col gap-2">
                                {q.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 border border-zinc-600 ${q.type === 'radio' ? 'rounded-full' : 'rounded-sm'}`} />
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                            className="bg-transparent text-sm text-zinc-300 outline-none border-b border-transparent focus:border-zinc-700 flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOption(q.id, optIdx)}
                                            className="text-zinc-700 hover:text-red-500"
                                        >
                                            <XIcon size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addOption(q.id)}
                                    className="text-xs text-[var(--neon-cyan)] hover:text-white transition-colors flex items-center gap-1 mt-1 font-medium"
                                >
                                    <Plus size={12} /> Add Option
                                </button>
                            </div>
                        )}

                        {/* Required Toggle */}
                        <div className="flex justify-end mt-2">
                            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={q.required}
                                    onChange={(e) => updateQuestion(q.id, 'required', e.target.checked)}
                                    className="accent-[var(--neon-cyan)]"
                                />
                                Required Field
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {questions.length === 0 && (
                <div className="text-center py-6 text-zinc-500 text-sm border-2 border-dashed border-zinc-800 rounded-lg">
                    No custom questions yet. Add one below!
                </div>
            )}

            {/* Toolbar */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => addQuestion('text')}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Type size={14} /> Short Answer
                </button>
                <button
                    type="button"
                    onClick={() => addQuestion('radio')}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <List size={14} /> Multiple Choice
                </button>
                <button
                    type="button"
                    onClick={() => addQuestion('checkbox')}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <CheckSquare size={14} /> Checkboxes
                </button>
            </div>
        </div>
    );
};

const XIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default FormBuilder;
