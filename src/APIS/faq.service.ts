import { FAQ, FAQResponse } from "@/util/interfaces/faq";
import { BASE_URL } from "@/util/urls";
import axios from "axios";

export const getFaqs = async (): Promise<FAQ[] | null> => {
  try {
    const url = `${BASE_URL}/faq/all`;

    const { data } = await axios.get<FAQResponse>(url);
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
