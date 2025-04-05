"use server";

import axios from "axios";

export async function verifyCaptcha(token: string | null) {
  console.log("Received reCAPTCHA token:", token); // Debugging
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY || "");
  params.append("response", token || "");

  const res = await axios.post(url, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log("reCAPTCHA response:", res.data); // Debugging
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}