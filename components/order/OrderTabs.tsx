import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { useUser } from "@/app/(main)/_context/UserContext";
import { Soup, Timer } from "lucide-react";

export const OrderTab = () => {
  const { user } = useUser();
  console.log("user", user);
  return (
    <TabsContent value="order">
      <Card className="mt-[20px] p-4">
        <CardHeader className="text-[20px] font-semibold p-0">
          Order history
        </CardHeader>
        <div>
          {user?.orderedFoods?.map((foods) => {
            return (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-[16px] font-[700] ">
                    ${foods.totalPrice}
                  </h2>
                  <span
                    className={`w-27 h-7 rounded-full border-[1px] flex items-center justify-center text-[12px] font-[600] ${
                      foods.status == "PENDING"
                        ? "border-red-500"
                        : "bg-secondary"
                    }`}
                  >
                    {foods.status}
                  </span>
                </div>
                {foods.foodOrderItems.map((orderFood) => {
                  return (
                    <div className="flex justify-between items-center">
                      <p className="flex items-center gap-2 text-[#71717a] text-[12px]">
                        <Soup size={16} />
                        {orderFood.food.foodName}
                      </p>
                      <p className="text-[12px] text-[#71717a]">
                        x{orderFood.quantity}
                      </p>
                    </div>
                  );
                })}
                <div className="flex gap-2 items-center text-[#71717a] text-[12px]">
                  <Timer size={16} />
                  <p>{new Date(foods.createdAt).toISOString().split("T")[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </TabsContent>
  );
};
