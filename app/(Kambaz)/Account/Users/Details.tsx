"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil, FaCheck } from "react-icons/fa6";
import * as client from "../client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
}: {
  uid: string;
  onClose: () => void;
  fetchUsers: () => void;
}) {
  const [user, setUser] = useState<any>(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const load = async () => {
      const u = await client.findUserById(uid);
      setUser(u);
      setName(`${u.firstName} ${u.lastName}`);
      setEmail(u.email);
      setRole(u.role);
    };
    load();
  }, [uid]);

  if (!user) return null;

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };

    await client.updateUser(updatedUser);

    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    onClose(); 
  };

  const deleteUser = async () => {
    await client.deleteUser(uid);
    fetchUsers();
    onClose();
  };

  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl
            className="w-75"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        )}
      </div>

      <br />
      <b>Email:</b>
      {!editing ? (
        <div>{user.email}</div>
      ) : (
        <FormControl
          type="email"
          className="w-75"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <br />
      <b>Role:</b>
      {!editing ? (
        <div>{user.role}</div>
      ) : (
        <select
          className="form-select w-50"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="TA">TA</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      )}

      <br />

      <b>Login ID:</b> {user.loginId} <br />
      <b>Section:</b> {user.section} <br />
      <b>Total Activity:</b> {user.totalActivity}
      <hr />

      <button onClick={deleteUser} className="btn btn-danger float-end">
        Delete
      </button>
      <button onClick={onClose} className="btn btn-secondary float-end me-2">
        Cancel
      </button>
    </div>
  );
}
