// Calculate Career Comeback Score (0 - 100)

export const calculateComebackScore = (appState) => {
  const {
    profile = {},
    resume = {},
    skills = [],
    portfolio = [],
    interviewHistory = [],
    applications = []
  } = appState;

  // 1. Profile Completion (20%)
  // Count filled fields out of basic fields
  const profileFields = [
    profile.fullName,
    profile.email,
    profile.education,
    profile.previousExperience,
    profile.careerBreakDuration,
    profile.targetCareer,
    profile.workPreferences?.locationType,
    profile.workPreferences?.timeCommitment
  ];
  const filledProfileCount = profileFields.filter(val => val !== undefined && val !== null && val !== "").length;
  const profileScore = Math.round((filledProfileCount / profileFields.length) * 100) || 0;

  // 2. Resume Completion (20%)
  // Based on resume fields presence
  const resumeFields = [
    resume.fullName,
    resume.summary,
    resume.experience && resume.experience.length > 0,
    resume.education && resume.education.length > 0,
    resume.skills && resume.skills.length > 0,
    resume.projects && resume.projects.length > 0
  ];
  const filledResumeCount = resumeFields.filter(Boolean).length;
  const resumeScore = Math.round((filledResumeCount / resumeFields.length) * 100) || 0;

  // 3. Skill Assessment Completion (20%)
  // Based on number of skills rated (confidence level != 'Beginner' or simply rated > 0)
  const ratedSkills = skills.filter(s => s.confidence !== "Beginner");
  const skillScore = skills.length > 0 ? Math.round((ratedSkills.length / skills.length) * 100) : 0;

  // 4. Portfolio (15%)
  // Score goes up to 100 depending on project count (say, 3 projects is 100%)
  const portfolioScore = portfolio.length >= 3 ? 100 : portfolio.length === 2 ? 70 : portfolio.length === 1 ? 40 : 0;

  // 5. Interview Prep (15%)
  // Based on number of logged mock interview sessions (say, 4 questions answered is 100%)
  const answersCount = interviewHistory.length;
  const interviewScore = answersCount >= 4 ? 100 : answersCount === 3 ? 75 : answersCount === 2 ? 50 : answersCount === 1 ? 25 : 0;

  // 6. Job Applications (10%)
  // Logged applications in the tracker (say, 2 or more applications is 100%)
  const appCount = applications.length;
  const applicationScore = appCount >= 2 ? 100 : appCount === 1 ? 50 : 0;

  // Total weighted score
  const totalScore = Math.round(
    (profileScore * 0.20) +
    (resumeScore * 0.20) +
    (skillScore * 0.20) +
    (portfolioScore * 0.15) +
    (interviewScore * 0.15) +
    (applicationScore * 0.10)
  );

  // Suggestions generator based on lower performing parts
  const suggestions = [];
  if (profileScore < 70) {
    suggestions.push({
      id: "sug-profile",
      text: "Complete your profile preferences and background details to tailor your matching index.",
      link: "/profile",
      actionLabel: "Edit Profile"
    });
  }
  if (resumeScore < 70) {
    suggestions.push({
      id: "sug-resume",
      text: "Enhance your resume sections by adding past experience and detailed descriptions.",
      link: "/resume",
      actionLabel: "Build Resume"
    });
  }
  if (skillScore < 60) {
    suggestions.push({
      id: "sug-skills",
      text: "Rate more skills on the Skill Assessment tool to match job descriptions.",
      link: "/skills",
      actionLabel: "Assess Skills"
    });
  }
  if (portfolioScore < 50) {
    suggestions.push({
      id: "sug-portfolio",
      text: "Add at least 2 key projects to your portfolio, showcasing your updated skills.",
      link: "/portfolio",
      actionLabel: "Add Project"
    });
  }
  if (interviewScore < 50) {
    suggestions.push({
      id: "sug-interview",
      text: "Practice Mock Interview questions (HR, Technical, or Behavioral) to lock in confidence.",
      link: "/interview",
      actionLabel: "Practice Interviews"
    });
  }
  if (applicationScore < 50) {
    suggestions.push({
      id: "sug-applications",
      text: "Submit or log your first job application in the Kanban dashboard.",
      link: "/jobs",
      actionLabel: "Browse Jobs"
    });
  }

  return {
    total: totalScore,
    breakdown: {
      profile: profileScore,
      resume: resumeScore,
      skills: skillScore,
      portfolio: portfolioScore,
      interview: interviewScore,
      applications: applicationScore
    },
    suggestions
  };
};
