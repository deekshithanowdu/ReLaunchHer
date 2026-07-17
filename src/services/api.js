// Simulated API endpoints for future integration

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Auth mock requests
  login: async (email, password) => {
    await delay(800);
    // Simple verification simulation
    if (email && password.length >= 6) {
      return {
        user: {
          id: "usr-1",
          email,
          fullName: "Jane Doe",
          careerBreakDuration: "2 Years",
          previousCareer: "Software Engineer",
          targetCareer: "Frontend Developer"
        },
        token: "mock-jwt-token-12345"
      };
    }
    throw new Error("Invalid credentials.");
  },

  register: async (userData) => {
    await delay(1000);
    return {
      user: {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        ...userData
      },
      token: "mock-jwt-token-new"
    };
  },

  // Jobs fetches
  fetchJobs: async () => {
    await delay(500);
    return { success: true };
  },

  // Mentor bookings
  bookSession: async (bookingDetails) => {
    await delay(600);
    return {
      success: true,
      booking: {
        id: `book-${Math.random().toString(36).substr(2, 9)}`,
        ...bookingDetails,
        bookedAt: new Date().toISOString()
      }
    };
  }
};
