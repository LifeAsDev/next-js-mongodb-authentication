import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
export async function POST(
  req: {
    json: () =>
      | PromiseLike<{ name: any; email: any; password: any }>
      | { name: any; email: any; password: any };
  },
  res: any
) {
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
    await User.create({ name, email, password: hashedPassword })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
