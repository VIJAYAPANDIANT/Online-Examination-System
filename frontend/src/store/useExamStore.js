import { create } from 'zustand';

const useExamStore = create((set) => ({
  questions: [],
  answers: {},
  isNetworkHealthy: true,
  lastSavedAt: null,
  
  setQuestions: (questions) => set({ questions }),
  
  setAnswer: (questionId, selectedOption) => set((state) => ({
    answers: {
      ...state.answers,
      [questionId]: selectedOption
    }
  })),

  setNetworkStatus: (status) => set({ isNetworkHealthy: status }),
  
  setLastSaved: () => set({ lastSavedAt: new Date().toISOString() })
}));

export default useExamStore;
