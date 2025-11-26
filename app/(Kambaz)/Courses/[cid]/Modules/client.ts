import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

/** GET modules for a specific course */
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(
    `${BASE_URL}/api/courses/${courseId}/modules`
  );
  return response.data;
};

/** CREATE MODULE */
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${BASE_URL}/api/courses/${courseId}/modules`,
    module
  );
  return response.data;
};

/** DELETE MODULE */
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${BASE_URL}/api/courses/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

/** UPDATE MODULE — FIXES YOUR ISSUE */
export const updateModule = async (
  courseId: string,
  moduleId: string,
  module: any
) => {
  const response = await axios.put(
    `${BASE_URL}/api/courses/${courseId}/modules/${moduleId}`,
    module
  );
  return response.data;
};
