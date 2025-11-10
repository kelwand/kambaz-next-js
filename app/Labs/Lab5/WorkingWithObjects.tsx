"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "m1",
    name: "Intro to NodeJS",
    description: "Learn the basics of NodeJS and Express",
    course: "Full Stack Development",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Assignment</h4>
      <FormControl
        className="mb-2"
        type="text"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <a
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title/${assignment.title}`}
      >
        Update Title
      </a>

      <FormControl
        className="mb-2"
        type="number"
        value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
      />
      <a
        className="btn btn-success me-2"
        href={`${HTTP_SERVER}/lab5/assignment/score/${assignment.score}`}
      >
        Update Score
      </a>

      <div className="form-check mb-2">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        />
        Completed
      </div>
      <a
        className="btn btn-warning"
        href={`${HTTP_SERVER}/lab5/assignment/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <hr />

      {/* --- Module Section --- */}
      <h4>Module</h4>
      <a className="btn btn-primary me-2" href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
      </a>
      <a className="btn btn-secondary me-2" href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Module Name
      </a>

      <FormControl
        className="mb-2"
        type="text"
        value={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />
      <a
        className="btn btn-success me-2"
        href={`${HTTP_SERVER}/lab5/module/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>

      <FormControl
        className="mb-2"
        type="text"
        value={moduleObj.description}
        onChange={(e) => setModuleObj({ ...moduleObj, description: e.target.value })}
      />
      <a
        className="btn btn-warning"
        href={`${HTTP_SERVER}/lab5/module/description/${moduleObj.description}`}
      >
        Update Module Description
      </a>
    </div>
  );
}
