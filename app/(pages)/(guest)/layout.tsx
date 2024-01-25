import { redirect } from "next/navigation";

import { getUsernameFromCookies } from "@/app/lib/cookies/auth";
import { ROUTES } from "@/app/lib/routes";

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default async function GuestLayout({ children }: GuestLayoutProps) {
  const isLoggedIn = await getUsernameFromCookies();
  
  if (isLoggedIn) {
    redirect(ROUTES.home)
  }
  
  return <>{children}</>
}
