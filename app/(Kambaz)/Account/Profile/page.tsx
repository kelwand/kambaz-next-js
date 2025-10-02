"use client";

import Link from "next/link";
import { FormControl, Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3">
      <h3 className="mb-3">Profile</h3>

      <Form>
        <FormControl
          id="wd-username"
          defaultValue="alice"
          placeholder="Username"
          className="mb-2"
        />

        <FormControl
          id="wd-password"
          defaultValue="123"
          type="password"
          placeholder="Password"
          className="mb-2"
        />

        <FormControl
          id="wd-firstname"
          defaultValue="Alice"
          placeholder="First Name"
          className="mb-2"
        />

        <FormControl
          id="wd-lastname"
          defaultValue="Wonderland"
          placeholder="Last Name"
          className="mb-2"
        />

        <FormControl
          id="wd-dob"
          type="date"
          defaultValue="mm/dd/yyyy"
          className="mb-2"
        />

        <FormControl
          id="wd-email"
          type="email"
          defaultValue="alice@wonderland.com"
          placeholder="Email"
          className="mb-2"
        />

        <Form.Select id="wd-role" defaultValue="USER" className="mb-3">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        <Link href="/Account/Signin" style={{ textDecoration: "none" }}>
          <Button variant="danger" className="w-100">
            Sign Out
          </Button>
        </Link>
      </Form>
    </div>
  );
}
