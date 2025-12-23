'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';

export default function CartCounter() {
  // Select the cart items from the global store
  const items = useSelector((state: RootState) => state.cart.items);
  
  // Calculate total quantity (e.g., 2 shirts + 1 hat = 3 items)
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/checkout" className="relative group">
      {/* Icon */}
      <span className="text-2xl">🛒</span>
      
      {/* The Red Badge */}
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}