import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  let { name, email, password } = await req.json();
  let hashedPassword = "";
  await connectMongoDB();
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  let userExist;

  if (name) {
    userExist = await User.findOne({
      name: new RegExp(`^${name}$`, "i"),
    }).select("name");
  } else {
    name = "";
  }

  const userExist1 = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  }).select("email");

  if (userExist || userExist1) {
    console.log("user existed");
    if (userExist) {
      return NextResponse.json(
        { message: "Username already in use" },
        { status: 201 }
      );
    }
    if (userExist1) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 201 }
      );
    }
  } else {
    console.log("user created");
    User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  }
}
