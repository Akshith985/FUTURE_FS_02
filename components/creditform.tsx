'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function DummyCheckoutForm({ cartItems }: { cartItems: CartItem[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // Handle typing in fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Simple Validation (Make it feel real)
    if (cardDetails.cardNumber.length < 16) {
      alert("Please enter a valid 16-digit card number.");
      setLoading(false);
      return;
    }

    try {
      // 2. Call your existing API to save the order
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cartItems,
          // We don't send the sensitive card info to the backend
          // because we aren't actually processing it!
          paymentMethod: "Credit Card (Dummy)" 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        // 3. Redirect to success page
        router.push(`/success?orderId=${data.orderId}`);
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border shadow-sm max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Secure Checkout</h3>
      
      {/* Name on Card */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
        <input
          required
          type="text"
          name="name"
          placeholder="John Doe"
          value={cardDetails.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Card Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <input
          required
          type="text"
          name="cardNumber"
          maxLength={19}
          placeholder="0000 0000 0000 0000"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex gap-4 mb-6">
        {/* Expiry */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            required
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength={5}
            value={cardDetails.expiry}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CVC */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
          <input
            required
            type="text"
            name="cvc"
            placeholder="123"
            maxLength={3}
            value={cardDetails.cvc}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded font-bold text-white transition-colors ${
          loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
        }`}
      >
        {loading ? 'Processing Payment...' : `Pay Now`}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        🔒 This is a secure 256-bit SSL encrypted payment.
      </p>
    </form>
  );
}