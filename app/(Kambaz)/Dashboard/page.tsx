"use client";

import Link from "next/link";
import Image from "next/image";
import * as db from "../Database"; 
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const courses = db.courses; 

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course">
              <Card className="h-100 shadow-sm">
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Image
                    src={`/images/${(course as any).image || "reactjs.jpg"}`}
                    alt={course.name}
                    width={300}
                    height={180}
                    className="card-img-top"
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
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
