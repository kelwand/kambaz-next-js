import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";

const store = configureStore({
 reducer: 
 { 
    coursesReducer, 
    modulesReducer,
    accountReducer,
    assignmentsReducer,

},
 
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AccountState = {
  accountReducer: {
    currentUser: {
      username: string;
      password: string;
    } | null;
  };
};

export type CoursesState = {
  coursesReducer: {
    courses: Array<{
      _id: string;
      name: string;
      description?: string;
      image?: string;
      number?: string;
      startDate?: string;
      endDate?: string;
    }>;
  };
};

export type ModulesState = {
  modulesReducer: {
    modules: Array<{
      _id: string;
      title: string;
      name: string;
      course: string;
      editing?: boolean;
      lessons: Array<{
        _id: string;
        module: string;
        name: string;
        title: string;
        content: string;
      }>;
    }>;
  };
};

export type AssignmentsState = {
  assignmentsReducer: {
    assignments: Array<{
      _id: string;
      title: string;
      course: string;
      description?: string;
      dueDate?: string;
    }>;
  };
};