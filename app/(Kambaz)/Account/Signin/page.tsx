"use client";

import Link from "next/link";
import { FormControl } from "react-bootstrap";


export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Signin</h1>
      <FormControl id="wd-username"
        placeholder="username"
        className="mb-1" />
      <FormControl id="wd-password"
        placeholder="password" type="password"
        className="mb-1" />
      <Link id="wd-signin-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-1">
        Signin </Link>
      <Link id="wd-signup-link" href="/Account/Signup">Signup</Link>
    </div>
  );
}

