import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

const TypeFilter = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default TypeFilter
