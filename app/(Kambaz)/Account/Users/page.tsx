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
    const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

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

   const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesName =
      u.firstName?.toLowerCase().includes(nameFilter.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesRole && matchesName;
  });

  return (
    <div>
        <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      {/* 🔍 FILTER CONTROLS (REQUIRED FOR RUBRIC) */}
      <div className="d-flex gap-3 mb-3">
        {/* ROLE FILTER */}
        <select
          className="form-select w-auto"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admins</option>
          <option value="USER">Users</option>
        </select>

        {/* NAME FILTER */}
        <input
          className="form-control w-auto"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <h3>Users</h3>

      <UsersTable users={filteredUsers} />

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
