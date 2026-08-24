import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import api from '../api/axios';
import Navbar from '../components/Navbar';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', { name, email, phone, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <div className="flex justify-center px-4 pt-16 pb-10">
        <div className="bg-navy-800 rounded-2xl border border-navy-700 shadow-xl w-full max-w-sm p-8">
          <h1 className="font-display text-2xl font-semibold text-cream text-center mb-1">
            Create your account
          </h1>
          <p className="text-slate-400 text-sm text-center mb-6">
            Start booking in minutes
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-[13px] text-gold-500 text-sm" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-[13px] text-gold-500 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-[13px] text-gold-500 text-sm" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-[13px] text-gold-500 text-sm" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 mt-2 hover:bg-gold-400 active:scale-[0.98] transition disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;