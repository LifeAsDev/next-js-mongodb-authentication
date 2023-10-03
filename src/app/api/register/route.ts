import { NextApiResponse, NextApiRequest } from "next";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongoDB().catch((err) => res.json(err));
  console.log(req.method);
  if (req.method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Data is missing" });
    const { name, email, password } = req.body;
    const userExist =
      (await User.findOne({ name }).select("name")) +
      User.findOne({ email }).select("email");
    console.log(userExist);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
