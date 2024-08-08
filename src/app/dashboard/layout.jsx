

import Sidebar from "@/components/organisms/Sidebar"

const layout = ({ children }) => {

    return (
        <div className="relative mx-auto flex h-navScreen w-full px-5 py-5 gap-5 flex-col flex-grow overflow-hidden">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-7 lg:grid-cols-7 w-full flex-1">
                <div className=" md:border-r md:pr-4 flex  w-full flex-grow-0 md:col-span-2 lg:col-span-1">
                    <Sidebar />
                </div>
                {children}
            </div>
        </div>
    )
}

export default layout