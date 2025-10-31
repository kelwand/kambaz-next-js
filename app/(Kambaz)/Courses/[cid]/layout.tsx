"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import type { RootState } from "../../store"; 

interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
}

interface CoursesLayoutProps {
  children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  const { cid } = useParams();

  const courses = useSelector((state: RootState) => state.coursesReducer.courses) as Course[];

  const course = courses.find((c: Course) => c._id === cid);

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="text-danger d-flex align-items-center mb-1">
        <FaAlignJustify
          className="me-3 fs-4"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        {course ? course.name : `Course ${cid}`}
      </h2>

      <Breadcrumb course={course} />
      <hr />

      <div className="d-flex">
        {showSidebar && (
          <div className="me-3">
            <CourseNavigation />
          </div>
        )}

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
