import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import Header from '../../../components/common/Header'
import { MdDelete } from "react-icons/md";


export const Cart : React.FC = () => {
  const {cartItems} = useAppSelector((state) => state.cart)
  // console.log(cartItems)
  return (
    <div className='text-white p-5 w-full mx-auto'>
      <div>
      {/* <h1 className='text-3xl'>Your Cart</h1> */}
      <Header />
      </div>
      <div className='w-4/5 bg-white text-amber-950'>
        <div>
          {cartItems.map((cartItem) => {
            return (
              <article key={cartItem.id} className='flex justify-around text-center items-center p-2 flex'>
                <div>
                <img src={`http://localhost:4000/uploads/${cartItem?.imageUrl}`} alt={cartItem?.name} className='w-28 h-28' />
                </div>
                <div className='text-lg'>
                  <p className='font-bold'>{cartItem?.name}</p>
                  <p>{cartItem?.description.slice(0,20)}...</p>
                </div>
                <div className='border border-black h-max'>
              <p className='font-bold py-2 px-2 text-xl'>Quantity: <button className='border px-2 text-xl'>-</button> {cartItem?.amount} <button className='border px-2 text-xl'>+</button></p>
                </div>
                <p className='font-bold'>Rs. {cartItem?.amount * cartItem?.price}</p>
                <MdDelete className='text-2xl' />
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

