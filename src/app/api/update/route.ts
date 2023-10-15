import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: {
  json: () =>
    | PromiseLike<{ phone: any; imageUrl: any; email: any }>
    | { phone: any; imageUrl: any; email: any };
}) {
  const { phone, imageUrl, email } = await req.json();
  await connectMongoDB();
  const data = await User.findOneAndUpdate(
    {
      email: {
        $regex: new RegExp(email || "", "i"),
      },
    },
    { phone, imageUrl },
    { new: true }
  );
  return NextResponse.json(
    { message: "Users update", imageUrl },
    { status: 201 }
  );
}
