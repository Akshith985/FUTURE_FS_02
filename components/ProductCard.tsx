'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cartSlice';
import { useState } from 'react';

export default function ProductCard({ product }: { product: any }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop click from bubbling up

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      imageSrc: product.imageSrc,
      quantity: 1
    }));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 500);
  };

  return (
    <div className="group relative border rounded-lg p-4 flex flex-col h-full bg-white hover:shadow-lg transition-shadow">
      
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 relative">
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        
        {/* --- FIXED BUTTON --- */}
        {/* Added 'z-10' so it sits ON TOP of the link overlay */}
        <button
          onClick={handleAddToCart}
          className={`
            absolute bottom-2 right-2 p-3 rounded-full shadow-md z-10 transition-all transform active:scale-90
            ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}
          `}
          type="button" // Important: prevents form submission behaviors
        >
          {isAdded ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-700">
            {/* The link that was hijacking your clicks */}
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}