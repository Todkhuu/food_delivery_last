import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/(main)/_context/CartContext";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { NomNomLogo } from "../icons";
import axios from "axios";
import { useUser } from "@/app/(main)/_context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TabsContent } from "../ui/tabs";

export const CartTabs = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useUser();

  const total = cartItems.reduce(
    (acc, item) => acc + item.food.price * item.quantity,
    0
  );
  const shipping = 0.99;

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/food-order", {
        user: user?._id,
        foodOrderItems: cartItems,
        totalPrice: total + shipping,
      });

      if (res.status === 201) {
        clearCart();
      } else {
        alert("Checkout failed: " + res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert(
        "Checkout error: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const successfullyOrder = <div></div>;
  return (
    <TabsContent value="cart">
      <Card className="p-4 mt-[24px]">
        <CardTitle className="text-[20px]">My cart</CardTitle>
        {cartItems.length === 0 ? (
          <div className="px-8 py-12 bg-[#f4f4f5] rounded-xl flex flex-col items-center">
            <NomNomLogo width={61} height={50} />
            <h2 className="text-[16px] font-[700] leading-[28px]">
              Your cart is empthy
            </h2>
            <p className="text-center text-[12px] text-[#71717a]">
              Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
              cravings!
            </p>
          </div>
        ) : (
          cartItems.map((foods) => {
            return (
              <div key={foods.food._id} className="flex gap-[10px]">
                <Image
                  width={100}
                  height={100}
                  alt="foodsImg"
                  src={foods.food.image}
                  className="w-[124px] h-[120px] bg-contain bg-center bg-amber-300 rounded-xl"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex gap-[10px]">
                    <div className="w-[250px]">
                      <h2 className="text-red-500 text-[16px] font-[700]">
                        {foods.food.foodName}
                      </h2>
                      <p className="text-[12px] ">{foods.food.ingredients}</p>
                    </div>
                    <Button
                      variant={"outline"}
                      className="rounded-full text-red-500 border-red-500 h-[42px]"
                      onClick={() => removeFromCart(foods.food._id)}
                    >
                      X
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 my-2">
                      <button
                        onClick={() =>
                          updateQuantity(foods.food._id, foods.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{foods.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(foods.food._id, foods.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p>${foods.food.price * foods.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </Card>
      <Card className="p-[16px] mt-[24px]">
        <CardTitle className="text-[20px] mb-[20px]">Payment info</CardTitle>
        <div className="flex flex-col gap-2 border-dashed border-b-[1px] pb-[20px]">
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717a]">Items</p>
            <p className="text-[16px] font-semibold text-[#71717a]">
              {!total ? "-" : `$ ${total}`}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717a]">Shipping</p>
            <p className="text-[16px] font-semibold text-[#71717a]">
              {total == 0 ? "-" : `${shipping} $`}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-[20px]">
          <p className="text-[16px] text-[#71717a]">Total</p>
          <p className="text-[16px] font-semibold text-[#71717a]">
            {!total ? "-" : `$ ${total + shipping}`}
          </p>
        </div>
        <Dialog>
          <DialogTrigger
            onClick={handleCheckout}
            className="w-[100%] rounded-full mt-[20px] bg-red-500 h-11 text-white"
          >
            Checkout
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <DialogTitle>Your order has been successfully placed !</DialogTitle>
            <Image
              src={"/illustration.png"}
              width={500}
              height={500}
              alt="gg"
              className="w-39 h-[265px] "
            />
          </DialogContent>
        </Dialog>
      </Card>
    </TabsContent>
  );
};
