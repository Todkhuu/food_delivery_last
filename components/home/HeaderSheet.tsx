import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { HeaderTab } from "./HeaderTab";
import { useCart } from "@/app/(main)/_context/CartContext";

export const HeaderSheet = () => {
  const { cartItems } = useCart();
  return (
    <Sheet>
      <SheetTrigger className="relative w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center">
        <ShoppingCart size={18} />
        {cartItems.length > 0 && (
          <div className="absolute top-[-8px] right-[-8px] w-[20px] h-[20px] bg-red-500 text-white rounded-full flex items-center justify-center text-[12px]">
            {cartItems.length}
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[535px] bg-[#404040] border-none p-[32px] overflow-scroll rounded-l-[20px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 ">
            <ShoppingCart className="text-white" />
            <div className="text-white text-[20px]">Order detail</div>
          </SheetTitle>
        </SheetHeader>
        <HeaderTab />
      </SheetContent>
    </Sheet>
  );
};
