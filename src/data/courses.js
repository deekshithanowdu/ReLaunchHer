export const initialCoursesByPath = {
  "Frontend Developer": [
    {
      id: "course-fe-1",
      title: "HTML & CSS Modern Layouts",
      description: "Learn modern flexbox, CSS grid, responsiveness, and web design fundamentals.",
      duration: "6 hours",
      progress: 100,
      status: "Completed",
      resources: ["https://web.dev/learn/css", "Flexbox Froggy", "Grid Garden"],
      week: "Week 1"
    },
    {
      id: "course-fe-2",
      title: "JavaScript Basics and DOM",
      description: "Dive deep into variables, functions, scopes, array methods, and event handlers.",
      duration: "10 hours",
      progress: 80,
      status: "In Progress",
      resources: ["MDN JavaScript Guide", "Eloquent JavaScript Book"],
      week: "Week 2"
    },
    {
      id: "course-fe-3",
      title: "React Essentials and Component State",
      description: "Understand functional components, hooks (useState, useEffect), and JSX formatting.",
      duration: "12 hours",
      progress: 20,
      status: "In Progress",
      resources: ["React Official Documentation - Quick Start", "Scrimba React Course"],
      week: "Week 3"
    },
    {
      id: "course-fe-4",
      title: "Git, GitHub & REST API Integration",
      description: "Learn branching, merging, and how to query APIs with fetch/axios.",
      duration: "8 hours",
      progress: 0,
      status: "Not Started",
      resources: ["Git Flight Manual", "JSONPlaceholder API sandbox"],
      week: "Week 4"
    },
    {
      id: "course-fe-5",
      title: "Portfolio Development & Deployments",
      description: "Construct 3 React projects, configure client router, and publish to Vercel/Netlify.",
      duration: "15 hours",
      progress: 0,
      status: "Not Started",
      resources: ["Vercel documentation", "Netlify drag-and-drop"],
      week: "Week 5"
    }
  ],
  "UI/UX Designer": [
    {
      id: "course-ui-1",
      title: "Figma Masterclass",
      description: "Understand auto layouts, component overrides, libraries, and frames.",
      duration: "8 hours",
      progress: 100,
      status: "Completed",
      resources: ["Figma Design Academy", "Figma YouTube tutorials"],
      week: "Week 1"
    },
    {
      id: "course-ui-2",
      title: "Wireframing & Prototyping Interactions",
      description: "Construct paper skeletons, high-fidelity prototypes, and transitions.",
      duration: "7 hours",
      progress: 50,
      status: "In Progress",
      resources: ["Interaction Design Foundation", "UX Collective Blogs"],
      week: "Week 2"
    },
    {
      id: "course-ui-3",
      title: "User Testing and Affinity Mapping",
      description: "Formulate user interviews, analyze tests, and assemble design briefs.",
      duration: "9 hours",
      progress: 0,
      status: "Not Started",
      resources: ["Nielsen Norman Group Articles", "Steve Krug's Don't Make Me Think"],
      week: "Week 3"
    }
  ],
  "Data Analyst": [
    {
      id: "course-da-1",
      title: "Excel Formulas & Pivots",
      description: "Learn VLOOKUP, INDEX-MATCH, Pivot tables, conditional formatting, and dashboarding.",
      duration: "5 hours",
      progress: 100,
      status: "Completed",
      resources: ["Microsoft Learn Excel", "Chandoo.org Excel guides"],
      week: "Week 1"
    },
    {
      id: "course-da-2",
      title: "SQL Databases and Joins",
      description: "Select queries, GROUP BY, aggregations, INNER/LEFT joins, and subqueries.",
      duration: "8 hours",
      progress: 40,
      status: "In Progress",
      resources: ["SQLBolt interactive lessons", "Mode Analytics SQL tutorial"],
      week: "Week 2"
    },
    {
      id: "course-da-3",
      title: "Data Visualization with Tableau",
      description: "Learn to build interactive dashboards, map details, and connect worksheets.",
      duration: "10 hours",
      progress: 0,
      status: "Not Started",
      resources: ["Tableau Public Free Training", "Kaggle Visualization guides"],
      week: "Week 3"
    }
  ],
  "Project Manager": [
    {
      id: "course-pm-1",
      title: "Introduction to Agile Frameworks",
      description: "Understand core scrum roles, sprint planning, retrospective ceremonies, and backlog management.",
      duration: "6 hours",
      progress: 90,
      status: "In Progress",
      resources: ["Scrum Alliance Guides", "Atlassian Agile Coach"],
      week: "Week 1"
    },
    {
      id: "course-pm-2",
      title: "Jira Mastery & Workflow Boards",
      description: "Set up boards, configure story weights, design workflows, and track sprint burn-down charts.",
      duration: "6 hours",
      progress: 30,
      status: "In Progress",
      resources: ["Atlassian University Free courses"],
      week: "Week 2"
    },
    {
      id: "course-pm-3",
      title: "Stakeholder Management & Communications",
      description: "Develop matrix templates, organize progress decks, and conduct feedback loops.",
      duration: "8 hours",
      progress: 0,
      status: "Not Started",
      resources: ["PMI Project Management body of knowledge (PMBOK)"],
      week: "Week 3"
    }
  ]
};
export const courseWeeksList = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
export const courseStatuses = ["Not Started", "In Progress", "Completed"];
