import React from "react";
import "./index.css";
import Header from "../../../components/common/Header";

const AdminDashboard: React.FC = () => {
  return (
    <div className="h-screen flex bg-blue-950">
      <main className="flex-1 p-4">
        <Header />
        <section className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex-1">
            <div className="bg-white shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
              <ul className="list-none mb-4">
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-600">Sujal Shilpakar</span>
                  <span className="text-gray-600">01-10-2021</span>
                </li>
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-600">Sujal Shilpakar</span>
                  <span className="text-gray-600">01-10-2021</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex-1">
            <div className="bg-white shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Total Sales</h2>
              <p className="text-2xl font-bold">$2543</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
