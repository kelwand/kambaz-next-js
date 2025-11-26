import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${API_BASE}/api`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const url = `${API}/users/${userId}/courses/${courseId}/enroll`;
  const response = await axios.post(url);
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const url = `${API}/users/${userId}/courses/${courseId}/enroll`;
  const response = await axios.delete(url);
  return response.data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const url = `${API}/users/${userId}/courses`;
  const response = await axios.get(url);
  return response.data;
};
