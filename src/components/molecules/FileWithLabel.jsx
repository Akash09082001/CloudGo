import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function FileWithLabel({ labelTitle, inputId, inputType, inputPlaceholder, inputValue, inputOnChange }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file ? file.name : null);
        if (inputOnChange) {
            inputOnChange(event);
        }
    };

    return (
        <div className="grid w-full items-center gap-1.5">
            <Label>{labelTitle}</Label>
            <div className="flex w-full flex-col py-4 items-center border rounded-md justify-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <Label htmlFor={inputId} className="relative flex cursor-pointer rounded-md items-center justify-center font-semibold text-indigo-600">
                        <span>Upload a file</span>
                        <Input
                            type={inputType}
                            id={inputId}
                            placeholder={inputPlaceholder}
                            onChange={handleFileChange}
                            className="sr-only"
                        />
                    </Label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                {selectedFile && (
                    <p className="py-2 text-center text-sm text-green-600">{selectedFile}</p>
                )}
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
            </div>
        </div>
    );
}
