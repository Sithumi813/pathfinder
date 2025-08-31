/*import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load student profile when auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "students", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setStudent(snap.data());
        } else {
          console.warn("No student profile found for this user.");
          setStudent(null);
        }
      } else {
        setStudent(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Update profile and force logout so user must re-login
  const updateProfile = async (updatedData) => {
    if (!auth.currentUser) return;
    const ref = doc(db, "students", auth.currentUser.uid);
    await updateDoc(ref, updatedData);
    // Force logout after update to reload year/course data
    await signOut(auth);
    alert("Profile updated. Please log in again to load your courses.");
  };

  return (
    <StudentContext.Provider value={{ student, updateProfile, loading }}>
      {children}
    </StudentContext.Provider>
  );
};*/

import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const StudentContext = createContext();
export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setStudent({ uid: user.uid, ...snap.data() });
        } else {
          // If no profile yet, just store uid
          setStudent({ uid: user.uid });
        }
      } else {
        setStudent(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <StudentContext.Provider value={{ student, setStudent, loading }}>
      {children}
    </StudentContext.Provider>
  );
};


