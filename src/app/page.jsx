"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

    return (
        <div className="flex w-full">
            <div className="mx-auto max-w-2xl my-auto px-5">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Streamline Your Cloud Management
                    </h1>
                    <p className="mt-6 text-lg leading-8">
                        Manage AWS, Google Cloud, and Azure with ease. Go Cloud App offers integration, real-time analytics, and cost optimization. Simplify your cloud operations.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/dashboard/files">
                            <Button className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Get started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
