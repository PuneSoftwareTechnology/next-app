"use client";
import { useState, useEffect } from "react";
import AdminLayout from "./layout"; // Import AdminLayout to wrap the content
import AdminLogin from "./login/page"; // Import AdminLogin for initial login page

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simulate checking authentication status (e.g., from localStorage or a cookie)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return isAuthenticated ? (
    <AdminLayout>
      {/* Admin Dashboard Content */}
      <h1>Welcome to the Admin Panel</h1>
      {/* You can add actual admin dashboard content here */}
    </AdminLayout>
  ) : (
    <AdminLogin />
  );
};

export default AdminPage;
