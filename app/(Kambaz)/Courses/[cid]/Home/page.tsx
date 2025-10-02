"use client";

import CourseStatus from "./Status";
import { ReactNode } from "react";

export default function Home({ children }: { children?: ReactNode }) {
  return (
    <div id="wd-courses-home" className="d-flex">
      <div className="flex-fill p-3">
        <h2>Welcome to CS1234 React JS</h2>
        <p>
          This is your Course Home page. Here you can view announcements,
          overview of the course, or any important updates. Navigate to Modules,
          Assignments, or Quizzes using the Course Navigation on the left.
        </p>
        <p>
          Future chapters will populate this page with more dynamic course
          content.
        </p>
      </div>

      <div className="d-none d-lg-block" >
        <CourseStatus />
      </div>
    </div>
  );
}

