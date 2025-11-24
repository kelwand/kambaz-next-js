"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function UsersTable({ users }: { users: any[] }) {
  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Login ID</th>
          <th>Section</th>
          <th>Role</th>
          <th>Last Activity</th>
          <th>Total Activity</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td className="d-flex align-items-center gap-2">
              <FaUserCircle className="fs-3 text-secondary" />
              <Link
                href={`/Account/Users?uid=${user._id}`}
                className="text-danger"
              >
                {user.firstName} {user.lastName}
              </Link>
            </td>

            <td>{user.username}</td>
            <td>{user.loginId}</td>
            <td>{user.section}</td>
            <td>{user.role}</td>
            <td>
              {user.lastActivity && !isNaN(new Date(user.lastActivity).getTime())
                ? new Date(user.lastActivity).toISOString().split("T")[0]
                : "—"}
            </td>
             <td>{user.totalActivity}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}
