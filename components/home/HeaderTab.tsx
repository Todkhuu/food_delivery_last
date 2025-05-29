"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Food } from "@/types";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const HeaderTab = () => {
  const [data, setData] = useState<Food[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/food`);
      setData(data.data);
    };
    fetchData();
  }, []);

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
      <TabsContent value="cart">
        <Card className="p-4 mt-[24px]">
          <CardTitle className="text-[20px] mb-[20px]">My cart</CardTitle>
          <div className="flex flex-col gap-[20px]"></div>
          <Button
            variant={"ghost"}
            className="w-[100%] rounded-full border-[1px] border-[#ef4444] mt-[20px] mb-[132px]"
          >
            <p className="text-[#ef4444]">Add food</p>
          </Button>
        </Card>
        <Card className="p-[16px] mt-[24px]">
          <CardTitle className="text-[20px] mb-[20px]">Payment info</CardTitle>
          <div className="flex flex-col gap-2 border-dashed border-b-[1px] pb-[20px]">
            <div className="flex justify-between">
              <p className="text-[16px] text-[#71717a]">Items</p>
              <p className="text-[16px] font-semibold">$25.98</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[16px] text-[#71717a]">Shipping</p>
              <p className="text-[16px] font-semibold">0.99$</p>
            </div>
          </div>
          <div className="flex justify-between mt-[20px]">
            <p className="text-[16px] text-[#71717a]">Total</p>
            <p className="text-[16px] font-semibold">26.97$</p>
          </div>
          <Button
            variant={"destructive"}
            className="w-[100%] rounded-full mt-[20px] "
          >
            <p className="text-white">Checkout</p>
          </Button>
        </Card>
      </TabsContent>
      <TabsContent value="order">
        <Card className="mt-[20px] p-4">
          <CardHeader className="text-[20px] font-semibold p-0">
            Order history
          </CardHeader>
          <div></div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
