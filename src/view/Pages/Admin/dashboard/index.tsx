import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../../components/common/Header";
import { useAppSelector } from "../../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CommonRoutes } from "../../../../routes";

interface OrderItems {
  created_at: string
  deleted_at: string | null
  id: string
  ordersId: string
  product_id: string
  quantity: number
  unit_price: number
  updated_at: number
}
interface Orders {
  id: string,
  user_id: string,
  order_date: string,
  total_amount: number,
  status: string,
  created_at: string,
  updated_at: number
  deleted_at: string | null,
  order_items: OrderItems[]
}

const AdminDashboard: React.FC = () => {
  const auth = useAppSelector((state) => state.auth)
  const { userId } = useParams();
  const [allOrders, setAllOrders] = useState<Orders[]>([])
  // console.log("this is user id", userId)
  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/admin/all/orders`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      console.log("this is the data", response);
      //  return response.data
      setAllOrders(response.data)
    };

    fetchProductDetails()
    // console.log("ordersssss", orders)
  }, [userId, auth.access_token])

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
