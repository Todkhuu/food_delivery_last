"use client";

import React, { useState } from "react";
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
  // Статус хадгалах state
  const [selectedStatus, setSelectedStatus] = useState<FoodOrderStatusEnum>(
    FoodOrderStatusEnum.Pending // default утга (таны enum-д тохируулаарай)
  );

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

          {/* Статус сонгох хэсэг */}
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as FoodOrderStatusEnum)
            }
            style={{ marginBottom: "1rem" }}
          >
            {/* Та өөрийн FoodOrderStatusEnum-д тааруулж утгуудыг нэмээрэй */}
            <option value={FoodOrderStatusEnum.Pending}>Pending</option>
            <option value={FoodOrderStatusEnum.Delivered}>Delivered</option>
            <option value={FoodOrderStatusEnum.Cancelled}>Cancelled</option>
          </select>

          <Button
            onClick={() =>
              onChangeState(
                selectedOrders.map((order) => order._id),
                selectedStatus
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
