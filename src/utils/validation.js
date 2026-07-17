// Client-side validation utilities

export const validateRegistration = (fields) => {
  const errors = {};

  if (!fields.fullName || fields.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email || !emailRegex.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password || fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!fields.careerBreakDuration) {
    errors.careerBreakDuration = "Please specify your career break duration.";
  }

  if (!fields.previousCareer) {
    errors.previousCareer = "Please specify your previous career path.";
  }

  if (!fields.targetCareer) {
    errors.targetCareer = "Please specify your target career comeback path.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLogin = (fields) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email || !emailRegex.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password || fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateResumeForm = (details) => {
  const errors = {};
  
  if (!details.fullName || details.fullName.trim() === "") {
    errors.fullName = "Full Name is required.";
  }
  
  if (!details.summary || details.summary.trim() === "") {
    errors.summary = "A summary highlighting your career comeback is required.";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
