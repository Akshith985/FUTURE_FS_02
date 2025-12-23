'use client'
import { redirect } from 'next/navigation'
import { SignUp, useUser } from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50"><SignUp /></div>
  }

  redirect('/signin')
}