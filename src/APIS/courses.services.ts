import {
  CategoriesResponse,
  Category,
  Course,
  CoursesResponse,
} from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";
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
