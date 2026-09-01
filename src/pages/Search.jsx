import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaExchangeAlt, FaSearch, FaShieldAlt, FaClock, FaBusAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';
import Footer from '../components/Footer';

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

  const popularRoutes = [
    { source: 'Nagpur', destination: 'Pune', price: '899', date: '2026-08-25' },
    { source: 'Mumbai', destination: 'Pune', price: '399', date: '2026-09-01' },
    { source: 'Delhi', destination: 'Jaipur', price: '549', date: '2026-09-01' },
    { source: 'Bangalore', destination: 'Chennai', price: '649', date: '2026-09-01' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Fixed full-page background photo, slightly darkened and softened */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-[2px] scale-105"
        style={{ backgroundImage: `url('/hero-bus.jpg')` }}
      />
      <div className="fixed inset-0 bg-navy-950/35" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gold-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 pt-8 sm:pt-10 pb-6 text-center animate-fade-in">
            <p
              className="text-gold-500 uppercase tracking-[0.2em] text-xs font-semibold mb-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              Book with confidence
            </p>
            <h1
              className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream mb-2 px-2"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Your journey, booked in seconds
            </h1>
            <p
              className="text-slate-300 text-sm font-medium"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              Search across 500+ routes and travel operators nationwide
            </p>
          </div>
        </div>

        {/* Ticket-style search card */}
        <div className="flex justify-center px-4 relative z-10">
          <div
            className="bg-navy-800/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/40 border border-navy-700 w-full max-w-md overflow-visible animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}
          >
            <form onSubmit={handleSearch} className="p-6 pb-4 flex flex-col gap-3">
              <div className="relative">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                  From
                </label>
                <FaMapMarkerAlt className="absolute left-3 top-[33px] text-gold-500" />
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Nagpur"
                  required
                  className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
                />
              </div>

              <div className="flex justify-center -my-1 relative z-10">
                <button
                  type="button"
                  onClick={swapCities}
                  className="bg-navy-700 hover:bg-gold-500 hover:text-navy-950 text-gold-500 p-1.5 rounded-full transition"
                  title="Swap cities"
                >
                  <FaExchangeAlt className="rotate-90 text-sm" />
                </button>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                  To
                </label>
                <FaMapMarkerAlt className="absolute left-3 top-[33px] text-gold-500" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Pune"
                  required
                  className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                  Date of Journey
                </label>
                <FaCalendarAlt className="absolute left-3 top-[33px] text-gold-500" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition [color-scheme:dark]"
                />
              </div>
            </form>

            <div className="px-6">
              <TicketDivider />
            </div>

            <div className="p-6 pt-3">
              <button
                onClick={handleSearch}
                className="w-full flex items-center justify-center gap-2 bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 hover:bg-gold-400 active:scale-[0.98] transition"
              >
                <FaSearch />
                Search Buses
              </button>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-cream mb-1">
            Popular Routes
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            Frequently booked journeys by our travelers
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularRoutes.map((route, i) => (
              <button
                key={i}
                onClick={() => navigate(`/results?source=${route.source}&destination=${route.destination}&date=${route.date}`)}
                className="bg-navy-800/90 backdrop-blur-sm border border-navy-700 hover:border-gold-500/50 rounded-xl p-4 flex items-center justify-between text-left transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gold-500/10 text-gold-500 p-2.5 rounded-lg group-hover:bg-gold-500/20 transition">
                    <FaBusAlt />
                  </div>
                  <div>
                    <p className="text-cream font-medium text-sm">
                      {route.source} <span className="text-gold-500">→</span> {route.destination}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">Starting from ₹{route.price}</p>
                  </div>
                </div>
                <span className="text-slate-500 group-hover:text-gold-500 transition text-sm">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
          {[
            { icon: FaShieldAlt, title: 'Secure Booking', desc: 'Your data & payments are protected' },
            { icon: FaClock, title: '24/7 Support', desc: "We're here whenever you need us" },
            { icon: FaBusAlt, title: '500+ Routes', desc: 'Operators across the country' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform hover:scale-110 hover:border-gold-500/50">
                <item.icon className="text-gold-500" />
              </div>
              <p className="text-cream font-medium text-sm">{item.title}</p>
              <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Search;