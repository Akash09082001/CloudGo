import React from 'react';
import { Button } from '../ui/button'; // Ensure this path is correct
import { Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { deleteFileById } from '../../../convex/files';

const DeleteBtn = ({ fileId }) => {

    const deleteFile = useMutation(api.files.deleteFileById);

    const handleDelete = async () => {
        await deleteFile({ fileId })
    }

    return (
        <Button onClick={handleDelete} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
            Delete &nbsp; <Trash className="size-4" />
        </Button>
    );
};

export default DeleteBtn;
