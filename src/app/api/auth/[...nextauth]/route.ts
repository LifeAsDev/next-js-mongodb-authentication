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
          credentials?.name !== " "
            ? await User.findOne({
                name: new RegExp(`^${credentials?.name}$`, "i"),
              })
            : null;
        if (!user) {
          console.log("Invalid Username");
          throw new Error("Invalid Username");
        }

        if (
          user.password !== " " &&
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
      console.log(account?.provider);
      if (account?.provider === "google") {
        const { email } = user;

        await connectMongoDB();

        console.log("userCreated");

        const userExist1 = await User.findOne({
          email: {
            $regex: new RegExp(email || "", "i"),
          },
        }).select("email name");

        if (userExist1) {
          if (userExist1.name === " ") {
            return user;
          }

          return false;
        } else {
          User.create({
            name: " ",
            email,
            password: " ",
          });
          return user;
        }
      } else {
        return user;
      }
    },
  },
  pages: {
    signIn: "/",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
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
