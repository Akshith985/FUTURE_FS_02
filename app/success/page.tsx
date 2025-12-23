import Link from "next/link";

// In Next.js App Router, searchParams is passed as a prop
export default function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.orderId;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We have saved it to our database.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Order ID</p>
          <p className="text-2xl font-mono font-bold text-gray-800">#{orderId}</p>
        </div>

        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}