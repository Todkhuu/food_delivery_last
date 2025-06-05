export enum FoodOrderStatusEnum {
  Delivered = "Delivered",
  Pending = "Pending",
  Cancelled = "Cancelled",
}

export const statusClasses: Record<FoodOrderStatusEnum, string> = {
  [FoodOrderStatusEnum.Pending]: "border-red-500",
  [FoodOrderStatusEnum.Cancelled]: "border-border",
  [FoodOrderStatusEnum.Delivered]: "border-green-500",
};

export enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
