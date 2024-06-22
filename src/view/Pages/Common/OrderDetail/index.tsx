import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import Header from '../../../components/common/Header'
import { MdDelete } from "react-icons/md";
import { formatPrice } from '../../../../utils/formatPrice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

interface OrderItems {
    product: {
        created_at: string
        deleted_at: string
        description: string
        id: string
        image_url: any 
        name: string
        price: number
        quantity: number
        user_id: string
    },
    product_id: string,
    quantity: string,
    unit_price: number
}

interface Order {
    id: string,
    order_date: string,
    status: string,
    total_amount: string,
    order_items: OrderItems[],
    user: {
        email: string,
        id: string,
        first_name: string,
        last_name: string,
        imageUrl: string
    }
}

export const OrderDetail: React.FC = () => {
    // const { cartItems, total } = useAppSelector((state) => state.cart)
    const [order, setOrder] = useState<Order>()
    // console.log(cartItems)
      const {role} = useAppSelector((state)=>state.user)
    const auth = useAppSelector((state) => state.auth)
    const { orderId } = useParams();




    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/order/${orderId}/details`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.access_token}`
                }
            })      
            setOrder(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [orderId])

    const markDeliverd = async() => {
        try {
            await axios.post(`http://localhost:4000/api/order/deliver/${orderId}`, {},{
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                }
            })    
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Order ID: {order?.id}</h2>
                    <div className="flex gap-4">
                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Invoice
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Track order
                        </button> */}
                    </div>
                </div>
                <div className="flex justify-between items-center mb-2 text-lg font-semibold">
                    <p className="text-gray-600 font-semibold">Order date: {moment(order?.order_date).format('YYYY-MMM-DD')}</p>
                    <p className="text-green-500">Estimated delivery: {moment(order?.order_date).add(3, 'days').format('YYYY-MMM-DD')}</p>
                </div>
                <hr className="border-gray-300 mb-4" />
                <ul className="space-y-4">
                    {order?.order_items.map((item) => (
                        <li key={item.product_id} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-16 h-16 rounded-lg"
                                    src={`http://localhost:4000/uploads/${item.product.image_url}`}
                                    alt={item.product.name}
                                />
                                <div>
                                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                                    <p className="text-gray-600">{item.product.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <span className="font-bold text-xl"> Rs. {item.unit_price.toFixed(2)}/per</span>
                                <span className="text-gray-600 font-bold text-lg">Qty: {item.quantity}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                
                {role === "ADMIN" && order?.status === "PENDING" && <button className='bg-green-500 text-white text-lg rounded-lg px-3 py-2 w-full mt-3 font-semibold' onClick={markDeliverd}>Mark as Delivered</button> }
               
            </div>
        </div>
    )
}

