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

interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer) as { courses: Course[] };
  const { enrollments } = db;

  const isFaculty = currentUser?.role === "FACULTY";

  // Local state
  const [course, setCourse] = useState<any>({
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

  // Redirect if not signed in & initialize enrollments
  useEffect(() => {
    if (currentUser === undefined) return;
    if (!currentUser) router.push("/Account/Signin");
    else {
      const myEnrollments = enrollments
        .filter((e) => e.user === currentUser._id)
        .map((e) => e.course);
      setUserEnrollments(myEnrollments);
    }
  }, [currentUser, router]);

  if (currentUser === undefined || !currentUser) return null;

  // Toggle view between all courses and enrolled courses
  const toggleEnrollmentView = () => setShowAllCourses(!showAllCourses);

  // Enroll/Unenroll a course
  const handleEnroll = (courseId: string) => {
    if (userEnrollments.includes(courseId)) {
      setUserEnrollments(userEnrollments.filter((id) => id !== courseId));
    } else {
      setUserEnrollments([...userEnrollments, courseId]);
    }
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => userEnrollments.includes(c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      {/* Header with persistent blue Enrollments button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {!isFaculty && (
          <Button variant="primary" onClick={toggleEnrollmentView}>
            Enrollments
          </Button>
        )}
      </div>

      <hr />

      {/* Faculty: Add/Update Courses */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={() => dispatch(addNewCourse({ ...course, _id: uuidv4() }))}
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
                    <Card.Title className="fw-bold text-truncate">{course.name}</Card.Title>
                    <Card.Text
                      className="text-muted overflow-hidden"
                      style={{ height: "70px" }}
                    >
                      {course.description}
                    </Card.Text>

                    {/* Faculty buttons */}
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
                        {/* Enroll/Unenroll buttons */}
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
