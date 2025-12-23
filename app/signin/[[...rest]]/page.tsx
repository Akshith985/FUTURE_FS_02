'use client'
import { redirect } from 'next/navigation'
import { SignIn, useUser } from '@clerk/nextjs'
import { SignUp } from '@clerk/nextjs'
export default function Signin() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50"><SignIn /></div>
  }
  if (!isLoaded){
    return <SignUp />
  }

  redirect('/')
}