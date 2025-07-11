"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBeer, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FadeLoader } from "react-spinners";
export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // zod schema
  const authRegisterForm = z
    .object({
      username: z
        .string()
        .min(4, "Username should be more than 4 letters")
        .optional(),
      email: z.email(),
      password: z.string().min(4, "Password should be more than 4 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match, please try again",
      path: ["confirmPassword"],
    });

  const authLoginForm = z.object({
    email: z.email(),
    password: z.string(),
  });

  type authFormTypes =
    | z.infer<typeof authLoginForm>
    | z.infer<typeof authRegisterForm>;

  const form = useForm<authFormTypes>({
    resolver: zodResolver(isRegister ? authRegisterForm : authLoginForm),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  async function handleLoginWithGoogle() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  async function handleRegistration(data: authFormTypes) {
    setIsLoading(true);
    console.log("I was called Register");
    const { email, password, username } = data as z.infer<
      typeof authRegisterForm
    >;
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name: username!,
      });
      if (error) {
        console.log(error.message);
        toast.error(error.message);
        return;
      }
      setIsRegister(false);
      toast.success(
        "Registration successful. An email has been sent, confirm your email to continue"
      );

      console.log(data.user);
    } catch (error) {
      console.log(error, "Console error");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleLogin(data: authFormTypes) {
    setIsLoading(true);
    const email = data.email;
    const password = data.password;
    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
      if (error) {
        console.log(error.message);
        toast.error(error.message);
        return;
      }

      router.push("/");
      toast.success("login successfully");

      console.log(data.user);
    } catch (error) {
      console.log(error, "Console error");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSwitch() {
    setIsRegister(!isRegister);
    form.reset();
  }

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
            <Button
              variant={"outline"}
              onClick={handleLoginWithGoogle}
              className="w-full cursor-pointer ">
              <FaGoogle />
              Login with gmail
            </Button>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-3 mt-10 mb-5">
          <div className=" border-t-2 h-0.5 w-full" />
          <p className=" flex-2/3 text-sm "> or continue with</p>
          <div className=" border-t-2 h-0.5 w-full" />
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                isRegister ? handleRegistration : handleLogin
              )}
              className=" space-y-5">
              {isRegister && (
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className=" relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          onClick={() => setShowPassword((prev) => !prev)}
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto w-auto text-gray-500 cursor-pointer">
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isRegister && (
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className=" relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password again"
                            {...field}
                          />
                          <Button
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto w-auto text-gray-500 cursor-pointer">
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button
                disabled={isLoading}
                type="submit"
                className=" w-full cursor-pointer">
                {isLoading ? (
                  <div className=" scale-50">
                    <FadeLoader color="#4F46E5" />
                  </div>
                ) : isRegister ? (
                  "Register"
                ) : (
                  "Login"
                )}
                {}
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className=" text-sm text-center mt-3 ">
            Dont have an account{" "}
            <span
              onClick={handleSwitch}
              className=" hover:text-blue-600 underline cursor-pointer">
              {isRegister ? "login" : "register now!"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
