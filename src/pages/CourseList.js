import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { seedCourses } from "../utils/seedCourses"; 
import { useStudent } from "../context/StudentContext";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseList() {
  const { student } = useStudent();
  const [filter, setFilter] = useState("ALL"); // ALL, MANDATORY, ELECTIVE, SKILL
  const [sortType, setSortType] = useState("NONE"); // NONE, CREDIT, POPULARITY
  const [displayCourses, setDisplayCourses] = useState([]);

  useEffect(() => {
    // Filter courses by student's year + global skill courses
    let courses = seedCourses.filter(course =>
      course.category === "SKILL" || course.year === student.year
    );

    // Apply category filter
    if (filter !== "ALL") {
      courses = courses.filter(course => course.category === filter);
    }

    // Apply sorting
    if (sortType === "CREDIT") {
      courses.sort((a, b) => a.credits - b.credits);
    } else if (sortType === "POPULARITY") {
      courses.sort((a, b) => b.popularity - a.popularity);
    } else if (sortType === "NONE") {
      // Sort by interests
      courses.sort((a, b) => {
        const aMatch = a.tags?.some(tag => student.interests.includes(tag)) ? 1 : 0;
        const bMatch = b.tags?.some(tag => student.interests.includes(tag)) ? 1 : 0;
        return bMatch - aMatch; // courses matching interests first
      });
    }

    setDisplayCourses(courses);
  }, [student, filter, sortType]);

  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: "24px auto", padding: 12 }}>
        <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Available Courses</h2>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <label>Filter:</label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="ALL">All</option>
            <option value="MANDATORY">Mandatory</option>
            <option value="ELECTIVE">Elective</option>
            <option value="SKILL">Skill</option>
          </select>

          <label>Sort:</label>
          <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
            <option value="NONE">By Interests</option>
            <option value="CREDIT">Credits</option>
            <option value="POPULARITY">Popularity</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {displayCourses.map((course) => (
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
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
                  {course.name}
                </div>
                <div><b>ID:</b> {course.id}</div>
                <div><b>Credits:</b> {course.credits}</div>
                <div><b>Category:</b> {course.category}</div>
                <div style={{ marginTop: 6 }}>
                  <b>Tags:</b>{" "}
                  {course.tags?.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#f0f0f0",
                        padding: "2px 6px",
                        borderRadius: 6,
                        marginRight: 4,
                        fontSize: 12,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Button */}
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
                  onClick={() => alert(`Added ${course.name}`)}
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
