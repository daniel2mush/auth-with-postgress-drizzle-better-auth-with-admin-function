import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className=" w-full max-w-lg">
        <h1>Welcome to the login page</h1>
      </div>
    </div>
  );
}
