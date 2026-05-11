// Enhanced UserContext.js
import React, { createContext, useState, useEffect } from "react";
// import axiosInstance from "../custom/axios";
import { loginContext as mockLogin, logoutContext as mockLogout } from "../services/MockAuthService";
import { useTranslation } from 'react-i18next';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { t } = useTranslation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);

  // Login function - Using Mock Data
  const login = async (credentials) => {
    try {
      const user = await mockLogin(credentials);
      
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return user;
      } else {
        throw new Error("Đăng nhập thất bại");
      }
    } catch (err) {
      if (err.message) {
        throw new Error(err.message);
      } else {
        throw new Error("Đăng nhập thất bại, vui lòng thử lại sau");
      }
    }
  };
  
  // Get user role
  const getUserRole = () => {
    if (!user) return null;
    
    console.log("User object in getUserRole:", user);
    
    // Try different properties that might contain the role
    let roleValue = user?.position || user?.role || user?.userRole;
    console.log("Raw role value:", roleValue);
    
    // Convert to string and lowercase for consistent comparison
    if (roleValue) {
      roleValue = String(roleValue).toLowerCase();
      
      // Map Vietnamese roles to standardized English roles
      if (roleValue === "quản lý cửa hàng" || roleValue.includes("quản lý")) {
        return "manager";
      } else if (roleValue.includes("nhân viên")) {
        return "employee";
      }
    }
    
    // If no specific employee role is found, assume customer
    return "customer";
  };

  const isManager = () => getUserRole() === "manager";
  const isEmployee = () => getUserRole() === "employee";
  const isCustomer = () => getUserRole() === "customer";
  
  // Logout function - Using Mock Data
  const logout = async () => {
    try {
      await mockLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  };

  // Check authentication on mount - Using Mock Data
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("user");
        
        if (token && savedUser) {
          // Parse saved user from localStorage
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auto-login error:", error);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Update user function
  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      getUserRole,
      isManager,
      isEmployee,
      isCustomer,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
// Updated: 2025-10-12T16:06:31.045Z

// Updated: 2025-10-12T16:09:08.038Z
