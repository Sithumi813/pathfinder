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

  const currentPlanCourses = (profile.currentPlan || [])
    .map((id) => seedCourses.find((c) => c.id === id))
    .filter(Boolean);

  const completedCourses = (profile.completedCourses || [])
    .map((id) => seedCourses.find((c) => c.id === id))
    .filter(Boolean);

  // Move course from enrolled -> completed
  const toggleComplete = async (courseId) => {
    const updatedEnrolled = profile.enrolledCourses.filter((c) => c !== courseId);
    const updatedCompleted = [...(profile.completedCourses || []), courseId];

    await updateDoc(doc(db, "users", user.uid), {
      enrolledCourses: updatedEnrolled,
      completedCourses: updatedCompleted,
    });

    setProfile((prev) => ({
      ...prev,
      enrolledCourses: updatedEnrolled,
      completedCourses: updatedCompleted,
    }));
  };

  // Enroll course from recommended plan
  const enrollCourse = async (courseId) => {
    if (
      (profile.enrolledCourses || []).includes(courseId) ||
      (profile.completedCourses || []).includes(courseId)
    ) {
      alert("Course already enrolled or completed!");
      return;
    }

    const updatedEnrolled = [...(profile.enrolledCourses || []), courseId];
    const updatedPlan = (profile.currentPlan || []).filter((id) => id !== courseId);

    await updateDoc(doc(db, "users", user.uid), {
      enrolledCourses: updatedEnrolled,
      currentPlan: updatedPlan,
    });

    setProfile((prev) => ({
      ...prev,
      enrolledCourses: updatedEnrolled,
      currentPlan: updatedPlan,
    }));
  };

  // Remove course from enrolled and add back to plan
  const removeEnrollment = async (courseId) => {
    const updatedEnrolled = profile.enrolledCourses.filter((c) => c !== courseId);
    const updatedPlan = [...(profile.currentPlan || []), courseId];

    await updateDoc(doc(db, "users", user.uid), {
      enrolledCourses: updatedEnrolled,
      currentPlan: updatedPlan,
    });

    setProfile((prev) => ({
      ...prev,
      enrolledCourses: updatedEnrolled,
      currentPlan: updatedPlan,
    }));
  };

  const totalCredits = completedCourses.reduce((sum, c) => sum + c.credits, 0);
  const requiredCredits = yearCredits[profile.year] || 0;

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h1 style={{ marginBottom: 20, color: "#45096fff" }}>Welcome, {profile.name}</h1>

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
          <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Enrolled Courses</h2>
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
                  minHeight: 150,
                }}
              >
                <div style={{ fontWeight: 600 }}>{course.name}</div>
                <div style={{ color: "#666", fontSize: 12 }}>{course.category}</div>
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <button
                    onClick={() => toggleComplete(course.id)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: "none",
                      background: "#5cbd76",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => removeEnrollment(course.id)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: "none",
                      background: "#cf5b29",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Recommended Plan */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Current Recommended Plan</h2>
          {currentPlanCourses.length ? (
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {currentPlanCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    padding: 12,
                    background: "#f9fafb",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    minHeight: 150,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{course.name}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>{course.category}</div>
                  <button
                    onClick={() => enrollCourse(course.id)}
                    style={{
                      marginTop: "auto",
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: "none",
                      background: "#45096fff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>No recommended plan yet. Go to Recommendations page.</div>
          )}
        </section>

        {/* Completed Courses */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Completed Courses</h2>
          {completedCourses.length ? (
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {completedCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    padding: 12,
                    background: "#e7f9ef",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    minHeight: 150,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{course.name}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>{course.category}</div>
                  <button
                    style={{
                      marginTop: "auto",
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: "none",
                      background: "green",
                      color: "#fff",
                      cursor: "default",
                    }}
                  >
                    Completed
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>No completed courses yet.</div>
          )}
        </section>
      </div>
    </>
  );
}
