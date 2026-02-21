// lib/react-query/queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data কতক্ষণ fresh থাকবে (5 minutes)
      staleTime: 5 * 60 * 1000,
      
      // Cache কতক্ষণ রাখবে (10 minutes)
      cacheTime: 10 * 60 * 1000,
      
      // Error হলে retry করবে কিনা
      retry: 1,
      
      // Refetch on window focus
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Mutation retry
      retry: 0,
    },
  },
});