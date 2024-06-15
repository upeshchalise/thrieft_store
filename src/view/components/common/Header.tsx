import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { imageUrl, role } = useAppSelector((state) => state.user);

  let navbarText = "";
  const location = useLocation().pathname;
  if (location.includes("/dashboard")) {
    navbarText = "Dashboard";
  } else if (location.includes("/home")) {
    navbarText = "All Products";
  }
  return (
    <header className="flex justify-between mb-4 items-center">
      <h1 className="text-2xl font-bold text-white">{navbarText}</h1>
      <div className="flex gap-10">
        <img
          src={`http://localhost:4000/uploads/${imageUrl}`}
          className="h-14 w-14 rounded-full"
        />
        {/* <FaShoppingCart color="white" className="text-5xl" />
        <FaShoppingCart color="white" className="text-5xl" /> */}

        {role === 'CUSTOMER' && <span>
          <FaShoppingCart color="white" className="text-5xl" />
        </span>
        }
      </div>
    </header>
  );
};

export default Header;
