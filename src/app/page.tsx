"use client";
import { signIn, signUp } from "@/lib/auth-client";
import React, { EventHandler, useState } from "react";

export default function Home() {
  async function handleLoginWithGoogle() {
    console.log("i was called");

    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  async function loginWithEmail(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name: "Daniel",
      });
      if (error) {
        console.log(error.message);
        return;
      }

      console.log(data.user);
    } catch (error) {
      console.log(error, "Console error");
    } finally {
      setEmail(""), setPassword("");
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className=" container w-full max-w-lg placeite">
        <div>
          <form onSubmit={loginWithEmail}>
            <div className="  w-full px-2 py-2 space-y-4">
              <label htmlFor="email" className=" text  ">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                id="email"
                className="px-2 py-2 rounded outline-0 border w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="  w-full px-2 py-2 space-y-4">
              <label htmlFor="password" className=" text  ">
                Password
              </label>
              <input
                type="text"
                placeholder="Enter your password"
                id="password"
                className="px-2 py-2 rounded outline-0 border w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" px-4 py-2 rounded bg-green-700 w-full text-white hover:bg-green-500">
              Register
            </button>
          </form>
        </div>
        <div className=" flex justify-center mt-10">
          <button
            onClick={handleLoginWithGoogle}
            className=" bg-amber-700 rounded py-2 px-4 text-white font-bold cursor-pointer ">
            Login with gmail
          </button>
        </div>
      </div>
    </div>
  );
}
