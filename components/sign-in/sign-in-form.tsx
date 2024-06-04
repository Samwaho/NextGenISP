"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomInput from "./custom-input";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/actions";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);

    try {
      const response = await signIn({
        email: values.email,
        password: values.password,
      });

      if (response) router.push("/");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter Your Email"
        />
        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter Your Password"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              className="h-4 w-4 rounded text-fuchsia-600 focus:ring-fuchsia-500 dark:bg-gray-800 dark:text-fuchsia-400 dark:focus:ring-fuchsia-400"
              id="remember-me"
              name="remember-me"
            />
            <Label
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              htmlFor="remember-me"
            >
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link
              className="font-medium text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"
              href="#"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <Button
            className="flex w-full justify-center rounded-md bg-gradient-to-tl from-pink-500 to-purple-600 py-2 px-4 hover:opacity-85"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2Icon size={20} className="animate-spin" />
                &nbsp; Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
