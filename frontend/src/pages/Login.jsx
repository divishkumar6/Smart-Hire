import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Sparkles, Brain, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AnimatedShape = ({ size, color, top, left, delay, duration }) => (
  <div
    className="absolute rounded-full animate-float-shape"
    style={{
      width: size, height: size,
      background: `radial-gradient(circle, ${color}, transparent)`,
      top, left, animationDelay: delay, animationDuration: duration,
      filter: 'blur(40px)', opacity: 0.25,
    }}
  />
);

const Feature = ({ icon: Icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-3"
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(255,255,255,0.15)' }}>
      <Icon size={16} className="text-white" />
    </div>
    <span className="text-white/80 text-sm font-medium">{text}</span>
  </motion.div>
);

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  const fillDemo = (type) => setForm({
    email: type === 'admin' ? 'admin@smarthire.com' : 'recruiter@smarthire.com',
    password: 'password123'
  });

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #1a1060 0%, #2d1b8c 30%, #0f2460 70%, #071a3e 100%)' }}>
        <AnimatedShape size="500px" color="#6272f1" top="-10%" left="-10%" delay="0s" duration="10s" />
        <AnimatedShape size="400px" color="#22d3ee" top="50%" left="60%" delay="3s" duration="13s" />
        <AnimatedShape size="300px" color="#a855f7" top="20%" left="70%" delay="6s" duration="9s" />
        <AnimatedShape size="250px" color="#f59e0b" top="70%" left="-5%" delay="2s" duration="11s" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-white font-display text-xl font-bold tracking-wide">SmartHire</span>
        </motion.div>
        <div className="relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">AI-Powered Platform</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-white leading-tight mb-3">
              AI-Powered<br />Recruitment<br />
              <span style={{
                background: 'linear-gradient(90deg, #22d3ee, #a855f7, #f59e0b)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Intelligence</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              Evaluate candidates faster. Hire smarter.
            </p>
          </motion.div>
          <div className="space-y-3">
            <Feature icon={Brain} text="ATS Score — AI-powered candidate ranking" delay={0.4} />
            <Feature icon={Sparkles} text="Skill Heatmap — Visualize talent distribution" delay={0.5} />
            <Feature icon={Zap} text="Real-time Dashboard — Live analytics" delay={0.6} />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {[['98%', 'Accuracy'], ['3x', 'Faster Hiring'], ['500+', 'Companies']].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-display font-bold text-white">{val}</p>
                <p className="text-white/50 text-xs">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="relative z-10 text-white/30 text-xs">
          © 2025 SmartHire. All rights reserved.
        </motion.p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-cyan))' }}>
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>SmartHire</span>
          </div>
          <div className="glass p-8" style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
            <div className="mb-7">
              <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Welcome back</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sign in to your SmartHire account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com" className="input pl-11" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Password</label>
                  <button type="button" className="text-xs font-medium" style={{ color: 'var(--accent)' }}
                    onClick={() => toast('Password reset coming soon!')}>Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••" className="input pl-11 pr-11" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: 'var(--accent)' }} />
                <label htmlFor="remember" className="text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  Remember me for 30 days
                </label>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Sign In</span><ArrowRight size={16} /></>}
              </button>
              <div className="relative flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>
              <Link to="/register" className="block">
                <button type="button" className="btn-ghost w-full justify-center">
                  Create Account <ChevronRight size={16} />
                </button>
              </Link>
            </form>
            <div className="mt-6 p-4 rounded-xl"
              style={{ background: 'rgba(99,114,241,0.06)', border: '1px solid rgba(99,114,241,0.15)' }}>
              <p className="text-xs text-center mb-3 font-semibold" style={{ color: 'var(--text-muted)' }}>⚡ Demo Credentials</p>
              <div className="space-y-2">
                {[
                  { label: '👑 Admin', type: 'admin', email: 'admin@smarthire.com', pass: 'password123' },
                  { label: '🎯 Recruiter', type: 'recruiter', email: 'recruiter@smarthire.com', pass: 'password123' },
                ].map(({ label, type, email, pass }) => (
                  <button key={type} type="button" onClick={() => fillDemo(type)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
                      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{email}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,114,241,0.1)', color: 'var(--accent)' }}>
                      Fill ↗
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)' }}>Password: <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>password123</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
