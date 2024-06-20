import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/common/Header';
import axios from 'axios';
import { useAppSelector } from '../../../../store/hooks';
import { formatPrice } from '../../../../utils/formatPrice';
import  moment from 'moment';
import { Link } from 'react-router-dom';

interface OrderItems {
  created_at: string
  deleted_at: string | null
  id:string
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
  return (
    <div className='text-white p-5 w-full'>

      <Header />
      <div className='w-[90%] bg-white text-amber-950 flex flex-col mx-auto pt-5'>
        {myOrders?.length < 1 ? <h2 className='text-2xl font-semibold font-mono text-center'>You have not made any orders</h2> : <>
          <ol className='list-decimal'>
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
          </ol>

        </>}


      </div>
    </div>
  )
}

