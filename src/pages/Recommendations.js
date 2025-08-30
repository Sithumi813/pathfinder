// src/pages/Recommendations.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { recommend } from "../utils/recommender";
import { useAuth } from "../utils/AuthProvider";

export default function Recommendations() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const csnap = await getDocs(collection(db, "courses"));
      setCourses(csnap.docs.map(d => ({ id: d.id, ...d.data() })));
      if (user) {
        const pdoc = await getDoc(doc(db, "users", user.uid));
        setProfile(pdoc.data());
      }
    })();
  }, [user]);

  useEffect(() => {
    if (courses.length && profile) {
      const res = recommend(courses, profile);
      setResult(res);
    }
  }, [courses, profile]);

  const applyPlan = async () => {
    if (!user || !result) return;
    await updateDoc(doc(db, "users", user.uid), { currentPlan: result.selectedIds });
    alert("Plan applied to your profile (currentPlan). Open Plan preview to confirm or edit.");
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h2>Recommendations</h2>
        <button onClick={applyPlan}>Auto-Fill Plan</button>
        <div style={{ marginTop: 12 }}>
          {result ? (
            result.finalPlan.map(c => (
              <div key={c.id} style={{ padding: 12, background: "#fff", borderRadius: 6, marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{c.name} <span style={{ color: "#666" }}>{c.credits} cr</span></div>
                <div style={{ color: "#666" }}>{c.description}</div>
              </div>
            ))
          ) : (
            <div>Computing recommendations...</div>
          )}
        </div>
      </div>
    </>
  );
}
