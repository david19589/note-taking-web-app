import { create } from "zustand";
import { getNotes, noteDataTypes } from "../utils/api";

type MenuType = "home" | "search" | "archive" | "tags" | "settings";

const defaultOptionsState: Record<MenuType, boolean> = {
  home: true,
  search: false,
  archive: false,
  tags: false,
  settings: false,
};

interface NotesState {
  notes: noteDataTypes[];
  loading: boolean;
  openDeleteModal: boolean;
  selectedOption: Record<MenuType, boolean>;
  fetchNotes: () => void;
  setNotes: (notes: noteDataTypes[]) => void;
  setOpenDeleteModal: (status: boolean) => void;
  updateNoteInStore: (
    id: string,
    updatedFields: Partial<noteDataTypes>
  ) => void;
  setSelectedOption: (option: Record<MenuType, boolean>) => void;
  handleSelectedOption: (status: MenuType) => void;
}

const getInitialSelectedOption = () => {
  const stored = localStorage.getItem("selectedOption");
  return stored ? JSON.parse(stored) : defaultOptionsState;
};

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: true,
  openDeleteModal: false,
  selectedOption: getInitialSelectedOption(),
  setNotes: (notes) => set({ notes }),
  setOpenDeleteModal: (value) => set({ openDeleteModal: value }),

  updateNoteInStore: (id, updatedFields) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note._id === id ? { ...note, ...updatedFields } : note
      ),
    })),

  fetchNotes: async () => {
    try {
      set({ loading: true });
      const response = await getNotes();
      set({ notes: response.data });
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      set({ loading: false });
    }
  },

  handleSelectedOption: (menu: MenuType) =>
    set(() => {
      const newState = {
        home: false,
        search: false,
        archive: false,
        tags: false,
        settings: false,
        [menu]: true,
      };
      localStorage.setItem("selectedOption", JSON.stringify(newState));
      return { selectedOption: newState };
    }),

  setSelectedOption: (option) => {
    localStorage.setItem("selectedOption", JSON.stringify(option));
    set({ selectedOption: option });
  },
}));
