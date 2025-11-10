import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
const ASSIGNMENTS_API = `${SERVER}/api`;

export const findAssignmentsForCourse = async (moduleId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/modules/${moduleId}/assignments`);
  return response.data;
};

export const createAssignment = async (moduleId: string, assignment: any) => {
  const response = await axios.post(`${ASSIGNMENTS_API}/modules/${moduleId}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignmentId: string, updates: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/assignments/${assignmentId}`, updates);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
  return response.data;
};
