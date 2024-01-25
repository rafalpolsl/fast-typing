import { getUsernameFromCookies } from "@/app/lib/cookies/auth";
import { ROUTES } from "@/app/lib/routes";
import { RedirectType, redirect } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {
  const isUserLoggedIn = getUsernameFromCookies();

  if (!isUserLoggedIn) {
    redirect(ROUTES.index, RedirectType.replace);
  }

  return children;
}
