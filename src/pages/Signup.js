// src/pages/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", programId: "prog_se_diploma", year: 1, maxSemCredits: 36, interests: "" });
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
        interests: form.interests ? form.interests.split(",").map(s => s.trim()) : [],
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
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Create an account</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <select name="year" value={form.year} onChange={onChange}>
          <option value={1}>Year 1</option><option value={2}>Year 2</option><option value={3}>Year 3</option><option value={4}>Year 4</option>
        </select>
        <input name="maxSemCredits" placeholder="Max semester credits" value={form.maxSemCredits} onChange={onChange} />
        <input name="interests" placeholder="Interests (comma separated, e.g., AI,Web)" value={form.interests} onChange={onChange}/>
        <button type="submit">Sign up</button>
      </form>
      <div style={{ marginTop: 12 }}>Already have an account? <Link to="/login">Log in</Link></div>
    </div>
  );
}
