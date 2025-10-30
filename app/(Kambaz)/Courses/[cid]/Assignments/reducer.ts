import { createSlice } from "@reduxjs/toolkit";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  due?: string;
  available?: string;
  until?: string;
}

const initialState = {
  assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments.push({ ...action.payload, _id: new Date().getTime().toString() });
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? { ...a, ...action.payload } : a
      );
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
