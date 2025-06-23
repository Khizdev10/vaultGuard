import { useState } from "react";
import { LogIn, Mail, LockKeyhole } from "lucide-react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar / Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <hr className="my-2 border-t border-gray-700 md:hidden" />

        <main className="flex flex-col md:flex-row items-center justify-evenly px-6 py-12 min-h-screen">
          {/* Left Section */}
          <div className="md:w-1/2 mb-10 md:mb-0 pl-12 pr-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Access your secure VaultGuard account and manage your credentials with confidence.
              Your digital vault is just a login away.
            </p>
          </div>

          {/* Right Section: Login Form */}
          <div className="md:w-1/2 max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <LogIn className="w-6 h-6" /> Sign In
            </h3>

            {error && (
              <div className="bg-red-600 text-white text-sm p-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-800">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-800">
                  <LockKeyhole className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent w-full text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* OR Separator */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-600" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-gray-600" />
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-gray-300 text-black font-semibold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition hover:scale-105"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 py-2 px-4 rounded font-semibold text-white flex justify-center items-center gap-2 transition hover:scale-105"
              >
                Sign In <LogIn className="w-5 h-5" />
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Don’t have an account?{" "}
              <a href="/register" className="text-green-400 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
