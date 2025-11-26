"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AccountState } from "../../../../store";
import * as client from "../client";
import { useEffect, useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };

  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as any;

  const isFaculty = currentUser?.role === "FACULTY";

  const isNew = aid === "New";

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
  });

  useEffect(() => {
    if (isNew) return;

    const load = async () => {
      const data = await client.findAssignmentById(aid);
      setAssignment(data);
    };

    load();
  }, [aid]);

  const handleSave = async () => {
    if (isNew) {
      await client.createAssignment(cid, assignment);
    } else {
      await client.updateAssignment(aid, assignment);
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: 600 }}>
      <h3>{isNew ? "New Assignment" : "Edit Assignment"}</h3>

      <label><b>Assignment Name</b></label>
      <input
        className="form-control mb-3"
        value={assignment.title}
        disabled={!isFaculty}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      <label>Description</label>
      <textarea
        className="form-control mb-3"
        rows={4}
        value={assignment.description}
        disabled={!isFaculty}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <label>Points</label>
      <input
        type="number"
        className="form-control mb-3"
        value={assignment.points}
        disabled={!isFaculty}
        onChange={(e) =>
          setAssignment({ ...assignment, points: Number(e.target.value) })
        }
      />

      <label>Due Date</label>
      <input
        type="date"
        className="form-control mb-3"
        value={assignment.due}
        disabled={!isFaculty}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />

      <label>Available From</label>
      <input
        type="date"
        className="form-control mb-3"
        value={assignment.available}
        disabled={!isFaculty}
        onChange={(e) =>
          setAssignment({ ...assignment, available: e.target.value })
        }
      />

      <label>Available Until</label>
      <input
        type="date"
        className="form-control mb-3"
        value={assignment.until}
        disabled={!isFaculty}
        onChange={(e) =>
          setAssignment({ ...assignment, until: e.target.value })
        }
      />

      <div className="d-flex justify-content-end gap-2">
        <Link href={`/Courses/${cid}/Assignments`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>

        {isFaculty && (
          <Link href={`/Courses/${cid}/Assignments`}>
            <button className="btn btn-danger" onClick={handleSave}>
              Save
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
