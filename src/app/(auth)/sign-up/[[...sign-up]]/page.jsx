
import { SignUp, SignUpButton } from '@clerk/nextjs';

const Page = () => {
    return (
        <>
            <SignUp>
                <SignUpButton mode='modal' />
            </SignUp>
        </>
    );
};

export default Page;
