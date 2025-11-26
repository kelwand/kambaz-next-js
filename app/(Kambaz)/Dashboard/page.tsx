"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";

import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

import { setCourses } from "../Courses/reducer";
import type { AppDispatch, AccountState, CoursesState } from "../store";

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
  [key: string]: any;
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null };

  const { courses } = useSelector(
    (state: CoursesState) => state.coursesReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  const loadMyCourses = async () => {
    if (!currentUser) return;
    const myCourses = await coursesClient.findMyCourses();
    dispatch(setCourses(myCourses));
  };

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const loadAllCourses = async () => {
    const list = await coursesClient.findAllCourses();
    setAllCourses(list);
  };

  const loadEnrollments = async () => {
    if (!currentUser) return;
    const enrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
setEnrolledIds(enrollments.map((e: any) => e._id || e.course?._id));
  };

  useEffect(() => {
    if (!currentUser) return;
    loadMyCourses();
    loadEnrollments();
    if (isStudent) loadAllCourses();
  }, [currentUser]);

  const handleEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollUserInCourse(currentUser!._id, courseId);
    loadEnrollments();
    loadMyCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollUserFromCourse(currentUser!._id, courseId);
    loadEnrollments();
    loadMyCourses();
  };

  const displayedCourses = isStudent
    ? showAllCourses
      ? allCourses       
      : courses          
    : courses;           

  const toggleView = () => setShowAllCourses(!showAllCourses);

  return (
    <div id="wd-dashboard" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard</h1>

        {isStudent && (
          <Button variant="primary" onClick={toggleView}>
            {showAllCourses ? "Back to My Courses" : "Enrollments"}
          </Button>
        )}
      </div>

      <hr />

      <h2>
        {isStudent
          ? showAllCourses
            ? `All Courses (${displayedCourses.length})`
            : `My Courses (${displayedCourses.length})`
          : `My Courses (${displayedCourses.length})`}
      </h2>

      <Row xs={1} md={3} lg={4} className="g-4 mt-2">
        {displayedCourses.map((course) => {
          const isEnrolled = enrolledIds.includes(course._id);

          return (
            <Col key={course._id}>
              <Card className="h-100 shadow-sm">
                <Image
                  src={`/images/${course.image || "reactjs.jpg"}`}
                  width={300}
                  height={180}
                  alt=""
                  style={{ objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title className="fw-bold text-truncate">
                    {course.name}
                  </Card.Title>

                  <Card.Text
                    className="text-muted"
                    style={{ height: "65px", overflow: "hidden" }}
                  >
                    {course.description}
                  </Card.Text>

                  {isStudent && (
                    <>
                      {!showAllCourses && isEnrolled && (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => handleUnenroll(course._id)}
                          >
                            Unenroll
                          </Button>

                          <Link href={`/Courses/${course._id}/Home`} className="ms-2">
                            <Button variant="primary">Go</Button>
                          </Link>
                        </>
                      )}

                      {showAllCourses && !isEnrolled && (
                        <Button
                          variant="success"
                          onClick={() => handleEnroll(course._id)}
                        >
                          Enroll
                        </Button>
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
  );
}
