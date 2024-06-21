"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from '@clerk/clerk-react';
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Progress } from "../ui/progress";
import { FileWithLabel } from "./FileWithLabel";
import { InputWithLabel } from "./InputWithLabel";

const UploadFile = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const createFile = useMutation(api.files.createFile);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    const { user } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setProgress(0);

        if (!file) {
            console.error("No file selected");
            toast.warning("No file selected");
            setUploading(false);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5 MB");
            setTitle('');
            setFile(null);
            setIsOpen(false);
            setUploading(false);
            return;
        }

        const postUrl = await generateUploadUrl();

        const uploadFileWithProgress = async (url, file) => {
            const reader = file.stream().getReader();
            const contentLength = file.size;
            let uploadedLength = 0;

            const stream = new ReadableStream({
                start(controller) {
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            uploadedLength += value.byteLength;
                            setProgress(Math.round((uploadedLength / contentLength) * 100));
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                    return pump();
                }
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': file.type },
                body: stream,
                duplex: 'half'
            });

            return response;
        };

        try {
            const result = await uploadFileWithProgress(postUrl, file);
            const { storageId } = await result.json();

            const types = {
                "image/png": 'image',
                "image/jpeg": 'image',
                "image/webp": 'image',
                "application/pdf": 'pdf',
                "text/csv": 'csv'
            };

            await createFile({
                title,
                fileId: storageId,
                userId: user.id,
                type: types[file.type],
                status: true,
            });

            setTitle('');
            setFile(null);
            setIsOpen(false);
            setUploading(false);
            toast.success("File Uploaded Successfully");
        } catch (error) {
            setUploading(false);
            toast.error("File upload failed");
            console.error("File upload error:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>Upload File</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Upload File</DialogTitle>
                        <DialogDescription>
                            Upload a new file here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <InputWithLabel
                            labelTitle={"Title"}
                            inputId={"title"}
                            inputType={"text"}
                            inputPlaceholder={"Enter Your File title"}
                            inputValue={title}
                            inputOnChange={(e) => setTitle(e.target.value)}
                        />
                        <FileWithLabel
                            labelTitle={"File"}
                            inputId={"file"}
                            inputType={"file"}
                            inputPlaceholder={"Choose a file"}
                            inputOnChange={(e) => setFile(e.target.files[0])}
                        />
                        {
                            uploading ? <Progress value={progress} /> : ""
                        }
                    </div>
                    <DialogFooter>
                        <Button className="w-full" type="submit" disabled={uploading}>{uploading ? "Uploading.." : "Upload File"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UploadFile;
