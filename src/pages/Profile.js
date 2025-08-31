import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useStudent } from "../context/StudentContext";

export default function Profile() {
  const { student, updateProfile } = useStudent();
  const [name, setName] = useState(student.name);
  const [year, setYear] = useState(student.year);
  const [interests, setInterests] = useState(student.interests.join(", "));

  const handleSave = () => {
    const updatedData = {
      name,
      year,
      interests: interests.split(",").map(i => i.trim())
    };
    updateProfile(updatedData);
    alert("Profile updated!");
  };

  return (
    <div>
      <NavBar />
      <h1>Profile</h1>

      <div>
        <label>Name: </label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Year: </label>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="Year 01">Year 01</option>
          <option value="Year 02">Year 02</option>
          <option value="Year 03">Year 03</option>
          <option value="Year 04">Year 04</option>
        </select>

        <label>Interests (comma-separated): </label>
        <input value={interests} onChange={e => setInterests(e.target.value)} />

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
