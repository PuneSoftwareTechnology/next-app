import {
  FetchBlogResponse,
  FetchOneBlogResponse,
} from "@/util/interfaces/blog";
import { BASE_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

export const getAllBlogs = async (
  type: string
): Promise<FetchBlogResponse | null> => {
  try {
    const url = `${BASE_URL}/blog/all?landing_page=${type}`; // API endpoint for fetching all blogs

    const { data } = await axios.get<FetchBlogResponse>(url);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while fetching the blogs.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getOneBlog = async (
  slug: string
): Promise<FetchOneBlogResponse | null> => {
  try {
    const url = `${BASE_URL}/blog/?slug=${slug}`; // API endpoint for fetching all blogs

    const { data } = await axios.get<FetchOneBlogResponse>(url);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while fetching the blogs.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};
