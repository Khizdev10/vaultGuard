import {
  Lock,
  Globe,
  Mail,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  PenLine,
  X,
} from "lucide-react";
import Navbar from "../components/navbar.jsx";
import { useState } from "react";

const Dashboard = (props) => {
  const credentials = props.credentials || [];
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingCredentialId, setEditingCredentialId] = useState(null);
  const [formData, setFormData] = useState({
    website: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openAddModal = () => {
    setFormData({ website: "", email: "", password: "" });
    setEditingCredentialId(null);
    setShowModal(true);
  };

  const openEditModal = (cred) => {
    setFormData({
      website: cred.website,
      email: cred.username,
      password: cred.password,
    });
    setEditingCredentialId(cred.id);
    setShowModal(true);
  };

  const handleSaveCredential = async () => {
    if (editingCredentialId) {
      try {
        await props.updateCredential(editingCredentialId, {
          website: formData.website,
          username: formData.email,
          password: formData.password,
        });
        // alert("Credential updated!");
      } catch (error) {
        console.error("Failed to update:", error);
        alert("Update failed.");
      }
    } else {
      props.save_info(formData.website, formData.email, formData.password);
    }

    setFormData({ website: "", email: "", password: "" });
    setEditingCredentialId(null);
    setShowModal(false);
  };

  const handleDelete = async (docId) => {
    if (!docId || typeof docId !== "string") {
      // alert("Invalid document ID.");
      return;
    }

    try {
      await props.deleteCredential(docId);
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="flex-1 p-6 md:p-10" style={{ paddingLeft: "65px" }}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Lock size={26} />
            Vault
          </h1>
          <button
            onClick={openAddModal}
            className="bg-green-700 hover:bg-green-800 transition text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:scale-105"
          >
            <PenLine size={18} />
            Add
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700 relative shadow-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCredentialId(null);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                {editingCredentialId ? "Edit Credential" : "Add New Credential"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Website"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  onClick={handleSaveCredential}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md font-semibold"
                >
                  {editingCredentialId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Credential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.length === 0 ? (
  <div className="flex flex-1 items-center  justify-center h-[60vh] w-full text-gray-400 text-lg"
  style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
    No credentials added . . .
  </div>
) : (
  credentials.map((cred) => (
    <div
      key={cred.id}
      className="bg-gray-850 rounded-xl p-6 transition-all duration-200 border border-gray-700 shadow-md hover:shadow-green-700/30 hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <div className="bg-gray-700 p-3 rounded-full mr-3">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{cred.website}</h3>
          <p className="text-gray-400 text-xs">{cred.date}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <div className="flex items-center bg-gray-700 rounded px-3 py-2 mt-1 text-sm">
            <Mail size={16} className="text-gray-400 mr-2" />
            {cred.username}
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Password</p>
          <div className="flex items-center justify-between bg-gray-700 rounded px-3 py-2 mt-1 text-sm">
            <div className="flex items-center">
              <Lock size={16} className="text-gray-400 mr-2" />
              {revealedPasswords[cred.id] ? cred.password : "••••••••"}
            </div>
            <button
              onClick={() => togglePasswordVisibility(cred.id)}
              className="text-gray-400 hover:text-white"
            >
              {revealedPasswords[cred.id] ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <button
          onClick={() => openEditModal(cred)}
          className="text-gray-400 hover:text-green-500 transition"
        >
          <PenLine size={18} />
        </button>
        <button
          onClick={() => handleDelete(cred.id)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  ))
)}
 
          
         
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
