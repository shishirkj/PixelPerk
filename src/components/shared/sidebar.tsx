"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { navLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'


export default function Sidebar() {

    const pathname = usePathname()
  return (
    <aside className='sidebar'>
        <div className='flex size-full flex-col gap-4'>
            <Link  href='/'  className='sidebar-logo'>
                <Image src='/logo.png' alt='logo' width={180} height={28}/>
                </Link>
                <nav className='sidebar-nav'>
                <SignedIn>
                <ul className='sidebar-nav_elements'>
                {navLinks.map((link)=>{
                  const isActive = link.route===pathname
                  return(
                    <li key={link.route} className={`sidebar-nav_element group ${isActive?'bg-puple-gradient text-lime-500':'text-gray-700'}`}>
                      <Link className='sidebar-link'  href={link.route}>
                        <Image src={link.icon} alt='icon' width={20} height={20} className={`${isActive}&&'brightness-200'`}/>
                        {link.label}
                      </Link>
                    </li>
                  )
                })}

                </ul>
                <ul className='sidebar-nav_elements'>
                <UserButton afterSignOutUrl='/' showName/>
                </ul>
                </SignedIn>
                <SignedOut>
                    <Button asChild className='bg-purple-gradient bg-cover'>
                    <Link href={'/sign-in'}>Login</Link>
                    </Button>
                </SignedOut>
                </nav>
        </div>
    </aside>
  )
}
