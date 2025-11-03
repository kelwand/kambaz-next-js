"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { AccountState } from "../store"; 

export default function AccountPage() {
  const currentUser = useSelector((state: AccountState) => state.accountReducer.currentUser);

  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }
}