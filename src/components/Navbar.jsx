import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-navy-900 border-b border-navy-700 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-gold-500/10 p-2 rounded-lg">
          <FaBus className="text-gold-500 text-xl" />
        </div>
        <span className="text-xl font-display font-semibold text-cream tracking-wide">
          TravelEase
        </span>
      </Link>

      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <FaUserCircle className="text-gold-500" />
            {user.name}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-gold-500 transition"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 text-sm">
          <Link to="/login" className="text-slate-300 hover:text-gold-500 transition">
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-gold-500 text-navy-950 font-medium px-4 py-1.5 rounded-lg hover:bg-gold-400 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;