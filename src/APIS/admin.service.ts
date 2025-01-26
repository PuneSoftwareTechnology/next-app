import { AdminLoginInterface } from "@/util/interfaces/admin";
import { LOCAL_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

interface AdminLoginResponse {
  success: boolean;
  message: string;
  token: string;
}

export const adminLogin = async (
  payload: AdminLoginInterface
): Promise<AdminLoginResponse | null> => {
  try {
    const url = `${LOCAL_URL}/admin/login`;
    const { data } = await axios.post<AdminLoginResponse>(url, payload);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while logging in the admin.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};
