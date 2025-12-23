'use client'; // <--- MUST be a Client Component

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import DummyCheckoutForm from '@/components/creditform';

export default function CheckoutPage() {
  // 1. Get real data from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("Current Cart in Redux:", cartItems); // <--- Check your console!

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <a href="/" className="text-blue-600 underline">Go shopping</a>
          </div>
        ) : (
          <DummyCheckoutForm cartItems={cartItems} />
        )}
      </div>
    </div>
  );
}