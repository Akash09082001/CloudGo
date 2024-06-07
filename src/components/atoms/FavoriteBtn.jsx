"use client";

import { useMutation } from 'convex/react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';

const FavoriteBtn = ({ fileId, userId }) => {
    const favoriteFile = useMutation(api.files.toggleFavorite);

    const handleFavorite = async () => {
        const res = await favoriteFile({ fileId, userId });

        if (res.isFavorite) {
            toast.success(res.message);
        } else {
            toast.success(res.message);
        }
    };

    return (
        <Button onClick={handleFavorite} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
            Favorite &nbsp; <Star className='size-4' />
        </Button>
    );
};

export default FavoriteBtn;
