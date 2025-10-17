"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CourseNavigation() {
  const { cid } = useParams(); 
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const getItemClasses = (path: string) =>
    `list-group-item border-0 ${pathname.includes(path) ? "active" : ""}`;

  const getLinkClasses = (path: string) =>
    `text-decoration-none ${pathname.includes(path) ? "text-dark" : "text-danger"}`;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const route = link === "People" ? "People/Table" : link;

        return (
          <ListGroupItem key={link} className={getItemClasses(`/${link}`)}>
            <Link
              href={`/Courses/${cid}/${route}`} 
              className={getLinkClasses(`/${link}`)}
            >
              {link}
            </Link>
          </ListGroupItem>
        );
      })}
    </div>
  );
}
