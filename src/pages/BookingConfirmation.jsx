import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import TicketDivider from '../components/TicketDivider';

function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.booking) {
    return (
      <div className="min-h-screen bg-navy-950">
        <Navbar />
        <p className="text-center text-slate-500 py-20">No booking to show.</p>
      </div>
    );
  }

  const { booking, trip } = state;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center px-4 py-16">
      <Navbar />
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8 max-w-sm w-full mt-10 text-center">
        <FaCheckCircle className="text-emerald-400 text-4xl mx-auto mb-3" />
        <h1 className="font-display text-xl font-semibold text-cream mb-1">
          Booking Confirmed
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          {trip.route.source} → {trip.route.destination} · {trip.date}
        </p>

        <div className="text-left text-sm text-slate-300 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Seats</span>
            <span>{booking.seatsBooked.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Booking ID</span>
            <span className="text-xs">{booking._id}</span>
          </div>
        </div>

        <TicketDivider />

        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-300 font-medium">Total Paid</span>
          <span className="text-gold-500 font-display font-semibold text-lg flex items-center">
            <FaRupeeSign className="text-sm" />{booking.totalAmount}
          </span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 hover:bg-gold-400 transition"
        >
          Book Another Trip
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;