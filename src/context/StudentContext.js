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


