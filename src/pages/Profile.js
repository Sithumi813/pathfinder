// src/pages/Profile.js
/*import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../utils/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", maxSemCredits: 36, interests: "", year: 1  });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      setProfile(data);
      setForm({
        name: data.name || "",
        maxSemCredits: data.maxSemCredits || 36,
        interests: (data.interests || []).join(", ")
      });
    })();
  }, [user]);

  const save = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      name: form.name,
      maxSemCredits: Number(form.maxSemCredits),
      interests: form.interests.split(",").map(s => s.trim()).filter(Boolean)
    });
    alert("Profile updated");
  };

  if (!profile) return <div>Loading...</div>;
  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 700, margin: "24px auto", padding: 12 }}>
        <h2>Profile</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input value={form.maxSemCredits} onChange={e => setForm({ ...form, maxSemCredits: e.target.value })} />
          <input value={form.interests} onChange={e => setForm({ ...form, interests: e.target.value })} />
          <button onClick={save}>Save</button>
        </div>
      </div>
    </>
  );
}*/
// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../utils/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", maxSemCredits: 36, interests: "", year: 1 });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      setProfile(data);
      setForm({
        name: data.name || "",
        maxSemCredits: data.maxSemCredits || 36,
        interests: (data.interests || []).join(", "),
        year: data.year || 1,
      });
    })();
  }, [user]);

  const save = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      name: form.name,
      maxSemCredits: Number(form.maxSemCredits),
      interests: form.interests.split(",").map(s => s.trim()).filter(Boolean),
      year: Number(form.year), // update year as well
    });
    alert("Profile updated");
  };

  if (!profile) return <div>Loading...</div>;
  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 700, margin: "24px auto", padding: 12 }}>
        <h2>Profile</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            value={form.maxSemCredits}
            onChange={e => setForm({ ...form, maxSemCredits: e.target.value })}
          />
          <input
            value={form.interests}
            onChange={e => setForm({ ...form, interests: e.target.value })}
          />

          {/* Year dropdown */}
          <select
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          >
            <option value={1}>Year 1</option>
            <option value={2}>Year 2</option>
            <option value={3}>Year 3</option>
            <option value={4}>Year 4</option>
          </select>

          <button onClick={save}>Save</button>
        </div>
      </div>
    </>
  );
}
