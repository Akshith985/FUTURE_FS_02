import React from 'react'
import { Redirect } from 'next'
import { redirect } from 'next/navigation'
import Example from '@/components/productlist'
export default function products() {
    return(
        <div>
                <Example />
        </div>
    )
}
