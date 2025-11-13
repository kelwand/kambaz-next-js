import axios from "axios";

const SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(
    `${SERVER}/api/courses/${courseId}/assignments`
  );
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(
    `${SERVER}/api/courses/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (
  assignmentId: string,
  updates: any
) => {
  const response = await axiosWithCredentials.put(
    `${SERVER}/api/assignments/${assignmentId}`,
    updates
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${SERVER}/api/assignments/${assignmentId}`
  );
  return response.data;
};
