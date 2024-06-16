import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <div className='flex w-fit py-2 '>
            <Link href={"/"} className='flex text-2xl lg:text-3xl font-bold items-center gap-1' >
                <Image
                    src={"/GoCloud-Logo.png"}
                    alt='Logo'
                    width={40}
                    height={40}
                />
                <span>Go</span>
                <span className='text-primary'>Cloud</span>
            </Link>
        </div>
    )
}

export default Logo
