// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../utils/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [mandatoryPending, setMandatoryPending] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const udoc = await getDoc(doc(db, "users", user.uid));
      const pdata = udoc.data();
      setProfile(pdata);

      // fetch program mandatory requirements
      // For simplicity, we query courses with category MANDATORY and filter completed
      const csnap = await getDocs(query(collection(db, "courses"), where("category", "==", "MANDATORY")));
      const missing = [];
      csnap.forEach(d => {
        const c = { id: d.id, ...d.data() };
        if (!(pdata.completedCourses || []).includes(c.id)) missing.push(c);
      });
      setMandatoryPending(missing);
    })();
  }, [user]);

  if (!user || !profile) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h1>Welcome, {profile.name}</h1>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 6 }}>
            <div style={{ color: "#666" }}>Credits Completed</div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{(profile.completedCourses || []).length * 3 /* placeholder */}</div>
          </div>
          <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 6 }}>
            <div style={{ color: "#666" }}>Mandatory Pending</div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{mandatoryPending.length}</div>
          </div>
          <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 6 }}>
            <div style={{ color: "#666" }}>Semester Capacity</div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{profile.maxSemCredits}</div>
          </div>
        </div>

        <section style={{ marginTop: 20 }}>
          <h3>Pending mandatory courses</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {mandatoryPending.map(c => (
              <div key={c.id} style={{ padding: 12, background: "#fff", borderRadius: 6 }}>
                <div style={{ fontWeight: 600 }}>{c.name} <span style={{ color: "#666", fontSize: 12 }}>({c.credits} cr)</span></div>
                <div style={{ color: "#666", fontSize: 13 }}>{c.relevance}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
