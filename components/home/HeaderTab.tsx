"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartTabs, OrderTab } from "../order";

export const HeaderTab = () => {
  return (
    <Tabs defaultValue="cart">
      <TabsList className="w-[100%] rounded-full">
        <TabsTrigger
          value="cart"
          className="w-[50%] rounded-full data-[state=active]:bg-[#ef4444] data-[state=active]:text-white text-black"
        >
          Cart
        </TabsTrigger>
        <TabsTrigger
          value="order"
          className="w-[50%] rounded-full data-[state=active]:bg-[#ef4444] data-[state=active]:text-white text-black"
        >
          Order
        </TabsTrigger>
      </TabsList>
      <CartTabs />
      <OrderTab />
    </Tabs>
  );
};
