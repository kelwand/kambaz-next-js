"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CourseNavigation() {
  const pathname = usePathname();

  const getItemClasses = (path: string) => {
    return `list-group-item border-0 ${
      pathname.includes(path) ? "active" : ""
    }`;
  };

  const getLinkClasses = (path: string) => {
    return `text-decoration-none ${
      pathname.includes(path) ? "text-dark" : "text-danger"
    }`;
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <ListGroupItem className={getItemClasses("/Home")}>
        <Link href="/Courses/1234/Home" className={getLinkClasses("/Home")}>
          Home
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Modules")}>
        <Link href="/Courses/1234/Modules" className={getLinkClasses("/Modules")}>
          Modules
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Piazza")}>
        <Link href="/Courses/1234/Piazza" className={getLinkClasses("/Piazza")}>
          Piazza
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Zoom")}>
        <Link href="/Courses/1234/Zoom" className={getLinkClasses("/Zoom")}>
          Zoom
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Assignments")}>
        <Link href="/Courses/1234/Assignments" className={getLinkClasses("/Assignments")}>
          Assignments
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Quizzes")}>
        <Link href="/Courses/1234/Quizzes" className={getLinkClasses("/Quizzes")}>
          Quizzes
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Grades")}>
        <Link href="/Courses/1234/Grades" className={getLinkClasses("/Grades")}>
          Grades
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/People")}>
        <Link href="/Courses/1234/People/Table" className={getLinkClasses("/People")}>
          People
        </Link>
      </ListGroupItem>
    </div>
  );
}
