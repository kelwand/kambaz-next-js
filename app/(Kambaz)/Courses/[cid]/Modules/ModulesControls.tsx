"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: User | null };
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {isFaculty && (
        <>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
            onClick={handleShow}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Module
          </Button>

          <Dropdown className="float-end me-2">
            <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
              <GreenCheckmark /> Publish All
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem id="wd-publish-all">
                <GreenCheckmark /> Publish All
              </DropdownItem>
              <DropdownItem id="wd-publish-all-modules-and-items">
                <GreenCheckmark /> Publish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-publish-modules-only">
                <GreenCheckmark /> Publish modules only
              </DropdownItem>
              <DropdownItem id="wd-unpublish-all-modules-and-items">
                <GreenCheckmark /> Unpublish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-unpublish-modules-only">
                <GreenCheckmark /> Unpublish modules only
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <ModuleEditor
            show={show}
            handleClose={handleClose}
            dialogTitle="Add Module"
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={addModule}
          />
        </>
      )}

      <Button
        variant="secondary"
        id="wd-view-progress"
        className="float-end me-2"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        id="wd-collapse-all"
        className="float-end me-2"
      >
        Collapse All
      </Button>
    </div>
  );
}
