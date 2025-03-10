"use server";

import { RECAPTCHA_URL } from "@/util/urls";
import axios from "axios";

export async function verifyCaptcha(token: string | null) {
  const url = `${RECAPTCHA_URL}${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`;
  const res = await axios.post(url);
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
