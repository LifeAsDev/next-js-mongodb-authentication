import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
        email: {
          label: "Email",
          type: "text",
        },
      },

      async authorize(credentials) {
        await connectMongoDB();
        const user =
          credentials?.name !== ""
            ? await User.findOne({
                name: {
                  $regex: new RegExp(credentials?.name || "", "i"),
                },
              })
            : null;

        if (!user) {
          console.log("Invalid Username");
          throw new Error("Invalid Username");
        }
        if (
          user.password !== "" &&
          (await compare(credentials!.password, user.password))
        ) {
          console.log("sesion iniciada");
          return user;
        } else {
          console.log("Invalid Password");
          throw new Error("Invalid Password");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectMongoDB();
        const { email } = user;
        const userExist = await User.findOne({ email });

        if (!userExist) {
          try {
            const res = await fetch("http://localhost:3000/api/register", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ email }),
            });
            if (res.ok) {
              return user;
            }
          } catch (error) {
            console.log(error);
          }
        } else if (userExist.name !== "") {
          return false;
        }
        console.log(userExist.name);
      }
      return user;
    },
  },
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
