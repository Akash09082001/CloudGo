import { useMutation } from 'convex/react';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';

const DeleteBtn = ({ fileId }) => {

    const deleteFile = useMutation(api.files.deleteFileById);

    const handleDelete = async () => {
        await deleteFile({ fileId })
        toast.success("File is Deleted")
    }

    return (
        <Button onClick={handleDelete} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
            Delete &nbsp; <Trash className="size-4" />
        </Button>
    );
};

export default DeleteBtn;
