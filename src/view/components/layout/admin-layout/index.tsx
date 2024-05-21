import React from "react";
import { Aside } from "../../../Pages/Admin/dashboard/aside";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
const AdminLayout: React.FC = ({ children }) => {
  const { role } = useAppSelector((state) => state.user);
  return (
    <div className="h-screen flex">
      {role === "ADMIN" && <Aside />}
      <main className="flex-1 p-4 bg-blue-950 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
