import {
  AllCoursesResponse,
  CategoriesResponse,
  Category,
  Course,
  Courses,
  CoursesResponse,
} from "@/util/interfaces/course";
import { BASE_URL, LOCAL_URL } from "@/util/urls";
import axios from "axios";

export const getAllCategories = async (): Promise<Category[] | null> => {
  try {
    const url = `${BASE_URL}/courses/categories`;

    const { data } = await axios.get<CategoriesResponse>(url);

    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Invalid response structure:", data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return null;
  }
};

export const getAllCourses = async (): Promise<Course[] | null> => {
  try {
    const url = `${BASE_URL}/courses/all-course-names`;

    const { data } = await axios.get<CoursesResponse>(url);

    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Invalid response structure:", data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return null;
  }
};

// express-app-pla4.onrender.com/courses/all?category=b1c39d04-e7b8-460b-90b0-e6b61570c026
export const getAllCategoryCourses = async (
  id: string
): Promise<Courses[] | null> => {
  try {
    const url = `${LOCAL_URL}/courses/all?category=${id}`;
    const { data } = await axios.get<AllCoursesResponse>(url);
    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Invalid response structure:", data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return null;
  }
};
