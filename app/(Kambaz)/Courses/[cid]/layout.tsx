import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb"; 
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../Database";

export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {

  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="text-danger d-flex align-items-center mb-1">
        <FaAlignJustify className="me-3 fs-4" />
        {course ? course.name : `Course ${cid}`}
      </h2>

      <Breadcrumb course={course} /> 
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <CourseNavigation />
        </div>

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
