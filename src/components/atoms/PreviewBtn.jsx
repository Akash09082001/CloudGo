"use client"

import { useMutation } from 'convex/react';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';

const PreviewBtn = ({ fileId }) => {
    const filePreview = useMutation(api.files.getFileById);
    const [imageUrl, setImageUrl] = useState('');

    const handlePreview = async () => {
        const response = await filePreview({ fileId });

        if (!response || !response.url) {
            console.log("Unable to get image");
            return;
        }

        setImageUrl(response.url);
        window.open(response.url, '_blank');
    };

    return (
        <Button onClick={handlePreview} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
            Preview &nbsp; <Eye className="size-4" />
        </Button>
    );
}

export default PreviewBtn;
