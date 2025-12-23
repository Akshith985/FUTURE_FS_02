import { SignOutButton } from '@clerk/nextjs'

export default function Home() {
  return (
    // 1. Center everything on the screen
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      {/* 2. Create a nice card container */}
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full border border-gray-100">
        
        {/* 3. The "Confirmation" Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Out</h1>
        <p className="text-gray-500 mb-6">
          Are you sure you want to sign out of your account?
        </p>

        {/* 4. The Button */}
        {/* Wrapping a styled button inside SignOutButton makes it look good */}
        <SignOutButton>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
            Yes, Sign Out
          </button>
        </SignOutButton>

        {/* Optional: Cancel / Go Back link */}
        <button className="mt-4 text-sm text-gray-400 hover:text-gray-600">
            Cancel
        </button>
      </div>
    </div>
  )
}