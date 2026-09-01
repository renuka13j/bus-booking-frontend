import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChair, FaRupeeSign, FaClock } from 'react-icons/fa';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';
import Footer from '../components/Footer';

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function fetchTrip() {
      try {
        setLoading(true);
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        setError('Could not load this trip.');
      } finally {
        setLoading(false);
      }
    }
    fetchTrip();
  }, [id]);

  function toggleSeat(seat) {
    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
      const updated = { ...passengers };
      delete updated[seat.seatNumber];
      setPassengers(updated);
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
      setPassengers({
        ...passengers,
        [seat.seatNumber]: { name: '', age: '' },
      });
    }
  }

  function updatePassenger(seatNumber, field, value) {
    setPassengers({
      ...passengers,
      [seatNumber]: { ...passengers[seatNumber], [field]: value },
    });
  }

  async function handleBooking() {
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitError('');

    const passengerList = selectedSeats.map((seatNumber) => ({
      name: passengers[seatNumber].name,
      age: Number(passengers[seatNumber].age),
      seatNumber,
    }));

    const incomplete = passengerList.some((p) => !p.name || !p.age);
    if (incomplete) {
      setSubmitError('Please fill in name and age for every selected seat.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/bookings', {
        tripId: id,
        passengers: passengerList,
        totalAmount: selectedSeats.length * trip.price,
      });
      navigate('/booking-confirmation', { state: { booking: res.data.booking, trip } });
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-10 flex-1 w-full">
          <div className="skeleton rounded-lg h-8 w-64 mb-2" />
          <div className="skeleton rounded-lg h-4 w-40 mb-6" />
          <div className="skeleton rounded-xl h-80 border border-navy-700" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col">
        <Navbar />
        <p className="text-center text-red-400 py-20 flex-1">{error || 'Trip not found.'}</p>
        <Footer />
      </div>
    );
  }

  const totalAmount = selectedSeats.length * trip.price;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 animate-fade-in flex-1 w-full">
        {/* Left: seat map */}
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-semibold text-cream mb-1">
            {trip.route.source} <span className="text-gold-500">→</span> {trip.route.destination}
          </h1>
          <p className="text-slate-400 text-sm flex items-center gap-1.5 mb-6">
            <FaClock className="text-slate-500 text-xs" />
            {trip.departureTime} - {trip.arrivalTime} · {trip.route.operator.name}
          </p>

          <div className="bg-navy-800 border border-navy-700 rounded-xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded border border-gold-500 inline-block" />
                Available
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-gold-500 inline-block" />
                Selected
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-navy-700 inline-block" />
                Booked
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-xs mx-auto sm:mx-0">
              {trip.seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.seatNumber);
                return (
                  <button
                    key={seat.seatNumber}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.isBooked}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition
                      ${seat.isBooked
                        ? 'bg-navy-700 text-slate-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gold-500 text-navy-950 scale-105'
                        : 'border border-gold-500 text-gold-500 hover:bg-gold-500/10'
                      }`}
                  >
                    <FaChair />
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 animate-fade-in">
              <h2 className="text-cream font-medium">Passenger Details</h2>
              {selectedSeats.map((seatNumber) => (
                <div
                  key={seatNumber}
                  className="bg-navy-800 border border-navy-700 rounded-lg p-4 flex flex-col sm:flex-row gap-3 sm:items-center"
                >
                  <span className="bg-gold-500/10 text-gold-500 text-xs font-semibold px-2.5 py-1.5 rounded w-fit">
                    {seatNumber}
                  </span>
                  <input
                    type="text"
                    placeholder="Passenger name"
                    value={passengers[seatNumber]?.name || ''}
                    onChange={(e) => updatePassenger(seatNumber, 'name', e.target.value)}
                    className="flex-1 bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    min="1"
                    value={passengers[seatNumber]?.age || ''}
                    onChange={(e) => updatePassenger(seatNumber, 'age', e.target.value)}
                    className="w-full sm:w-20 bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: summary */}
        <div className="bg-navy-800 border border-navy-700 rounded-xl p-6 h-fit md:sticky md:top-20">
          <h2 className="font-display text-lg font-semibold text-cream mb-4">
            Booking Summary
          </h2>

          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Seats selected</span>
            <span className="text-cream">{selectedSeats.length}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Price per seat</span>
            <span className="text-cream flex items-center">
              <FaRupeeSign className="text-xs" />{trip.price}
            </span>
          </div>

          <TicketDivider />

          <div className="flex justify-between items-center mt-2 mb-6">
            <span className="text-slate-300 font-medium">Total</span>
            <span className="text-gold-500 font-display font-semibold text-xl flex items-center">
              <FaRupeeSign className="text-sm" />{totalAmount}
            </span>
          </div>

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
              {submitError}
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || submitting}
            className="w-full bg-gold-500 text-navy-950 font-semibold rounded-lg py-3 hover:bg-gold-400 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Booking...' : !user ? 'Log in to Book' : 'Confirm Booking'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SeatSelection;