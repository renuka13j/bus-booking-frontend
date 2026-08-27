import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Search from './pages/Search';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trip/:id" element={<SeatSelection />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;