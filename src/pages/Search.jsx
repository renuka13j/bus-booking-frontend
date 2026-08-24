import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaExchangeAlt, FaSearch, FaShieldAlt, FaClock, FaBusAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';

function Search() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/results?source=${source}&destination=${destination}&date=${date}`);
  }

  function swapCities() {
    setSource(destination);
    setDestination(source);
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-10 text-center">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Book with confidence
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-3">
            Your journey, booked in seconds
          </h1>
          <p className="text-navy-700/80 text-slate-400">
            Search across 500+ routes and travel operators nationwide
          </p>
        </div>
      </div>

      {/* Ticket-style search card */}
      <div className="flex justify-center px-4 -mt-4 relative z-10">
        <div className="bg-navy-800 rounded-2xl shadow-2xl shadow-black/40 border border-navy-700 w-full max-w-md overflow-visible">
          <form onSubmit={handleSearch} className="p-8 pb-6 flex flex-col gap-4">
            <div className="relative">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                From
              </label>
              <FaMapMarkerAlt className="absolute left-3 top-[34px] text-gold-500" />
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Nagpur"
                required
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <div className="flex justify-center -my-1 relative z-10">
              <button
                type="button"
                onClick={swapCities}
                className="bg-navy-700 hover:bg-gold-500 hover:text-navy-950 text-gold-500 p-2 rounded-full transition"
                title="Swap cities"
              >
                <FaExchangeAlt className="rotate-90 text-sm" />
              </button>
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                To
              </label>
              <FaMapMarkerAlt className="absolute left-3 top-[34px] text-gold-500" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Pune"
                required
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                Date of Journey
              </label>
              <FaCalendarAlt className="absolute left-3 top-[34px] text-gold-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition [color-scheme:dark]"
              />
            </div>
          </form>

          <div className="px-8">
            <TicketDivider />
          </div>

          <div className="p-8 pt-4">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 text-navy-950 font-semibold rounded-lg py-3 hover:bg-gold-400 active:scale-[0.98] transition"
            >
              <FaSearch />
              Search Buses
            </button>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="max-w-3xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: FaShieldAlt, title: 'Secure Booking', desc: 'Your data & payments are protected' },
          { icon: FaClock, title: '24/7 Support', desc: "We're here whenever you need us" },
          { icon: FaBusAlt, title: '500+ Routes', desc: 'Operators across the country' },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="bg-navy-800 border border-navy-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <item.icon className="text-gold-500" />
            </div>
            <p className="text-cream font-medium text-sm">{item.title}</p>
            <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;