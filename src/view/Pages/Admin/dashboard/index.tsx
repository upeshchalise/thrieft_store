import React from "react";
import "./index.css";
import { useAppSelector } from "../../../../store/hooks";

const AdminDashboard: React.FC = () => {
  const { imageUrl } = useAppSelector((state) => state.user);
  return (
    <div className="h-screen flex bg-blue-950">
      <main className="flex-1 p-4">
        <header className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <img
            src={`http://localhost:4000/uploads/${imageUrl}`}
            className="h-14 w-14 rounded-full"
          />
        </header>
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
