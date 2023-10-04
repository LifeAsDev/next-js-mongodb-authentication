import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: {
  json():
    | { name: any; email: any; password: any }
    | PromiseLike<{ name: any; email: any; password: any }>;
  method: string;
  body: { name: any; email: any; password: any };
}) {
  const { name, email, password } = await req.json();

  await connectMongoDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExist = await User.findOne({ name }).select("name");
  const userExist1 = await User.findOne({ email }).select("email");

  if (userExist || userExist1) {
    console.log("user existed");
    return NextResponse.json({ message: "user existed" }, { status: 201 });
  } else {
    console.log("user created");
    User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  }
}
