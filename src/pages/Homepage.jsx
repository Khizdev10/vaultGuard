import { Rocket, PenLine } from "lucide-react";
import Navbar from "../components/navbar.jsx";
import abstract from "../media/rm.png";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Fixed Sidebar */}
      <Navbar />

      {/* Scrollable Content */}
      <div className="flex-1 ml-16 overflow-y-auto">
        {/* HERO SECTION */}
        <main className="min-h-screen p-8 pl-12 flex flex-col md:flex-row items-center justify-between">
          {/* Text Section */}
          <div className="md:w-1/2 mb-10 mt-10 md:mb-0 md:pl-12 w-full">
            <h2 className="text-5xl font-bold mb-4">
              Welcome to VaultGuard
            </h2>

            <p className="text-lg text-gray-300 font-semibold tracking-wide mb-6">
              Your Digital Vault. Fortified. Simplified.
            </p>

            <p className="text-gray-400 tracking-wide mb-6 leading-relaxed">
              Welcome to VaultGuard, your personal fortress for managing
              passwords with confidence. Say goodbye to forgotten logins and
              insecure notes — VaultGuard encrypts, organizes, and protects your
              credentials all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/Login">
                <button className="bg-green-700 hover:bg-green-800 py-2 px-6 rounded transition hover:scale-105">
                  Sign In <Rocket className="w-5 h-5 inline ml-2" />
                </button>
              </a>

              <a href="/Register">
                <button className="bg-white hover:bg-gray-300 text-black py-2 px-6 rounded transition hover:scale-105">
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

        {/* FEATURES SECTION */}
        <section className="w-full mt-24 px-6 md:px-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-green-500">VaultGuard</span>?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Military-Grade Security",
                text:
                  "Your credentials are encrypted and protected using modern security practices.",
              },
              {
                title: "Simple & Organized",
                text:
                  "Manage all your credentials effortlessly in a clean dashboard.",
              },
              {
                title: "Access Anywhere",
                text:
                  "Securely access your vault anytime, anywhere across devices.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-green-700/30 transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-green-400">
                  {item.title}
                </h4>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full mt-32 px-6 md:px-16 text-center">
          <h3 className="text-3xl font-bold mb-12">
            How <span className="text-green-500">VaultGuard</span> Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              "Create an Account",
              "Add Credentials",
              "Access Securely",
            ].map((step, index) => (
              <div key={index}>
                <div className="text-green-500 text-5xl font-bold mb-4">
                  {index + 1}
                </div>
                <h4 className="text-xl font-semibold mb-2">{step}</h4>
                <p className="text-gray-400">
                  Simple, secure, and designed for everyday use.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECURITY PROMISE */}
        <section className="w-full mt-32 bg-gray-800 border-t border-gray-700 px-6 md:px-16 py-16 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Your Privacy Comes <span className="text-green-500">First</span>
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            VaultGuard is built with a security-first mindset. Your data is
            encrypted, never shared, and always under your control.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
