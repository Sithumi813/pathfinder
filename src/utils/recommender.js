// Exports: recommend(courses, profile)
// courses: array of course objects (as in seedCourses)
// profile: { completedCourses: [], currentPlan: [], maxSemCredits: number, interests: [] }

function buildCoursesMap(courses) {
  return Object.fromEntries(courses.map(c => [c.id, c]));
}

// check if prereqs satisfied given completed set + planned set
export function prereqsSatisfied(course, completedSet, planSet = new Set()) {
  const satisfied = new Set([...completedSet, ...planSet]);
  for (const p of course.prereqs || []) {
    if (!satisfied.has(p)) return false;
  }
  return true;
}

// scoring function (tune weights)
function scoreCourse(course, profile, remainingCapacity) {
  let score = 0;

  // ✅ interest match (tags vs profile.interests)
  if (profile.interests && profile.interests.length > 0) {
    if (course.tags && course.tags.some(tag =>
      profile.interests.map(i => i.toLowerCase()).includes(tag.toLowerCase())
    )) {
      score += 40; // boost if interest-tag match
    }
  }

  score += course.popularity || 50; // 0..100
  score += (5 - (course.difficulty || 3)) * 8; // easier gets slight boost
  if (course.credits <= remainingCapacity) score += 10;

  return score;
}


// greedy selection (ranked)
function greedySelect(courses, profile, completedSet, capacity) {
  const scored = courses.map(c => ({ c, s: scoreCourse(c, profile, capacity) }));
  scored.sort((a, b) => b.s - a.s);
  const plan = [];
  let rem = capacity;
  for (const { c } of scored) {
    if (prereqsSatisfied(c, completedSet, new Set(plan.map(x => x.id))) && c.credits <= rem) {
      plan.push(c);
      rem -= c.credits;
    }
  }
  return plan;
}

// Backtracking (subset search) with branch & bound to maximize utility and fill credits reasonably
function backtrackingSearch(candidates, profile, completedSet, capacity) {
  candidates.sort((a, b) => (b.popularity - b.difficulty) - (a.popularity - a.difficulty)); // heuristic
  const n = candidates.length;
  let best = { plan: [], value: -Infinity };

  // precompute upper bound prefix sums for pruning (popularity)
  const ub = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    ub[i] = (i + 1 < n ? ub[i + 1] : 0) + (candidates[i].popularity || 0) + (5 - (candidates[i].difficulty || 3)) * 5;
  }

  function util(plan) {
    // utility: sum(popularity) + bonus for exact fit + interest match
    let u = 0;
    for (const c of plan) {
      u += (c.popularity || 50) - (c.difficulty || 3) * 2;
    }
    // small bonus for more credits used
    const credits = plan.reduce((s, x) => s + x.credits, 0);
    u += credits * 2;
    return u;
  }

  function dfs(i, chosen, creditSum) {
    // prune if over capacity
    if (creditSum > capacity) return;
    // evaluate
    const currentVal = util(chosen);
    if (currentVal > best.value) {
      best = { plan: [...chosen], value: currentVal };
    }
    if (i >= n) return;
    // bound: even if we take all remaining by popularity, can we beat best?
    const possibleBest = currentVal + (ub[i] || 0);
    if (possibleBest <= best.value) return; // prune

    // option: skip i
    dfs(i + 1, chosen, creditSum);

    // option: take i if prereqs satisfied (consider chosen as planned)
    const c = candidates[i];
    const plannedSet = new Set(chosen.map(x => x.id));
    if (prereqsSatisfied(c, completedSet, plannedSet)) {
      chosen.push(c);
      dfs(i + 1, chosen, creditSum + c.credits);
      chosen.pop();
    }
  }

  dfs(0, [], 0);
  return best.plan;
}

// Topological sort for final plan ordering (respect prereqs)
export function topoSortPlan(selectedIds, coursesMap) {
  // Kahn's algorithm on induced subgraph
  const inDegree = {};
  const adj = {};
  for (const id of selectedIds) {
    inDegree[id] = 0;
    adj[id] = [];
  }
  for (const id of selectedIds) {
    const course = coursesMap[id];
    for (const p of course.prereqs || []) {
      if (selectedIds.includes(p)) {
        adj[p].push(id);
        inDegree[id] = (inDegree[id] || 0) + 1;
      }
    }
  }
  const q = [];
  for (const id of selectedIds) if (!inDegree[id]) q.push(id);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of adj[u] || []) {
      inDegree[v]--;
      if (inDegree[v] === 0) q.push(v);
    }
  }
  return order;
}

// Main export
export function recommend(courses, profile) {
  // profile: { completedCourses: [], currentPlan: [], maxSemCredits: number, interests: [] }
  const completedSet = new Set(profile.completedCourses || []);
  const capacity = profile.maxSemCredits || 36;
  const coursesMap = buildCourseMap(courses);

  // candidates: electives + skills + any unlocked mandatory (not completed)
  let candidates = courses.filter(c => {
    const done = completedSet.has(c.id);
    // show only not completed ones
    return !done;
  });

  // first greedy
  const greedy = greedySelect(candidates, profile, completedSet, capacity);

  // if greedy uses capacity well (>=70%) accept, else try backtracking to improve
  const greedyCredits = greedy.reduce((s, c) => s + c.credits, 0);
  let finalPlan = greedy;
  if (greedyCredits / capacity < 0.7) {
    // use backtracking search on subset candidate (limit size for performance)
    const shortlist = candidates.slice(0, 20); // limit search size to 20
    const back = backtrackingSearch(shortlist, profile, completedSet, capacity);
    const backCredits = back.reduce((s, c) => s + c.credits, 0);
    finalPlan = backCredits > greedyCredits ? back : greedy;
  }

  // produce ordered list (IDs)
  const selectedIds = finalPlan.map(c => c.id);
  const topo = topoSortPlan(selectedIds, Object.fromEntries(courses.map(c => [c.id, c])));

  return { finalPlan, selectedIds, topo };
}

// small helper
function buildCourseMap(courses) {
  return Object.fromEntries(courses.map(c => [c.id, c]));
}
