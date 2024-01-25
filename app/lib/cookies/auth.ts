"use server";
import { cookies } from "next/headers";
import { USERNAME_COOKIE_KEY, USER_STATISTICS_LOCAL_STORAGE_KEY } from "./keys";
import { TEXT_OPTIONS } from "@/app/(pages)/(authenticated)/typing/lib/helpers";

export type ScoreProps = {
  wpm: number;
  time: number;
  textLength: number;
  typosAmount: number;
  difficulty: TEXT_OPTIONS;
};

export const updateScores = (scores: ScoreProps[]) =>
  localStorage.setItem(
    USER_STATISTICS_LOCAL_STORAGE_KEY,
    JSON.stringify(scores)
  );

export const getScores = () =>
  localStorage.getItem(USER_STATISTICS_LOCAL_STORAGE_KEY);

export const addUsernameToCookies = async (username: string) => {
  return cookies().set(USERNAME_COOKIE_KEY, username, {
    expires: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 365), //year
  });
};

export const getUsernameFromCookies = async () => {
  return cookies().get(USERNAME_COOKIE_KEY);
};

export const removeUsernameFromCookies = async () => {
  return cookies().delete(USERNAME_COOKIE_KEY);
};
