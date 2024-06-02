import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Download, EllipsisVertical, ImageIcon, Star, Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {

    const cards = Array.from({ length: 6 }, (_, i) => i + 1)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-fit gap-4">
            {
                cards.map(card => (
                    <Card key={card} className="w-full h-fit relative flex flex-col">
                        <CardHeader className="flex">
                            <CardTitle className="flex w-full gap-3 items-center">
                                <div className="flex flex-grow-0">
                                    <ImageIcon className='size-5' />
                                </div>
                                <div className="flex text-base flex-grow">
                                    File Title
                                </div>
                                <div className="flex flex-grow-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <EllipsisVertical className='size-4'
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="flex w-full justify-between">
                                                Download &nbsp; <Download className='size-4' />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex w-full justify-between">
                                                Favorite &nbsp; <Star className='size-4' />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex w-full justify-between">
                                                Delete &nbsp; <Trash className='size-4' />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex w-full">
                            <div className="flex relative aspect-video">
                                <Image
                                    src={"/Images/card-320-300.webp"}
                                    alt='card'
                                    width={640}
                                    height={480}
                                    loading='lazy'
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex w-full">
                            <div className="grid grid-cols-2 text-sm w-full gap-4">
                                <div className="flex w-full">
                                    Updated by
                                </div>
                                <div className="flex w-full justify-end">
                                    Date
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}

export default page
