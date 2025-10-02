"use client";

import Link from "next/link";
import { FormControl } from "react-bootstrap";


export default function Signup() {
  return (
    <div id="wd-signin-screen">
      <h1>Signup</h1>
      <FormControl id="wd-username"
        placeholder="username"
        className="mb-1" />
      <FormControl id="wd-password"
        placeholder="password" type="password"
        className="mb-1" />
      <Link id="wd-signin-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-1">
        Signup </Link>
       <Link id="wd-signin-link" href="/Account/Signin"
        className="text-decoration-underline">
        Signin</Link>
    </div>
  );
}