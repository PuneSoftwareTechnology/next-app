import { ResponseInterface } from "@/util/interfaces/misc";
import { BASE_URL } from "@/util/urls";
import axios from "axios";

export const getAllCompanies = async (): Promise<ResponseInterface> => {
  try {
    const url = `${BASE_URL}/companies/all`;
    const { data } = await axios.get<ResponseInterface>(url);

    return data; // Ensure the response follows the expected structure
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }

    return {
      success: false,
      message: "Something went wrong while fetching the companies.",
      data: [],
    };
  }
};
