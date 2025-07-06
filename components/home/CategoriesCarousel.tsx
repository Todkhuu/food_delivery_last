"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FoodCategory } from "@/types";
import { Button } from "../ui/button";
import { useCategory } from "@/app/main/_context/CategoryContext";

export function CategoriesCarousel() {
  const { categories } = useCategory();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-full overflow-hidden"
    >
      <CarouselContent className="flex">
        {categories
          ?.filter((category) => category.count > 0)
          .map((category: FoodCategory, index: number) => (
            <CarouselItem key={index} className="basis-auto">
              <div>
                <Button className="text-[18px] bg-secondary text-secondary-foreground rounded-full px-5 py-1">
                  {category.categoryName}
                </Button>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="bg-transparent border-none text-white" />
      <CarouselNext className="bg-transparent border-none text-white" />
    </Carousel>
  );
}
