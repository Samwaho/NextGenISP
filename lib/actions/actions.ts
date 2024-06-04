"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

type SigninProps = {
  email: string;
  password: string;
};

type SignupProps = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  companyName: string;
  domain: string;
};

export const signIn = async (data: SigninProps) => {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(
      data.email,
      data.password
    );
    return parseStringify(response);
  } catch (error) {
    console.log("🚀 ~ signIn ~ error:", error);
  }
};

export const signUp = async (data: SignupProps) => {
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name
    );

    const session = await account.createEmailPasswordSession(
      data.email,
      data.password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("🚀 ~ signIn ~ error:", error);
  }
};
