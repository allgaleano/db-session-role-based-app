"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const LogoutButton = () => {
  const logoutOnClick = async () => {
    const response = await axios.delete("/api/auth/logout");
    if (response.data.ok) {
      window.location.href = "/login";
    } else {
      console.error(response.data.message);
    }
  }
  return (
    <Button onClick={logoutOnClick}>
      Logout
    </Button>
  );
}