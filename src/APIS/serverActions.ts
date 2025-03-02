"use server";

import { RECAPTCHA_URL } from "@/util/urls";
import axios from "axios";

export async function verifyCaptcha(token: string | null) {
  const url = `${RECAPTCHA_URL}${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  console.log(url);

  const res = await axios.post(url);
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
