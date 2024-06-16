import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { calculateTotals } from "../../../modules/cart/action";
import { Link } from "react-router-dom";
import { CommonRoutes } from "../../../routes";

const Header = () => {
  const { imageUrl, role } = useAppSelector((state) => state.user);
  const {amount} = useAppSelector((state)=>state.cart)
const dispatch = useAppDispatch()


  useEffect(()=> {
    // console.log("this is the totals",dispatch(calculateTotals()));
    
    dispatch(calculateTotals());
  }, [])
  let navbarText = "";
  const location = useLocation().pathname;
  if (location.includes("/dashboard")) {
    navbarText = "Dashboard";
  } else if (location.includes("/home")) {
    navbarText = "All Products";
  }
  else if(location.includes("/cart")) {
    navbarText = "Your Cart"
  }
  return (
    <header className="flex justify-between mb-4 items-center">
      <h1 className="text-2xl font-bold text-white">{navbarText}</h1>
      <div className="flex gap-10">
        {!imageUrl || imageUrl === "" ? <img
          src={`/user-profile-icon-free-vector.jpg`}
          className="h-14 w-full rounded-full"
          />:  <img
          src={`http://localhost:4000/uploads/${imageUrl}`}
          className="h-14 w-14 rounded-full"
          /> }
         
        
        {/* <FaShoppingCart color="white" className="text-5xl" />
        <FaShoppingCart color="white" className="text-5xl" /> */}

        {role === 'CUSTOMER' && <span>
          <div className="relative">
            <Link to={CommonRoutes.CART}>
          <FaShoppingCart color="white" className="text-5xl" />
          <span className="text-white text-lg bg-yellow-500 rounded-full px-2 absolute -top-1 -right-1">{amount}</span>
            </Link>
          </div>
        </span>
        }
      </div>
    </header>
  );
};

export default Header;
