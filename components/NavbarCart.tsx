'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart } from '@/lib/features/cartSlice';
import Link from 'next/link';

export default function NavbarCart() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="relative">
      {/* 1. The Toggle Button (Cart Icon) */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2 text-gray-700 hover:text-black transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>

        {/* Red Badge */}
        {totalQuantity > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* 2. The Popup (Only visible if isOpen is true) */}
      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-20 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Shopping Cart</h3>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                      <img src={item.imageSrc} alt={item.name} className="h-16 w-16 object-cover rounded-md border" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer with Total & Checkout Button */}
              {cartItems.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-gray-900 mb-4">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Link 
                    href="/checkout"
                    onClick={() => setIsOpen(false)} 
                    className="block w-full bg-black text-white text-center py-3 rounded-md font-bold hover:bg-gray-800 transition"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}