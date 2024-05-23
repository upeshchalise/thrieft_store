import React from "react";
import { Aside } from "../../../Pages/Admin/dashboard/aside";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import Footer from "../../common/Footer";
const AdminLayout: React.FC = () => {
  const { role } = useAppSelector((state) => state.user);
  return (
    <div className="h-screen flex">
      {role === "ADMIN" && <Aside />}
      <>
        <main className="flex-1 pb-10 bg-blue-950 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </>
    </div>
  );
};

export default AdminLayout;
