"use client";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, deleteModule, updateModule, editModule } from "./reducer";
import * as client from "../../client"; 
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
  const dispatch = useDispatch();
  const modules: Module[] = useSelector(
    (state: ModulesState) => state.modulesReducer.modules
  );
  const { currentUser } = useSelector(
    (state: AccountState) => state.accountReducer
  ) as { currentUser: User | null };

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchModules = async () => {
    try {
      const modules = await client.findModulesForCourse(cid);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, module]));
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };



  useEffect(() => {
    fetchModules();
  }, [cid]); 

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />

      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                         onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
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
