"use client";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { AccountState, ModulesState } from "../../../store";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons: Lesson[]; 
}

interface User {
  _id: string;
  username: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Modules() {
  const { cid } = useParams() as { cid: string };
  const [moduleName, setModuleName] = useState("");
  const modules: Module[] = useSelector((state: ModulesState) => state.modulesReducer.modules);
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer) as { currentUser: User | null };
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (!cid) return;
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />

      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      defaultValue={module.name}
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                    />
                  )}
                </div>

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(id) => dispatch(deleteModule(id))}
                  editModule={(id) => dispatch(editModule(id))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                      {lesson.description && (
                        <ul className="wd-content">
                          <li className="wd-content-item">{lesson.description}</li>
                        </ul>
                      )}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
