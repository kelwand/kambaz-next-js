"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

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
