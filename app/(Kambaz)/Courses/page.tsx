"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { AccountState } from "../store"; 

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function CoursesPage() {
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer) as { currentUser: User | null };

  if (currentUser === undefined) return null;
  if (!currentUser) redirect("/Account/Signin");

  redirect("/Dashboard");
}
