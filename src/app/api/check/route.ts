import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";

export async function POST(req: any) {
  const { email } = await req.json();

  await connectMongoDB();
  const data = await User.findOne({ email });
  let imageUrl, phone;

  if (data.imageUrl !== undefined) {
    imageUrl = data.imageUrl;
  } else {
    imageUrl = null;
  }
  if (data.phone !== undefined) {
    phone = data.phone;
  } else {
    phone = "";
  }
  return NextResponse.json(
    {
      message: "Users get",
      imageUrl,
      phone,
    },
    { status: 201 }
  );
}
