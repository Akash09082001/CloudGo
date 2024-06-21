"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const ErrorView = ({ error, reset }) => {
    useEffect(() => {
        console.error("Error:", error)
    }, [error])

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-8">
            <h2>Something went wrong!</h2>
            <Button
                variant="destructive"
                onClick={reset}
            >
                Try again
            </Button>
        </div>
    )
}

export default ErrorView