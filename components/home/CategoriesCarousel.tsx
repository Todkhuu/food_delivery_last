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
import { useCategory } from "@/app/(main)/_context/CategoryContext";

export function CategoriesCarousel() {
  const { categories } = useCategory();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[99.9%] m-auto"
    >
      <CarouselContent className="">
        {categories?.map((category: FoodCategory, index: number) => (
          <CarouselItem key={index} className="basis-22">
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
