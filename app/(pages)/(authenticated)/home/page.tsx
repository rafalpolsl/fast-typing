import { ROUTES } from "@/app/lib/routes";
import { Cta } from "@/app/ui/cta/cta";
import {Chart} from './components/chart'



export default function Home() {
  return (
    <div className="h-full flex gap-4 justify-center items-center flex-col">
      <div className="bg-prime_800 p-4 rounded-md shadow-border_1 h-[250px] w-[500px]">
        <Chart />
      </div>
      <div className="flex flex-col text-center gap-4">
        <Cta as={"a"} href={ROUTES.typing}>
          Typing test
        </Cta>
      </div>
    </div>
  );
}
