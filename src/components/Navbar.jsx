import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <nav className="bg-navy-900 border-b border-navy-700 px-4 sm:px-6 py-3 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <div className="bg-gold-500/10 p-2 rounded-lg shrink-0">
            <FaBus className="text-gold-500 text-xl" />
          </div>
          <span className="text-lg sm:text-xl font-display font-semibold text-cream tracking-wide whitespace-nowrap">
            TravelEase
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm text-slate-300 hover:text-gold-500 transition whitespace-nowrap">
                  Admin
                </Link>
              )}
              <Link to="/my-bookings" className="text-sm text-slate-300 hover:text-gold-500 transition whitespace-nowrap">
                My Bookings
              </Link>
              <div className="flex items-center gap-2 text-slate-300 text-sm whitespace-nowrap">
                <FaUserCircle className="text-gold-500 shrink-0" />
                {user.name}
              </div>
              <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-gold-500 transition whitespace-nowrap">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-gold-500 transition whitespace-nowrap">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-gold-500 text-navy-950 font-medium px-4 py-1.5 rounded-lg hover:bg-gold-400 active:scale-95 transition whitespace-nowrap"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-cream text-xl shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 pb-2 animate-fade-in">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-gold-500 transition">
                  Admin
                </Link>
              )}
              <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-gold-500 transition">
                My Bookings
              </Link>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <FaUserCircle className="text-gold-500" />
                {user.name}
              </div>
              <button onClick={handleLogout} className="text-left text-slate-400 hover:text-gold-500 transition">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-gold-500 transition">
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-gold-500 text-navy-950 font-medium px-4 py-2 rounded-lg text-center hover:bg-gold-400 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;