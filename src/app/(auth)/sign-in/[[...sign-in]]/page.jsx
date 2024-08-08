import { SignIn, SignInButton } from '@clerk/nextjs'

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
