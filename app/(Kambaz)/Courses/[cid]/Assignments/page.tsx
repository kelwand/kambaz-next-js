"use client";

import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { AccountState } from "../../../store";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams() as { cid: string };

  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as any;
  const isFaculty = currentUser?.role === "FACULTY";

  const [assignments, setAssignments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const loadAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid);
    setAssignments(data);
  };

  useEffect(() => {
    loadAssignments();
  }, [cid]);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const newAssignment = await client.createAssignment(cid, { title });
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setShowForm(false);
  };

  const handleDelete = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    setAssignments(assignments.filter((a) => a._id !== assignmentId));
  };

  return (
    <div className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup style={{ maxWidth: "300px" }}>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control placeholder="Search Assignments" />
          </InputGroup>

          <Button variant="danger" onClick={() => setShowForm(!showForm)}>
            <FaPlus /> Assignment
          </Button>
        </div>
      )}

      {showForm && isFaculty && (
        <div className="mb-3 p-3 border rounded">
          <Form.Label>Assignment Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter assignment title"
          />
          <Button className="mt-2" onClick={handleCreate}>
            Save
          </Button>
        </div>
      )}

      <ListGroup>
        {assignments.map((a) => (
          <ListGroupItem key={a._id} className="d-flex justify-content-between align-items-center">
            <div>
              <PiNotePencilLight className="me-2 text-success" />
              <strong>{a.title}</strong>
            </div>

            {isFaculty && (
              <div className="d-flex align-items-center">
                <PiNotePencilLight
                  className="text-primary me-3"
                  style={{ cursor: "pointer", fontSize: "1.3rem" }}
                  onClick={() =>
                    window.location.href = `/Courses/${cid}/Assignments/${a._id}`
                  }
                />

                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(a._id)}
                />
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
