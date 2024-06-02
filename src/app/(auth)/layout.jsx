import Logo from '@/components/atoms/Logo'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div className="relative mx-auto flex h-navScreen w-full max-w-7xl px-5 py-5 gap-5 flex-col items-center justify-center flex-grow overflow-hidden">
            <Logo />
            {children}
        </div>
    )
}

export default layout
