"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import * as db from "../../Database";

export default function CoursePage({ params }: { params: { cid: string } }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = params;

  if (currentUser === undefined) return null;
  if (!currentUser) redirect("/Account/Signin");

  const { enrollments } = db;
  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (isFaculty || isEnrolled) {
    redirect(`/Courses/${cid}/Home`);
  } else {
    redirect("/Dashboard");
  }
}
