import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({ inputType, inputPlacehodlder, btnText, query, setQuery }) {

    const handleSearch = (e) => {
        e.preventDefault(); 
        setQuery(query);
    }

    return (
        <div className="flex w-full">
            <form onSubmit={handleSearch} className="flex w-full items-center gap-2">
                <Input 
                    className="w-full flex" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    type={inputType} 
                    placeholder={inputPlacehodlder} 
                />
                <Button type="submit" className="px-5">{btnText}</Button>
            </form>
        </div>
    );
}
