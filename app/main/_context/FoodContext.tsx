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

type FoodContextType = {
  foods: FoodCategory[];
  setFoods: (_foods: FoodCategory[]) => void;
  fetchData: () => void;
};

export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);

export const useFood = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<FoodCategory[]>([]);

  const fetchData = async () => {
    const food = await axios.get(`/api/food/with-categories`);
    setFoods(food.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, setFoods, fetchData }}>
      {children}
    </FoodContext.Provider>
  );
};
