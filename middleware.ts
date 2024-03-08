import { NextRequest, NextResponse } from "next/server";
import { 
  DEFAULT_LOGIN_REDIRECT, 
  apiAuthPrefix, 
  apiPrefix, 
  authRoutes, 
  publicRoutes 
} from "@/routes";
import { getSession } from "@/lib/getSession";
import { getCurrentUser } from "./lib/getCurrentUser";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = await getSession();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiAuthRoute || isApiRoute) {
    return;
  } 

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl ));
  }

  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};