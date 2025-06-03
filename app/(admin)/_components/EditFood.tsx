"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import CloudinaryUpload from "./CloudinaryUpload";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { ComboBox } from "../foodmenu/_components/ComboBox";
import { Category, foodType } from "@/utils/types";

const formSchema = z.object({
  dishName: z.string().min(4).max(50),
  dishCategory: z.string(),
  Ingredients: z.string(),
  price: z.number(),
  foodImage: z.string(),
});

type editType = {
  oneFood: foodType;
  categories: Category[];
};

export const EditFood = ({ oneFood, categories }: editType) => {
  const [ids, setIds] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: "",
      dishCategory: "",
      Ingredients: "",
      price: 0,
      foodImage: "",
    },
  });

  const editFood = async (id: string, dishName: string) => {
    const response = await fetch(`http://localhost:8000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dishName }),
    });
    // getDatas();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    editFood(ids, values.dishName);
    // setIds(foods._id);
  };

  const deleteFood = async (id: string) => {
    const response = await fetch(`http://localhost:8000/foods/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // getDatas();
  };

  return (
    <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <Image
            src={"/edit-2.png"}
            width={16}
            height={16}
            alt=""
            className="w-[16px] h-[16px]"
          />
        </DialogTrigger>
        <DialogContent className="w-[472px]">
          <DialogTitle className="text-[18px]">Dishes info</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dishName"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Dish name
                    </FormLabel>
                    <FormControl>
                      <Input
                        onClick={() =>
                          form.setValue("dishName", oneFood.foodName)
                        }
                        className="w-[288px]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dishCategory"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Dish category
                    </FormLabel>
                    <FormControl>
                      <ComboBox categories={categories} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Ingredients"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Ingredients
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        onClick={() =>
                          form.setValue("Ingredients", oneFood.ingredients)
                        }
                        className="w-[288px]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        onClick={() => form.setValue("price", oneFood.price)}
                        className="w-[288px]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foodImage"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Food image
                    </FormLabel>
                    <FormControl>
                      <div className="w-[288px] h-[116px]">
                        {/* <CloudinaryUpload /> */}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-[36px]">
                <Button
                  onClick={() => deleteFood(oneFood._id)}
                  variant={"ghost"}
                  className="border-[1px] p-3"
                >
                  <Image
                    src={"/trash.png"}
                    width={16}
                    height={16}
                    alt="trash"
                  />
                </Button>
                <Button type="submit">Add Category</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
