import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
const ENROLLMENTS_API = `${API_BASE}/api`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${ENROLLMENTS_API}/users/${userId}/courses/${courseId}/enrollments`
  );
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/users/${userId}/courses/${courseId}/enrollments`
  );
  return response.data;
};

export const findCoursesForUser = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/users/${userId}/enrollments`);
  return response.data;
};

export const findAllEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENTS_API}/enrollments`);
  return response.data;
};
