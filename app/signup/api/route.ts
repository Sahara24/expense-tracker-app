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

  const { name, mobile, email, password } = body;

  try {
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({
      email,
    });

    if (existingUser) {
      return new NextResponse("User already exists", {
        status: 400,
      });
    }

    // Create a new user instance
    const newUser = new User({
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    const data = JSON.stringify({ msg: "Signup successful", user: savedUser });

    return new NextResponse(data, {
      status: 200,
    });
  } catch (err) {
    // Handle errors
    console.error("Error creating user:", err);
    const error = JSON.stringify({ error: "Error creating user" });
    return new NextResponse(error, {
      status: 500,
    });
  }
}
