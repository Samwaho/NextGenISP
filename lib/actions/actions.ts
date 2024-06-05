"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
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

type MikrotikProps = {
  name: string;
  ipAddress: string;
  username: string;
  password: string;
};
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_COLLECTION_USER: USER_COLLECTION,
  APPWRITE_COLLECTION_AGENCY: AGENCY_COLLECTION,
  APPWRITE_COLLECTION_MIKROTIK: MIKROTIK_COLLECTION,
} = process.env;

export const signIn = async (data: SigninProps) => {
  try {
    const { account } = await createAdminClient();

    const user = await account.createEmailPasswordSession(
      data.email,
      data.password
    );
    return parseStringify(user);
  } catch (error) {
    console.log("🚀 ~ signIn ~ error:", error);
  }
};

export const signUp = async (data: SignupProps) => {
  try {
    const { account, database } = await createAdminClient();

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
    if (!newUserAccount) throw new Error("Failed to create user");
    const newAgency = await database.createDocument(
      DATABASE_ID!,
      AGENCY_COLLECTION!,
      ID.unique(),
      {
        agencyName: data.companyName,
        domain: data.domain,
        address: data.address,
      }
    );
    if (!newAgency) throw new Error("Failed to create Agency");
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION!,
      ID.unique(),
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        agency: newAgency.$id,
      }
    );
    if (!newUser) throw new Error("Failed to create database user");
    return parseStringify(newUser);
  } catch (error) {
    console.log("🚀 ~ signIn ~ error:", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
  }
};

export const createMikrotik = async (data: MikrotikProps) => {
  try {
    const { database } = await createAdminClient();
    const loggedUser = await getLoggedInUser();

    const user = await getUserById(loggedUser.email);

    const agencyId = user.documents[0].agency.$id;

    const newMikrotik = await database.createDocument(
      DATABASE_ID!,
      MIKROTIK_COLLECTION!,
      ID.unique(),
      {
        name: data.name,
        ipAddress: data.ipAddress,
        username: data.username,
        password: data.password,
        agency: agencyId,
      }
    );

    if (!newMikrotik) throw new Error("Failed to create Mikrotik");
    return parseStringify(newMikrotik);
  } catch (error) {
    console.log("🚀 ~ createMikrotik ~ error:", error);
    return null;
  }
};

export const getUserById = async (email: string) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTION!, [
      Query.equal("email", [email]),
    ]);

    return parseStringify(user);
  } catch (error) {
    console.log("🚀 ~ getUserById ~ error:", error);
    return null;
  }
};

export const getMikrotiks = async () => {
  try {
    const { database } = await createAdminClient();
    const mikrotiks = await database.listDocuments(
      DATABASE_ID!,
      MIKROTIK_COLLECTION!
    );
    return parseStringify(mikrotiks);
  } catch (error) {
    console.log("🚀 ~ getMikrotiks ~ error:", error);
    return null;
  }
};
