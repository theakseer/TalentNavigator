import { create } from 'zustand'

export const jobStore = create((set) => ({
  Jobs: [],
  setJobsArray: (newjobs) => set( { Jobs: newjobs }),
  removeAllBears: () => set({ Jobs: [] }),
}))
