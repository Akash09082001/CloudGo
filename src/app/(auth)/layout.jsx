import Logo from '@/components/atoms/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const layout = ({ children }) => {
    return (
        <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 h-navScreen w-full max-w-7xl px-5 py-5 gap-5 flex-col items-center justify-center flex-grow overflow-hidden">
            <div className="text-left w-full flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Streamline Your Cloud Management
                </h1>
                <p className="mt-6 text-lg leading-8">
                    Manage AWS, Google Cloud, and Azure with ease. Go Cloud App offers integration, real-time analytics, and cost optimization. Simplify your cloud operations.
                </p>
                <div className="mt-10 flex items-center justify-start gap-x-6">
                    <Link href="/dashboard/files">
                        <Button className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-end w-full">
                <div className="flex flex-col gap-5 items-center justify-end">
                    <Logo />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
