"use client"

import { Folder, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UploadFile from '../molecules/UploadFile'
import { Button } from '../ui/button'

const Sidebar = () => {
    const pathname = usePathname();
    const navList = [
        {
            id: "1",
            icon: <Folder className='size-5' />,
            link: "/dashboard/files",
            name: "All Files"
        },
        {
            id: "2",
            icon: <Star className='size-5' />,
            link: "/dashboard/favorites",
            name: "Favorites"
        },
        // {
        //     id: "3",
        //     icon: <Trash className='size-5' />,
        //     link: "/dashboard/trash",
        //     name: "Trash"
        // }
    ]

    const getLinkClass = (navLink) => {
        return pathname === navLink ? 'bg-primary' : '';
    };

    return (
        <>
            <div className='hidden md:flex w-full'>
                <ul className='flex w-full flex-col gap-3'>
                    {navList.map((nav) => (
                        <li key={nav.id} className='flex w-full rounded-md'>
                            <Button
                                asChild
                                variant="ghost"
                                className={`w-full items-start justify-start ${getLinkClass(nav.link)}`}
                            >
                                <Link href={nav.link} className='gap-3'>
                                    <span>{nav.icon}</span>
                                    <span>{nav.name}</span>
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex md:hidden w-full items-center justify-center backdrop-blur-lg'>
                <ul className='flex px-4 py-2 rounded-lg border justify-around w-full gap-4'>
                    {navList.map((nav) => (
                        <li key={nav.id} className='flex w-fit rounded-md'>
                            <Button
                                asChild
                                variant="ghost"
                                className={`w-fit ${getLinkClass(nav.link)}`}
                            >
                                <Link href={nav.link} className='flex w-fit items-center gap-3'>
                                    <span>{nav.icon}</span>
                                </Link>
                            </Button>
                        </li>
                    ))}
                    <li className='flex w-fit rounded-md'>
                        <UploadFile />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
