import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
export async function POST(req: {
  json: () =>
    | PromiseLike<{ name: any; email: any; password: any }>
    | { name: any; email: any; password: any };
}) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB()
      .then((data) => {
        console.log("nice");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log({ name, email, password });

    const usernameAvailable = await User.findOne({ name }).select("name");
    const emailAvailable = await User.findOne({ email }).select("email");
    let message, status;
    if (usernameAvailable) {
      message = "Username already in use";
      status = 201;
      console.log("Username already in use");
    } else if (emailAvailable) {
      console.log("Email already in use");
      message = "Email already in use";
      status = 201;
    } else {
      await User.create({ name, email, password: hashedPassword })
        .then((data) => {
          console.log("User registered");
          message = "User registered";
          status = 201;
        })
        .catch((error) => {
          console.log("create failed");
          message = "An error occurred while registering the user.";
          status = 500;
        });
    }

    return NextResponse.json({ message }, { status });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
