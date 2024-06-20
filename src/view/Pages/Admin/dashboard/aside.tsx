import React, { useState } from "react";
import { CommonRoutes } from "../../../../routes";
// import { useAppSelector } from "../../../../store/hooks";
import { logoutUser } from "../../../../modules/user/action";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import { clearCart } from "../../../../modules/cart/action";

export const Aside = () => {
  const { id, role } = useAppSelector((state) => state.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutConfirm = () => {
    // Add your logout logic here
    dispatch(logoutUser());
    setShowLogoutModal(false);
    // dispatch(clearCart())
  };
  const userId = id;
  return (
    <aside className="w-64 bg-blue-900 text-white shadow-md p-4 z-10">
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
        {role === "ADMIN" && (
          <li className="py-2 border-b border-gray-200">
            <a
              href={CommonRoutes.MY_STORE}
              className="text-white hover:text-gray-900"
            >
              My Store
            </a>
          </li>
        )}
        {role === 'CUSTOMER' && ( <li className="py-2 border-b border-gray-200">
            <a
              href={`/user/${userId}/orders`}
              className="text-white hover:text-gray-900"
            >
              My Orders
            </a>
          </li>)}
        <li className="py-2 border-b border-gray-200">
          <a
            href={`/profile/${userId}`}
            className="text-white hover:text-gray-900"
          >
            Profile
          </a>
        </li>
      </ul>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      {showLogoutModal && (
        <div className="fixed top-0 right-1/4 w-1/2 h-full bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white rounded p-4 w-11/12"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-blue-950">
              Logout Confirmation
            </h2>
            <p className="text-blue-950">Are you sure you want to logout?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
