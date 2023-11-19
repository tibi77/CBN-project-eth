// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default function middleware(req: any, res: any, next: any) {
  // If you need to redirect unauthenticated users to a different page,
  // you can replace the `next()` call with `res.redirect("/login")`
  next();
}

export const config = { matcher: ["/admin", "/me"] };
