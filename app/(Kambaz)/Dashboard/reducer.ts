import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // add course (reducer auto-generates _id)
    addNewCourse: (state, { payload }: PayloadAction<Omit<Course, "_id">>) => {
      const newCourse: Course = { ...payload, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },

    // delete course
    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== payload);
    },
    
    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
