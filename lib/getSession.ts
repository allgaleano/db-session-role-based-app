import { deleteSessionByToken, getSessionByToken } from "@/data/session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookie = cookies().get('session');
  if (!cookie) {
    return null;
  } else {
    const session = await getSessionByToken(cookie.value);

    if (!session) {
      return null;
    } else if (session.expires < new Date()) {
      await deleteSessionByToken(cookie.value);
      return null;
    }
    
    return session;
  }
}