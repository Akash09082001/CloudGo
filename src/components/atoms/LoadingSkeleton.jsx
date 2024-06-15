import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {

    const cards = Array.from({ length: 4 }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full h-fit">
            {
                cards.map((card) => (
                    <Card key={card} className="w-full h-fit">
                        <CardHeader>
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </CardContent>
                    </Card >
                ))
            }
        </div>
    )
}

export default LoadingSkeleton
