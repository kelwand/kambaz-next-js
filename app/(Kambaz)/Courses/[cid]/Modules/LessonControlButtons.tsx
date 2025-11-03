"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useSelector } from "react-redux";
import { AccountState } from "../../../store";

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function LessonControlButtons() {
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer) as { currentUser: User | null };
  const isFaculty = currentUser?.role === "FACULTY";

  if (!isFaculty) return null;

  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
