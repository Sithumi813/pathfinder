// src/utils/api.js
export async function getUserProfile() {
  // mock example
  return {
    id: 1,
    name: "John Doe",
    year: "Year 2",
    interests: ["AI", "Web Development"],
    completedCourses: [],
    creditLimit: 20,
  };
}

export async function updateUserProfile(updates) {
  // in real app, send updates to backend
  return {
    ...updates,
    id: 1, // keep the id same
  };
}
