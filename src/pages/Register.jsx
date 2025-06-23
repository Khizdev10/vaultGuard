import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { ShieldCheck, Mail, LockKeyhole, UserPlus } from "lucide-react";
import Navbar from "../components/navbar.jsx";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Navigation hook

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("Email is already registered.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // ✅ Navigate on success
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // ✅ Navigate on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <hr className="my-2 border-t border-gray-700 md:hidden" />

        <main className="flex flex-col md:flex-row items-center justify-evenly px-6 py-12 min-h-screen">
          <div className="md:w-1/2 mb-10 md:mb-0 pl-12 pr-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join VaultGuard
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Create your secure VaultGuard account to start protecting your
              digital credentials. Fortify your privacy and simplify your login
              experience.
            </p>
          </div>

          <div className="md:w-1/2 max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6" /> Create Account
            </h3>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-800">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent w-full text-white focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-800">
                  <LockKeyhole className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full text-white focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-600" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-gray-600" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full bg-gray-300 text-black font-semibold py-2 px-4 rounded flex items-center justify-center gap-2 transition hover:scale-105"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                <span className="text-black">SignUp with Google</span>
              </button>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 py-2 px-4 rounded font-semibold text-white flex justify-center items-center gap-2 transition hover:scale-105"
              >
                Register <ShieldCheck className="w-5 h-5" />
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-green-400 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
