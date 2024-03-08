"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get("/api/auth/current-user");
        setUser(user.data);
      } catch (error) {
        setUser(null);
        console.error(error);
      }
    }
    getUser();
  }, []);
  return user;
}