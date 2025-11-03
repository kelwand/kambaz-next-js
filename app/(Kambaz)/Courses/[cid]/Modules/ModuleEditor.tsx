"use client";

import { Modal, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AccountState, ModulesState } from "../../../store";

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer) as { currentUser: User | null };
  const isFaculty = currentUser?.role === "FACULTY";

  if (!isFaculty) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          value={moduleName}
          onChange={(e) => {
            setModuleName(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addModule();
            handleClose();
          }}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
