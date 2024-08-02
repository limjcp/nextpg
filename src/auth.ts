import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  theme: {
    logo: "/htc-new-seal.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "HTC Account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username as string,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid =
          user.password.length > 20
            ? await bcrypt.compare(credentials.password, user.password)
            : credentials.password === user.password;

        if (isPasswordValid) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role; // Include role in session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Include role in token
      }
      return token;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
