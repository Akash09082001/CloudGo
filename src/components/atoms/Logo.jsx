import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex w-fit py-2 '>
            <Link href={"/"} className='text-2xl lg:text-3xl font-bold' >
                <span>Go</span>
                <span className='text-primary'>Cloud</span>
            </Link>
        </div>
    )
}

export default Logo
