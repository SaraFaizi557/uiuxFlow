"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'

function Header() {

    const { user } = useUser()

    return (
        <div className='flex justify-between items-center px-6 py-1'>
            <div className='flex items-center cursor-pointer'>
                <Image src="/logo.png" alt="logo" className='select-none' width={50} height={50} />
                <h2 className='text-xl font-bold select-none font-artifika'><span className='text-primary'>UIUX</span> FLOW</h2>
            </div>
            <ul className='flex gap-4 items-center'>
                <li className='hover:text-primary cursor-pointer font-medium transition-all duration-300'>Home</li>
                <li className='hover:text-primary cursor-pointer font-medium transition-all duration-300'>Pricing</li>
            </ul>
            {!user ? (
                <SignInButton mode='modal'>
                    <Button>
                        Get Started
                    </Button>
                </SignInButton>
            ) : (
                <UserButton />
            )}
        </div>
    )
}

export default Header