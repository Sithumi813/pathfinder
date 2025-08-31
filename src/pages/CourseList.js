import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { seedCourses } from "../utils/seedCourses";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useStudent } from "../context/StudentContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default function CourseList() {
  const { student, loading } = useStudent();
  const [filter, setFilter] = useState("ALL");
  const [sortType, setSortType] = useState("NONE");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCourses, setDisplayCourses] = useState([]);

  useEffect(() => {
    if (!student || !student.year) return;

    // Show SKILL + all courses for that year 
    let courses = seedCourses.filter(c =>
      c.category === "SKILL" || c.year === `Year 0${student.year}`
    );

    if (filter !== "ALL") courses = courses.filter(c => c.category === filter);

    const term = searchQuery.trim().toLowerCase();
    if (term) {
      courses = courses.filter(c =>
        c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term)
      );
    }

    if (sortType === "CREDIT") courses.sort((a, b) => a.credits - b.credits);
    else if (sortType === "POPULARITY") courses.sort((a, b) => b.popularity - a.popularity);
    else if (sortType === "DIFFICULTY") courses.sort((a, b) => b.difficulty - a.difficulty);
    else {
      courses.sort((a, b) => {
        const aMatch = a.tags?.some(tag => student.interests?.includes(tag)) ? 1 : 0;
        const bMatch = b.tags?.some(tag => student.interests?.includes(tag)) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    setDisplayCourses(courses);
  }, [student, filter, sortType, searchQuery]);

  const enrollCourse = async (course) => {
    if (!student?.uid) {
      alert("Please log in to enroll.");
      return;
    }
    try {
      await updateDoc(doc(db, "users", student.uid), {
        enrolledCourses: arrayUnion(course.id)
      });
      alert(`Enrolled in ${course.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to enroll");
    }
  };

  if (loading) return <div>Loading student profile...</div>;
  if (!student?.year) return <div>No student data found. Please update your profile.</div>;

  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: "24px auto", padding: 12 }}>
        <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Available Courses</h2>

        {/* Search + Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or id"
            style={{ flex: 1, padding: 8 }}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option value="MANDATORY">Mandatory</option>
            <option value="ELECTIVE">Elective</option>
            <option value="SKILL">Skill</option>
          </select>
          <select value={sortType} onChange={e => setSortType(e.target.value)}>
            <option value="NONE">By Interests</option>
            <option value="CREDIT">Credits</option>
            <option value="POPULARITY">Popularity</option>
            <option value="DIFFICULTY">Difficulty</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
          }}
        >
          {displayCourses.map(course => (
            <motion.div
              key={course.id}
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
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{course.name}</div>
                <div><b>ID:</b> {course.id}</div>
                <div><b>Credits:</b> {course.credits}</div>
                <div><b>Difficulty:</b> {course.difficulty ?? "N/A"}</div>
                <div><b>Category:</b> {course.category}</div>
                <div style={{ marginTop: 6 }}>
                  <b>Tags:</b>{" "}
                  {course.tags?.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: "#f0f0f0",
                        padding: "2px 6px",
                        borderRadius: 6,
                        marginRight: 4,
                        fontSize: 12
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enroll Button */}
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
                    cursor: "pointer"
                  }}
                  onClick={() => enrollCourse(course)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
