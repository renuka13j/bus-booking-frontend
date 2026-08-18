import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div
        className="w-full max-w-6xl bg-white rounded-[30px] overflow-hidden grid lg:grid-cols-2 shadow-xl"
        style={{
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >

        {/* LEFT SECTION */}

        <div className="hidden lg:flex bg-blue-700 text-white p-14 flex-col justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-white p-3 rounded-full">

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

                Book your next journey with confidence.

              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8">

                Fast, secure and comfortable bus ticket booking
                for hundreds of destinations across India.

              </p>

            </div>

          </div>

          <div>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <FaMapMarkerAlt className="text-yellow-300 text-xl"/>

                <span>250+ Cities Covered</span>

              </div>

              <div className="flex items-center gap-4">

                <FaClock className="text-yellow-300 text-xl"/>

                <span>24×7 Customer Support</span>

              </div>

              <div className="flex items-center gap-4">

                <FaShieldAlt className="text-yellow-300 text-xl"/>

                <span>100% Secure Booking</span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="flex justify-center items-center p-8 md:p-14">

          <div className="w-full max-w-md">

            <div className="lg:hidden flex justify-center mb-8">

              <div className="bg-blue-700 p-4 rounded-full">

                <FaBus className="text-white text-3xl"/>

              </div>

            </div>

            <h2 className="text-4xl font-bold text-slate-800">

              Welcome Back 👋

            </h2>

            <p className="text-gray-500 mt-3">

              Login to continue your journey.

            </p>

            <form
              onSubmit={submitHandler}
              className="mt-10 space-y-6"
            >

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
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    transition"
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
                    placeholder="Enter your password"
                    required
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12
                    focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute top-4 right-4 text-gray-500 hover:text-blue-700"
                  >

                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}

                  </button>

                </div>

              </div>

              <div className="flex justify-between text-sm">

                <label className="flex items-center gap-2">

                  <input type="checkbox"/>

                  Remember Me

                </label>

                <button
                  type="button"
                  className="text-blue-700 hover:underline"
                >

                  Forgot Password?

                </button>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800
                text-white py-3 rounded-xl font-semibold
                transition duration-300 disabled:bg-blue-400"
              >

                {loading ? "Logging In..." : "Login"}

              </button>

            </form>

            <div className="mt-8 text-center">

              <p className="text-gray-600">

                Don't have an account?

                <Link
                  to="/signup"
                  className="text-blue-700 font-semibold ml-2 hover:underline"
                >

                  Create Account

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