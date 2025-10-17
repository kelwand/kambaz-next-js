"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  due?: string;
  available?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string }; 
  const assignment: Assignment | undefined = db.assignments.find(
    (a) => a._id === aid
  );

  if (!assignment) return <p>Assignment not found!</p>;

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name"><strong>Assignment Name</strong></label>
      <input id="wd-name" defaultValue={assignment.title} /><br /><br />

      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        rows={4}
        defaultValue={assignment.description || ""}
      ></textarea>
      <br /><br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top"><label htmlFor="wd-points">Points</label></td>
            <td><input id="wd-points" type="number" defaultValue={assignment.points ?? 100} /></td>
          </tr>

          <tr>
            <td align="right" valign="top"><label htmlFor="wd-due-date">Due</label></td>
            <td>
              <input id="wd-due-date" type="date" defaultValue={assignment.due || ""} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top"><label htmlFor="wd-available-from">Available From</label></td>
            <td>
              <input id="wd-available-from" type="date" defaultValue={assignment.available || ""} />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Link href={`/Courses/${cid}/Assignments`}>
          <button>Cancel</button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <button>Save</button>
        </Link>
      </div>
    </div>
  );
}
