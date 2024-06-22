import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../../components/common/Header";
import { useAppSelector } from "../../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CommonRoutes } from "../../../../routes";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatPrice } from "../../../../utils/formatPrice";

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
  order_items: OrderItems[],
  user: User
}

interface User {
  id: string
  imageUrl: string | null,
  email:string,
  first_name:string,
  last_name: string
}

const AdminDashboard: React.FC = () => {
  const auth = useAppSelector((state) => state.auth)
  const { userId } = useParams();
  const [allOrders, setAllOrders] = useState<Orders[]>([])
  // console.log("this is user id", userId)
  const navigate = useNavigate();
  const [totalSales,setTotalSales] = useState<number>()
  // const [quantity,setQuantity] = useState<number>()

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
      // console.log("this is the data", response);
      //  return response.data
      setAllOrders(response.data.response)
      setTotalSales(response.data.total_sale)
      // setQuantity(response.data.total_quantity)
    };

    fetchProductDetails()
    // console.log("ordersssss", orders)
  }, [userId, auth.access_token,navigate])
console.log(allOrders)
  return (
    <div className="h-full flex bg-blue-950">
      <main className="flex-1 p-4">
        <Header />
        <section className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex-1">
            <div className="bg-white shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        {allOrders?.length < 1 ? <h2 className='text-2xl font-semibold font-mono text-center'>You have not made any orders</h2> : <>
          <div className='overflow-y-auto max-h-screen'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr className='text-left text-lg'>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                    Order Date
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                   User Name
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                    Quantity
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                    Total Price
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>View Details</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 text-base'>
                {allOrders?.map((orderItem: Orders) => (
                  <tr key={orderItem.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className=' text-gray-900'>
                        {moment(orderItem.order_date).format('YYYY-MMM-DD')}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className=' text-gray-900'>
                        {`${orderItem.user.first_name} ${orderItem.user.last_name}`}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className=' text-gray-900'>
                        {orderItem.order_items.length}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className=' text-gray-900'>
                        Rs. <span className='font-mono font-semibold'>{formatPrice(orderItem.total_amount)}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-sm ${orderItem.status === 'DELIVERED' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}`}>
                        {orderItem.status}
                      </span>
                    </td>
                    
                    <td className='px-6 py-4 whitespace-nowrap text-right  font-medium'>
                      <Link to={`/order/${orderItem.id}/details`} className='text-indigo-600 hover:text-indigo-900'>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        </>}
             
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex-1">
            <div className="bg-white shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Total Sales</h2>
              <p className="text-2xl font-bold">Rs. {totalSales}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
