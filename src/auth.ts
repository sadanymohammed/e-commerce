import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let response = await fetch(`${process.env.API}auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let payload = await response.json();
        console.log("payload", payload);
        if (payload.message === "success") {
          let userId;
          try {
            const decodedToken: { id?: string } = jwtDecode(payload.token);
            userId = decodedToken.id || payload.user._id;
          } catch (error) {
            console.error("Error decoding token:", error);
            userId = payload.user._id;
          }
          if (!userId) {
            throw new Error("No user ID found in token or user data");
          }
          return {
            id: userId,
            user: { ...payload.user, id: userId },
            token: payload.token,
          };
        } else {
          throw new Error(payload?.error || "Failed to authorize user");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...token.user, id: token.id };
      session.token = token.token;
      return session;
    },
  },
};