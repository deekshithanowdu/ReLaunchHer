// Calculate Job Compatibility Score (0 - 100)

export const calculateJobCompatibility = (job, profile, userSkills = []) => {
  if (!job || !profile) return { total: 0, breakdown: {} };

  // 1. Skills Match (30%)
  // Ratio of job skills present in user's rated skills list (where confidence is Comfortable/Job Ready)
  const jobSkills = job.skills || [];
  let skillsMatchScore = 0;
  if (jobSkills.length > 0) {
    const strongSkills = userSkills
      .filter(s => s.confidence === "Comfortable" || s.confidence === "Job Ready")
      .map(s => s.name.toLowerCase());
    
    const matchedCount = jobSkills.filter(s => strongSkills.includes(s.toLowerCase())).length;
    skillsMatchScore = Math.round((matchedCount / jobSkills.length) * 100);
  } else {
    skillsMatchScore = 100; // default if no skills specified
  }

  // 2. Experience Match (20%)
  // Simple check if job experience levels correspond to profile experience
  // E.g., if job requires 5+ and user has 5+ or previous high experience
  let experienceScore = 70; // baseline
  const jobExpStr = (job.experience || "").toLowerCase();
  const userExpStr = (profile.previousExperience || "").toLowerCase();
  
  if (jobExpStr.includes("1+") || jobExpStr.includes("2+") || jobExpStr.includes("junior")) {
    experienceScore = 100;
  } else if (jobExpStr.includes("3+") || jobExpStr.includes("4+")) {
    if (userExpStr.includes("senior") || userExpStr.includes("director") || userExpStr.includes("manager") || userExpStr.includes("5") || userExpStr.includes("10")) {
      experienceScore = 100;
    } else {
      experienceScore = 80;
    }
  } else if (jobExpStr.includes("5+") || jobExpStr.includes("senior") || jobExpStr.includes("director")) {
    if (userExpStr.includes("senior") || userExpStr.includes("director") || userExpStr.includes("10") || userExpStr.includes("15")) {
      experienceScore = 100;
    } else if (userExpStr.includes("5")) {
      experienceScore = 90;
    } else {
      experienceScore = 60;
    }
  }

  // 3. Location Match (15%)
  // If remote is preferred and job is remote, or if locations align
  let locationScore = 50;
  const userLocPref = profile.workPreferences?.locationType || "Remote";
  const isJobRemote = job.isRemote || (job.location || "").toLowerCase().includes("remote");

  if (userLocPref === "Remote" && isJobRemote) {
    locationScore = 100;
  } else if (userLocPref === "Hybrid" && ((job.location || "").toLowerCase().includes("hybrid") || isJobRemote)) {
    locationScore = 90;
  } else if (userLocPref === "Office" && !(isJobRemote)) {
    locationScore = 100;
  } else if (isJobRemote) {
    locationScore = 80; // Remote is usually fine for everyone
  }

  // 4. Work Preference Match (20%)
  // Flexible hours, full-time/part-time
  let workPrefScore = 50;
  const userTimePref = profile.workPreferences?.timeCommitment || "Full-Time"; // Full-Time, Part-Time, Flexible Hours
  const isJobFlex = job.isFlexible;
  const isJobPartTime = (job.jobType || "").toLowerCase().includes("part");

  if (userTimePref === "Part-Time" && isJobPartTime) {
    workPrefScore = 100;
  } else if (userTimePref === "Flexible Hours" && isJobFlex) {
    workPrefScore = 100;
  } else if (userTimePref === "Full-Time" && !isJobPartTime) {
    workPrefScore = 100;
  } else {
    workPrefScore = 70; // Partial match
  }

  // 5. Career Goal Match (15%)
  // Does the job title or description match targetCareer choice
  let careerGoalScore = 50;
  const targetCareer = (profile.targetCareer || "").toLowerCase();
  const jobTitle = (job.title || "").toLowerCase();
  
  if (targetCareer && (jobTitle.includes(targetCareer) || targetCareer.includes(jobTitle))) {
    careerGoalScore = 100;
  } else if (targetCareer && (targetCareer.includes("developer") && jobTitle.includes("dev") || targetCareer.includes("designer") && jobTitle.includes("design"))) {
    careerGoalScore = 90;
  } else {
    careerGoalScore = 70;
  }

  // Total compatibility score
  const totalScore = Math.round(
    (skillsMatchScore * 0.30) +
    (experienceScore * 0.20) +
    (locationScore * 0.15) +
    (workPrefScore * 0.20) +
    (careerGoalScore * 0.15)
  );

  return {
    total: totalScore,
    breakdown: {
      skills: skillsMatchScore,
      experience: experienceScore,
      location: locationScore,
      workPreference: workPrefScore,
      careerGoal: careerGoalScore
    }
  };
};
