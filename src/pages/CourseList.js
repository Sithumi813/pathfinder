import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { seedCourses } from "../utils/seedCourses"; 
import { Plus } from "lucide-react"; 
import { motion } from "framer-motion";
import { useStudent } from "../context/StudentContext";

export default function CourseList() {
  const { student } = useStudent();
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NONE");

  useEffect(() => {
    setCourses(seedCourses);
  }, []);

  const filtered = courses
    .filter((c) => {
      // Show skill courses for all years, others only for student's year
      if (c.category !== "SKILL" && c.year !== student.year) return false;

      // Apply filter dropdown
      if (filter !== "ALL" && c.category !== filter) return false;

      const term = q.trim().toLowerCase();
      if (!term) return true;

      return c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term);
    })
    .sort((a, b) => {
      if (sortBy === "POPULARITY") return b.popularity - a.popularity;
      if (sortBy === "DIFFICULTY") return b.difficulty - a.difficulty;

      // Default: order by student interests matching course tags
      const aMatch = a.tags.filter(tag => student.interests.includes(tag)).length;
      const bMatch = b.tags.filter(tag => student.interests.includes(tag)).length;
      return bMatch - aMatch;
    });

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: "24px auto", padding: 12 }}>
        <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Available Courses</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or id"
            style={{ flex: 1, padding: 8 }}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option value="MANDATORY">Mandatory</option>
            <option value="ELECTIVE">Elective</option>
            <option value="SKILL">Skill</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="NONE">Sort By</option>
            <option value="POPULARITY">Popularity</option>
            <option value="DIFFICULTY">Difficulty</option>
          </select>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: 16,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{c.name}</div>
                <div><b>ID:</b> {c.id}</div>
                <div><b>Credits:</b> {c.credits}</div>
                <div><b>Prereqs:</b> {c.prereqs.length > 0 ? c.prereqs.join(", ") : "None"}</div>
                <div style={{ marginTop: 6, fontSize: 14, color: "#444" }}><b>Description:</b> {c.description}</div>
                <div style={{ marginTop: 6, fontSize: 14, color: "#444" }}><b>Relevance:</b> {c.relevance}</div>
                <div style={{ marginTop: 6 }}>
                  <b>Tags:</b>{" "}
                  {c.tags.map((tag) => (
                    <span key={tag} style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 6, marginRight: 4, fontSize: 12 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button
                  style={{
                    background: "#45096fff",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => alert(`Added ${c.name}`)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { seedCourses } from "../utils/seedCourses"; 
import { Plus } from "lucide-react"; 
import { motion } from "framer-motion";
import { useStudent } from "../context/StudentContext";