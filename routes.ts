/**
 * An array of routes that are public and do not require authentication
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
  "/register",
];

/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The prefix for the API routes
 * Routes that start with this prefix are used for API purposes
 * @type {string}
 */
export const apiPrefix: string = "/api";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";