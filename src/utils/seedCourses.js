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
/*export const seedCourses = [
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
];*/
// src/utils/seedCourses.js
export const seedCourses = [
  // ================= YEAR 01 =================
  { id: "C101", name: "Introduction to Computer Science", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 2, popularity: 90, description: "Fundamentals of computing and problem solving", relevance: "Foundation for all computing courses", tags: ["CS Basics"], year: "Year 01" },
  { id: "C102", name: "Mathematics for Computing", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 85, description: "Mathematics applied in computer science", relevance: "Essential for algorithms and analytics", tags: ["Math", "Logic"], year: "Year 01" },
  { id: "C103", name: "Programming Fundamentals", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 2, popularity: 92, description: "Basic coding and problem solving", relevance: "Foundation for advanced programming", tags: ["Programming"], year: "Year 01" },
  { id: "E101", name: "Computer Technology", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 2, popularity: 80, description: "Hardware and IT infrastructure basics", relevance: "Understanding computer systems", tags: ["Hardware"], year: "Year 01" },
  { id: "C104", name: "Object-Oriented Programming", credits: 4, prereqs: ["C103"], category: "MANDATORY", difficulty: 3, popularity: 88, description: "OOP concepts with Java/C++", relevance: "Core programming paradigm", tags: ["OOP", "Programming"], year: "Year 01" },
  { id: "E102", name: "Database Management Systems", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 3, popularity: 86, description: "Relational models & SQL", relevance: "Foundation for data storage", tags: ["Database"], year: "Year 01" },
  { id: "C105", name: "Computer Architecture and Networks", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 82, description: "Computer hardware and network basics", relevance: "Networking & systems knowledge", tags: ["Networking"], year: "Year 01" },
  { id: "E103", name: "GUI Application Development", credits: 3, prereqs: ["C103"], category: "ELECTIVE", difficulty: 3, popularity: 85, description: "Event-driven desktop apps", relevance: "User interface development", tags: ["GUI"], year: "Year 01" },
  { id: "C106", name: "Operating Systems", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 4, popularity: 83, description: "OS principles and processes", relevance: "Core CS subject", tags: ["OS"], year: "Year 01" },
  { id: "E104", name: "Enterprise Application Development-1", credits: 3, prereqs: ["C104"], category: "ELECTIVE", difficulty: 4, popularity: 87, description: "Intro to enterprise-level apps", relevance: "Industry relevant", tags: ["Enterprise"], year: "Year 01" },
  { id: "C107", name: "Web Application Development", credits: 4, prereqs: ["C103"], category: "MANDATORY", difficulty: 3, popularity: 89, description: "HTML, CSS, JavaScript, backend", relevance: "Web development core", tags: ["Web"], year: "Year 01" },
  { id: "E105", name: "Software Engineering", credits: 3, prereqs: ["C103"], category: "ELECTIVE", difficulty: 3, popularity: 88, description: "Software lifecycle & methodologies", relevance: "Development best practices", tags: ["Software Engineering"], year: "Year 01" },
  { id: "C108", name: "Final Project (Diploma)", credits: 6, prereqs: ["C107","C106"], category: "MANDATORY", difficulty: 4, popularity: 92, description: "Capstone project to apply Year 1 skills", relevance: "Practical project experience", tags: ["Project"], year: "Year 01" },

  // ================= YEAR 02 =================
  { id: "C201", name: "Embedded Application Development", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 4, popularity: 80, description: "Programming for embedded systems", relevance: "IoT & hardware development", tags: ["Embedded"], year: "Year 02" },
  { id: "E201", name: "Programming Data Structures and Algorithms", credits: 3, prereqs: ["C104"], category: "ELECTIVE", difficulty: 4, popularity: 85, description: "Advanced data structures & algorithms", relevance: "Core CS subject", tags: ["Algorithms"], year: "Year 02" },
  { id: "C202", name: "Data Analytics", credits: 4, prereqs: ["E102"], category: "MANDATORY", difficulty: 4, popularity: 88, description: "Data analysis & visualization", relevance: "Analytics foundation", tags: ["Data"], year: "Year 02" },
  { id: "E202", name: "Robotics Application Development", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 5, popularity: 78, description: "Building robotics systems", relevance: "Robotics knowledge", tags: ["Robotics"], year: "Year 02" },
  { id: "C203", name: "Advanced Database Management Systems", credits: 4, prereqs: ["E102"], category: "MANDATORY", difficulty: 4, popularity: 84, description: "Advanced SQL & NoSQL concepts", relevance: "Big data foundation", tags: ["Database"], year: "Year 02" },
  { id: "E203", name: "Enterprise Application Development", credits: 3, prereqs: ["E104"], category: "ELECTIVE", difficulty: 4, popularity: 87, description: "Advanced enterprise apps", relevance: "Industry use cases", tags: ["Enterprise"], year: "Year 02" },
  { id: "C204", name: "Mobile Application Development", credits: 4, prereqs: ["C103"], category: "MANDATORY", difficulty: 3, popularity: 90, description: "Android/iOS mobile apps", relevance: "Industry skill", tags: ["Mobile"], year: "Year 02" },
  { id: "E204", name: "Digital Image Processing", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 4, popularity: 82, description: "Image processing techniques", relevance: "AI/ML & graphics", tags: ["Image Processing"], year: "Year 02" },
  { id: "C205", name: "Data Warehousing", credits: 4, prereqs: ["C203"], category: "MANDATORY", difficulty: 4, popularity: 83, description: "ETL & warehouse concepts", relevance: "Analytics backbone", tags: ["Data"], year: "Year 02" },
  { id: "E205", name: "IoT", credits: 3, prereqs: ["C201"], category: "ELECTIVE", difficulty: 4, popularity: 85, description: "Internet of Things apps", relevance: "Smart devices development", tags: ["IoT"], year: "Year 02" },
  { id: "C206", name: "IT Management Practices", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 87, description: "Managing IT systems & teams", relevance: "Industry readiness", tags: ["IT Management"], year: "Year 02" },
  { id: "C207", name: "Software Security", credits: 4, prereqs: ["C106"], category: "MANDATORY", difficulty: 4, popularity: 82, description: "Security in software systems", relevance: "Cybersecurity foundation", tags: ["Security"], year: "Year 02" },
  { id: "C208", name: "Final Project (HND)", credits: 6, prereqs: ["C205","C207"], category: "MANDATORY", difficulty: 5, popularity: 90, description: "Capstone HND project", relevance: "Industry-ready project", tags: ["Project"], year: "Year 02" },
  { id: "E206", name: "Field Visit & Industrial Training", credits: 6, prereqs: [], category: "ELECTIVE", difficulty: 2, popularity: 93, description: "Workplace training", relevance: "Practical exposure", tags: ["Training"], year: "Year 02" },

  // ================= YEAR 03 =================
  { id: "C301", name: "User Experience Designing", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 88, description: "Designing user-friendly apps", relevance: "UI/UX", tags: ["UX"], year: "Year 03" },
  { id: "E301", name: "Programming, Data Structures and Algorithms-2", credits: 3, prereqs: ["E201"], category: "ELECTIVE", difficulty: 5, popularity: 80, description: "Advanced algorithms", relevance: "Research & problem solving", tags: ["Algorithms"], year: "Year 03" },
  { id: "C302", name: "Technology and Its Social, Legal and Ethical Context", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 2, popularity: 85, description: "Ethics & law in IT", relevance: "Professional responsibility", tags: ["Ethics"], year: "Year 03" },
  { id: "E302", name: "Cyber Security", credits: 3, prereqs: ["C207"], category: "ELECTIVE", difficulty: 4, popularity: 84, description: "Advanced cybersecurity", relevance: "Protecting systems", tags: ["Security"], year: "Year 03" },
  { id: "C303", name: "Data Science", credits: 4, prereqs: ["C202"], category: "MANDATORY", difficulty: 5, popularity: 87, description: "Machine learning & analytics", relevance: "AI & analytics", tags: ["Data Science"], year: "Year 03" },
  { id: "E303", name: "Effective Communication Skills", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 1, popularity: 92, description: "Communication skills", relevance: "Workplace & academics", tags: ["Soft Skills"], year: "Year 03" },
  { id: "C304", name: "Agile", credits: 4, prereqs: [], category: "MANDATORY", difficulty: 3, popularity: 89, description: "Agile methodologies", relevance: "Industry practice", tags: ["Agile"], year: "Year 03" },

  // ================= YEAR 04 =================
  { id: "C401", name: "Web API Development", credits: 4, prereqs: ["C107"], category: "MANDATORY", difficulty: 4, popularity: 85, description: "Building REST APIs", relevance: "Full-stack development", tags: ["Web"], year: "Year 04" },
  { id: "E401", name: "Project Discovery", credits: 3, prereqs: [], category: "ELECTIVE", difficulty: 2, popularity: 83, description: "Project scoping & planning", relevance: "Research skills", tags: ["Project"], year: "Year 04" },
  { id: "C402", name: "iOS Development", credits: 4, prereqs: ["C204"], category: "MANDATORY", difficulty: 4, popularity: 82, description: "Apple iOS app development", relevance: "Mobile apps", tags: ["iOS"], year: "Year 04" },
  { id: "E402", name: "Computer Vision", credits: 3, prereqs: ["E204"], category: "ELECTIVE", difficulty: 5, popularity: 80, description: "Computer vision & ML", relevance: "AI applications", tags: ["AI", "Vision"], year: "Year 04" },
  { id: "C403", name: "Artificial Intelligence", credits: 4, prereqs: ["C303"], category: "MANDATORY", difficulty: 5, popularity: 87, description: "AI theory & applications", relevance: "Modern computing", tags: ["AI"], year: "Year 04" },
  { id: "C404", name: "Dissertation and Project Artefact", credits: 6, prereqs: ["C403"], category: "MANDATORY", difficulty: 5, popularity: 92, description: "Final year research project", relevance: "Capstone research", tags: ["Research", "Project"], year: "Year 04" },

  // ================= SKILL / CERTIFICATE =================
  { id: "S101", name: "Certificate Course in Java Application Development", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 90, description: "Java app development basics", relevance: "Entry-level Java skills", tags: ["Java"], year: "Certificate" },
  { id: "S102", name: "Certificate Course in Personal Computer Based Application Packages", credits: 2, prereqs: [], category: "SKILL", difficulty: 1, popularity: 88, description: "PC applications training", relevance: "Basic computing", tags: ["PC Apps"], year: "Certificate" },
  { id: "S103", name: "Certificate Course in Web Application Design and Development", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 91, description: "Web design & dev basics", relevance: "Frontend development", tags: ["Web"], year: "Certificate" },
  { id: "S104", name: "Certificate Course in Computer Science", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 85, description: "Basic CS knowledge", relevance: "Foundation course", tags: ["CS"], year: "Certificate" },
  { id: "S105", name: "Certificate Course in Python Programming", credits: 3, prereqs: [], category: "SKILL", difficulty: 2, popularity: 92, description: "Python basics", relevance: "Programming foundation", tags: ["Python"], year: "Certificate" },
  { id: "S106", name: "Certificate Course in Cybersecurity", credits: 3, prereqs: [], category: "SKILL", difficulty: 3, popularity: 87, description: "Intro to cybersecurity", relevance: "Security awareness", tags: ["Security"], year: "Certificate" },
  { id: "S107", name: "Certificate Course in Advertising & Graphic Design", credits: 2, prereqs: [], category: "SKILL", difficulty: 2, popularity: 83, description: "Graphic design skills", relevance: "Creative computing", tags: ["Design"], year: "Certificate" },
  { id: "S108", name: "Certificate Course in Workplace Essentials (Computing and Communication)", credits: 2, prereqs: [], category: "SKILL", difficulty: 1, popularity: 90, description: "Workplace communication", relevance: "Job readiness", tags: ["Soft Skills"], year: "Certificate" },
  { id: "S109", name: "Certificate Course in Computer Applications", credits: 2, prereqs: [], category: "SKILL", difficulty: 1, popularity: 88, description: "Basic applications training", relevance: "IT literacy", tags: ["Applications"], year: "Certificate" },
  { id: "S110", name: "Certificate Course in Software Engineering", credits: 3, prereqs: [], category: "SKILL", difficulty: 3, popularity: 85, description: "Software development basics", relevance: "Development lifecycle", tags: ["Software Engineering"], year: "Certificate" },
  { id: "S111", name: "Certificate Course in Network Engineering", credits: 3, prereqs: [], category: "SKILL", difficulty: 3, popularity: 84, description: "Networking basics", relevance: "Networking fundamentals", tags: ["Networking"], year: "Certificate" },
  { id: "S112", name: "Certificate Course in Full Stack Web Development", credits: 3, prereqs: [], category: "SKILL", difficulty: 4, popularity: 89, description: "Frontend & backend basics", relevance: "Web projects", tags: ["Fullstack"], year: "Certificate" },
  { id: "S113", name: "Certificate in Computer Science with Artificial Intelligence", credits: 3, prereqs: [], category: "SKILL", difficulty: 3, popularity: 87, description: "CS & AI basics", relevance: "AI foundation", tags: ["AI"], year: "Certificate" },
  { id: "S114", name: "Certificate Course in Cloud Computing - Microsoft Azure", credits: 3, prereqs: [], category: "SKILL", difficulty: 3, popularity: 86, description: "Cloud fundamentals", relevance: "Azure cloud knowledge", tags: ["Cloud"], year: "Certificate" },
];
