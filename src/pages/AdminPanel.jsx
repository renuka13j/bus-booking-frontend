import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function AdminPanel() {
  const { user } = useAuth();
  const [tab, setTab] = useState('operator');

  // Redirect non-admins away entirely
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="font-display text-2xl font-semibold text-cream mb-6">
          Admin Panel
        </h1>

        <div className="flex gap-2 mb-6">
          {['operator', 'route', 'trip'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                tab === t
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-navy-800 text-slate-400 hover:text-cream'
              }`}
            >
              Add {t}
            </button>
          ))}
        </div>

        {tab === 'operator' && <AddOperatorForm />}
        {tab === 'route' && <AddRouteForm />}
        {tab === 'trip' && <AddTripForm />}
      </div>
    </div>
  );
}

function AddOperatorForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('bus');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/admin/operators', { name, type });
      setMessage('Operator created successfully.');
      setName('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create operator.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-navy-800 border border-navy-700 rounded-xl p-6 flex flex-col gap-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Operator Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. GreenLine Travels"
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        >
          <option value="bus">Bus</option>
          <option value="train">Train</option>
        </select>
      </div>
      {message && <p className="text-sm text-gold-500">{message}</p>}
      <button className="bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 hover:bg-gold-400 transition">
        Create Operator
      </button>
    </form>
  );
}

function AddRouteForm() {
  const [operators, setOperators] = useState([]);
  const [operator, setOperator] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/admin/operators').then((res) => setOperators(res.data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/admin/routes', { operator, source, destination, distanceKm: Number(distanceKm) });
      setMessage('Route created successfully.');
      setSource('');
      setDestination('');
      setDistanceKm('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create route.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-navy-800 border border-navy-700 rounded-xl p-6 flex flex-col gap-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Operator</label>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        >
          <option value="">Select operator</option>
          {operators.map((op) => (
            <option key={op._id} value={op._id}>{op.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Source City</label>
        <input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Destination City</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Distance (km)</label>
        <input
          type="number"
          value={distanceKm}
          onChange={(e) => setDistanceKm(e.target.value)}
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        />
      </div>
      {message && <p className="text-sm text-gold-500">{message}</p>}
      <button className="bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 hover:bg-gold-400 transition">
        Create Route
      </button>
    </form>
  );
}

function AddTripForm() {
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [seatCount, setSeatCount] = useState(10);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/admin/routes').then((res) => setRoutes(res.data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/admin/trips', {
        route, date, departureTime, arrivalTime,
        price: Number(price), seatCount: Number(seatCount),
      });
      setMessage('Trip created successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create trip.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-navy-800 border border-navy-700 rounded-xl p-6 flex flex-col gap-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Route</label>
        <select
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        >
          <option value="">Select route</option>
          {routes.map((r) => (
            <option key={r._id} value={r._id}>
              {r.source} → {r.destination} ({r.operator.name})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 uppercase">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50 [color-scheme:dark]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 uppercase">Departure</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
            className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50 [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 uppercase">Arrival</label>
          <input
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
            className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50 [color-scheme:dark]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 uppercase">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 uppercase">Total Seats</label>
          <input
            type="number"
            value={seatCount}
            onChange={(e) => setSeatCount(e.target.value)}
            required
            className="w-full bg-navy-900 border border-navy-700 text-cream rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>
      </div>
      {message && <p className="text-sm text-gold-500">{message}</p>}
      <button className="bg-gold-500 text-navy-950 font-semibold rounded-lg py-2.5 hover:bg-gold-400 transition">
        Create Trip
      </button>
    </form>
  );
}

export default AdminPanel;