// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState(null);

  // ✅ Save new credential
  const save_info = async (website, email, password) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      alert("User not authenticated");
      return;
    }

    const info = {
      website,
      username: email,
      password,
      userId: uid,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await addDoc(collection(db, "vault_entries"), info);
      window.location.reload(); // Optional: ideally re-fetch state
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  // 🗑️ Delete credential
  const deleteCredential = async (docId) => {
    try {
      await deleteDoc(doc(db, "vault_entries", docId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting credential:", error);
      alert("Delete failed.");
    }
  };

  // ✏️ Update credential
  const updateCredential = async (docId, updatedData) => {
    try {
      const docRef = doc(db, "vault_entries", docId);
      await updateDoc(docRef, {
        ...updatedData,
        date: new Date().toISOString().split("T")[0],
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating credential:", error);
      alert("Update failed.");
    }
  };

  // 👤 Listen to auth changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setCredentials(null);
        // console.log("No user signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  // 📦 Fetch credentials from Firestore
  useEffect(() => {
    const fetchCredentials = async () => {
      if (!user) return;

      try {
        const credentialsRef = collection(db, "vault_entries");
        const q = query(credentialsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCredentials(data);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    fetchCredentials();
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              credentials={credentials}
              save_info={save_info}
              deleteCredential={deleteCredential}
              updateCredential={updateCredential}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
