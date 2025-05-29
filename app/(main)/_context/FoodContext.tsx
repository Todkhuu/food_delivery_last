"use client";
import { Food } from "@/types";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FoodContextType = {
  foods: Food[];
  setFoods: (_foods: Food[]) => void;
};

export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);

export const useFood = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  console.log("foods", foods);
  useEffect(() => {
    const fetchData = async () => {
      const food = await axios.get(`/api/food/with-categories`);
      setFoods(food.data);
    };
    fetchData();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, setFoods }}>
      {children}
    </FoodContext.Provider>
  );
};
