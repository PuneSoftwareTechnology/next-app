import {
  CreateTestimonialInterface,
  TestimonialResponse,
} from "@/util/interfaces/testimonial";
import { BASE_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

export const createTestimonial = async (
  payload: CreateTestimonialInterface
): Promise<TestimonialResponse | null> => {
  try {
    const url = `${BASE_URL}/testimonial/create`; // API endpoint for creating a testimonial
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
