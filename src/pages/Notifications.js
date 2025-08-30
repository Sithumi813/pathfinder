// src/pages/Notifications.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../utils/AuthProvider";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const q = query(collection(db, "reminders"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, [user]);

  const add = async () => {
    if (!text || !user) return;
    await addDoc(collection(db, "reminders"), { userId: user.uid, text, createdAt: new Date() });
    setText("");
    alert("Reminder added (you can implement push or email reminders via Cloud Functions later).");
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 700, margin: "24px auto", padding: 12 }}>
        <h2>Reminders</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Reminder text" style={{ flex: 1 }} />
          <button onClick={add}>Add</button>
        </div>
        <ul>
          {notes.map(n => <li key={n.id}>{n.text}</li>)}
        </ul>
      </div>
    </>
  );
}
