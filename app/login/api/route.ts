import { NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken";
import User, { IUser } from "@/lib/Model/User";
import connectDB from "@/lib/connectDB";

type Data = {
  msg?: string;
  user_details?: IUser;
  error?: string;
};

const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  console.log({ body });

  const { email, password } = body;

  const person = await User.findOne({ email: email });

  if (person) {
    const data = JSON.stringify({
      msg: "Login Successful",
      user_details: person,
    });

    const secret = process.env.JSON_SECRET || "";

    const token = sign({ exp: expirationTime, data: person }, secret);

    return new NextResponse(data, {
      status: 200,
      headers: { "Set-Cookie": `token=${token}` },
    });
  } else {
    return NextResponse.json({ error: "Cannot find user, please sign up" });
  }
}
