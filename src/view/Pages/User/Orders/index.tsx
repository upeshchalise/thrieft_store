import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/common/Header';
import axios from 'axios';
import { useAppSelector } from '../../../../store/hooks';
import { formatPrice } from '../../../../utils/formatPrice';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { items } from '../../../../utils/heroData';

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

export const MyOrders: React.FC = () => {
  const auth = useAppSelector((state) => state.auth)
  const { userId } = useParams();
  const [myOrders, seMytOrders] = useState<Orders[]>([])
  // console.log("this is user id", userId)
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      console.log("this is the data", response);
      //  return response.data
      seMytOrders(response.data)
    };

    fetchProductDetails()
    // console.log("ordersssss", orders)
  }, [userId, auth.access_token])
  // let orderQunatity = 0;
  return (
    <div className='text-white p-5 w-full'>

      <Header />
      <div className='w-[90%] bg-white text-amber-950 flex flex-col mx-auto pt-5'>
        {myOrders?.length < 1 ? <h2 className='text-2xl font-semibold font-mono text-center'>You have not made any orders</h2> : <>
          {/* <ol className='list-decimal'>
            {myOrders?.map((orderItem: Orders) => {
              return (
                <li key={orderItem.id} className='flex justify-between text-center items-center  p-2'>
                  <div className='text-lg'>
                    <p className='font-bold text-xl'>{moment(orderItem.order_date).format('YYYY-MMM-DD')}</p>
                    <p></p>
                  </div>
                  <div className=' h-max'>
                    <p className='font-bold py-2 px-2 text-xl'>Quantity: {orderItem.order_items.length}</p>
                  </div>
                  <p className='font-bold text-xl text-left'>Total Price: Rs. <span className='font-mono font-semibold'>{formatPrice(orderItem.total_amount)}</span> </p>
                  <p className={`text-white px-3 py-2 rounded-xl items-center ${orderItem.status === "DELIVERED" ?' bg-green-600' : 'bg-yellow-500'}`}>{orderItem.status}</p>
                  <Link to={'/'} className='text-lg underline text-black font-bold'>view details</Link>
                </li>
              )
            })}
          </ol> */}
          <div className='overflow-y-auto max-h-screen'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr className='text-left text-lg'>
                  <th scope='col' className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider'>
                    Order Date
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
                {myOrders?.map((orderItem: Orders) => (
                  <tr key={orderItem.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className=' text-gray-900'>
                        {moment(orderItem.order_date).format('YYYY-MMM-DD')}
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
                      <Link to={'/'} className='text-indigo-600 hover:text-indigo-900'>
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
  )
}

