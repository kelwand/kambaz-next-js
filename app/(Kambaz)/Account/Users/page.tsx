"use client";

import { useState, useEffect } from "react";
import * as client from "../client";
import UsersTable from "./UsersTable";
import PeopleDetails from "./Details";
import { useSearchParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const uid = searchParams.get("uid");

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: `00${Math.floor(Math.random() * 1000000)}S`,
      lastActivity: new Date().toISOString(),
    totalActivity: "00:00:00",
    });
    setUsers([...users, user]);
  };

  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
        <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>

      <UsersTable users={users} />

      {uid && (
        <PeopleDetails
          uid={uid}
          onClose={() => router.push("/Account/Users")}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
}
