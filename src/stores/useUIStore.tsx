import { create } from "zustand";

interface UIState {
  darkMode: boolean;
  setDarkMode: (status: boolean) => void;
  font: string;
  setFont: (status: string) => void;
}

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  return stored ? stored === "true" : false;
};

const getInitialFont = () => {
  return localStorage.getItem("font") || "sans";
};

export const useUIStore = create<UIState>((set) => ({
  darkMode: getInitialDarkMode(),
  setDarkMode: (value) => {
    localStorage.setItem("darkMode", value.toString());
    set({ darkMode: value });
  },
  font: getInitialFont(),
  setFont: (value) => {
    localStorage.setItem("font", value);
    set({ font: value });
  },
}));
