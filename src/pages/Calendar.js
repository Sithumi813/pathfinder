// src/pages/Calendar.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../utils/AuthProvider";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function CalendarPage() {
  const { user } = useAuth();
  const [planCourses, setPlanCourses] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const udoc = await getDoc(doc(db, "users", user.uid));
      const cp = udoc.data().currentPlan || [];
      if (cp.length) {
        const cs = [];
        for (const id of cp) {
          const cdoc = await getDoc(doc(db, "courses", id));
          if (cdoc.exists()) cs.push({ id: cdoc.id, ...cdoc.data() });
        }
        setPlanCourses(cs);
      }
    })();
  }, [user]);

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 900, margin: "24px auto", padding: 12 }}>
        <h2>Your Current Plan / Timetable</h2>
        <div style={{ display: "grid", gap: 8 }}>
          {planCourses.length ? planCourses.map(c => (
            <div key={c.id} style={{ padding: 12, background: "#fff", borderRadius: 6 }}>
              <div style={{ fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: "#666" }}>{c.credits} cr • {c.description}</div>
            </div>
          )) : <div>No courses in current plan</div>}
        </div>
      </div>
    </>
  );
}
