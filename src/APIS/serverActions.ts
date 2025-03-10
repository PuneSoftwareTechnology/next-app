"use server";

import axios from "axios";

export async function verifyCaptcha(token: string | null) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`;
  const res = await axios.post(url);
  console.log("reCAPTCHA response:", res.data); // Debugging
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}