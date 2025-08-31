// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const nav = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      nav("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav style={{ padding: 12, background: "#fff", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontWeight: 700 }}>Path Finder</div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
