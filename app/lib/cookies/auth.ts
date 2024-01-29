"use server";
import { cookies } from "next/headers";
import { USERNAME_COOKIE_KEY } from "./keys";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Create user with provided username
 * 
 * @param {string} username - provided username
 * @returns {void} - create a new user and set the filed expiration for a year
 */

export const addUsernameToCookies = (username: string) => {
  cookies().set(USERNAME_COOKIE_KEY, username, {
    expires: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 365), //year
  });
};

/**
 * Get username from cookies
 *
 * @returns {RequestCookie} - the value and key which contain username data.
 */
export const getUsernameFromCookies = async (): Promise<
  RequestCookie | undefined
> => {
  return await cookies().get(USERNAME_COOKIE_KEY);
};


/**
 * Remove username from cookies
 *
 * @returns {RequestCookie} - removes username key and assigned value from cookies.
 */
export const removeUsernameFromCookies = () => {
  return cookies().delete(USERNAME_COOKIE_KEY);
};
