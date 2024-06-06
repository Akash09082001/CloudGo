import { useMutation } from 'convex/react';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';

const DownloadBtn = ({ fileId }) => {
    const downloadFile = useMutation(api.files.getFileById);

    const handleDownload = async () => {
        try {
            const response = await downloadFile({ fileId });

            if (!response || !response.url) {
                toast.warning("Unable to download file");
                return;
            }

            const fileResponse = await fetch(response.url);
            const blob = await fileResponse.blob();

            const link = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            link.href = url;

            const contentDisposition = fileResponse.headers.get('content-disposition');
            let fileName = response.title;

            if (contentDisposition && contentDisposition.includes('filename=')) {
                const matches = /filename="([^"]*)"/.exec(contentDisposition);
                if (matches !== null && matches[1]) fileName = matches[1];
            }

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("File is Downloaded");

        } catch (error) {
            console.error("Error downloading the file:", error);
            toast.error("Error while downloading the file:", error)
        }
    };

    return (
        <Button onClick={handleDownload} variant="ghost" className="h-0 py-3 px-0 w-full flex justify-between items-center">
            Download &nbsp; <Download className="size-4" />
        </Button>
    );
};

export default DownloadBtn;
