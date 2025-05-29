"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, LocationEditIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@/app/(main)/_context/UserContext";

export const HeaderAddress = () => {
  const { user, updateUser } = useUser();
  const [address, setAddress] = useState<string>(user?.address || "");
  const [open, setOpen] = useState(false);

  const handleUpdateUser = async () => {
    try {
      if (!user?._id) return;
      const response = await axios.patch(`/api/auth/${user._id}`, {
        address: address,
      });
      console.log("Амжилттай шинэчлэгдлээ:", response.data);
      updateUser({ address });
      setOpen(false);
    } catch (error) {
      console.error("Шинэчлэхэд алдаа:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="w-[251px] h-[36px] flex items-center justify-between border-[1px] rounded-full bg-white px-[12px]">
          <LocationEditIcon size={20} />
          {user?.address ? (
            <p className="text-[12px]">{user?.address}</p>
          ) : (
            <p className="text-[12px] text-red-500">
              Delivery address:{" "}
              <span className="text-muted-foreground">Add Location</span>
            </p>
          )}
          <ChevronRight size={15} className="text-[#18181b7e]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Please share your complete address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateUser}>Deliver Here</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
