import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import Loader from "../components/common/Loader";

// Lazy loading / Dynamic imports would work, but to make sure build handles everything synchronously without route code-splits, we can import them directly:
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import HowItWorks from "../pages/public/HowItWorks";
import NotFound from "../pages/public/NotFound";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import CareerBreakStory from "../pages/dashboard/CareerBreakStory";
import CareerTimeline from "../pages/dashboard/CareerTimeline";
import CareerPathways from "../pages/dashboard/CareerPathways";
import ReadinessChecklist from "../pages/dashboard/ReadinessChecklist";
import ResumeBuilder from "../pages/dashboard/ResumeBuilder";
import SkillAssessment from "../pages/dashboard/SkillAssessment";
import LearningRoadmap from "../pages/dashboard/LearningRoadmap";
import Portfolio from "../pages/dashboard/Portfolio";
import MockInterview from "../pages/dashboard/MockInterview";
import CareerChallenge from "../pages/dashboard/CareerChallenge";
import Jobs from "../pages/dashboard/Jobs";
import JobDetails from "../pages/dashboard/JobDetails";
import ApplicationTracker from "../pages/dashboard/ApplicationTracker";
import Mentors from "../pages/dashboard/Mentors";
import Community from "../pages/dashboard/Community";
import SupportCircles from "../pages/dashboard/SupportCircles";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";

// Auth Guard component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Guest Guard component
const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Guest Authentication Routes */}
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
      <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />

      {/* Protected Dashboard/Career Paths Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/career-break-story" element={<ProtectedRoute><CareerBreakStory /></ProtectedRoute>} />
      <Route path="/career-timeline" element={<ProtectedRoute><CareerTimeline /></ProtectedRoute>} />
      <Route path="/career-pathways" element={<ProtectedRoute><CareerPathways /></ProtectedRoute>} />
      <Route path="/readiness" element={<ProtectedRoute><ReadinessChecklist /></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><SkillAssessment /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute><LearningRoadmap /></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
      <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
      <Route path="/career-challenge" element={<ProtectedRoute><CareerChallenge /></ProtectedRoute>} />
      
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><ApplicationTracker /></ProtectedRoute>} />
      <Route path="/mentors" element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
      
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
      <Route path="/support-circles" element={<ProtectedRoute><SupportCircles /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
