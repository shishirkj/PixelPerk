import Sidebar from '@/components/shared/sidebar'
import React from 'react'
import MobileNav from '@/components/shared/mobilenav'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className='root'>
      <Sidebar/>
      <MobileNav/>
        <main className='root-container'>
            <div className='wrapper'>
                {children}
            </div>

        </main>
    </div>
  )
}
