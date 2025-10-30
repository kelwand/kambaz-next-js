"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  courses: any[];
  enrollments: string[]; 
  showAll: boolean;
}

const initialState: DashboardState = {
  courses: [],
  enrollments: [],
  showAll: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.courses = action.payload;
    },
    toggleEnrollments: (state) => {
      state.showAll = !state.showAll;
    },
    enrollCourse: (state, action: PayloadAction<string>) => {
      if (!state.enrollments.includes(action.payload)) {
        state.enrollments.push(action.payload);
      }
    },
    unenrollCourse: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setCourses,
  toggleEnrollments,
  enrollCourse,
  unenrollCourse,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
