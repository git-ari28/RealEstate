import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message || "Sign in failed"));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message || "Network error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-300 to-yellow-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-pink-900 text-center">
            Sign In
          </h1>
          <p className="mt-2 text-center text-pink-800 text-sm">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-pink-900 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-white/70 border border-pink-200 px-4 py-3 text-pink-900 placeholder:text-pink-400 outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-pink-900 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-white/70 border border-pink-200 px-4 py-3 text-pink-900 placeholder:text-pink-400 outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 font-medium tracking-wide uppercase shadow-lg hover:shadow-pink-500/30 hover:from-pink-600 hover:to-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-pink-100 px-3 text-xs tracking-wide text-pink-700 rounded-full">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <OAuth />
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-pink-900">
            <p>Don’t have an account?</p>
            <Link
              to="/sign-up"
              className="text-yellow-700 hover:text-yellow-800 underline underline-offset-4 transition"
            >
              Sign up
            </Link>
          </div>

          {error && (
            <p className="mt-5 text-center text-sm text-rose-600 bg-rose-200/50 border border-rose-300 rounded-xl px-4 py-2">
              {error}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-pink-900">
          By continuing, you agree to our{" "}
          <span className="underline decoration-dotted">Terms</span> &{" "}
          <span className="underline decoration-dotted">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
