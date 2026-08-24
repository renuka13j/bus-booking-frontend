import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaClock, FaRupeeSign, FaBusAlt } from 'react-icons/fa';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const res = await api.get('/trips/search', {
          params: { source, destination, date },
        });
        setTrips(res.data);
      } catch (err) {
        setError('Failed to load trips. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [source, destination, date]);

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-cream flex items-center gap-3">
            {source} <span className="text-gold-500 text-lg">→</span> {destination}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">{date}</p>
        </div>

        {loading && (
          <div className="text-center text-slate-500 py-12">Loading trips...</div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg py-4">
            {error}
          </div>
        )}

        {!loading && !error && trips.length === 0 && (
          <div className="text-center text-slate-500 bg-navy-800 border border-navy-700 rounded-xl py-12">
            No trips found for this route on this date.
          </div>
        )}

        <div className="flex flex-col gap-5">
          {trips.map((trip) => {
            const availableSeats = trip.seats.filter((s) => !s.isBooked).length;

            return (
              <div
                key={trip._id}
                className="bg-navy-800 rounded-xl border border-navy-700 hover:border-gold-500/40 transition overflow-hidden flex"
              >
                <div className="flex-1 p-5 flex gap-4 items-start">
                  <div className="bg-gold-500/10 text-gold-500 p-3 rounded-lg">
                    <FaBusAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-cream">
                      {trip.route.operator.name}
                    </p>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                      <FaClock className="text-slate-500 text-xs" />
                      {trip.departureTime} - {trip.arrivalTime}
                    </p>
                    <p className="text-xs text-emerald-400 font-medium mt-2">
                      {availableSeats} seats available
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center px-0">
                  <div className="absolute -top-3 w-4 h-4 bg-navy-950 rounded-full" />
                  <div className="h-full border-l border-dashed border-navy-700" />
                  <div className="absolute -bottom-3 w-4 h-4 bg-navy-950 rounded-full" />
                </div>

                <div className="p-5 flex flex-col items-center justify-center gap-2 min-w-[140px]">
                  <p className="font-display font-semibold text-gold-500 text-lg flex items-center">
                    <FaRupeeSign className="text-sm" />
                    {trip.price}
                  </p>
                  <button
                    onClick={() => navigate(`/trip/${trip._id}`)}
                    className="bg-gold-500 text-navy-950 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold-400 active:scale-[0.98] transition whitespace-nowrap"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Results;