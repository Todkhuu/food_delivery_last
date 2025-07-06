"use client";
import { FoodCategory } from "@/types";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CategoryContextType = {
  categories: FoodCategory[];
  setCategories: (_categories: FoodCategory[]) => void;
};

export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/food-category/with-count`);
      setCategories(data.data);
    };
    fetchData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
