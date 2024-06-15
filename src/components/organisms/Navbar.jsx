import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Logo from '../atoms/Logo'
import { ThemeSwitcherBtn } from '../atoms/ThemeSwitcherBtn'
import { Button } from '../ui/button'

const Navbar = () => {

    return (
        <div className='flex w-full border-b-[1px] px-5'>
            <div className="flex w-full items-center justify-between mx-auto">
                <div className="flex w-fit">
                    <Logo />
                </div>
                <div className="flex gap-5 w-fit">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Button>
                            <Link href={"/sign-in"}>Sign In</Link>
                        </Button>
                    </SignedOut>
                    <ThemeSwitcherBtn />
                </div>
            </div>
        </div>
    )
}

export default Navbar
