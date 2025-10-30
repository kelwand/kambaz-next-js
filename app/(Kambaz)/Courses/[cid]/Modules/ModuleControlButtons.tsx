"use client";

import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  if (!isFaculty) return null;
  
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
      />

      <FaTrash
        className="text-danger me-2 mb-1"
        style={{ cursor: "pointer" }}
        onClick={() => deleteModule(moduleId)}
      />

      <GreenCheckmark />
      <BsPlus className="fs-4 ms-1" />
    </div>
  );
}
