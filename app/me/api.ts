import { cookies } from "next/headers";

type Data = {
  msg?: string;
  error?: string;
};

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("user_logged_in");

  console.log(token);
}
