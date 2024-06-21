import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {

    const cards = Array.from({ length: 1 }, (_, i) => i + 1);

    return (
        <div className="flex gap-5 w-full h-full items-center justify-center">
            {
                cards.map((card) => (
                    <Card key={card} className="w-full h-fit max-w-xs">
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
