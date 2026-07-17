// General helper utilities

// Format Date string to a human-readable format
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
};

// Calculate Mentor Match Score (0 - 100)
// Career Goal: 30%
// Industry: 20%
// Skills: 30%
// Location: 10%
// Work Type: 10%
export const calculateMentorMatch = (mentor, profile, userSkills = []) => {
  if (!mentor || !profile) return 0;

  // 1. Career Goal (30%)
  let careerGoalMatch = 0;
  const userTarget = (profile.targetCareer || "").toLowerCase();
  const mentorTarget = (mentor.targetCareer || "").toLowerCase();
  if (userTarget && mentorTarget && (userTarget.includes(mentorTarget) || mentorTarget.includes(userTarget))) {
    careerGoalMatch = 100;
  } else {
    careerGoalMatch = 60; // general alignment
  }

  // 2. Industry (20%)
  let industryMatch = 50;
  const userIndustry = userTarget.includes("developer") || userTarget.includes("designer") ? "Technology" : "General";
  const mentorIndustry = mentor.industry || "";
  if (mentorIndustry.toLowerCase() === userIndustry.toLowerCase() || (userTarget.includes("developer") && mentor.skills.includes("React"))) {
    industryMatch = 100;
  }

  // 3. Skills (30%)
  let skillsMatch = 0;
  const mentorSkills = mentor.skills || [];
  const strongSkills = userSkills
    .filter(s => s.confidence === "Comfortable" || s.confidence === "Job Ready")
    .map(s => s.name.toLowerCase());
  
  if (mentorSkills.length > 0) {
    const matchCount = mentorSkills.filter(s => strongSkills.includes(s.toLowerCase())).length;
    skillsMatch = Math.round((matchCount / mentorSkills.length) * 100);
  } else {
    skillsMatch = 80;
  }

  // 4. Location (10%)
  let locationMatch = 50;
  if ((mentor.location || "").toLowerCase().includes((profile.preferredLocation || "").toLowerCase())) {
    locationMatch = 100;
  }

  // 5. Work Type (10%)
  let workTypeMatch = 50;
  const userPrefWork = profile.workPreferences?.locationType || "Remote";
  const mentorWork = mentor.workType || "Remote";
  if (userPrefWork === mentorWork) {
    workTypeMatch = 100;
  }

  const score = Math.round(
    (careerGoalMatch * 0.30) +
    (industryMatch * 0.20) +
    (skillsMatch * 0.30) +
    (locationMatch * 0.10) +
    (workTypeMatch * 0.10)
  );

  return score;
};
