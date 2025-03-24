import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from 'sonner';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error checking authentication: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log("Signup data:", data);

      const res = await axiosInstance.post("http://localhost:5001/api/auth/signup", data);
      console.log("Signup response:", res.data);

      set({ authUser: res.data });
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Signup error: ", error);

      if (error.response) {
        console.error("Signup error response:", error.response.data);
        toast.error(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        console.error("Error with the request:", error.request);
        toast.error("No response from the server.");
      } else {
        console.error("General error:", error.message);
        toast.error("An error occurred during signup.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      console.log("Login data:", data);

      const res = await axiosInstance.post("/auth/login", data);
      console.log("Login response:", res.data);

      set({ authUser: res.data });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error: ", error);

      if (error.response) {
        console.error("Login error response:", error.response.data);
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        console.error("Error with the request:", error.request);
        toast.error("No response from the server.");
      } else {
        console.error("General error:", error.message);
        toast.error("An error occurred during login.");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("Profile update data:", data);

      const res = await axiosInstance.put("/auth/update", data);
      console.log("Profile update response:", res.data);

      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error: ", error);

      if (error.response) {
        console.error("Profile update error response:", error.response.data);
        toast.error(error.response.data.message || "Profile update failed. Please try again.");
      } else if (error.request) {
        console.error("Error with the request:", error.request);
        toast.error("No response from the server.");
      } else {
        console.error("General error:", error.message);
        toast.error("An error occurred during profile update.");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));
