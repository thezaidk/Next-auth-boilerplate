import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"
 
export const { 
  auth, handlers: { GET, POST },
  signIn,
  signOut 
} = NextAuth({
  callbacks: {
    async session({ session, token}) {
      if(session.user && token.sub){
        session.user.id= token.sub;
      }
      
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
})