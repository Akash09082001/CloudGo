import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({ labelTitle, inputId, inputType, inputPlaceholder, inputValue, inputOnChange }) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={inputId}>{labelTitle}</Label>
            <Input
                type={inputType}
                id={inputId}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={inputOnChange}
            />
        </div>
    )
}
