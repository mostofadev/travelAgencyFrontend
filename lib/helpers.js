// ============================================
// helpers.js — Utility functions
// ============================================

// Unique ID generate করি
export const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// টাকা format করি
export const formatPrice = (price, currency = "BDT") => {
  const num = parseFloat(price);
  if (isNaN(num)) return price;

  if (currency === "BDT") {
    if (num >= 10000000) return "৳" + (num / 10000000).toFixed(1) + " কোটি";
    if (num >= 100000) return "৳" + (num / 100000).toFixed(1) + " লাখ";
    if (num >= 1000) return "৳" + (num / 1000).toFixed(1) + " হাজার";
    return "৳" + num.toLocaleString("bn-BD");
  }

  return currency + " " + num.toLocaleString();
};

// Date format করি
export const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Available seats calculate করি
export const getAvailableSeats = (total, booked) => {
  return Math.max(0, total - booked);
};

// Message content থেকে newline handle করি
export const formatMessageContent = (content) => {
  return content?.split("\n") ?? [];
};

// Time format
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
