import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Fungi } from "@/types";

interface FungiCardProps {
  fungi: Fungi;
}

export function FungiCard({ fungi }: FungiCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <Image
          src={fungi.image || "/images/placeholder-fungi.jpg"}
          alt={fungi.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{fungi.title}</CardTitle>
            <CardDescription className="italic">{fungi.latinName}</CardDescription>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            fungi.edibility === "Edible" 
              ? "bg-success/20 text-success" 
              : "bg-red-100 text-red-600"
          }`}>
            {fungi.edibility}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {fungi.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>📅 {fungi.season}</span>
          <span>🌲 {fungi.habitat}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/fungi/${fungi.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
