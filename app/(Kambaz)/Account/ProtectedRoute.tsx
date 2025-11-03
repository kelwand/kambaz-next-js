"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { AccountState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const currentUser = useSelector(
    (state: AccountState) => state.accountReducer.currentUser
  );

  if (!currentUser) {
    redirect("/Account/Signin");
  }

  return <>{children}</>;
}