import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, saveData, removeData } from "../utils/localStorage";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    return getData("relaunchher_user", null);
  });
  const [token, setToken] = useState(() => {
    return getData("relaunchher_token", "");
  });
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return getData("relaunchher_onboarded", false);
  });

  const isAuthenticated = !!currentUser && !!token;

  const login = async (email, password, rememberMe) => {
    const result = await apiService.login(email, password);
    setCurrentUser(result.user);
    setToken(result.token);
    saveData("relaunchher_user", result.user);
    saveData("relaunchher_token", result.token);
    
    // Default onboard true for mock login unless specific
    const onboardedState = getData("relaunchher_onboarded", false);
    setIsOnboarded(onboardedState);
    return result;
  };

  const register = async (userData) => {
    const result = await apiService.register(userData);
    setCurrentUser(result.user);
    setToken(result.token);
    setIsOnboarded(false); // New registered users must onboard
    saveData("relaunchher_user", result.user);
    saveData("relaunchher_token", result.token);
    saveData("relaunchher_onboarded", false);
    return result;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken("");
    setIsOnboarded(false);
    removeData("relaunchher_user");
    removeData("relaunchher_token");
    removeData("relaunchher_onboarded");
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    saveData("relaunchher_user", updatedUser);
  };

  const completeOnboarding = (profileData) => {
    updateProfile(profileData);
    setIsOnboarded(true);
    saveData("relaunchher_onboarded", true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated,
        isOnboarded,
        login,
        register,
        logout,
        updateProfile,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
