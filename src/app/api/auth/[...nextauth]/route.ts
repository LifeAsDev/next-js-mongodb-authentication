import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { compare } from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({
          name: {
            $regex: new RegExp(credentials?.name || "", "i"),
          },
        });
        if (!user) {
          console.log("Invalid Username");
          throw new Error("Invalid Username");
        }
        if (await compare(credentials!.password, user.password)) {
          console.log("sesion iniciada");
          return user;
        } else {
          console.log("Invalid Password");
          throw new Error("Invalid Password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
