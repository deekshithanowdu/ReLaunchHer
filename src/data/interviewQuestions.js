export const interviewQuestions = {
  HR: [
    {
      id: "q-hr-1",
      question: "Can you walk me through your resume and explain your career break?",
      guide: "Be transparent and confident. Frame your break positively: mention what initiated it (caregiving, family, health) and emphasize what you did to prepare for your return (courses, projects, building skill readiness). Avoid apologizing for your break.",
      sampleAnswer: "I took a 3-year break to care for my young children. During this time, I managed household projects and kept up with industry trends. In the past 8 months, I have refreshed my technical skills in React and completed multiple frontend projects, proving my readiness to return to a full-time software engineering role."
    },
    {
      id: "q-hr-2",
      question: "Why do you want to join our company, and why now?",
      guide: "Connect your career re-entry journey with the company's specific mission, values, or products. Mention their returnship or supportive culture if applicable.",
      sampleAnswer: "Your team's focus on inclusivity and your stellar track record in mentoring returners stood out to me. Furthermore, your product aligns with my interest in building high-quality SaaS tools. Now is the perfect time for me to contribute because I have refreshed my core skills and am fully focused on driving product quality."
    },
    {
      id: "q-hr-3",
      question: "How do you handle working in a hybrid or remote team setting?",
      guide: "Emphasize communication protocols, tools (Slack, Jira, Zoom), and your ability to manage time effectively.",
      sampleAnswer: "During my break, I coordinated multiple community volunteer projects remotely. I rely on clear asynchronous communication, setting explicit deadlines, and using tools like Jira and Slack to keep tasks visible and organized."
    }
  ],
  Technical: [
    {
      id: "q-tech-1",
      question: "What is the difference between state and props in React?",
      guide: "State is local to the component and mutable within it. Props are read-only inputs passed down from parent components to child components.",
      sampleAnswer: "Props act like function arguments, letting parents pass configuration values down. State is like local variables inside a component that change over time based on actions. Updating state triggers a re-render of the component and its children."
    },
    {
      id: "q-tech-2",
      question: "What are React Hooks? Why do we use them?",
      guide: "Explain that Hooks (like useState, useEffect) allow using state and lifecycle features in functional components rather than class components.",
      sampleAnswer: "React Hooks allow functional components to hook into state, context, and lifecycle options. They simplify code sharing, prevent nesting depth issues, and make components cleaner and easier to unit test."
    },
    {
      id: "q-tech-3",
      question: "How does CSS Flexbox differ from CSS Grid?",
      guide: "Flexbox is one-dimensional (row or column layout), while Grid is two-dimensional (simultaneous rows and columns).",
      sampleAnswer: "We use Flexbox for aligning items linearly (either horizontal or vertical). CSS Grid is better suited for complex layout grids with defined rows and columns. They can be nested together for maximum responsiveness."
    }
  ],
  Behavioral: [
    {
      id: "q-beh-1",
      question: "Tell me about a time you had to learn a new tool or technology quickly.",
      guide: "Use the STAR method (Situation, Task, Action, Result). Highlight your learning strategy, resources used, and how it was successfully applied.",
      sampleAnswer: "Upon choosing to switch to React, I realized I needed a solid understanding of Node.js and npm packaging. I created a learning plan, read documentation, and within 3 weeks built a fully interactive dashboard. The dashboard successfully uses state routing and has zero syntax issues."
    },
    {
      id: "q-beh-2",
      question: "Describe a conflict you had with a teammate and how you resolved it.",
      guide: "Emphasize empathy, constructive discussion, finding common ground, and focusing on the project's goal rather than personal friction.",
      sampleAnswer: "On a volunteer coding project, a designer and I disagreed on interface priority. I scheduled a call to listen to her UX findings. We merged my engineering feasibility concerns with her design, resulting in a cleaner UI that improved user scores by 15%."
    }
  ]
};

export const interviewDifficulties = ["Beginner", "Intermediate", "Advanced"];
export const interviewCategories = ["HR", "Technical", "Behavioral"];
