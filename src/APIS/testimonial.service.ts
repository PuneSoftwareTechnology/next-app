import {
  CreateTestimonialInterface,
  ResponseInterFace,
  TestimonialResponse,
} from "@/util/interfaces/testimonial";
import { LOCAL_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

export const createTestimonial = async (
  payload: CreateTestimonialInterface
): Promise<TestimonialResponse | null> => {
  try {
    const url = `${LOCAL_URL}/testimonial/create`; // API endpoint for creating a testimonial
    const { data } = await axios.post<TestimonialResponse>(url, payload);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while creating the testimonial.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const fetchAllTestimonials = async (
  course?: string
): Promise<ResponseInterFace | null> => {
  try {
    const url = course
      ? `${LOCAL_URL}/testimonial/all/?course=${course}`
      : `${LOCAL_URL}/testimonial/all`;

    const { data } = await axios.get<ResponseInterFace>(url);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while fetching the testimonials.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};
