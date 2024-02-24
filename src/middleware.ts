import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/sign-in','/sign-up','/api/webhooks/clerk'],
});

export const config = {
    //static files like image(jpg,png)css(css and js) etc... and after.next consider the symbols dont ignore it
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };