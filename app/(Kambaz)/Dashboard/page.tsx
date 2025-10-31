"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import * as db from "../Database";
import type { RootState, AppDispatch } from "../store";

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
  const router = useRouter();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as User | null | undefined;

  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  ) as Course[];

  const { enrollments } = db;
  const isFaculty = currentUser?.role === "FACULTY";

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [userEnrollments, setUserEnrollments] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    if (currentUser === undefined) return;
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    const myEnrollments = enrollments
      .filter(
        (e: { user: string; course: string }) => e.user === currentUser._id
      )
      .map((e: { course: string }) => e.course);
    setUserEnrollments(myEnrollments);
  }, [currentUser, router, enrollments]);

  if (currentUser === undefined || !currentUser) return null;

  const toggleEnrollmentView = () => setShowAllCourses(!showAllCourses);

  const handleEnroll = (courseId: string) => {
    setUserEnrollments((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAddCourse = () => {
    const newCourse = {
      name: course.name,
      description: course.description,
      number: course.number,
      startDate: course.startDate,
      endDate: course.endDate,
      image: course.image,
    } as Omit<Course, "_id">;

    dispatch(addNewCourse({ ...newCourse, _id: uuidv4() } as Course));
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => userEnrollments.includes(c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {!isFaculty && (
          <Button variant="primary" onClick={toggleEnrollmentView}>
            Enrollments
          </Button>
        )}
      </div>

      <hr />


      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={handleAddCourse}
            >
              Add
            </button>

            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
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
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={4} className="g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = userEnrollments.includes(course._id);

            return (
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

                    {isFaculty ? (
                      <>
                        <Link href={`/Courses/${course._id}/Home`} passHref>
                          <Button variant="primary">Go</Button>
                        </Link>
                        <button
                          onClick={() => dispatch(deleteCourse(course._id))}
                          className="btn btn-danger float-end"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setCourse(course)}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={() => handleEnroll(course._id)}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>

                        {isEnrolled && (
                          <Link href={`/Courses/${course._id}/Home`} passHref>
                            <Button variant="primary" className="ms-2">
                              Go
                            </Button>
                          </Link>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
