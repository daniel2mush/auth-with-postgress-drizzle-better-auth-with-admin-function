"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();
  async function handleLoginWithGoogle() {
    await signIn.social({
      provider: "google",
      callbackURL: "/homepage",
    });
  }

  async function handleRegistration(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name: username,
      });
      if (error) {
        console.log(error.message);
        return;
      }
      router.push("/homepage");

      console.log(data.user);
    } catch (error) {
      console.log(error, "Console error");
    } finally {
      (setEmail(""), setPassword(""));
    }
  }
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
      if (error) {
        console.log(error.message);
        return;
      }

      router.push("/homepage");

      console.log(data.user);
    } catch (error) {
      console.log(error, "Console error");
    } finally {
      (setEmail(""), setPassword(""));
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className=" min-h-screen flex justify-center items-center ">
      <div className=" container w-full max-w-lg shadow-xl  rounded p-4">
        <div className="space-y-10">
          <div className=" space-y-2">
            <h1 className=" text-4xl font-bold text-center">Welcome back</h1>
            <p className=" text-md text-black/40 text-center">
              Login with your google acount{" "}
            </p>
          </div>

          <div>
            <div
              onClick={handleLoginWithGoogle}
              className=" rounded py-2 px-4 border font-bold cursor-pointer text-center ">
              Login with gmail
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-3 mt-10 mb-5">
          <div className=" border-t-2 h-0.5 w-full" />
          <p className=" flex-2/3 text-sm "> or continue with</p>
          <div className=" border-t-2 h-0.5 w-full" />
        </div>
        <div>
          <form onSubmit={isRegister ? handleRegistration : handleLogin}>
            {isRegister && (
              <div className="  w-full px-2 py-2 space-y-4">
                <label htmlFor="username" className=" font-bold ">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  id="username"
                  className="px-2 py-1.5 rounded outline-0 border w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="  w-full px-2 py-2 space-y-4">
              <label htmlFor="email" className=" font-bold ">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                className="px-2 py-1.5 rounded outline-0 border w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="  w-full px-2 py-2 space-y-4">
              <label htmlFor="password" className=" font-bold  ">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                className="px-2 py-1.5 rounded outline-0 border w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" px-4 py-2 rounded bg-black w-full text-white hover:bg-black/65 cursor-pointer mt-10">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
        </div>
        <div>
          <p className=" text-sm text-center mt-5">
            Dont have an account{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className=" hover:text-blue-600 underline cursor-pointer">
              {isRegister ? "login" : "register now!"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
