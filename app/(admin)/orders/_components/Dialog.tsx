"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodOrderStatusEnum } from "@/types";

export const Dialogs = ({
  selectedOrders = [],
  onChangeState,
}: {
  selectedOrders: any[];
  onChangeState: (
    ids: string[],
    newStatus: FoodOrderStatusEnum
  ) => Promise<void>;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedOrders.length === 0}>
          Change delivery state
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm State Change</DialogTitle>
        </DialogHeader>
        <div>
          <p>You are about to update {selectedOrders.length} order(s).</p>
          <Button
            onClick={() =>
              onChangeState(
                selectedOrders.map((order) => order._id),
                FoodOrderStatusEnum.Delivered
              )
            }
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
