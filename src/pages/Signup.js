// src/pages/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { seedCourses } from "../utils/seedCourses";

// collect unique tags from seedCourses
const allTags = Array.from(new Set(seedCourses.flatMap(c => c.tags || [])));

// year → max credits mapping
const yearCredits = {
  1: 45,
  2: 48,
  3: 20,
  4: 20,
};

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    programId: "prog_se_diploma",
    year: 1,
    maxSemCredits: yearCredits[1],
    interests: []
  });

  const nav = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      const yearNum = Number(value);
      setForm((prev) => ({
        ...prev,
        year: yearNum,
        maxSemCredits: yearCredits[yearNum] // auto update credits
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const toggleInterest = (tag) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter(i => i !== tag)
        : [...prev.interests, tag]
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", cred.user.uid), {
        name: form.name,
        email: form.email,
        programId: form.programId,
        year: Number(form.year),
        maxSemCredits: Number(form.maxSemCredits),
        interests: form.interests,
        completedCourses: [],
        currentPlan: [],
        enrolledCourses: []
      });
      nav("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", background: "#fff"}}>
      <h2 style={{ textAlign: "center" ,  marginBottom: "20px", color: "#45096fff" }}>Create an Account</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: "15px" }}>
        
        <input name="name" type="text" placeholder="Full name" value={form.name} onChange={onChange} style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #45096fff",
          fontSize: "14px"
        }} required />

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #45096fff",
          fontSize: "14px"
        }} required />

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #45096fff",
          fontSize: "14px"
        }} required />

        <select name="year" value={form.year} onChange={onChange} style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #45096fff",
          fontSize: "14px"
        }}>
          <option value={1}>Year 1</option>
          <option value={2}>Year 2</option>
          <option value={3}>Year 3</option>
          <option value={4}>Year 4</option>
        </select>

        {/* Auto-updated credits field */}
        <input
          name="maxSemCredits"
          placeholder="Max semester credits"
          value={form.maxSemCredits}
          readOnly
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #45096fff",
            fontSize: "14px",
            background: "#f3f3f3"
          }}
        />

        <div>
          <h4 style={{ marginBottom: "15px" }}>Select Interests:</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
            {allTags.map(tag => (
              <label key={tag} style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={form.interests.includes(tag)}
                  onChange={() => toggleInterest(tag)}
                /> {tag}
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit"style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#45096fff",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}>Sign up</button>
      </form>
      <div style={{ marginTop: "15px", textAlign: "center"}}> 
        <span style={{ fontSize: "14px" }}> Already have an account?{" "} 
          <Link to="/login" style={{ color: "#45096fff", fontWeight: "600", textDecoration: "none" }}>Log in</Link>
        </span>
      </div>
    </div>
  );
}
