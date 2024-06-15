import React from "react";
import { Aside } from "../../../Pages/Admin/dashboard/aside";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";
// import Header from "../../common/Header";
const AdminLayout: React.FC = () => {
  return (
    <div className="h-screen flex">
      <Aside />
      <>
        <main className="flex-1 gap-10 pb-10 bg-blue-950 overflow-y-auto">
          {/* <Header /> */}
          <Outlet />
          <Footer />
        </main>
      </>
    </div>
  );
};

export default AdminLayout;
