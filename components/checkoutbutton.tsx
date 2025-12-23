'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function LocalCheckoutButton({ cartItems }: { cartItems: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      // 1. CHECK FOR HTML ERRORS FIRST
      // If the server failed (404 or 500), it returns HTML, not JSON.
      if (!response.ok) {
        const errorText = await response.text(); // Read the raw response (likely HTML)
        console.error("❌ Server Error Response:", errorText); // Check your Browser Console for this!
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      // 2. NOW it is safe to parse JSON
      const data = await response.json();

      if (data.success) {
        router.push(`/success?orderId=${data.orderId}`);
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
      
    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert(`Failed: ${error.message}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
      className={`
        w-full py-3 px-6 rounded-lg font-bold text-white transition-all
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      {loading ? 'Processing Order...' : 'Confirm Order (Pay Later)'}
    </button>
  );
}