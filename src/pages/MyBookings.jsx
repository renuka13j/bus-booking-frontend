import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRupeeSign, FaClock, FaTicketAlt } from 'react-icons/fa';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const res = await api.get('/bookings/my');
        setBookings(res.data);
      } catch (err) {
        setError('Could not load your bookings.');
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-2xl font-semibold text-cream mb-6">
          My Bookings
        </h1>

        {loading && <p className="text-slate-500 text-center py-12">Loading...</p>}

        {error && (
          <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center py-4">
            {error}
          </p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center bg-navy-800 border border-navy-700 rounded-xl py-12">
            <FaTicketAlt className="text-slate-600 text-3xl mx-auto mb-3" />
            <p className="text-slate-400 mb-4">You haven't booked any trips yet.</p>
            <Link
              to="/"
              className="inline-block bg-gold-500 text-navy-950 font-medium px-5 py-2 rounded-lg hover:bg-gold-400 transition"
            >
              Search Buses
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-navy-800 border border-navy-700 rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-cream">
                    {booking.trip.route.source} <span className="text-gold-500">→</span> {booking.trip.route.destination}
                  </p>
                  <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                    <FaClock className="text-slate-500 text-xs" />
                    {booking.trip.date} · {booking.trip.departureTime} - {booking.trip.arrivalTime}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    booking.status === 'confirmed'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <TicketDivider />

              <div className="flex justify-between items-center text-sm mt-2">
                <div className="text-slate-400">
                  Seats: <span className="text-cream">{booking.seatsBooked.join(', ')}</span>
                  <span className="mx-2 text-navy-700">·</span>
                  {booking.trip.route.operator.name}
                </div>
                <div className="text-gold-500 font-semibold flex items-center">
                  <FaRupeeSign className="text-xs" />
                  {booking.totalAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;