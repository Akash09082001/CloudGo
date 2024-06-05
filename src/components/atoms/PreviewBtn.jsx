"use client"

import { useMutation } from 'convex/react';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { api } from '../../../convex/_generated/api';

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
        <>
            <button onClick={handlePreview} className="h-0 py-3 px-0 w-full flex justify-between items-center">
                Preview &nbsp; <Eye className="size-4" />
            </button>
        </>
    );
}

export default PreviewBtn;
