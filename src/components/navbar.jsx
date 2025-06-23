import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn,
  Menu,
  Home,
  X,
} from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  // Helper to add active class
  const isActive = (path) => location.pathname === path;

  const navButtonClasses = (active) =>
    `w-full flex items-center px-4 py-2 rounded transition ${
      active ? "bg-gray-800 text-white font-semibold" : "hover:bg-gray-800"
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed z-50 top-0 left-0 h-full w-10 flex flex-col justify-between my-4 shadow-md md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 rounded"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-54 bg-gray-900 text-white flex flex-col justify-between border-r border-gray-800 p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-full md:sticky md:h-screen md:translate-x-0`}
      >
        <div>
          <div className="mb-8 flex items-center space-x-2 px-2">
            <h1 className="text-2xl font-bold mt-8">VaultGuard</h1>
          </div>

          <nav className="space-y-2 text-sm font-medium">
            <button
              onClick={() => {
                navigate("/");
                setIsSidebarOpen(false);
              }}
              className={navButtonClasses(isActive("/"))}
            >
              <Home className="mr-2" size={18} />
              Home
            </button>

            <button
              onClick={() => {
                if (user) {
                  navigate("/dashboard");
                  setIsSidebarOpen(false);
                } else {
                  navigate("/login");
                }
              }}
              className={navButtonClasses(isActive("/dashboard"))}
            >
              <LayoutDashboard className="mr-2" size={18} />
              Dashboard
            </button>

            {!user && (
              <>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsSidebarOpen(false);
                  }}
                  className={navButtonClasses(isActive("/register"))}
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </button>

                <button
                  onClick={() => {
                    navigate("/login");
                    setIsSidebarOpen(false);
                  }}
                  className={navButtonClasses(isActive("/login"))}
                >
                  <LogIn className="mr-2" size={18} />
                  Sign In
                </button>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded transition text-red-400"
              >
                <LogOut className="mr-2" size={18} />
                Log Out
              </button>
            )}
          </nav>
        </div>

        <div className="text-xs text-gray-500 px-2">
          &copy; {new Date().getFullYear()} VaultGuard
        </div>
      </aside>
    </>
  );
};

export default Navbar;
