"use client"

import { useMutation } from "convex/react";
import { Trash2, UndoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";

const UndoBtn = ({ fileId, userId }) => {

    const pathname = usePathname();
    const trashFile = useMutation(api.files.addToTrash);

    const handleTrash = async () => {
        const res = await trashFile({ fileId, userId })

        if (!res) {
            toast.success(res.message)
        }
        toast.success(res.message)
    }

    return (
        <>
            <Button onClick={handleTrash} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
                {
                    pathname === "/dashboard/trash" ? (
                        <>
                            Undo &nbsp; <UndoIcon className="size-4" />
                        </>
                    ) : (
                        <>
                            Trash &nbsp; <Trash2 className="size-4" />
                        </>
                    )
                }
            </Button>
        </>
    )
}

export default UndoBtn
