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
import { toast } from "sonner";

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

  const createCategory = async (category: string) => {
    await axios.post(`/api/food-category`, { categoryName: category });
    await getDatas();
    setEditCategory(false);
    toast.success("Category added successfully");
  };

  const deleteCategory = async (id: string) => {
    await axios.delete(`/api/food-category/${id}`);
    getDatas();
    toast.success("Category deleted successfully");
  };

  const editData = async (id: string, category: string) => {
    await axios.patch(`/api/food-category/${id}`, { categoryName: category });
    getDatas();
    setEditCategory(false);
    toast.success("Category updated successfully");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      editData(ids, values.categoryName);
    } else {
      createCategory(values.categoryName);
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
                  onClick={() => {
                    if (category.count > 0) {
                      toast.error(
                        "This category contains foods. Please remove them first."
                      );
                      return;
                    }
                    deleteCategory(category._id);
                  }}
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
            <DialogTitle className="text-[18px]">
              {isEdit ? "Edit category" : "Add new category"}
            </DialogTitle>
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
                  <Button type="submit">
                    {isEdit ? "Edit Category" : "Add Category"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
