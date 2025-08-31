import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../utils/AuthProvider";
import { seedCourses } from "../utils/seedCourses";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  // Yearly required credits mapping
  const yearCredits = {
    1: 45,
    2: 48,
    3: 30,
    4: 35,
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      const udoc = await getDoc(doc(db, "users", user.uid));
      const pdata = udoc.data();
      setProfile(pdata);
    })();
  }, [user]);

  if (!user || !profile) return <div>Loading...</div>;

  const enrolledCourses = (profile.enrolledCourses || [])
    .map((id) => seedCourses.find((c) => c.id === id))
    .filter(Boolean);

  const completedCoursesSet = new Set(profile.completedCourses || []);

  const toggleComplete = async (courseId) => {
    const isCompleted = completedCoursesSet.has(courseId);
    const updatedCourses = isCompleted
      ? profile.completedCourses.filter((c) => c !== courseId)
      : [...(profile.completedCourses || []), courseId];

    await updateDoc(doc(db, "users", user.uid), {
      completedCourses: updatedCourses,
    });

    setProfile((prev) => ({
      ...prev,
      completedCourses: updatedCourses,
    }));
  };

  const totalCredits = enrolledCourses.reduce((sum, c) => {
    return sum + (completedCoursesSet.has(c.id) ? c.credits : 0);
  }, 0);

  const requiredCredits = yearCredits[profile.year] || 0;

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h1>Welcome, {profile.name}</h1>

        {/* Credits Card */}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <div
            style={{
              flex: 1,
              padding: 12,
              background: "#fff",
              borderRadius: 6,
            }}
          >
            <div style={{ color: "#666" }}>Credits Completed</div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>
              {totalCredits} / {requiredCredits}
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <section style={{ marginTop: 20 }}>
          <h3>Enrolled Courses</h3>
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                style={{
                  padding: 12,
                  background: "#fff",
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 150, // keeps consistent height
                }}
              >
                <div style={{ fontWeight: 600 }}>{course.name}</div>
                <div style={{ color: "#666", fontSize: 12 }}>
                  {course.category}
                </div>

                {/* Button stays at bottom */}
                <button
                  onClick={() => toggleComplete(course.id)}
                  style={{
                    marginTop: "auto", // pushes button to bottom
                    padding: "6px 10px",
                    borderRadius: 4,
                    border: "none",
                    background: completedCoursesSet.has(course.id)
                      ? "green"
                      : "#ccc",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {completedCoursesSet.has(course.id)
                    ? "✅ Completed"
                    : "Mark Complete"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
