import React, { createContext, useState, useContext } from "react";

// Create Student Context
const StudentContext = createContext();

// Hook for easy usage
export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    id: 1,
    name: "John Doe",
    year: "Year 01",          // student's current year
    interests: ["AI", "Web"], // example interests
    completedCourses: [],
    creditLimit: 20,
  });

  const updateProfile = (updatedData) => {
    setStudent((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <StudentContext.Provider value={{ student, updateProfile }}>
      {children}
    </StudentContext.Provider>
  );
};
