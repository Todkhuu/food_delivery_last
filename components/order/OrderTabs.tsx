import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUser } from "@/app/main/_context/UserContext";
import { LocationEdit, Soup, Timer } from "lucide-react";
import { NomNomLogo } from "../icons";

export const OrderTab = () => {
  const { user } = useUser();
  return (
    <TabsContent value="order">
      <Card className="mt-[20px] h-screen">
        <CardHeader className="text-[20px] font-semibold ">
          Order history
        </CardHeader>
        <CardContent>
          {user?.orderedFoods?.length == 0 ? (
            <Card className="bg-secondary">
              <CardContent className="flex flex-col items-center">
                <NomNomLogo width={61} height={50} />
                <h2 className="text-[16px] font-[700] leading-7">
                  No Orders Yet?
                </h2>
                <p className="text-[12px] text-[71717a] text-center">
                  🍕 "You haven't placed any orders yet. Start exploring our
                  menu and satisfy your cravings!"
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col">
              {user?.orderedFoods?.map((foods) => {
                return (
                  <div
                    key={foods._id}
                    className="flex flex-col gap-2 border-b border-dashed border-[#71717a] last:border-0 last:pb-[0px] pb-[20px] mt-[20px]"
                  >
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
                        <div
                          key={orderFood.food._id}
                          className="flex justify-between items-center"
                        >
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
                      <p>
                        {new Date(foods.createdAt).toISOString().split("T")[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#71717a]">
                      <LocationEdit size={16} />
                      <p>{user.address}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
