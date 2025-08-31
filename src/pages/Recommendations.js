// src/pages/Recommendations.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../utils/AuthProvider";

// ---- Utility Functions ----

// Graph-based selection
function recommendWithGraph(courses, profile) {
  // Build graph of prerequisites
  const graph = {};
  courses.forEach(c => (graph[c.id] = c.prerequisites || []));

  // Determine eligible electives/skills (no unmet prereqs)
  const eligible = courses.filter(c =>
    (c.category === "ELECTIVE" || c.category === "SKILL") &&
    (graph[c.id].every(p => profile.completedIds?.includes(p)))
  );

  // Fill credits based on year gap
  const gap = getCreditGap(profile.year);
  let plan = [];
  let total = 0;
  for (let course of eligible) {
    if (total + course.credits <= gap) {
      plan.push(course);
      total += course.credits;
    }
  }

  return { finalPlan: plan, selectedIds: plan.map(c => c.id) };
}

// Heap-based selection
function recommendWithHeap(courses, profile, mode = "POPULARITY") {
  const gap = getCreditGap(profile.year);
  const electives = courses.filter(c => c.category === "ELECTIVE" || c.category === "SKILL");

  // Simple max/min heap simulation using sort
  let sorted;
  if (mode === "POPULARITY") {
    sorted = electives.sort((a, b) => b.popularity - a.popularity);
  } else if (mode === "DIFFICULTY") {
    sorted = electives.sort((a, b) => b.difficulty - a.difficulty);
  } else if (mode === "CREDIT") {
    sorted = electives.sort((a, b) => a.credits - b.credits); // Min heap effect
  }

  let plan = [];
  let total = 0;
  for (let course of sorted) {
    if (total + course.credits <= gap) {
      plan.push(course);
      total += course.credits;
    }
  }

  return { finalPlan: plan, selectedIds: plan.map(c => c.id) };
}

// Credit gap logic
function getCreditGap(year) {
  const limits = {
    1: { mandatory: 34, required: 45 },
    2: { mandatory: 40, required: 48 },
    3: { mandatory: 12, required: 30 },
    4: { mandatory: 18, required: 35 }
  };
  const { mandatory, required } = limits[year] || {};
  return required - mandatory;
}

export default function Recommendations() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [algo, setAlgo] = useState("GRAPH"); // GRAPH | HEAP_POP | HEAP_DIFF | HEAP_MIN

  useEffect(() => {
    (async () => {
      const csnap = await getDocs(collection(db, "courses"));
      setCourses(csnap.docs.map(d => ({ id: d.id, ...d.data() })));
      if (user) {
        const pdoc = await getDoc(doc(db, "users", user.uid));
        setProfile(pdoc.data());
      }
    })();
  }, [user]);

  useEffect(() => {
    if (courses.length && profile) {
      let res;
      if (algo === "GRAPH") {
        res = recommendWithGraph(courses, profile);
      } else if (algo === "HEAP_POP") {
        res = recommendWithHeap(courses, profile, "POPULARITY");
      } else if (algo === "HEAP_DIFF") {
        res = recommendWithHeap(courses, profile, "DIFFICULTY");
      } else if (algo === "HEAP_MIN") {
        res = recommendWithHeap(courses, profile, "CREDIT");
      }
      setResult(res);
    }
  }, [courses, profile, algo]);

  const applyPlan = async () => {
    if (!user || !result) return;
    await updateDoc(doc(db, "users", user.uid), { currentPlan: result.selectedIds });
    alert("Plan applied to your profile (currentPlan). Open Plan preview to confirm or edit.");
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: 12 }}>
        <h2>Recommendations</h2>

        {/* Algorithm Choice */}
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setAlgo("GRAPH")}>Use Graph</button>
          <button onClick={() => setAlgo("HEAP_POP")}>Use Heap (Popularity)</button>
          <button onClick={() => setAlgo("HEAP_DIFF")}>Use Heap (Difficulty)</button>
          <button onClick={() => setAlgo("HEAP_MIN")}>Use Heap (Cheapest)</button>
        </div>

        <button onClick={applyPlan}>Auto-Fill Plan</button>

        <div style={{ marginTop: 12 }}>
          {result ? (
            result.finalPlan.map(c => (
              <div
                key={c.id}
                style={{ padding: 12, background: "#fff", borderRadius: 6, marginBottom: 8 }}
              >
                <div style={{ fontWeight: 700 }}>
                  {c.name} <span style={{ color: "#666" }}>{c.credits} cr</span>
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
