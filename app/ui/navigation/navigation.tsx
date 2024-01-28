"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Cta } from "../cta/cta";
import { Dropdown, DropdownItemProps } from "../dropdown/dropdown";

import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { authActions, selectIsLoggedIn } from "@/app/lib/redux/slices/auth";
import { ROUTES } from "@/app/lib/routes";
import { removeUsernameFromCookies } from "@/app/lib/cookies/auth";
import { removeScores } from "@/app/lib/cookies/score";

export const Navigation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const menuItems: DropdownItemProps[] = [
    {
      id: "typing-test",
      label: "Typing test",
      onClick: () => {
        router.push(ROUTES.typing);
      },
    },
    {
      id: "settings",
      label: "Settings",
      onClick: () => {
        router.push(ROUTES.settings);
      },
    },
    {
      id: "logout",
      label: "Logout",
      onClick: () => {
        removeUsernameFromCookies();
        removeScores();

        dispatch(authActions.logout());
        router.replace(ROUTES.index);
      },
    },
  ];

  return (
    <nav className="flex px-5 py-3 fixed w-full justify-between">
      <div className="flex-0">
        <Link
          href={isLoggedIn ? ROUTES.home : ROUTES.index}
          className="hover:text-prime_300"
        >
          LOGO
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <Dropdown items={menuItems} />
        ) : (
          <Cta as={"a"} href={ROUTES.login} variant={"link"}>
            Log in
          </Cta>
        )}
      </div>
    </nav>
  );
};
