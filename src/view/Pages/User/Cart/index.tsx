import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import Header from '../../../components/common/Header'
import { MdDelete } from "react-icons/md";
import { formatPrice } from '../../../../utils/formatPrice';
import { useAppDispatch } from '../../../../store/hooks';
import { increase,decrease,removeCart,clearCart } from '../../../../modules/cart/action';
import axios from 'axios';
interface Cart {
  id: number
  name: string
  description: string
  price: number
  amount: number
  imageUrl: string
}
export const Cart : React.FC = () => {
  const {cartItems, total} = useAppSelector((state) => state.cart)
  // console.log(cartItems)
  const {id: userId} = useAppSelector((state)=>state.user)
  const auth = useAppSelector((state)=>state.auth)

  const dispatch = useAppDispatch()

  const handleDecrease = (id: any) => {
    dispatch(decrease(id))
  }

  const handleRemoveItem = (id: any) => {
    dispatch(removeCart(id))
  }

  const handleIncrease = (id: any) => {
    dispatch(increase(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleMakeOrder = async() => {
      const postData = {
        total_amount: total,
        order_items: 
          cartItems.map((items: Cart)=> ({
            product_id: items.id,
            quantity: items.amount,
            unit_price: items.price
          }))
        
      }
    try {
     const response =  await axios.post(`http://localhost:4000/api/user/${userId}/orders/create`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.access_token}`
        }
      })
      if(response.status === 200){ handleClearCart()}
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='text-white p-5 w-full'>
      <div>
      {/* <h1 className='text-3xl'>Your Cart</h1> */}
      <Header />
      </div>
      <div className='w-[90%] bg-white text-amber-950 flex flex-col mx-auto pt-5'>
        {cartItems.length > 0 ? <>
          <div>
          {cartItems.map((cartItem: Cart) => {
            return (
              <article key={cartItem.id} className='flex justify-around text-center items-center p-2'>
                <div>
                <img src={`http://localhost:4000/uploads/${cartItem?.imageUrl}`} alt={cartItem?.name} className='w-28 h-28' />
                </div>
                <div className='text-lg'>
                  <p className='font-bold text-xl'>{cartItem?.name}</p>
                  <p>{cartItem?.description?.slice(0,20)}...</p>
                </div>
                <div className='border border-black h-max'>
              <p className='font-bold py-2 px-2 text-xl'>Quantity: <button className='border px-2 text-xl' onClick={()=>handleDecrease(cartItem.id)}>-</button> {cartItem?.amount} <button className='border px-2 text-xl' onClick={()=>handleIncrease(cartItem.id)}>+</button></p>
                </div>
                <p className='font-bold text-xl font-mono'>Rs. {formatPrice(cartItem?.amount * cartItem?.price)}</p>
                <MdDelete className='text-2xl' onClick={()=>handleRemoveItem(cartItem.id)} />
              </article>
            )
          })}
          <p className='flex flex-row-reverse text-xl font-mono font-semibold pr-8'>Total: Rs. {formatPrice(total)}</p>
        </div>
        <div className='w-full text-end my-5 pr-8'>
        <button className='text-xl font-semibold bg-blue-500 text-white px-3 py-2 mr-5 rounded mx-auto' onClick={()=>handleClearCart()}>Clear Cart</button>

          <button className='text-xl font-semibold bg-blue-500 text-white px-3 py-2 rounded mx-auto' onClick={()=>handleMakeOrder()}>Place Order</button>
        </div></> : <>
        <h2 className='text-2xl font-semibold font-mono text-center'>No items in your Cart</h2>
        </>
        }
       
      </div>
    </div>
  )
}

