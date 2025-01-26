import { create } from "zustand";

interface AppState {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth: boolean) => {
    set({ isAuthenticated: auth });
  },
}));

// Persist the state to localStorage when it changes
if (typeof window !== "undefined") {
  const savedState = localStorage.getItem("zustandStore");
  if (savedState) {
    useStore.setState(JSON.parse(savedState));
  }

  useStore.subscribe((newState) => {
    localStorage.setItem("zustandStore", JSON.stringify(newState));
  });
}

export default useStore;
