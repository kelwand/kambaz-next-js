"use client";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((m: Module) => m.course === cid);

  return (
    <div>
      <ModulesControls />
      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: Module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
              </div>
              <ModuleControlButtons />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
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
