"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import * as enrollmentsClient from "../../../../Enrollments/client";
import * as usersClient from "../../../../Account/client";
import { useSelector } from "react-redux";
import { AccountState } from "../../../../store";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"; 

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: number;
}

export default function People() {
  const { cid } = useParams() as { cid: string };
  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null };

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await usersClient.findAllUsers();
        const enrollments = await enrollmentsClient.findAllEnrollments();
        const courseEnrollments = enrollments.filter(
          (e: any) => e.course === cid
        );
        const enrolled = users.filter((u: any) =>
          courseEnrollments.some((e: any) => e.user === u._id)
        );
        setAllUsers(users);
        setEnrolledUsers(enrolled);
      } catch (err) {
        console.error("Error loading people:", err);
      }
    };
    fetchData();
  }, [cid]);

  const handleEnroll = async (userId: string) => {
    try {
      await enrollmentsClient.enrollUserInCourse(userId, cid);
      const user = allUsers.find((u) => u._id === userId);
      if (user) setEnrolledUsers([...enrolledUsers, user]);
    } catch (err) {
      console.error("Error enrolling user:", err);
    }
  };

  const handleUnenroll = async (userId: string) => {
    try {
      await enrollmentsClient.unenrollUserFromCourse(userId, cid);
      setEnrolledUsers(enrolledUsers.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Error unenrolling user:", err);
    }
  };

  return (
    <div id="wd-people-table" className="p-3">
      <h3>People Enrolled in this Course</h3>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            const isEnrolled = enrolledUsers.some((u) => u._id === user._id);
            return (
              <tr key={user._id}>
                <td className="text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.loginId}</td>
                <td>{user.section}</td>
                <td>{user.role}</td>
                <td>{user.lastActivity}</td>
                <td>{user.totalActivity}</td>
                {isFaculty && (
                  <td>
                    {isEnrolled ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleUnenroll(user._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleEnroll(user._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}