import { ROUTES } from "@/app/lib/routes";
import { Cta } from "@/app/ui/cta/cta";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Cta as={"a"} href={ROUTES.typing}>
        Typing test
      </Cta>
    </div>
  );
}
