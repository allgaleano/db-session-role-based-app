import { getUserByToken } from "@/data/user";
import { getSession } from "@/lib/getSession";

export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }
  const user = await getUserByToken(session.sessiontoken);

  return user;
}