"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Assignment, addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: User | null };
  
  const assignments: Assignment[] = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const assignment = assignments.find((a) => a._id === aid);
  const isNew = aid === "New";

  const handleSave = () => {
    const newAssignment: Assignment = {
      _id: isNew ? new Date().getTime().toString() : assignment!._id,
      title: (document.getElementById("wd-name") as HTMLInputElement).value,
      course: cid,
      description: (document.getElementById("wd-description") as HTMLTextAreaElement).value,
      points: Number((document.getElementById("wd-points") as HTMLInputElement).value),
      due: (document.getElementById("wd-due-date") as HTMLInputElement).value,
      available: (document.getElementById("wd-available-from") as HTMLInputElement).value,
      until: (document.getElementById("wd-available-until") as HTMLInputElement).value,
    };

    if (isNew) dispatch(addAssignment(newAssignment));
    else dispatch(updateAssignment(newAssignment));
  };

  if (!assignment && !isNew) return <p>Assignment not found!</p>;

  return (
    <div id="wd-assignments-editor" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <label htmlFor="wd-name"><strong>Assignment Name</strong></label>
      <input
        id="wd-name"
        defaultValue={assignment?.title || ""}
        disabled={!isFaculty}
        className="form-control mb-3"
      />

      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        rows={4}
        defaultValue={assignment?.description || ""}
        disabled={!isFaculty}
        className="form-control mb-3"
      />

      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td align="right" style={{ width: "120px" }}>
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input
                id="wd-points"
                type="number"
                defaultValue={assignment?.points ?? 100}
                disabled={!isFaculty}
                className="form-control mb-2"
              />
            </td>
          </tr>

          <tr>
            <td align="right"><label htmlFor="wd-due-date">Due</label></td>
            <td>
              <input
                id="wd-due-date"
                type="date"
                defaultValue={assignment?.due || ""}
                disabled={!isFaculty}
                className="form-control mb-2"
              />
            </td>
          </tr>

          <tr>
            <td align="right"><label htmlFor="wd-available-from">Available From</label></td>
            <td>
              <input
                id="wd-available-from"
                type="date"
                defaultValue={assignment?.available || ""}
                disabled={!isFaculty}
                className="form-control mb-2"
              />
            </td>
          </tr>

          <tr>
            <td align="right"><label htmlFor="wd-available-until">Available Until</label></td>
            <td>
              <input
                id="wd-available-until"
                type="date"
                defaultValue={assignment?.until || ""}
                disabled={!isFaculty}
                className="form-control mb-2"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Link href={`/Courses/${cid}/Assignments`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        {isFaculty && (
          <Link href={`/Courses/${cid}/Assignments`}>
            <button className="btn btn-danger" onClick={handleSave}>Save</button>
          </Link>
        )}
      </div>
    </div>
  );
}
