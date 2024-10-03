import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

declare module "next-auth" {
  interface User {
    given_name?: string;
    family_name?: string;
    id_token?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.username = profile.username;
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }

      if (account) {
        token.id_token = account.id_token;        
      }

      return token;
    },
    async session({ session, token }) {            
      // Adding the username from the token to the session object so it's available session data
      if (token) {
        session.user.email = token.username as string;
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
        session.user.id_token = token.id_token as string;
      }

      return session;
    }
  }
})
