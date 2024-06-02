"use client"

import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Folder, Star, Trash } from 'lucide-react'

const Sidebar = () => {

    const navList = [
        {
            id: "1",
            icon: <Folder className='size-5' />,
            link: "/dashboard",
            name: "All Files"
        },
        {
            id: "2",
            icon: <Star className='size-5' />,
            link: "/dashboard/favorites",
            name: "Favorites"
        },
        {
            id: "3",
            icon: <Trash className='size-5' />,
            link: "/dashboard/trash",
            name: "Trash"
        }
    ]

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <div className='hidden md:flex w-full'>
                <ul className='flex w-full flex-col gap-3'>
                    {
                        navList.map((nav) => (
                            <li key={nav.id} className='flex w-full rounded-md'>
                                <Button variant="ghost" className="w-full">
                                    <Link href={nav.link} className='flex w-full items-center gap-3'>
                                        <span>{nav.icon}</span>
                                        <span>{nav.name}</span>
                                    </Link>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    return (
        <div className='flex md:hidden w-full items-center justify-center'>
            <ul className='flex px-4 py-2 rounded-lg border justify-around w-full gap-4 '>
                {
                    navList.map((nav) => (
                        <li key={nav.id} className='flex w-fit rounded-md'>
                            <Button variant="ghost" className="w-fit">
                                <Link href={nav.link} className='flex w-fit items-center gap-3'>
                                    <span>{nav.icon}</span>
                                </Link>
                            </Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar
