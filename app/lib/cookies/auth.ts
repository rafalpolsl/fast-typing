"use server";
import { cookies } from "next/headers";
import { USERNAME_COOKIE_KEY } from "./keys";

export const addUsernameToCookies = (username: string) => {
  cookies().set(USERNAME_COOKIE_KEY, username, {
    expires: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 365), //year
  });
};

export const getUsernameFromCookies = () => {
  return cookies().get(USERNAME_COOKIE_KEY);
};

export const removeUsernameFromCookies = () => {
  return cookies().delete(USERNAME_COOKIE_KEY);
};
