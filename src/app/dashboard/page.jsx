"use client"

import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, File, Folder, ImageIcon, Star, Trash } from 'lucide-react';
import Image from 'next/image';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { Button } from '@/components/ui/button';
import DeleteBtn from '@/components/atoms/DeleteBtn';
import DownloadBtn from '@/components/atoms/DownloadBtn';

const Page = () => {
    const { user } = useUser();
    const files = useQuery(api.files.getFiles, { userId: user?.id });

    const fileIcon = (file, className) => {
        if (file.type === "image") {
            return <ImageIcon className={`text-primary ${className}`} />
        }
        else if (file.type === "pdf") {
            return <Folder className={`text-primary ${className}`} />
        }
        else if (file.type === "csv") {
            return <File className={`text-primary ${className}`} />
        }
    }

    if (files && files.length === 0) {
        return (
            <div className='flex w-full relative'>
                <Image
                    src={"/Images/add-file.webp"}
                    alt='Add File'
                    fill
                    sizes="(min-width: 808px) 30vw, 60vw"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-fit gap-4">
            {files?.map(file => (
                <Card key={file._id} className="w-full h-fit relative flex flex-col">
                    <CardHeader className="flex">
                        <CardTitle className="flex w-full gap-3 items-center">
                            <div className="flex flex-grow-0">
                                {fileIcon(file, 'size-5')}
                            </div>
                            <div className="flex text-base flex-grow">
                                {file.title}
                            </div>
                            <div className="flex flex-grow-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <EllipsisVertical className='size-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="flex w-full justify-between" >
                                            <DownloadBtn fileId={file._id} />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex w-full justify-between">
                                            Favorite &nbsp; <Star className='size-4' />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex w-full justify-between">
                                            <DeleteBtn fileId={file._id} />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col w-full">
                        <div className="flex relative w-full h-20 items-center justify-center">
                            {/* {file.url && (
                                <Image
                                    src={file.url || "/Images/card-320-300.webp"}
                                    alt={file.title}
                                    layout="responsive"
                                    objectFit='contain'
                                    objectPosition='center'
                                    width={960}
                                    height={340}
                                    loading='lazy'
                                />
                            )} */}
                            {fileIcon(file, 'h-20 w-20')}
                        </div>
                    </CardContent>
                    <CardFooter className="flex w-full">
                        <div className="grid grid-cols-3 text-xs w-full gap-4">
                            <div className="flex w-full">
                                {user.firstName}
                            </div>
                            <div className="flex w-full col-span-2 justify-end">
                                {new Date(file._creationTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default Page;
