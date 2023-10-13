import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";

export async function POST(req: {
  json: () =>
    | PromiseLike<{ phone: any; imageUrl: any; name: any }>
    | { phone: any; imageUrl: any; name: any };
}) {
  const { name } = await req.json();

  await connectMongoDB();
  const data = await User.findOne({ name });
  console.log({
    message: "Users get",
    imageUrl: data.imageUrl,
    phone: data.phone,
  });
  return NextResponse.json(
    { message: "Users get", imageUrl: data.imageUrl, phone: data.phone },
    { status: 201 }
  );
}
