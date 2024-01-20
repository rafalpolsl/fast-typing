import { ROUTES } from "@/app/lib/routes";
import { Cta } from "@/app/ui/cta/cta";

export default function Home() {
  
  
  return (
    <div className="min-h-screen flex gap-4 justify-center items-center">
      <div className="flex flex-col text-center gap-4">
        <Cta as={"a"} href={ROUTES.typing}>
          Typing test
        </Cta>
      </div>
      <div>
        chart 
      </div>
    </div>
  );
}
