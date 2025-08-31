// src/utils/seedCourses.js
/*
export const seedCourses = [
  { id: "C101", name: "Intro to Programming", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 2, popularity: 95, description: "Basic programming" , relevance: "Foundation for further programming" },
  { id: "C102", name: "Database I", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 90, description: "SQL & relational models", relevance: "Pre-req for DB II" },
  { id: "C103", name: "Programming II", credits: 4, prereqs: ["C101"], category: "MANDATORY", difficulty: 3, popularity: 88, description: "OOP & intermediate coding", relevance: "Needed for Data Structures" },
  { id: "C104", name: "Data Structures", credits: 4, prereqs: ["C103"], category: "MANDATORY", difficulty: 4, popularity: 85, description: "Lists, trees, graphs", relevance: "Core for algorithms" },
  { id: "C105", name: "Database II", credits: 4, prereqs: ["C102"], category: "MANDATORY", difficulty: 4, popularity: 82, description: "Transactions & indexing", relevance: "Data engineering track" },

  { id: "E201", name: "Web Development", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 2, popularity: 92, description: "HTML/CSS/JS basics", relevance: "Useful for projects" },
  { id: "E202", name: "Mobile Development", credits: 3, prereqs: ["C103"], category: "ELECTIVE", difficulty: 3, popularity: 87, description: "Android/Flutter intro", relevance: "Mobile app dev" },
  { id: "E203", name: "Machine Learning Basics", credits: 3, prereqs: ["C104","C105"], category: "ELECTIVE", difficulty: 5, popularity: 80, description: "Intro ML concepts", relevance: "Gateway to AI" },
  { id: "E204", name: "Cloud Computing", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 3, popularity: 86, description: "Cloud fundamentals", relevance: "DevOps & deployments" },
  { id: "E205", name: "Cybersecurity", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 4, popularity: 78, description: "Security basics", relevance: "Security awareness" },

  { id: "S301", name: "Git & Team Workflow", credits: 3, prereqs: [], category: "SKILL", difficulty: 1, popularity: 93, description: "Git, PRs, code reviews", relevance: "Immediate team work benefit" },
  { id: "S302", name: "Data Visualization", credits: 3, prereqs: ["C102"], category: "SKILL", difficulty: 2, popularity: 84, description: "Charts & dashboards", relevance: "Reporting & insights" },
  { id: "S303", name: "Public Speaking", credits: 3, prereqs: [], category: "SKILL", difficulty: 1, popularity: 90, description: "Presentation skills", relevance: "Interviews & demos" },
  { id: "S304", name: "Project Management Basics", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 80, description: "Agile & planning", relevance: "Team leadership" },
  { id: "S305", name: "Docker & Containers", credits: 3, prereqs: ["C101"], category: "SKILL", difficulty: 3, popularity: 82, description: "Containerization basics", relevance: "DevOps readiness" },

  { id: "E301", name: "Advanced Web", credits: 4, prereqs: ["E201"], category: "ELECTIVE", difficulty: 4, popularity: 88, description: "SPA & backend integration", relevance: "Capstone projects" },
  { id: "E302", name: "Deep Learning", credits: 4, prereqs: ["E203"], category: "ELECTIVE", difficulty: 6, popularity: 75, description: "Neural networks", relevance: "Advanced AI" },
  { id: "E303", name: "Big Data Analytics", credits: 4, prereqs: ["C105"], category: "ELECTIVE", difficulty: 5, popularity: 77, description: "Hadoop/Spark intro", relevance: "Data pipelines" },
  { id: "S401", name: "UI/UX Design", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 91, description: "Design basics", relevance: "Product design" },
  { id: "S402", name: "Career Prep Workshop", credits: 2, prereqs: [], category: "SKILL", difficulty: 1, popularity: 94, description: "CVs, interviews", relevance: "Job readiness" },
];
*/
// src/utils/seedCourses.js
export const seedCourses = [
  { id: "C101", name: "Intro to Programming", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 2, popularity: 95, description: "Basic programming", relevance: "Foundation for further programming", tags: ["Programming", "Foundation"] },
  { id: "C102", name: "Database I", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 90, description: "SQL & relational models", relevance: "Pre-req for DB II", tags: ["Database", "SQL"] },
  { id: "C103", name: "Programming II", credits: 4, prereqs: ["C101"], category: "MANDATORY", difficulty: 3, popularity: 88, description: "OOP & intermediate coding", relevance: "Needed for Data Structures", tags: ["Programming", "OOP"] },
  { id: "C104", name: "Data Structures", credits: 4, prereqs: ["C103"], category: "MANDATORY", difficulty: 4, popularity: 85, description: "Lists, trees, graphs", relevance: "Core for algorithms", tags: ["Programming", "Data Structures"] },
  { id: "C105", name: "Database II", credits: 4, prereqs: ["C102"], category: "MANDATORY", difficulty: 4, popularity: 82, description: "Transactions & indexing", relevance: "Data engineering track", tags: ["Database", "Data Engineering"] },

  { id: "E201", name: "Web Development", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 2, popularity: 92, description: "HTML/CSS/JS basics", relevance: "Useful for projects", tags: ["Web", "Frontend"] },
  { id: "E202", name: "Mobile Development", credits: 3, prereqs: ["C103"], category: "ELECTIVE", difficulty: 3, popularity: 87, description: "Android/Flutter intro", relevance: "Mobile app dev", tags: ["Mobile", "App Development"] },
  { id: "E203", name: "Machine Learning Basics", credits: 3, prereqs: ["C104","C105"], category: "ELECTIVE", difficulty: 5, popularity: 80, description: "Intro ML concepts", relevance: "Gateway to AI", tags: ["AI", "Machine Learning"] },
  { id: "E204", name: "Cloud Computing", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 3, popularity: 86, description: "Cloud fundamentals", relevance: "DevOps & deployments", tags: ["Cloud", "DevOps"] },
  { id: "E205", name: "Cybersecurity", credits: 3, prereqs: ["C101"], category: "ELECTIVE", difficulty: 4, popularity: 78, description: "Security basics", relevance: "Security awareness", tags: ["Security", "Networking"] },

  { id: "S301", name: "Git & Team Workflow", credits: 3, prereqs: [], category: "SKILL", difficulty: 1, popularity: 93, description: "Git, PRs, code reviews", relevance: "Immediate team work benefit", tags: ["Teamwork", "Git"] },
  { id: "S302", name: "Data Visualization", credits: 3, prereqs: ["C102"], category: "SKILL", difficulty: 2, popularity: 84, description: "Charts & dashboards", relevance: "Reporting & insights", tags: ["Data", "Visualization"] },
  { id: "S303", name: "Public Speaking", credits: 3, prereqs: [], category: "SKILL", difficulty: 1, popularity: 90, description: "Presentation skills", relevance: "Interviews & demos", tags: ["Communication", "Soft Skills"] },
  { id: "S304", name: "Project Management Basics", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 80, description: "Agile & planning", relevance: "Team leadership", tags: ["Management", "Agile"] },
  { id: "S305", name: "Docker & Containers", credits: 3, prereqs: ["C101"], category: "SKILL", difficulty: 3, popularity: 82, description: "Containerization basics", relevance: "DevOps readiness", tags: ["Cloud", "DevOps", "Containers"] },

  { id: "E301", name: "Advanced Web", credits: 4, prereqs: ["E201"], category: "ELECTIVE", difficulty: 4, popularity: 88, description: "SPA & backend integration", relevance: "Capstone projects", tags: ["Web", "Fullstack"] },
  { id: "E302", name: "Deep Learning", credits: 4, prereqs: ["E203"], category: "ELECTIVE", difficulty: 6, popularity: 75, description: "Neural networks", relevance: "Advanced AI", tags: ["AI", "Deep Learning"] },
  { id: "E303", name: "Big Data Analytics", credits: 4, prereqs: ["C105"], category: "ELECTIVE", difficulty: 5, popularity: 77, description: "Hadoop/Spark intro", relevance: "Data pipelines", tags: ["Data", "Big Data"] },
  { id: "S401", name: "UI/UX Design", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 91, description: "Design basics", relevance: "Product design", tags: ["Design", "UX"] },
  { id: "S402", name: "Career Prep Workshop", credits: 2, prereqs: [], category: "SKILL", difficulty: 1, popularity: 94, description: "CVs, interviews", relevance: "Job readiness", tags: ["Career", "Soft Skills"] },
];

