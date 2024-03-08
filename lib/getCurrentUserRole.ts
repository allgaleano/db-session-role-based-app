import { getCurrentUser } from "@/lib/getCurrentUser";

export const getCurrentUserRole = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }
  return user.role;
}