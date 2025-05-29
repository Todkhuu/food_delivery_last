"use client";
import { UserType } from "@/types";
import axios, { AxiosError } from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
  user?: UserType | null;
  login: (_email: string, _password: string) => Promise<void>;
  updateUser: (newUserData: UserType) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`/api/auth/sign-in`, {
        email,
        password,
      });
      localStorage.setItem("id", res.data.user._id);
      setUser(res.data.user);
      toast(res.data.message, {
        icon: <CircleCheck size={18} className="text-green-500" />,
      });

      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast(error.response?.data.message || "Unknown error occurred", {
        icon: <CircleX size={18} className="text-red-500" />,
      });
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setUser(undefined);
        return;
      }
      const data = await axios.post(`/api/auth/get-current-user`, { userId });
      console.log("data", data?.data.user);
      setUser(data?.data.user);
    };
    loadUser();
  }, []);

  const updateUser = (newUserData: Partial<UserType>) => {
    setUser((prev) => (prev ? { ...prev, ...newUserData } : prev));
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};
