import { Cta } from "../ui/cta/cta";
import { ROUTES } from "../lib/routes";

export default function Home() {
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
