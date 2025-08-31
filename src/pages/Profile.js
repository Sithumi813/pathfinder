import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { seedCourses } from "../utils/seedCourses";
import { useAuth } from "../utils/AuthProvider";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const allTags = Array.from(new Set(seedCourses.flatMap(c => c.tags || [])));

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    year: 1,
    maxSemCredits: 36,
    interests: []
  });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          name: data.name || "",
          year: data.year || 1,
          maxSemCredits: data.maxSemCredits || 36,
          interests: data.interests || []
        });
      }
      setLoading(false);
    })();
  }, [user]);

  const toggleInterest = (tag) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter(i => i !== tag)
        : [...prev.interests, tag]
    }));
  };

  const handleSave = async () => {
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      name: form.name,
      year: Number(form.year),
      maxSemCredits: Number(form.maxSemCredits),
      interests: form.interests
    });

    window.dispatchEvent(new Event("coursesUpdated"));

    alert("Profile updated!");};

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: 700, margin: "24px auto", padding: 12 }}>
        <h1>Profile</h1>
        <div style={{ display: "grid", gap: 12 }}>
          
          <label>Name:</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <label>Year:</label>
          <select
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          >
            <option value={1}>Year 01</option>
            <option value={2}>Year 02</option>
            <option value={3}>Year 03</option>
            <option value={4}>Year 04</option>
          </select>

          <label>Maximum Semester Credits:</label>
          <input
            type="number"
            value={form.maxSemCredits}
            onChange={e => setForm({ ...form, maxSemCredits: e.target.value })}
          />

          <div>
            <h4 style={{ marginBottom: "15px" }}>Select Interests:</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
              {allTags.map(tag => (
                <label key={tag} style={{ fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    checked={form.interests.includes(tag)}
                    onChange={() => toggleInterest(tag)}
                  /> {tag}
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
