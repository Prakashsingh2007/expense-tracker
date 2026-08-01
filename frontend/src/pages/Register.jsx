import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const userData = {
      username,
      email,
      password,
    };

    try {
      await register(userData);

      navigate("/login", {
        state: { message: "Registration successful. You can sign in now." },
      });
    } catch (error) {
      setError(error.response?.data?.detail || "Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="app-card w-full max-w-md p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Create account</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Register</h2>
          <p className="mt-2 text-sm text-slate-500">Set up your account to start tracking your finances.</p>
        </div>

        {error ? (
          <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="app-input"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-input"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="app-input"
              required
            />
          </label>

          <button
            type="submit"
            className="app-button-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-sky-700 hover:text-sky-800"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;