import { create } from "zustand";

interface UIState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (status: boolean) => void;
}

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  return stored ? stored === "true" : false;
};

export const useUIStore = create<UIState>((set) => ({
  darkMode: getInitialDarkMode(),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", newMode.toString());
      return { darkMode: newMode };
    }),
  setDarkMode: (value) => {
    localStorage.setItem("darkMode", value.toString());
    set({ darkMode: value });
  },
}));
