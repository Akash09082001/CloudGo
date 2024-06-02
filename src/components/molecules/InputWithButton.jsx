import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton({ inputType, inputPlacehodlder, btnText }) {
    return (
        <div className="flex w-full items-center gap-2">
            <Input className="w-full flex" type={inputType} placeholder={inputPlacehodlder} />
            <Button type="submit" className="px-5">{btnText}</Button>
        </div>
    )
}
