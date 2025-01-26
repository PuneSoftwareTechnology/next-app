"use client";
import React, { useState } from "react";
import Head from "next/head";
import Typography from "@/components/atoms/Typography";
import InputBox from "@/components/atoms/InputBox";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/APIS/admin.service";
import { toast } from "react-toastify";
import useStore from "@/util/zustand/store";

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await adminLogin(credentials);
      if (response?.success) {
        setAuthenticated(true);
        localStorage.setItem("authToken", response.token);
      } else {
        toast.error("Login failed! try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Pune Software Technologies</title>
        <meta
          name="description"
          content="Admin login page to manage the website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Admin Login | Pune Software Technologies"
        />
        <meta
          property="og:description"
          content="Admin login page to manage the website"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://punesoftwaretechnologies.com/admin/login"
        />
        <meta
          property="og:image"
          content="https://punesoftwaretechnologies.com/path-to-your-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Admin Login | Pune Software Technologies"
        />
        <meta
          name="twitter:description"
          content="Admin login page to manage the website"
        />
        <meta
          name="twitter:image"
          content="https://punesoftwaretechnologies.com/path-to-your-image.jpg"
        />
        <link
          rel="canonical"
          href="https://punesoftwaretechnologies.com/admin/login"
        />
      </Head>

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 gap-y-4 md:gap-x-4">
        <div className="max-w-xl w-full text-center">
          <Typography variant="h1" as="h1" className="text-gray-800">
            Welcome to Pune Software Technologies Admin Panel
          </Typography>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Access powerful tools to manage users, monitor analytics, and
            configure system settings efficiently.
          </p>
        </div>
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg mt-8">
          <Typography
            variant="h3"
            as="h3"
            className="text-center text-gray-800 mb-6"
          >
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Typography variant="h5" as="h5">
              Username
            </Typography>
            <InputBox
              id="username"
              name="username"
              type="username"
              placeholder="Username Address"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
            <Typography variant="h5" as="h5">
              Password
            </Typography>
            <InputBox
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <PrimaryButton type="submit" stretch loading={loading}>
              {loading ? "Logging in..." : "Login"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
