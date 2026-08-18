import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBus,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div
        className="w-full max-w-6xl bg-white rounded-[30px] overflow-hidden grid lg:grid-cols-2 shadow-xl"
        style={{
          boxShadow: "0 20px 60px rgba(0,0,0,.08)",
        }}
      >

        {/* LEFT SECTION */}

        <div className="hidden lg:flex bg-blue-700 text-white p-14 flex-col justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-white rounded-full p-3">

                <FaBus className="text-blue-700 text-3xl"/>

              </div>

              <div>

                <h1 className="text-3xl font-bold">

                  Bus Booking

                </h1>

                <p className="text-blue-100">

                  Travel Smarter

                </p>

              </div>

            </div>

            <div className="mt-16">

              <h2 className="text-5xl font-bold leading-tight">

                Join thousands of happy travellers.

              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8">

                Create your account and enjoy secure,
                fast and hassle-free bus ticket booking.

              </p>

            </div>

          </div>

          <div>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <FaMapMarkerAlt className="text-yellow-300 text-xl"/>

                <span>250+ Destinations</span>

              </div>

              <div className="flex items-center gap-4">

                <FaClock className="text-yellow-300 text-xl"/>

                <span>Instant Ticket Confirmation</span>

              </div>

              <div className="flex items-center gap-4">

                <FaShieldAlt className="text-yellow-300 text-xl"/>

                <span>Safe & Secure Payments</span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="flex justify-center items-center p-8 md:p-14">

          <div className="w-full max-w-md">

            <div className="lg:hidden flex justify-center mb-8">

              <div className="bg-blue-700 rounded-full p-4">

                <FaBus className="text-white text-3xl"/>

              </div>

            </div>

            <h2 className="text-4xl font-bold text-slate-800">

              Create Account

            </h2>

            <p className="text-gray-500 mt-3">

              Start your journey with us.

            </p>

            <form
              onSubmit={submitHandler}
              className="mt-10 space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">

                  Full Name

                </label>

                <div className="relative">

                  <FaUser className="absolute top-4 left-4 text-gray-400"/>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHandler}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">

                  Email Address

                </label>

                <div className="relative">

                  <FaEnvelope className="absolute top-4 left-4 text-gray-400"/>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                </div>

              </div>

              {/* PHONE */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">

                  Phone Number

                </label>

                <div className="relative">

                  <FaPhone className="absolute top-4 left-4 text-gray-400"/>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={changeHandler}
                    placeholder="Enter your phone number"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">

                  Password

                </label>

                <div className="relative">

                  <FaLock className="absolute top-4 left-4 text-gray-400"/>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={changeHandler}
                    placeholder="Create password"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-blue-700"
                  >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">

                  Confirm Password

                </label>

                <div className="relative">

                  <FaLock className="absolute top-4 left-4 text-gray-400"/>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={changeHandler}
                    placeholder="Confirm password"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute top-4 right-4 text-gray-500 hover:text-blue-700"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash/>
                    ) : (
                      <FaEye/>
                    )}
                  </button>

                </div>

              </div>

              {/* TERMS */}

              <div className="flex items-start gap-3 text-sm">

                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />

                <span className="text-gray-600">

                  I agree to the Terms & Conditions and Privacy Policy.

                </span>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition disabled:bg-blue-400"
              >

                {loading ? "Creating Account..." : "Create Account"}

              </button>

            </form>

            <div className="mt-8 text-center">

              <p className="text-gray-600">

                Already have an account?

                <Link
                  to="/"
                  className="ml-2 text-blue-700 font-semibold hover:underline"
                >

                  Login

                </Link>

              </p>

            </div>

            <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">

              © 2026 Bus Ticket Booking Platform

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}