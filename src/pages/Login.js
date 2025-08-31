// src/pages/Login.js
/*import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      nav("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button type="submit">Log in</button>
      </form>
      <div style={{ marginTop: 12 }}>No account? <Link to="/signup">Sign up</Link></div>
    </div>
  );
}*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// ✅ Your Firebase config (replace with your real values from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC5l7RQFLJ1IVEETIGAg76IF2KLQWpmuzM",
  authDomain: "pathfinder-24200.firebaseapp.com",
  projectId: "pathfinder-24200",
  storageBucket: "pathfinder-24200.firebasestorage.app",
  messagingSenderId: "575551396955",
  appId: "1:575551396955:web:58475a8c8084c2af93737e",
  measurementId: "G-3HF2CWW4YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const form = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // ✅ Redirect after successful login
    window.location.href = "dashboard.html";
  } catch (err) {
    messageBox.style.display = "block";
    messageBox.className = "alert alert-danger";
    messageBox.innerText = err.message;
  }
});

