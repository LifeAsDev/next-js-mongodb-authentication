import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: {
  json: () =>
    | PromiseLike<{ phone: any; imageUrl: any; name: any }>
    | { phone: any; imageUrl: any; name: any };
}) {
  const { phone, imageUrl, name } = await req.json();

  await connectMongoDB();
  console.log({ phone, imageUrl, name });
  const data = await User.findOneAndUpdate(
    { name },
    { phone, imageUrl },
    { new: true }
  );
  console.log(data);
  return NextResponse.json({ message: "Users update" }, { status: 201 });
}
