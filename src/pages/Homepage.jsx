import { Rocket, PenLine } from "lucide-react";
import Navbar from "../components/navbar.jsx"; // This is your Sidebar
import abstract from "../media/rm.png";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-8  pl-12 flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div
          className="md:w-1/2 mb-10 mt-10 md:mb-0 md:pl-12"
          style={{ width: "100%" }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Welcome to VaultGuard
          </h2>
          <p className="text-lg text-gray-300 font-semibold tracking-wide mb-6">
            Your Digital Vault. Fortified. Simplified.
          </p>
          <p className="text-gray-400 tracking-wide mb-6 leading-relaxed">
            Welcome to VaultGuard, your personal fortress for managing passwords
            with confidence. Say goodbye to forgotten logins and insecure notes
            — VaultGuard encrypts, organizes, and protects your credentials all
            in one place. Whether you're at home or on the move, your digital
            life stays locked tight and accessible only to you.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4">
            <a href="/Login">
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded hover:scale-105 transition">
                Sign In <Rocket className="w-5 h-5 inline ml-2" />
              </button>
            </a>
            <a href="/Register">
              {" "}
              <button className="bg-white hover:bg-gray-300 text-black font-semibold py-2 px-6 rounded hover:scale-105 transition">
                Sign Up <PenLine className="w-5 h-5 inline ml-2" />
              </button>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={abstract}
            alt="Fingerprint Illustration"
            className="w-80 md:w-[30rem] drop-shadow-[0_0_33px_rgba(34,197,94,0.5)]"
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
