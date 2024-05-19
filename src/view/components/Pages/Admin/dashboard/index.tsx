import React from "react";
import "./index.css";
import { CommonRoutes } from "../../../../../routes";
import { Aside } from "./aside";
const AdminDashboard: React.FC = () => {
  return (
    <div className=" h-screen bg-blue-950">
      <Aside />
      <main className="flex-1 p-4">
        <header className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded">
            New Order
          </button>
        </header>
        <section className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
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
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Todos</h2>
              <ul className="list-none mb-4">
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-600">Todo List</span>
                  <span className="text-gray-600">Completed</span>
                </li>
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-600">Todo List</span>
                  <span className="text-gray-600">Pending</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
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
