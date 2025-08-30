// src/pages/CourseList.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  const filtered = courses.filter(c => {
    if (filter !== "ALL" && c.category !== filter) return false;
    const term = q.trim().toLowerCase();
    if (!term) return true;
    return c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term);
  });

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h2>Available Courses</h2>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or id" style={{ flex: 1 }} />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option value="MANDATORY">Mandatory</option>
            <option value="ELECTIVE">Elective</option>
            <option value="SKILL">Skill</option>
          </select>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ padding: 12, background: "#fff", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{c.name} <span style={{ color: "#666", fontSize: 12 }}>({c.id})</span></div>
                <div style={{ color: "#666", fontSize: 13 }}>{c.description}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{c.credits} cr</div>
                <Link to="/recommendations"><button style={{ marginTop: 8 }}>Recommend</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
