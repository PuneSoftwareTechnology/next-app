import { FetchBlogResponse } from "@/util/interfaces/blog";
import { BASE_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

export const getAllBlogs = async (): Promise<FetchBlogResponse | null> => {
  try {
    const url = `${BASE_URL}/blog/all?landing_page=true`; // API endpoint for fetching all blogs

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
