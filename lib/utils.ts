import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must contain atleast 8 characters",
  }),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must contain atleast 3 characters",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must contain atleast 8 characters",
  }),
  companyName: z.string().min(3, {
    message: "Company name must contain atleast 3 characters",
  }),
  address: z.string(),
  domain: z.string(),
  phone: z.string(),
});
