"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findUsersForCourse } from "../../client";
import PeoplesTables from "./Table";  

export default function PeoplePage() {
  const { cid } = useParams(); 
  const [users, setUsers] = useState([]);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await findUsersForCourse(cid as string);
      setUsers(data);
    };
    loadUsers();
  }, [cid]);

  return (
    <div className="p-4">
      <h2>Enrolled Users</h2>
      <ul className="list-group">
        {users.map((user: any) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => setSelectedUid(user._id)}
          >
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      {selectedUid && (
        <PeoplesTables uid={selectedUid} onClose={() => setSelectedUid(null)} />
      )}
    </div>
  );
}
