"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Food, FoodCategory } from "@/types";
import { useCart } from "@/app/(main)/_context/CartContext";
import { useState } from "react";
import { useUser } from "@/app/(main)/_context/UserContext";
import { toast } from "sonner";

export const FoodDialogs = ({ category }: { category: FoodCategory }) => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap gap-[36px]">
      {category.foods?.map((food: Food, index: number) => {
        return (
          <Dialog
            key={index}
            open={openDialogId === food._id}
            onOpenChange={(isOpen) =>
<<<<<<< HEAD
              setOpenDialogId(isOpen ? food?._id ?? null : null)
=======
              setOpenDialogId(isOpen && food._id ? food._id : null)
>>>>>>> a948d8c (build)
            }
          >
            <DialogTrigger className="text-left">
              <Card className="w-[397px] h-[342px] rounded-[20px] p-[16px] overflow-hidden">
                <div
                  style={{
                    backgroundImage: `url(${food.image})`,
                  }}
                  className="w-[365px] h-[210px] rounded-xl bg-center bg-cover"
                ></div>
                <CardContent className="px-0">
                  <div className="flex justify-between">
                    <h2 className="text-[#ef4444] text-[24px] font-semibold line-clamp-1">
                      {food.foodName}
                    </h2>
                    <h3 className="text-[18px] font-semibold text-[#09090b]">
                      ${food.price}
                    </h3>
                  </div>
                  <p className="text-[14px]">{food.ingredients}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="min-w-[826px] h-[412px]">
              <div className="flex gap-[24px]">
                <div
                  style={{
                    backgroundImage: `url(${food.image})`,
                  }}
                  className="w-[377px] h-[364px] rounded-xl bg-center bg-cover"
                ></div>
                <CardContent className="px-0 py-0 flex flex-col justify-between">
                  <div>
                    <h2 className="text-[#ef4444] text-[30px] font-semibold">
                      {food.foodName}
                    </h2>
                    <p className="text-[16px] mt-[12px]">{food.ingredients}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[16px]">Total price</p>
                        <h3 className="text-[24px] font-semibold text-[#09090b]">
                          ${Number(food.price) * quantity}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-[44px] h-[44px] rounded-full border-[1px] text-secondary-foreground text-[20px]"
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-[44px] h-[44px] rounded-full border-[1px] text-secondary-foreground text-[20px]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        if (!user?.address) {
                          toast.error(
                            "No address found. Please add your delivery address before adding to cart."
                          );
                          return;
                        }
                        addToCart(food, quantity);
                        setOpenDialogId(null);
                        toast.success("Food added to cart successfully!");
                      }}
                      className="w-[100%] h-[44px] rounded-full mt-[24px]"
                    >
                      Add to cart
                    </Button>
                  </div>
                </CardContent>
              </div>
              <DialogTitle></DialogTitle>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};
