"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { RootState } from "../store"; 

export default function AccountPage() {
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }
}