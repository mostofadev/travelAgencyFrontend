import Cookies from "js-cookie";

const USER_TOKEN_KEY = "user_jwt_token";
const ADMIN_TOKEN_KEY = "admin_jwt_token";
const USER_KEY = "user_data";
const ADMIN_KEY = "admin_data";

export const jwtManager = {
  // ==================== USER TOKEN ====================
  
  // Set User Token
  setUserToken(token) {
    Cookies.set(USER_TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },

  // Get User Token
  getUserToken() {
    return Cookies.get(USER_TOKEN_KEY);
  },

  // Remove User Token
  removeUserToken() {
    Cookies.remove(USER_TOKEN_KEY);
    this.removeUserData();
  },

  // Set User Data
  setUserData(user) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Get User Data
  getUserData() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Remove User Data
  removeUserData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  // ==================== ADMIN TOKEN ====================
  
  // Set Admin Token
  setAdminToken(token) {
    Cookies.set(ADMIN_TOKEN_KEY, token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },

  // Get Admin Token
  getAdminToken() {
    return Cookies.get(ADMIN_TOKEN_KEY);
  },

  // Remove Admin Token
  removeAdminToken() {
    Cookies.remove(ADMIN_TOKEN_KEY);
    this.removeAdminData();
  },

  // Set Admin Data
  setAdminData(admin) {
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    }
  },

  // Get Admin Data
  getAdminData() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(ADMIN_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Remove Admin Data
  removeAdminData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ADMIN_KEY);
    }
  },

  // ==================== AUTH CHECK ====================
  
  // Check if User Authenticated
  isUserAuthenticated() {
    return !!this.getUserToken();
  },

  // Check if Admin Authenticated
  isAdminAuthenticated() {
    return !!this.getAdminToken();
  },

  // Clear All
  clearAll() {
    this.removeUserToken();
    this.removeAdminToken();
  },
};