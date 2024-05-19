import React from "react";
import { CommonRoutes } from "../../../../../routes";

export const Aside = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">YUSHIN</h2>
      <ul className="list-none mb-4">
        <li className="py-2 border-b border-gray-200">
          <a
            href={CommonRoutes.ADMIN_PAGE}
            className="text-white hover:text-gray-900"
          >
            Dashboard
          </a>
        </li>
        <li className="py-2 border-b border-gray-200">
          <a
            href={CommonRoutes.MY_STORE}
            className="text-white hover:text-gray-900"
          >
            My Store
          </a>
        </li>
        <li className="py-2 border-b border-gray-200">
          <a href="#" className="text-white hover:text-gray-900">
            Analytics
          </a>
        </li>
        <li className="py-2 border-b border-gray-200">
          <a href="#" className="text-white hover:text-gray-900">
            Message
          </a>
        </li>
        <li className="py-2 border-b border-gray-200">
          <a href="#" className="text-white hover:text-gray-900">
            Team
          </a>
        </li>
        <li className="py-2 border-b border-gray-200">
          <a href="#" className="text-white hover:text-gray-900">
            Settings
          </a>
        </li>
      </ul>
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </aside>
  );
};
