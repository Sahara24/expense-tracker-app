"use client";
import { FormEvent, useEffect, useState } from "react";
import { Button, Text, TextField } from "@radix-ui/themes";
import { CashBookLogo, LoginSvg } from "@/public/loginSvg";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  async function getData() {
    // const data = await getExpenses();
    // console.log(data);
  }

  const handleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  async function loginFun(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("/login/api", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Handle response if necessary
      const data = await response.json();

      if (data?.msg) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }

    // ...
  }

  async function signupFun(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      name,
      mobile,
      email,
      password,
    };
    try {
      const response = await fetch("signup/api", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Handle response if necessary
      const data = await response.json();
      localStorage.setItem("email", email);
      alert(data?.msg);
    } catch (err) {
      alert(err);
    }

    // ...
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="flex w-full h-[calc(100vh-15px)] max-h-dvh">
      <div className="w-2/5 p-8 h-full bg-[#edeffb]">
        <CashBookLogo />
        <div className="h-full w-full flex justify-center">
          <div className="flex flex-col gap-8 items-center pt-24">
            <LoginSvg />
            <p className="text-gray-900 text-center text-2xl leading-6 font-semibold">
              Track your expenses
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center pt-44 gap-6">
        <div className="flex flex-col gap-6 items-center">
          <CashBookLogo />
          <h2 className="text-[28px] leading-8 font-semibold">
            {isSignUp ? "Create a new account" : "Login to your Account"}
          </h2>
        </div>

        <div className="p-8 w-96 border border-gray-200 h-fit">
          <form
            className="flex flex-col gap-8"
            onSubmit={isSignUp ? signupFun : loginFun}
          >
            <p className="text-xl font-medium">Enter your details</p>
            {isSignUp && (
              <>
                <TextField.Input
                  size="3"
                  placeholder="Enter Full Name"
                  type="text"
                  name="name"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField.Input
                  size="3"
                  placeholder="Enter Mobile Number"
                  type="text"
                  name="mobile"
                  required={isSignUp}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </>
            )}
            <TextField.Input
              size="3"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField.Input
              size="3"
              placeholder="Enter Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Submit</Button>
            {isSignUp ? (
              <p className="text-sm text-[#707070]">
                Have an account?{" "}
                <span
                  className="cursor-pointer text-[#4863D4]"
                  onClick={handleSignUp}
                >
                  Login{" "}
                </span>
              </p>
            ) : (
              <p className="text-sm text-[#707070]">
                Don't have an account?{" "}
                <span
                  className="cursor-pointer text-[#4863D4]"
                  onClick={handleSignUp}
                >
                  Sign Up
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
