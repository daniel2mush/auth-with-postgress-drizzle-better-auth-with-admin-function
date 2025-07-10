"use client";
import { signIn } from "@/lib/auth-client";

export default function Home() {
  async function handleLogin() {
    console.log("i was called");

    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div
        onClick={handleLogin}
        className=" bg-amber-700 rounded py-2 px-4 text-white font-bold cursor-pointer ">
        Login
      </div>
    </div>
  );
}
