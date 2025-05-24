import { create } from "zustand";

interface State {
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<State>((set) => ({
  query: "",
  setQuery: (query: string) => {
    return set({
      query: query,
    });
  },
}));
