"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomInput from "./custom-input";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/actions";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      companyName: "",
      domain: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true);

    try {
      const response = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        address: values.address,
        companyName: values.companyName,
        domain: values.domain,
        phone: values.phone,
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
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter Your Name"
          />
          <CustomInput
            control={form.control}
            name="companyName"
            label="Company Name"
            placeholder="Enter Your Company Name"
          />
        </div>
        <CustomInput
          control={form.control}
          name="address"
          label="Address"
          placeholder="Enter Your Address"
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            control={form.control}
            name="domain"
            label="Domain"
            placeholder="Enter Your Domain"
          />
          <CustomInput
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="Enter Your Phone Number"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              className="h-4 w-4 rounded text-fuchsia-600 focus:ring-fuchsia-500 dark:bg-gray-800 dark:text-fuchsia-400 dark:focus:ring-fuchsia-400"
              id="terms"
              name="terms"
            />
            <Label
              className="ml-2 block text-sm text-fuchsia-600 underline cursor-pointer dark:text-gray-300"
              htmlFor="remember-me"
            >
              Terms & Conditions
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
              "Creat Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
