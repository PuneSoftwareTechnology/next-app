"use client";
import useStore from "@/util/zustand/store";
import AdminLogin from "./login/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/admin/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
