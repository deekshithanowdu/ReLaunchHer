import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, saveData } from "../utils/localStorage";
import { initialJobs } from "../data/jobs";
import { initialMentors } from "../data/mentors";
import { initialSkillsByPath } from "../data/skills";
import { initialCoursesByPath } from "../data/courses";
import { careerPathways as defaultPathways } from "../data/careerPathways";
import { challengeTasks as defaultChallengeTasks, badgesList } from "../data/challengeTasks";
import { initialSupportCircles } from "../data/supportCircles";
import { initialCommunityPosts } from "../data/communityPosts";
import { calculateComebackScore } from "../utils/careerScore";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const targetPath = currentUser?.targetCareer || "Frontend Developer";

  // State Declarations
  const [jobs, setJobs] = useState(() => getData("relaunchher_jobs", initialJobs));
  const [mentors, setMentors] = useState(initialMentors);
  const [careerBreakStory, setCareerBreakStory] = useState(() => {
    return getData("relaunchher_story", {
      startDate: "",
      endDate: "",
      reason: "",
      responsibilities: "",
      skillsDeveloped: "",
      coursesCompleted: "",
      projectsCompleted: "",
      volunteerWork: "",
      achievements: ""
    });
  });
  const [timelineEvents, setTimelineEvents] = useState(() => {
    return getData("relaunchher_timeline", [
      { id: "t-1", date: "2020-04-15", category: "Started Career", description: "Began as Junior Frontend Engineer at TechCorp." },
      { id: "t-2", date: "2022-09-10", category: "Promotion", description: "Promoted to Mid-level Developer. Focused on React." },
      { id: "t-3", date: "2024-03-01", category: "Career Break", description: "Took time off for caregiving and family commitments." }
    ]);
  });
  const [pathways, setPathways] = useState(() => getData("relaunchher_pathways", defaultPathways));
  const [selectedPathwayId, setSelectedPathwayId] = useState(() => getData("relaunchher_selected_pathway_id", "path-1"));
  
  const [skills, setSkills] = useState(() => {
    const cached = getData("relaunchher_skills", null);
    if (cached) return cached;
    return initialSkillsByPath[targetPath] || initialSkillsByPath["Frontend Developer"];
  });

  const [courses, setCourses] = useState(() => {
    const cached = getData("relaunchher_courses", null);
    if (cached) return cached;
    return initialCoursesByPath[targetPath] || initialCoursesByPath["Frontend Developer"];
  });

  const [portfolio, setPortfolio] = useState(() => {
    return getData("relaunchher_portfolio", [
      {
        id: "port-1",
        title: "ReLaunchHer Portal UI",
        description: "Built modular layouts, user settings dashboards, and profile trackers.",
        technologies: "React, LocalStorage, CSS",
        gitHubLink: "https://github.com/example/relaunchher",
        liveDemo: "https://example.com/relaunchher",
        completionDate: "2026-07-01",
        category: "Frontend"
      }
    ]);
  });

  const [interviewHistory, setInterviewHistory] = useState(() => getData("relaunchher_interview_history", []));
  const [challengeTasks, setChallengeTasks] = useState(() => getData("relaunchher_challenges", defaultChallengeTasks));
  const [applications, setApplications] = useState(() => {
    return getData("relaunchher_applications", [
      {
        id: "app-1",
        jobTitle: "Senior React Developer (Returnship)",
        company: "TechNova Solutions",
        status: "Applied",
        notes: "Initial interview scheduled for next week.",
        interviewDate: "2026-07-22",
        reminderDate: "2026-07-21"
      }
    ]);
  });
  const [bookings, setBookings] = useState(() => getData("relaunchher_bookings", []));
  const [posts, setPosts] = useState(() => getData("relaunchher_posts", initialCommunityPosts));
  const [circles, setCircles] = useState(() => {
    // Inject custom properties in circles, e.g., if user is joined
    const baseCircles = getData("relaunchher_circles", initialSupportCircles);
    return baseCircles.map(c => ({
      ...c,
      joined: c.joined !== undefined ? c.joined : (c.id === "circle-1") // pre-join first circle
    }));
  });

  const [notifications, setNotifications] = useState(() => {
    return getData("relaunchher_notifications", [
      { id: "n-1", type: "Mentor Sessions", text: "You have an upcoming chat with Sarah Jenkins scheduled.", read: false, date: "2026-07-16" },
      { id: "n-2", type: "Job Applications", text: "Application status for TechNova updated to 'Applied'.", read: false, date: "2026-07-15" }
    ]);
  });

  const [settings, setSettings] = useState(() => {
    return getData("relaunchher_settings", {
      notificationsEmail: true,
      notificationsPush: false,
      language: "English"
    });
  });

  const [comebackScore, setComebackScore] = useState({ total: 0, breakdown: {}, suggestions: [] });

  // Recalculate score on dependencies change
  useEffect(() => {
    const scoreObj = calculateComebackScore({
      profile: currentUser || {},
      resume: currentUser || {}, // Using current user profile details as resume seed
      skills,
      portfolio,
      interviewHistory,
      applications
    });
    setComebackScore(scoreObj);
  }, [currentUser, skills, portfolio, interviewHistory, applications]);

  // Synchronize localStorage
  useEffect(() => { saveData("relaunchher_jobs", jobs); }, [jobs]);
  useEffect(() => { saveData("relaunchher_mentors", mentors); }, [mentors]);
  useEffect(() => { saveData("relaunchher_story", careerBreakStory); }, [careerBreakStory]);
  useEffect(() => { saveData("relaunchher_timeline", timelineEvents); }, [timelineEvents]);
  useEffect(() => { saveData("relaunchher_pathways", pathways); }, [pathways]);
  useEffect(() => { saveData("relaunchher_selected_pathway_id", selectedPathwayId); }, [selectedPathwayId]);
  useEffect(() => { saveData("relaunchher_skills", skills); }, [skills]);
  useEffect(() => { saveData("relaunchher_courses", courses); }, [courses]);
  useEffect(() => { saveData("relaunchher_portfolio", portfolio); }, [portfolio]);
  useEffect(() => { saveData("relaunchher_interview_history", interviewHistory); }, [interviewHistory]);
  useEffect(() => { saveData("relaunchher_challenges", challengeTasks); }, [challengeTasks]);
  useEffect(() => { saveData("relaunchher_applications", applications); }, [applications]);
  useEffect(() => { saveData("relaunchher_bookings", bookings); }, [bookings]);
  useEffect(() => { saveData("relaunchher_posts", posts); }, [posts]);
  useEffect(() => { saveData("relaunchher_circles", circles); }, [circles]);
  useEffect(() => { saveData("relaunchher_notifications", notifications); }, [notifications]);
  useEffect(() => { saveData("relaunchher_settings", settings); }, [settings]);

  // Helper State Setters
  const addTimelineEvent = (event) => {
    const newEvent = { id: `t-${Date.now()}`, ...event };
    setTimelineEvents(prev => [...prev, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
    addNotification("System Notifications", `Added new timeline event: "${event.category}"`);
  };

  const deleteTimelineEvent = (id) => {
    setTimelineEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateTimelineEvent = (id, updatedEvent) => {
    setTimelineEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  const selectPathway = (pathwayId) => {
    setSelectedPathwayId(pathwayId);
  };

  const togglePathwayStep = (pathwayId, stepId) => {
    setPathways(prev => prev.map(p => {
      if (p.id !== pathwayId) return p;
      return {
        ...p,
        steps: p.steps.map(s => s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s)
      };
    }));
  };

  const updateSkillConfidence = (skillName, newConfidence) => {
    setSkills(prev => prev.map(s => {
      if (s.name === skillName) {
        // Calculate progress dynamically based on confidence index
        let newProgress = 10;
        if (newConfidence === "Learning") newProgress = 40;
        if (newConfidence === "Comfortable") newProgress = 70;
        if (newConfidence === "Job Ready") newProgress = 100;
        return { ...s, confidence: newConfidence, progress: newProgress };
      }
      return s;
    }));
  };

  const toggleCourseComplete = (courseId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const isComplete = c.status === "Completed";
        return {
          ...c,
          status: isComplete ? "In Progress" : "Completed",
          progress: isComplete ? 30 : 100
        };
      }
      return c;
    }));
    addNotification("Learning Reminders", "Course roadmap milestone updated.");
  };

  const addPortfolioProject = (proj) => {
    const newProj = { id: `port-${Date.now()}`, ...proj };
    setPortfolio(prev => [...prev, newProj]);
    addNotification("System Notifications", `Portfolio project "${proj.title}" added successfully!`);
  };

  const deletePortfolioProject = (id) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  const updatePortfolioProject = (id, updatedProj) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updatedProj } : p));
  };

  const addInterviewAttempt = (category, difficulty, score, summary) => {
    const newLog = {
      id: `int-${Date.now()}`,
      category,
      difficulty,
      score,
      summary,
      date: new Date().toISOString().split("T")[0]
    };
    setInterviewHistory(prev => [newLog, ...prev]);
    addNotification("Interview Reminders", `Mock interview completed in ${category} (${difficulty}).`);
  };

  const completeChallengeDay = (day) => {
    setChallengeTasks(prev => prev.map(t => {
      if (t.day === day) {
        return { ...t, isCompleted: true };
      }
      return t;
    }));
    const task = challengeTasks.find(t => t.day === day);
    if (task) {
      addNotification("System Notifications", `Unlocked badge: "${task.badge}" for completing Day ${day}!`);
    }
  };

  const addJobApplication = (app) => {
    const newApp = { id: `app-${Date.now()}`, ...app };
    setApplications(prev => [...prev, newApp]);
    addNotification("Job Applications", `Logged job application for "${app.jobTitle}" at "${app.company}".`);
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    addNotification("Job Applications", `Application status updated to "${newStatus}".`);
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const updateApplicationDetails = (id, details) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, ...details } : a));
  };

  const bookMentor = (booking) => {
    const newBooking = { id: `book-${Date.now()}`, ...booking, bookedAt: new Date().toISOString() };
    setBookings(prev => [newBooking, ...prev]);
    addNotification("Mentor Sessions", `Confirmed meeting with ${booking.mentorName} on ${booking.date} at ${booking.time}.`);
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    addNotification("Mentor Sessions", "Mentor meeting cancelled.");
  };

  const joinCircle = (id) => {
    setCircles(prev => prev.map(c => c.id === id ? { ...c, joined: true, membersCount: c.membersCount + 1 } : c));
  };

  const leaveCircle = (id) => {
    setCircles(prev => prev.map(c => c.id === id ? { ...c, joined: false, membersCount: Math.max(0, c.membersCount - 1) } : c));
  };

  const addPost = (postContent, category) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: currentUser?.fullName || "Jane Doe",
      authorTitle: currentUser?.targetCareer || "Comeback Returner",
      content: postContent,
      category,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split("T")[0],
      isLiked: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const likePost = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const addComment = (postId, commentText) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `c-${Date.now()}`,
              author: currentUser?.fullName || "Jane Doe",
              content: commentText,
              date: new Date().toISOString().split("T")[0]
            }
          ]
        };
      }
      return p;
    }));
  };

  const addNotification = (type, text) => {
    const newNotification = {
      id: `n-${Date.now()}`,
      type,
      text,
      read: false,
      date: new Date().toISOString().split("T")[0]
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        mentors,
        careerBreakStory,
        setCareerBreakStory,
        timelineEvents,
        addTimelineEvent,
        deleteTimelineEvent,
        updateTimelineEvent,
        pathways,
        selectedPathwayId,
        selectPathway,
        togglePathwayStep,
        skills,
        updateSkillConfidence,
        courses,
        toggleCourseComplete,
        portfolio,
        addPortfolioProject,
        deletePortfolioProject,
        updatePortfolioProject,
        interviewHistory,
        addInterviewAttempt,
        challengeTasks,
        completeChallengeDay,
        applications,
        addJobApplication,
        updateApplicationStatus,
        deleteApplication,
        updateApplicationDetails,
        bookings,
        bookMentor,
        cancelBooking,
        posts,
        addPost,
        deletePost,
        likePost,
        addComment,
        circles,
        joinCircle,
        leaveCircle,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        settings,
        setSettings,
        comebackScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
