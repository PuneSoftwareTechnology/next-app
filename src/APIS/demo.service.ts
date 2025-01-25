import { DemoInterface } from "@/util/interfaces/demo";
import { LOCAL_URL } from "@/util/urls";
import axios, { AxiosError } from "axios";

interface DemoResponse {
  success: boolean;
  message: string;
}

export const sendDemoRequest = async (
  payload: DemoInterface
): Promise<DemoResponse | null> => {
  try {
    const url = `${LOCAL_URL}/demo/request`;
    const { data } = await axios.post<DemoResponse>(url, payload);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error(
        "Axios Error:",
        axiosError.response?.data || axiosError.message
      );
      throw new Error("Something went wrong while sending the demo request.");
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred.");
    }
  }
};
