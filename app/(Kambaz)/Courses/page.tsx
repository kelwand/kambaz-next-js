"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Card, Col, Row } from "react-bootstrap";

import * as client from "./client";
import type { AccountState } from "../store";

interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface User {
  _id: string;
  role: string;
}

export default function CoursesPage() {
  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null };

  if (currentUser === undefined) return null;
  if (!currentUser) redirect("/Account/Signin");

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [showMine, setShowMine] = useState(true);
  

  const fetchAllCourses = async () => {
    const data = await client.fetchAllCourses();
    setAllCourses(data);
  };

  const fetchMyCourses = async () => {
    const data = await client.findMyCourses();
    setMyCourses(data);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchMyCourses();
  }, []);

  const isEnrolled = (courseId: string) =>
    myCourses.some((c) => c._id === courseId);

  const onEnroll = async (courseId: string) => {
    await client.enrollIntoCourse("current", courseId);
    fetchMyCourses(); 
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse("current", courseId);
    fetchMyCourses(); 
  };

  const coursesToDisplay = showMine ? myCourses : allCourses;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Courses</h1>

        <div>
          <Button
            variant={showMine ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setShowMine(true)}
          >
            My Courses
          </Button>

          <Button
            variant={!showMine ? "primary" : "outline-primary"}
            onClick={() => setShowMine(false)}
          >
            All Courses
          </Button>
        </div>
      </div>

      <Row xs={1} md={3} lg={4} className="g-4">
        {coursesToDisplay.map((course) => (
          <Col key={course._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>

                <Link href={`/Courses/${course._id}/Home`}>
                  <Button className="me-2">Go</Button>
                </Link>

                {currentUser.role === "STUDENT" && (
                  <>
                    {!isEnrolled(course._id) ? (
                      <Button
                        variant="success"
                        onClick={() => onEnroll(course._id)}
                      >
                        Enroll
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => onUnenroll(course._id)}
                      >
                        Unenroll
                      </Button>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
