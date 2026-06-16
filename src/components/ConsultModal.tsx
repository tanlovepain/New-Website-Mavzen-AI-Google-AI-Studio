import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Server, Shield, Check, Info, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultModal({ isOpen, onClose }: ConsultModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [focus, setFocus] = useState('rag');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 z-10"
          >
            {/* Top red neon bar */}
            <div className="h-1 w-full bg-linear-to-r from-rose-500 via-indigo-500 to-purple-600" />

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Logo size={28} />
                    <div>
                      <h3 className="font-display font-semibold text-lg tracking-tight">Scope Your AI Architecture</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">30-minute system review with our senior architects</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Full Name</label>
                      <input
                        id="modal-input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Davis McMurrain"
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-rose-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Work Email</label>
                      <input
                        id="modal-input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@mavzenai.com"
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-rose-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Company & Website</label>
                    <input
                      id="modal-input-company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Mavzen AI (mavzenai.com)"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-rose-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Primary AI Focus Area</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: 'rag', label: 'RAG Knowledge' },
                        { value: 'voice', label: 'Voice Agents' },
                        { value: 'rules', label: 'Decision Logic' },
                        { value: 'workflow', label: 'Workflows' },
                      ].map((item) => (
                        <button
                          id={`focus-btn-${item.value}`}
                          key={item.value}
                          type="button"
                          onClick={() => setFocus(item.value)}
                          className={`rounded-lg py-2.5 px-2 text-xs font-medium text-center border transition-all ${
                            focus === item.value
                              ? 'border-rose-500 bg-rose-500/5 text-rose-600 dark:text-rose-400'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Current Tech Stack or Short Checklist Notes (Optional)</label>
                    <textarea
                      id="modal-textarea-notes"
                      rows={2.5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. We use Salesforce CRM and need a voice agent for inbound qualification routed locally on-premise."
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-rose-500 dark:border-zinc-800 dark:bg-zinc-900/50 resize-none"
                    />
                  </div>

                  {/* Trust indicator badges */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-xl p-3 flex flex-wrap gap-x-4 gap-y-1.5 items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-1.5">
                      <Shield size={12} className="text-emerald-500" />
                      <span>100% Client-Owned Code</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Server size={12} className="text-indigo-500" />
                      <span>Host in Your Cloud</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-rose-500" />
                      <span>30-Min Call Guaranteed</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      id="btn-modal-cancel"
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      id="btn-modal-submit"
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 bg-[#c20a26] hover:bg-[#a50920] disabled:opacity-50 text-white rounded-md px-5 py-2 text-xs tracking-wider uppercase font-semibold transition-all duration-200"
                    >
                      {loading ? 'Securing Calendar...' : 'Confirm Consultation'}
                      <ArrowRight size={14} className="shrink-0" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Check size={24} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl">Consultation Requested!</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                      Thank you, <span className="font-bold text-zinc-800 dark:text-zinc-200">{name}</span>. We will email you at <span className="text-rose-500 font-medium">{email}</span> within the hour to coordinate the calendar booking.
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl text-left text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto border border-zinc-100 dark:border-zinc-800 space-y-2">
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <Info size={12} className="text-indigo-400" />
                      <span>Next Steps in Mavzen Loop:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-500">
                      <li>Receive a secure Calendar invite link via email</li>
                      <li>Select your preferred session time</li>
                      <li>Review the initial custom System Architecture Outline beforehand</li>
                    </ul>
                  </div>
                  <button
                    id="btn-modal-done"
                    onClick={onClose}
                    className="mt-4 px-6 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 rounded-lg text-sm font-semibold transition-all"
                  >
                    Back to Mavzen OS
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
