import { create } from "zustand";

// Example store for user profile
interface UserProfileState {
  user: any;
  setUser: (user: any) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Add more stores as needed for projects, dashboard, etc.
