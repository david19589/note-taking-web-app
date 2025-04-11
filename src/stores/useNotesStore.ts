import { create } from "zustand";
import { getNotes, noteDataTypes } from "../utils/api";

interface NotesState {
  notes: noteDataTypes[];
  loading: boolean;
  openDeleteModal: boolean;
  fetchNotes: () => void;
  setNotes: (notes: noteDataTypes[]) => void;
  setOpenDeleteModal: (status: boolean) => void;
  updateNoteInStore: (
    id: string,
    updatedFields: Partial<noteDataTypes>
  ) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: true,
  openDeleteModal: false,
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
}));
