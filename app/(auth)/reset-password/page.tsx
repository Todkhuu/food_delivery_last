"use client";
import { Suspense } from "react";
import { CreateNewPassword } from "./_components/CreateNewPassword";

const Page = () => {
  return (
    <Suspense>
      <CreateNewPassword />
    </Suspense>
  );
};
export default Page;
