import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-12 py-8 text-center text-gray-900 dark:text-gray-50">
            <div className="z-10 flex flex-col items-center justify-center gap-16 px-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-6xl font-extrabold text-primary leading-none">
                        404
                    </div>
                    <div className="text-lg font-bold leading-7">
                        Oops! looks like you&apos;ve wandered out of app
                    </div>
                    <div className="text-xs font-normal leading-5 text-gray-700 dark:text-gray-200">
                        This page isn&apos;t available. Kindly return to the
                        dashboard to resume.
                    </div>
                </div>

                <Button asChild>
                    <Link href="/">Back to homepage</Link>
                </Button>
            </div>
        </div>
    )
}