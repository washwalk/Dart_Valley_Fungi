import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Fungi } from "@/types";
import { ArrowRight } from "lucide-react";

interface FungiCardProps {
  fungi: Fungi;
}

export function FungiCard({ fungi }: FungiCardProps) {
  return (
    <Link href={`/fungi/${fungi.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full cursor-pointer">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <Image
            src={fungi.image || "/images/placeholder-fungi.jpg"}
            alt={fungi.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-4 left-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              fungi.edibility === "Edible" 
                ? "bg-success/90 text-white" 
                : "bg-red-500/90 text-white"
            }`}>
              {fungi.edibility}
            </span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
            {fungi.title}
          </CardTitle>
          <CardDescription className="italic">{fungi.latinName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {fungi.summary}
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
