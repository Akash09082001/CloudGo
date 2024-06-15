import { Input } from "@/components/ui/input";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

export function SearchBar({ inputType, inputPlaceholder, btnText, query, setQuery }) {

    const isDesktop = useMediaQuery("(min-width: 768px)");

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
                    placeholder={inputPlaceholder}
                />
                <Button type="submit" className="flex px-5">
                    {isDesktop ? btnText : <Search />}
                </Button>
            </form>
        </div>
    );
}
