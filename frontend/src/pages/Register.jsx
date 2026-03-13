import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Zap, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const requirements = [
  { label: 'At least 6 characters', test: (p) => p.length >= 6 },
  { label: 'Contains a number',     test: (p) => /\d/.test(p) },
  { label: 'Contains a letter',     test: (p) => /[a-zA-Z]/.test(p) },
];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'recruiter' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('All fields are required');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const result = await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      // If pending approval, show waiting screen
      if (result?.pending) {
        setSubmitted(true);
      } else {
        toast.success('Welcome to SmartHire!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.12)' }}>
            <Clock size={32} style={{ color: '#f59e0b' }} />
          </div>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Request Submitted!
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Your account request for <strong style={{ color: 'var(--text-primary)' }}>{form.email}</strong> has been
            submitted. An admin will review and approve your account. You will be able to log in once approved.
          </p>
          <div className="p-4 rounded-xl space-y-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#f59e0b' }}>What happens next?</p>
            {['Admin reviews your request', 'You receive approval notification', 'Log in with your credentials'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>{i + 1}</div>
                {s}
              </div>
            ))}
          </div>
          <Link to="/login" className="btn-primary w-full justify-center block text-center">
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #0c1445 0%, #1a1060 40%, #0f2460 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6272f1, transparent)', filter: 'blur(60px)' }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-white font-display text-xl font-bold">SmartHire</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative z-10 space-y-5">
          <div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight mb-3">
              Request your<br />account today
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Account requests are reviewed and approved by an admin before you can log in.
            </p>
          </div>
          {['Free account — no credit card needed', 'AI-powered ATS scoring on every candidate', 'Real-time dashboard and analytics', 'Admin approves access within 24 hours'].map((text, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              <span className="text-white/75 text-sm">{text}</span>
            </motion.div>
          ))}
          <p className="text-white/40 text-sm pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            Have an account?{' '}
            <Link to="/login" className="text-white/80 font-medium hover:text-white transition-colors">Sign in →</Link>
          </p>
        </motion.div>
        <p className="relative z-10 text-white/25 text-xs">© 2025 SmartHire</p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-cyan))' }}>
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>SmartHire</span>
          </div>

          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Request an account</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Already have one?{' '}
              <Link to="/login" className="font-medium" style={{ color: 'var(--accent)' }}>Sign in</Link>
            </p>
          </div>

          <div className="glass p-7">
            {/* Role selector */}
            <div className="mb-5">
              <label className="label">Requesting access as</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ value: 'recruiter', label: '🎯 Recruiter', desc: 'Manage drives & candidates' },
                  { value: 'admin', label: '👑 Admin', desc: 'Full system access' }].map(({ value, label, desc }) => (
                  <button key={value} type="button" onClick={() => setForm({ ...form, role: value })}
                    className="p-3 rounded-xl text-left transition-all"
                    style={{
                      background: form.role === value ? 'rgba(99,114,241,0.12)' : 'var(--bg-card)',
                      border: '1px solid ' + (form.role === value ? 'rgba(99,114,241,0.4)' : 'var(--border)'),
                    }}>
                    <p className="text-sm font-semibold" style={{ color: form.role === value ? 'var(--accent)' : 'var(--text-primary)' }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Priya Sharma" className="input pl-11" autoComplete="name" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="label">Work Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com" className="input pl-11" autoComplete="email" />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Create a strong password" className="input pl-11 pr-11" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 space-y-1">
                    {requirements.map(({ label, test }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full flex items-center justify-center"
                          style={{ background: test(form.password) ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)' }}>
                          <div className="w-1.5 h-1.5 rounded-full"
                            style={{ background: test(form.password) ? '#10b981' : 'var(--text-muted)' }} />
                        </div>
                        <span className="text-xs" style={{ color: test(form.password) ? '#10b981' : 'var(--text-muted)' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Confirm */}
              <div>
                <label className="label">Confirm Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Repeat your password" className="input pl-11"
                    style={{ borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : undefined }}
                    autoComplete="new-password" />
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-xs mt-1" style={{ color: '#ef4444' }}>Passwords do not match</p>
                )}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-1">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Submit Request</span><ArrowRight size={15} /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
