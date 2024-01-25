import { RedirectType, redirect } from "next/navigation";
import { Cta } from "../ui/cta/cta";

import { getUsernameFromCookies } from "../lib/cookies/auth";
import { ROUTES } from "../lib/routes";

export default async function Home() {
  
  const username = await getUsernameFromCookies()
  if (username) {
    redirect(ROUTES.typing, RedirectType.replace);
  }

  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex gap-4">
        <Cta as={"a"} href={ROUTES.login}>
          Log in
        </Cta>
      </div>
    </main>
  );
}
