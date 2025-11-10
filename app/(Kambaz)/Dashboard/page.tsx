"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import * as client from "../Courses/client";
import type { AppDispatch, AccountState, CoursesState } from "../store";
import { setCourses } from "../Courses/reducer";

interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
}

interface User {
  _id: string;
  role: string;
  [key: string]: unknown;
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null | undefined };

  const { courses } = useSelector(
    (state: CoursesState) => state.coursesReducer
  ) as { courses: Course[] };

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};

  return (
    <div id="wd-dashboard" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
      </div>

      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={onAddNewCourse}
            >
              Add
            </button>

            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse} 
            >
              Update
            </button>
          </h5>

          <br />

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        My Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course._id}>
              <Card className="h-100 shadow-sm">
                <Image
                  src={`/images/${course.image || "reactjs.jpg"}`}
                  alt={course.name}
                  width={300}
                  height={180}
                  style={{ objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-truncate">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="text-muted overflow-hidden"
                    style={{ height: "70px" }}
                  >
                    {course.description}
                  </Card.Text>
                  <Link href={`/Courses/${course._id}/Home`} passHref>
                    <Button variant="primary">Go</Button>
                  </Link>
                  {isFaculty && (
                    <button
                      className="btn btn-danger float-end"
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
