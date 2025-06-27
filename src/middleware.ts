import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes
const isProtected = createRouteMatcher(["/new-post(.*)", "/posts(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  //if the user requests access to a protected route, the auth protection will trigger
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
