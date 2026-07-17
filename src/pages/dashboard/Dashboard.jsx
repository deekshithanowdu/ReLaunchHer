import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import { calculateJobCompatibility } from "../../utils/jobCompatibility";
import { calculateMentorMatch } from "../../utils/helpers";
import StatCard from "../../components/dashboard/StatCard";
import CareerComebackScore from "../../components/dashboard/CareerComebackScore";
import ProgressCard from "../../components/dashboard/ProgressCard";
import ActivityCard from "../../components/dashboard/ActivityCard";
import RecommendedJobCard from "../../components/dashboard/RecommendedJobCard";
import MentorCard from "../../components/mentors/MentorCard";
import MentorBookingModal from "../../components/mentors/MentorBookingModal";
import { Sparkles, Calendar, BookOpen, Briefcase, Award, ArrowRight, UserCheck } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const {
    comebackScore,
    jobs,
    mentors,
    skills,
    portfolio,
    applications,
    bookings,
    notifications,
    challengeTasks,
    bookMentor
  } = useAppContext();

  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = React.useState(null);

  // Compute challenge stats
  const completedChallengeDays = challengeTasks.filter(t => t.isCompleted).length;
  const challengePercent = Math.round((completedChallengeDays / challengeTasks.length) * 100) || 0;

  // Next upcoming booking
  const upcomingBooking = bookings.length > 0 ? bookings[0] : null;

  // Filter top 2 recommended jobs based on compatibility score
  const recommendedJobs = jobs
    .map(job => ({
      job,
      score: calculateJobCompatibility(job, currentUser || {}, skills).total
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // Filter top matched mentor
  const recommendedMentor = mentors
    .map(mentor => ({
      mentor,
      score: calculateMentorMatch(mentor, currentUser || {}, skills)
    }))
    .sort((a, b) => b.score - a.score)[0];

  // Recharts Progress Projection
  const scoreData = [
    { name: "Week 1", score: 20 },
    { name: "Week 2", score: 45 },
    { name: "Week 3", score: 60 },
    { name: "Week 4", score: comebackScore.total || 78 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--primary-color) 0%, #4f46e5 100%)",
          color: "white",
          padding: "2rem",
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}
      >
        <div style={{ flex: 1, minWidth: "260px" }}>
          <h2 style={{ color: "white", fontSize: "1.75rem", marginBottom: "0.5rem", fontWeight: 700 }}>
            Welcome Back, {currentUser?.fullName || "Jane"}!
          </h2>
          <p style={{ opacity: 0.9, fontSize: "0.95rem", margin: 0, maxWidth: "500px" }}>
            You are currently on the <strong>{currentUser?.targetCareer || "Frontend Developer"}</strong> comeback track. Keep up the good work!
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "0.75rem" }} className="banner-buttons">
          <Link to="/career-challenge" className="btn btn-accent" style={{ fontSize: "0.85rem" }}>
            30-Day Challenge
          </Link>
          <Link to="/profile" className="btn btn-secondary" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderColor: "transparent", color: "white", fontSize: "0.85rem" }}>
            Edit Preferences
          </Link>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <StatCard
          title="Applications Tracked"
          value={applications.length}
          icon={<Briefcase size={20} />}
          description="In progress applications"
          onClick={() => navigate("/applications")}
        />
        <StatCard
          title="Booked Mentorships"
          value={bookings.length}
          icon={<Calendar size={20} />}
          description={upcomingBooking ? `Next: ${upcomingBooking.date}` : "No upcoming meetings"}
          onClick={() => navigate("/mentors")}
        />
        <StatCard
          title="Portfolio Projects"
          value={portfolio.length}
          icon={<BookOpen size={20} />}
          description="Live demonstration links"
          onClick={() => navigate("/portfolio")}
        />
        <StatCard
          title="Challenge Complete"
          value={`${completedChallengeDays}/8`}
          icon={<Award size={20} />}
          description={`${challengePercent}% overall completion`}
          onClick={() => navigate("/career-challenge")}
        />
      </div>

      {/* Main Core Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column (8 cols): Comeback Score, Score progression line chart */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <CareerComebackScore score={comebackScore} />

          {/* Recharts chart */}
          <div className="card">
            <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Score Progression Projection</h4>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreData}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-light)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--text-light)" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-main)" }} />
                  <Area type="monotone" dataKey="score" stroke="var(--primary-color)" strokeWidth={2} fillOpacity={1} fill="url(#scoreColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 style={{ fontSize: "1.1rem" }}>Recommended Jobs For You</h4>
              <Link to="/jobs" style={{ fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}>
                All Jobs <ArrowRight size={14} />
              </Link>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="recommends-grid">
              {recommendedJobs.map(({ job, score }) => (
                <RecommendedJobCard key={job.id} job={job} compatibilityScore={score} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Profile Readiness, Recent Activities, Recommended Mentor */}
        <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <ProgressCard
            title="Challenge Progress"
            progress={challengePercent}
            description="Achieve 30-Day streak goals to unlock comeback certification badge."
            actionLink="/career-challenge"
            actionLabel="View Challenge"
          />

          <ActivityCard activities={notifications} />

          {/* Top Mentor recommendation */}
          {recommendedMentor && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div className="flex justify-between items-center">
                <h4 style={{ fontSize: "1.05rem" }}>Recommended Mentor</h4>
                <Link to="/mentors" style={{ fontSize: "0.8rem", fontWeight: 600 }}>All Mentors</Link>
              </div>
              <MentorCard
                mentor={recommendedMentor.mentor}
                matchScore={recommendedMentor.score}
                onBook={(mentor) => setSelectedMentor(mentor)}
              />
            </div>
          )}

        </div>
      </div>

      {selectedMentor && (
        <MentorBookingModal
          isOpen={!!selectedMentor}
          onClose={() => setSelectedMentor(null)}
          mentor={selectedMentor}
          onConfirm={(booking) => {
            bookMentor(booking);
            setSelectedMentor(null);
          }}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .recommends-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
