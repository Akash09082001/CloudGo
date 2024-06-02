import { InputWithLabel } from '@/components/molecules/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SignIn, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {

    return (
        <>
            <SignIn>
                <SignInButton mode='modal' />
            </SignIn>
        </>
    )
}

export default page
