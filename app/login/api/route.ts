import User, { IUser } from "@/lib/Model/User";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

type Data = {
  msg?: string;
  user_details?: IUser;
  error?: string;
};

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
    return new NextResponse(data, {
      status: 200,
      headers: { "Set-Cookie": `user_logged_in=${true}` },
    });
  } else {
    return NextResponse.json({ error: "Cannot find user, please sign up" });
  }
}
