"use client";

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { AppDispatch } from "../../store"; 
import * as client from "../client";

interface Credentials {
  username: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();

  const signin =  async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Signin</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-1"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-1"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      <Button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-1"
      >
        Signin
      </Button>

      <Link id="wd-signup-link" href="/Account/Signup">
        Signup
      </Link>
    </div>
  );
}
