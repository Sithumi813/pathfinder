// src/pages/Recommendations.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../utils/AuthProvider";
import { seedCourses } from "../utils/seedCourses";

// ---- Utility Functions ----

// Credit gap logic
function getCreditGap(year) {
  const limits = {
    1: { mandatory: 34, required: 45 },
    2: { mandatory: 40, required: 48 },
    3: { mandatory: 12, required: 30 },
    4: { mandatory: 18, required: 35 },
  };
  const { mandatory, required } = limits[year] || {};
  return required - mandatory;
}

// Topological sort to order courses by prerequisites
function topoSort(courses, completedIds) {
  const graph = {};
  const indegree = {};
  const idToCourse = {};

  courses.forEach((c) => {
    graph[c.id] = c.prerequisites || [];
    indegree[c.id] = (c.prerequisites || []).length;
    idToCourse[c.id] = c;
  });

  // Queue with all courses whose prereqs are already satisfied
  const queue = [];
  for (let c of courses) {
    if (indegree[c.id] === 0 || (c.prerequisites || []).every((p) => completedIds.includes(p))) {
      queue.push(c.id);
    }
  }

  const order = [];
  const visited = new Set();

  while (queue.length) {
    const curr = queue.shift();
    if (visited.has(curr)) continue;
    visited.add(curr);
    order.push(idToCourse[curr]);

    // reduce indegree of dependents
    for (let next of courses) {
      if (next.prerequisites?.includes(curr)) {
        indegree[next.id] -= 1;
        if (indegree[next.id] <= 0) queue.push(next.id);
      }
    }
  }

  return order;
}

// Heap-based elective/skill filler
function recommendWithHeap(courses, profile, mode = "POPULARITY") {
  const gap = getCreditGap(profile.year);
  const electives = courses.filter(
    (c) => c.category === "ELECTIVE" || c.category === "SKILL"
  );

  let sorted;
  if (mode === "POPULARITY") sorted = electives.sort((a, b) => b.popularity - a.popularity);
  else if (mode === "DIFFICULTY") sorted = electives.sort((a, b) => b.difficulty - a.difficulty);
  else if (mode === "CREDIT") sorted = electives.sort((a, b) => a.credits - b.credits);

  let plan = [];
  let total = 0;
  for (let course of sorted) {
    if (total + course.credits <= gap) {
      plan.push(course);
      total += course.credits;
    }
  }

  return { plan, selectedIds: plan.map((c) => c.id) };
}

export default function Recommendations() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [result, setResult] = useState(null);
  const [algo, setAlgo] = useState("GRAPH"); // GRAPH | HEAP_POP | HEAP_DIFF | HEAP_MIN

  useEffect(() => {
    (async () => {
      const csnap = await getDocs(collection(db, "courses"));
      const loadedCourses = csnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAllCourses(loadedCourses.length ? loadedCourses : seedCourses);

      if (user) {
        const pdoc = await getDoc(doc(db, "users", user.uid));
        setProfile(pdoc.data());
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!profile || !allCourses.length) return;

    const enrolled = (profile.enrolledCourses || []).map(
      (id) => allCourses.find((c) => c.id === id)
    ).filter(Boolean);

    const completedIds = profile.completedCourses || [];

    let res;
    if (algo === "GRAPH") {
      // Generate course path based on prerequisites
      const order = topoSort(enrolled, completedIds);
      res = { plan: order, selectedIds: order.map((c) => c.id) };
    } else if (algo === "HEAP_POP") {
      res = recommendWithHeap(allCourses, profile, "POPULARITY");
    } else if (algo === "HEAP_DIFF") {
      res = recommendWithHeap(allCourses, profile, "DIFFICULTY");
    } else if (algo === "HEAP_MIN") {
      res = recommendWithHeap(allCourses, profile, "CREDIT");
    }

    setResult(res);
  }, [profile, allCourses, algo]);

  const applyPlan = async () => {
    if (!user || !result) return;
    await updateDoc(doc(db, "users", user.uid), {
      currentPlan: result.selectedIds,
    });
    alert("Plan saved to profile. Check Dashboard to confirm.");
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h2 style={{ marginBottom: 20, color: "#45096fff" }}>Recommendations</h2>

        <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
            <button style={{ color: "#45096fff" }} onClick={() => setAlgo("GRAPH")}>Use Graph (Path)</button>
            <button style={{ color: "#45096fff" }} onClick={() => setAlgo("HEAP_POP")}>Use Heap (Popularity)</button>
            <button style={{ color: "#45096fff" }} onClick={() => setAlgo("HEAP_DIFF")}>Use Heap (Difficulty)</button>
            <button style={{ color: "#45096fff" }} onClick={() => setAlgo("HEAP_MIN")}>Use Heap (Least Credit)</button>
</div>


        <button onClick={applyPlan} style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#45096fff",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer"
          }}>Apply Plan</button>

        <div style={{ marginTop: 16 }}>
          {result ? (
            result.plan.map((c, idx) => (
              <div
                key={c.id}
                style={{
                  padding: 12,
                  background: "#fff",
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 700 }}>
                  Step {idx + 1}: {c.name} <span style={{ color: "#666" }}>({c.credits} cr)</span>
                </div>
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
