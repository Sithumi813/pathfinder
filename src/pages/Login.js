import React, { useState } from "react";
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
    <div style={{ maxWidth: 400, margin: "60px auto", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", background: "#fff"}}>
      <h2 style={{ textAlign: "center" ,  marginBottom: "20px", color: "#45096fff" }}>Login to PathFinder </h2>
      <form onSubmit={submit} style={{ display: "grid", gap: "15px" }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required style={{
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #45096fff",
        fontSize: "14px"
      }}/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required style={{
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #45096fff",
        fontSize: "14px"
      }}/>
        <button type="submit" style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#45096fff",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}>Log in</button>
      </form>
      <div style={{ marginTop: "15px", textAlign: "center"}}> <span style={{ fontSize: "14px" }}> No account?{" "} <Link to="/signup" style={{ color: "#45096fff", fontWeight: "600", textDecoration: "none" }}>Sign up</Link></span></div>
    </div>
  );
}




