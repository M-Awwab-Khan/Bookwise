import { create } from "zustand";

type STATUS = "BORROWED" | "RETURNED" | "LATE RETURN";
interface State {
  bookStatuses: Record<string, { status: STATUS; returnDate: Date | "-" }>;
  updateStatus: ({
    borrowedId,
    status,
    returnDate,
  }: {
    borrowedId: string;
    status: STATUS;
    returnDate: Date | "-";
  }) => void;
}

export const useBookStatusStore = create<State>((set) => ({
  bookStatuses: {},
  updateStatus: ({ borrowedId, status, returnDate }) => {
    set((state) => {
      const newState = {
        ...state.bookStatuses,
        [borrowedId]: { status, returnDate },
      };
      return { bookStatuses: newState };
    });
  },
}));
