"use client";

import { Form } from "@/components/ui/form";
import { createMikrotik } from "@/lib/actions/actions";
import { mikrotikSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./custom-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const MikrotikForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof mikrotikSchema>>({
    resolver: zodResolver(mikrotikSchema),
    defaultValues: {
      name: "",
      ipAddress: "",
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof mikrotikSchema>) => {
    setIsLoading(true);

    try {
      const response = await createMikrotik({
        name: values.name,
        ipAddress: values.ipAddress,
        username: values.username,
        password: values.password,
      });

      if (response) router.push("/main/network");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="container mx-auto max-w-md py-12">
          <Card>
            <CardHeader>
              <CardTitle>Add Mikrotik Device</CardTitle>
              <CardDescription>
                Enter the details of your Mikrotik device to add it to your
                account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CustomInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter Device name"
              />
              <CustomInput
                control={form.control}
                name="ipAddress"
                label="Ip Address"
                placeholder="Enter Device ip"
              />
              <CustomInput
                control={form.control}
                name="username"
                label="Username"
                placeholder="Enter Your api username"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter Your api Password"
              />
            </CardContent>
            <CardFooter>
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
                    "Save Device"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default MikrotikForm;
