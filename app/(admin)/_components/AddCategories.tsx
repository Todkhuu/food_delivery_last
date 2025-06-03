"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FoodCategory } from "@/types";
import axios from "axios";

const formSchema = z.object({
  categoryName: z.string().min(4).max(50),
});

export const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [ids, setIds] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const getDatas = async () => {
    const datas = await axios.get("/api/food-category/with-count");
    setCategories(datas.data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const createData = async (category: string) => {
    const response = await fetch(`http://localhost:8000/food_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: category }),
    });
    getDatas();
  };

  const deleteData = async (id: string) => {
    const response = await fetch(`http://localhost:8000/food_category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getDatas();
  };

  const editData = async (id: string, categoryName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/food_category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        }
      );
    } catch (error) {
      console.log("error", error);
    }
    getDatas();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      editData(ids, values.categoryName);
    } else {
      createData(values.categoryName);
    }
  };

  const clickEdit = (id: string) => {
    setEditCategory(true);
    setIsEdit(true);
    setIds(id);
  };

  const closeDialog = () => {
    setEditCategory(false);
  };

  const clickAdd = () => {
    setEditCategory(true);
    setIsEdit(false);
  };

  return (
    <div className="h-[176px] bg-[#ffffff] p-[24px] rounded-[12px]">
      <h2 className="text-[20px] mb-[16px]">Dishes category</h2>
      <div className="flex gap-3 flex-wrap">
        {categories?.map((category: FoodCategory, index: number) => {
          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger>
                <Button
                  className="rounded-full"
                  variant={"outline"}
                  key={category._id}
                >
                  {category.categoryName}
                  <Badge className="rounded-full">{category.count}</Badge>
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="p-2">
                <ContextMenuItem
                  className="p-0"
                  onClick={() => {
                    clickEdit(category._id);
                    form.setValue("categoryName", category.categoryName);
                  }}
                >
                  <p>Edit</p>
                </ContextMenuItem>
                <ContextMenuItem
                  className="p-0"
                  onClick={() => deleteData(category._id)}
                >
                  <p>Delete</p>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
        <div onClick={clickAdd}>
          <Image
            onClick={() => form.resetField("categoryName")}
            src={"/IconButton.png"}
            width={36}
            height={36}
            alt=""
          />
        </div>
        <Dialog open={editCategory} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogTitle className="text-[18px]">Add new category</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category name</FormLabel>
                      <FormControl>
                        <Input placeholder="Type category name..." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-[48px]">
                  <Button type="submit">Add Category</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
