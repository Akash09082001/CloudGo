"use client"

import { useMutation } from 'convex/react';
import { Trash, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';

const DeleteBtn = ({ fileId, userId }) => {

    const pathname = usePathname();

    console.log(fileId);

    const deleteFile = useMutation(api.files.deleteFileById);
    const trashFile = useMutation(api.files.addToTrash);

    const handleTrash = async () => {
        await trashFile({ fileId, userId })
        toast.success("File is Added to Trash")
    }

    const handleDelete = async () => {
        await deleteFile({ fileId })
        toast.success("File is Deleted")
    }

    return (
        <>
            {
                pathname === "/dashboard/trash" ? (
                    < Button onClick={handleDelete} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
                        Delete &nbsp; <Trash className="size-4" />
                    </Button>
                ) : (
                    <Button onClick={handleTrash} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
                        Trash &nbsp; <Trash2 className="size-4" />
                    </Button>
                )
            }
        </>
    );
};

export default DeleteBtn;
