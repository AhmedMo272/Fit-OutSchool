import { create } from "zustand";

export const useLeadsStore = create((set) => ({
  leads: [],

  setLeads: (leads) => set({ leads }),

  markAsPaid: (phone) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.phone === phone ? { ...l, paid: true } : l
      ),
    })),
}));