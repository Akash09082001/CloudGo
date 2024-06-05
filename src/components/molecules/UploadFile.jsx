"use client"

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
import { api } from "../../../convex/_generated/api";
import { InputWithLabel } from "./InputWithLabel";

export function UploadFile() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const createFile = useMutation(api.files.createFile);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { user } = useUser();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)
        if (!file) {
            console.error("No file selected");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            console.error("File size exceeds 5 MB");
            return;
        }

        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
        });

        const { storageId } = await result.json();
        const types = {
            "image/png": 'image',
            "image/jpeg": 'image',
            "image/webp": 'image',
            "application/pdf": 'pdf',
            "text/csv": 'csv'
        }
        await createFile({
            title,
            fileId: storageId,
            userId: user.id,
            type: types[file.type]
        });

        setTitle('');
        setFile(null);
        setIsOpen(false);
        setUploading(false)
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
                        <InputWithLabel
                            labelTitle={"File"}
                            inputId={"file"}
                            inputType={"file"}
                            inputPlaceholder={"Choose a file"}
                            inputOnChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <DialogFooter>
                        <Button className="w-full" type="submit" disabeled={uploading}>{uploading? "Uploading": "Upload File"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
