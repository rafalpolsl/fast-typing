"use client";

import { useRouter } from "next/navigation";
import { Dropdown, DropdownItemProps } from "../dropdown/dropdown";
import { ROUTES } from "@/app/lib/routes";

export const Navigation = () => {
  const router = useRouter();

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
        router.replace(ROUTES.index);
      },
    },
  ];

  return (
    <nav className="flex p-3 fixed w-full">
      <div className="flex-0">LOGO</div>
      <Dropdown items={menuItems} className={"ml-auto"} />
    </nav>
  );
};
