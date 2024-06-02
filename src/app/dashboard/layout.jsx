import { InputWithButton } from '@/components/molecules/InputWithButton'
import { UploadFile } from '@/components/molecules/UploadFile'
import Sidebar from '@/components/organisms/Sidebar'
import React from 'react'

const layout = ({ children }) => {


    return (
        <div className="relative mx-auto flex h-navScreen w-full px-5 py-5 gap-5 flex-col flex-grow overflow-hidden">
            <div className="flex flex-col h-navScreen gap-4 md:grid md:grid-cols-7 lg:grid-cols-7 w-full flex-1">
                <div className="order-2 md:order-1 md:border-r md:pr-4 flex w-full flex-grow-0 md:col-span-2 lg:col-span-1">
                    <Sidebar />
                </div>
                <div className="order-1 md:order-2 gap-2 flex h-full flex-col w-full flex-grow-0 md:col-span-5 lg:col-span-6">
                    <div className="flex w-full flex-grow-0">
                        <div className="grid grid-cols-5 lg:flex w-full gap-1 md:gap-3 lg:gap-5 items-center justify-between">
                            <div className="flex lg:order-2 col-span-5 py-2 flex-grow">
                                <InputWithButton
                                    inputType={"text"}
                                    inputPlacehodlder={"Search your file and folder"}
                                    btnText={"Search"}
                                />
                            </div>
                            <div className="flex lg:order-1 col-span-3 py-2 flex-grow-0">
                                <strong className='text-xl lg:text-2xl'>Dashboard</strong>
                            </div>
                            <div className="flex lg:order-3 col-span-2 justify-end py-2 flex-grow-0">
                                <UploadFile />
                            </div>

                        </div>
                    </div>
                    <div className="flex w-full flex-grow h-[500px] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout