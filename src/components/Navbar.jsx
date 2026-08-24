import { FaBus } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-navy-900 border-b border-navy-700 px-6 py-4 flex items-center gap-2">
      <div className="bg-gold-500/10 p-2 rounded-lg">
        <FaBus className="text-gold-500 text-xl" />
      </div>
      <span className="text-xl font-display font-semibold text-cream tracking-wide">
        TravelEase
      </span>
    </nav>
  );
}

export default Navbar;