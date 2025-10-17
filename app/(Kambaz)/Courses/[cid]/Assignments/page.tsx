"use client";

import { ListGroup, ListGroupItem, Button, InputGroup, Form } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../Database"; 

export default function Assignments() {
  const { cid } = useParams(); 
  const assignments = db.assignments.filter(a => a.course === cid); 

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
          <FaEllipsisV className="fs-5 text-secondary position-relative" style={{ top: '2px' }} />
        </div>
      </div>

      {/* Assignment Items */}
      <ListGroup className="rounded-0">
        {assignments.map(a => (
          <ListGroupItem
            key={a._id}
            className="position-relative p-3 mb-1"
            style={{ borderLeft: "5px solid green", borderRadius: "0px" }}
          >
            <div className="d-flex align-items-start">
              <PiNotePencilLight className="me-2 fs-5 text-success" />
              <div>
                <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="text-decoration-none text-dark">
                  <strong>{a.title}</strong>
                </Link>
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
