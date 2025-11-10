"use client";

import { ListGroup, ListGroupItem, Button, InputGroup, Form } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Assignment, deleteAssignment } from "./reducer";
import * as client from "./client"; 
import { AccountState, AssignmentsState } from "../../../store";
import { useEffect, useState } from "react";


interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Assignments() {
  const { cid } = useParams() as { cid: string };
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: AccountState) => state.accountReducer) as { currentUser: User | null };
  const isFaculty = currentUser?.role === "FACULTY";

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const fetchAssignments = async () => {
    try {
      const data = await client.findAssignmentsForCourse(cid);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await client.deleteAssignment(id);
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting assignment:", err);
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Top Controls */}
      {isFaculty && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <InputGroup style={{ maxWidth: "300px" }}>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control placeholder="Search for Assignments" />
          </InputGroup>
          <div>
            <Link href={`/Courses/${cid}/Assignments/New`}>
              <Button variant="danger" className="text-white">
                <FaPlus className="me-1" /> Assignment
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Assignment Items */}
      <ListGroup className="rounded-0">
        {assignments.map((a: Assignment) => (
          <ListGroupItem
            key={a._id}
            className="position-relative p-3 mb-1"
            style={{ borderLeft: "5px solid green", borderRadius: "0px" }}
          >
            <div className="d-flex align-items-start">
              <PiNotePencilLight className="me-2 fs-5 text-success" />
              <div className="flex-grow-1">
                <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="text-decoration-none text-dark">
                  <strong>{a.title}</strong>
                </Link>
              </div>
              {isFaculty && (
                <FaTrash
                  className="text-danger ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(a._id)}
                />
              )}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
