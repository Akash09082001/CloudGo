"use client"

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { EllipsisVertical, File, Folder, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import DeleteBtn from '../atoms/DeleteBtn';
import DownloadBtn from '../atoms/DownloadBtn';
import FavoriteBtn from '../atoms/FavoriteBtn';
import LoadingSkeleton from '../atoms/LoadingSkeleton';
import PreviewBtn from '../atoms/PreviewBtn';
import UndoBtn from '../atoms/UndoBtn';
import { SearchBar } from '../molecules/SearchBar';
import UploadFile from '../molecules/UploadFile';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const FileBrowser = ({ title, favorites, trashes }) => {
    const { user } = useUser();
    const pathname = usePathname();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const files = useQuery(api.files.getFiles, { userId: user?.id, query, favorites, trashes });

    useEffect(() => {
        setLoading(true);
        if (files) {
            setLoading(false);
        }
    }, [files]);

    const fileIcon = (file, className) => {
        if (file.type === 'image') {
            return <ImageIcon className={`text-primary ${className}`} />;
        } else if (file.type === 'pdf') {
            return <Folder className={`text-primary ${className}`} />;
        } else if (file.type === 'csv') {
            return <File className={`text-primary ${className}`} />;
        }
    };

    return (
        <div className="order-1 md:order-2 gap-2 flex h-full flex-col w-full flex-grow-0 md:col-span-5 lg:col-span-6 overflow-hidden">
            <div className="flex w-full flex-grow-0">
                <div className="grid grid-cols-6 md:grid-cols-5 lg:flex w-full gap-1 md:gap-3 lg:gap-5 items-center justify-between">
                    <div className="flex order-2 col-span-4 sm:col-span-5 md:col-span-3 py-2 flex-grow">
                        <SearchBar
                            query={query}
                            setQuery={setQuery}
                            inputType="text"
                            inputPlaceholder="Search Your File"
                            btnText="Search"
                        />
                    </div>
                    <div className="flex order-1 col-span-2 sm:col-span-1 md:col-span-1 py-2 flex-grow-0">
                        <strong className="text-xl lg:text-2xl">{title}</strong>
                    </div>
                    <div className="hidden md:flex order-3 col-span-2 md:col-span-1 justify-end py-2 flex-grow-0">
                        <UploadFile />
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-grow h-[500px] overflow-y-auto scrollbar pr-3">
                {loading ? (
                    <div className='flex w-full h-full'>
                        <LoadingSkeleton />
                    </div>
                ) : files && !query && files.length === 0 ? (
                    <div className="flex w-full relative">
                        <Image src={'/Images/add-file.webp'} alt="Add File" fill sizes="(min-width: 808px) 30vw, 60vw" style={{ objectFit: 'contain' }} />
                    </div>
                ) : (
                    <div className="flex w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-fit gap-4">
                            {files &&
                                files.map((file) => (
                                    <Card key={file._id} className="w-full h-fit relative flex flex-col">
                                        <CardHeader className="flex">
                                            <CardTitle className="flex w-full gap-3 items-center">
                                                <div className="flex flex-grow-0">{fileIcon(file, 'size-5')}</div>
                                                <div className="flex text-base flex-grow">{file.title}</div>
                                                <div className="flex flex-grow-0">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <EllipsisVertical className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem className="flex w-full justify-between">
                                                                <PreviewBtn fileId={file._id} />
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex w-full justify-between">
                                                                <DownloadBtn fileId={file._id} />
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex w-full justify-between">
                                                                <FavoriteBtn fileId={file._id} userId={file.userId} />
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex w-full justify-between">
                                                                <UndoBtn fileId={file._id} userId={file.userId} />
                                                            </DropdownMenuItem>
                                                            {
                                                                pathname === "/dashboard/trash" ? (
                                                                    <DropdownMenuItem className="flex w-full justify-between">
                                                                        <DeleteBtn fileId={file._id} userId={file.userId} />
                                                                    </DropdownMenuItem>
                                                                ) : ("")
                                                            }
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col w-full">
                                            <div className="flex relative w-full h-20 items-center justify-center">{fileIcon(file, 'h-20 w-20')}</div>
                                        </CardContent>
                                        <CardFooter className="flex w-full">
                                            <div className="grid grid-cols-3 text-xs w-full gap-4">
                                                <div className="flex w-full">{user.firstName}</div>
                                                <div className="flex w-full col-span-2 justify-end">{new Date(file._creationTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileBrowser
