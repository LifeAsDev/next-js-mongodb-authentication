import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";

export async function POST(req: {
  json: () => PromiseLike<{ email: any }> | { email: any };
}) {
  const { email } = await req.json();

  await connectMongoDB();
  const data = await User.findOne({ email });
  let imageUrl;
  console.log(data);
  console.log(data.hasOwnProperty("imageUrl"));
  if (data.imageUrl !== undefined) {
    imageUrl = data.imageUrl;
  } else {
    imageUrl = null;
  }
  return NextResponse.json(
    {
      message: "Users get",
      imageUrl,
      phone: data.phone || "",
    },
    { status: 201 }
  );
}
