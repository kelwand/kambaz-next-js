"use client";

import { ListGroup, ListGroupItem, Button, InputGroup, Form } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function Assignments() {
  const { cid } = useParams();
  const assignments = [
    { id: 123, title: "A1 - ENV + HTML", available: "May 6 at 12:00am", due: "May 13 at 11:59pm", points: 100 },
    { id: 124, title: "A2 - CSS + BOOTSTRAP", available: "May 13 at 12:00am", due: "May 20 at 11:59pm", points: 100 },
    { id: 125, title: "A3 - JAVASCRIPT + REACT", available: "May 20 at 12:00am", due: "May 27 at 11:59pm", points: 100 },
    { id: 126, title: "A4 - STATE & REDUX", available: "May 27 at 12:00am", due: "June 3 at 11:59pm", points: 100 },
    { id: 127, title: "A5 - NODE AND SESSION", available: "June 3 at 12:00am", due: "June 10 at 11:59pm", points: 100 },
    { id: 128, title: "A6 - MONGODB AND MONGOOSE", available: "June 10 at 12:00am", due: "June 17 at 11:59pm", points: 100 },
  ];

  return (
    <div id="wd-assignments" className="p-3">
      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" />
        </InputGroup>
        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" className="text-white">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-3 position-relative">
        <h3 className="m-0">ASSIGNMENTS</h3>
        <div className="d-flex align-items-center position-relative">
          <span className="border border-2 border-secondary rounded-pill px-3 py-1 small me-3">
            40% of Total
          </span>
          <FaPlus className="me-2 text-secondary fs-5" />
          {/* 3 dots aligned with assignment rows */}
          <FaEllipsisV className="fs-5 text-secondary position-relative" style={{ top: '2px' }} />
        </div>
      </div>

      {/* Assignment Items */}
      <ListGroup className="rounded-0">
        {assignments.map(a => (
          <ListGroupItem
            key={a.id}
            className="position-relative p-3 mb-1"
            style={{ borderLeft: "5px solid green", borderRadius: "0px" }}
          >
            <div className="d-flex align-items-start">
              <PiNotePencilLight className="me-2 fs-5 text-success" />
              <div>
                <Link href={`/Courses/${cid}/Assignments/${a.id}`} className="text-decoration-none text-dark">
                  <strong>{a.title}</strong>
                </Link>
                <div className="mt-1" style={{ fontSize: "0.9rem" }}>
                  <span className="text-danger">Multiple Modules</span>
                  <span> | <strong>Not available until</strong> {a.available}</span>
                  <span> | <strong>Due</strong> {a.due}</span>
                  <span> | {a.points} pts</span>
                </div>
              </div>
            </div>

            <div className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center pe-3">
              <FaCheckCircle className="text-success me-2 fs-5" />
              <FaEllipsisV className="fs-5 text-secondary" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}