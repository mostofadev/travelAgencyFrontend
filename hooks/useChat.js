"use client";
// ============================================
// useChat.js — React Query hooks for chatbot
// ============================================

import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { generateId } from "@/lib/helpers";
import { SaveLeadServices, SendMessageServices } from "@/lib/services/chatService";
// import {
//   SendMessageServices,
//   SaveLeadServices,
// } from "@/services/travelServices";

export function useChat() {
  const [messages, setMessages] = useState([welcomeMessage()]);
  const [sessionId, setSessionId] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // ── Send Message Mutation ─────────────────
  const { mutate: send, isPending: isLoading } = useMutation({
    mutationFn: SendMessageServices,

    onMutate: ({ message }) => {
      const userMsg = {
        id: generateId(),
        role: "user",
        content: message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setMessageCount((prev) => prev + 1);
    },

    onSuccess: ({ data }) => {
      if (data.session_id) setSessionId(data.session_id);

      const botMsg = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
        intent: data.intent,
        packages: data.packages ?? [],
        visas: data.visas ?? [],
        itinerary: data.itinerary ?? [],
        has_data: data.has_data ?? false,
      };
      setMessages((prev) => [...prev, botMsg]);

      setMessageCount((prev) => {
        const count = prev + 1;
        if (count >= 3 && !leadSubmitted) {
          setTimeout(() => setShowLeadForm(true), 500);
        }
        return count;
      });
    },

    onError: (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      let errorContent = "Something went wrong. Please try again later.";

      if (!navigator.onLine) {
        errorContent =
          "No internet connection. Please check your network and try again.";
      } else if (status === 400) {
        errorContent =
          message || "Invalid request. Please check your input and try again.";
      } else if (status === 401) {
        errorContent = "You are not authorized. Please log in and try again.";
      } else if (status === 403) {
        errorContent =
          "Access denied. You do not have permission to perform this action.";
      } else if (status === 404) {
        errorContent =
          "The requested resource was not found. Please try again.";
      } else if (status === 422) {
        errorContent =
          message || "Invalid data submitted. Please review your input.";
      } else if (status === 429) {
        errorContent = "Too many requests. Please wait a moment and try again.";
      } else if (status >= 500) {
        errorContent =
          "Server error. Our team has been notified. Please try again later.";
      }

      const errMsg = {
        id: generateId(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    },
  });

  // ── Lead Mutation ─────────────────────────
  const { mutate: submitLead, isPending: isLeadLoading } = useMutation({
    mutationFn: SaveLeadServices,

    onSuccess: (_, variables) => {
      setShowLeadForm(false);
      setLeadSubmitted(true);

      const confirmMsg = {
        id: generateId(),
        role: "assistant",
        content: `Thank you ${variables.name || ""}! 🙏\n\nWe have received your phone number (${variables.phone}). Our travel expert will contact you within 24 hours.\n\nIs there anything else you would like to know?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirmMsg]);
    },

    onError: (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      let errorContent = "Failed to submit your information. Please try again.";

      if (!navigator.onLine) {
        errorContent =
          "No internet connection. Please check your network and try again.";
      } else if (status === 422) {
        errorContent =
          message ||
          "Invalid information provided. Please check your details and try again.";
      } else if (status === 429) {
        errorContent = "Too many attempts. Please wait a moment and try again.";
      } else if (status >= 500) {
        errorContent = "Server error. Please try again later.";
      }

      const errMsg = {
        id: generateId(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    },
  });

  // ── sendChatMessage ───────────────────────
  const sendChatMessage = useCallback(
    (text) => {
      if (!text.trim() || isLoading) return;
      send({ message: text, sessionId });
    },
    [send, sessionId, isLoading],
  );

  // ── handleLeadSubmit ──────────────────────
  const handleLeadSubmit = useCallback(
    (formData) => {
      submitLead({ ...formData, sessionId });
    },
    [submitLead, sessionId],
  );

  // ── clearChat ─────────────────────────────
  const clearChat = useCallback(() => {
    setMessages([welcomeMessage()]);
    setSessionId(null);
    setMessageCount(0);
    setShowLeadForm(false);
    setLeadSubmitted(false);
  }, []);

  return {
    messages,
    isLoading,
    isLeadLoading,
    sessionId,
    showLeadForm,
    setShowLeadForm,
    leadSubmitted,
    sendChatMessage,
    handleLeadSubmit,
    clearChat,
  };
}

// ── Welcome Message ───────────────────────
function welcomeMessage() {
  return {
    id: generateId(),
    role: "assistant",
    content:
      "Assalamu Alaikum! ✈️ I am your travel assistant.\n\nI can help you with:\n• 🌍 Finding Tour Packages\n• 🛂 Visa Information\n• ✈️ Flight Details\n• 💰 Travel Cost Estimates\n\nWhere would you like to go?",
    timestamp: new Date(),
  };
}
