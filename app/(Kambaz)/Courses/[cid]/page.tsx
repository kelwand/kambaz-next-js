"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { findMyCourses } from "../client"; 
import { AccountState } from "../../store";

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function CoursePage({ params }: { params: { cid: string } }) {
  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null };

  const { cid } = params;

  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  if (currentUser === undefined) return null;
  if (!currentUser) redirect("/Account/Signin");

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const load = async () => {
      const myCourses = await findMyCourses(); 
      const enrolled = myCourses.some((c: any) => c._id === cid);
      setIsEnrolled(enrolled);
    };
    load();
  }, [cid]);

  if (isEnrolled === null) return null; 

  if (isFaculty || isEnrolled) {
    redirect(`/Courses/${cid}/Home`);
  } else {
    redirect("/Dashboard");
  }
}
