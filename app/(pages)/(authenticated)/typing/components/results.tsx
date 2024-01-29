import { Cta } from "@/app/ui/cta/cta";
import { ROUTES } from "@/app/lib/routes";
import type { ResultDashboardProps } from "../page";

interface TypingResultsProps {
  results: ResultDashboardProps;
  setDefaultValues: () => void;
}

export const TypingResults = ({
  results,
  setDefaultValues,
}: TypingResultsProps) => (
  <div className="h-full flex justify-center items-center">
    <div className="flex flex-col gap-4 bg-prime_800 p-6 w-full max-w-lg rounded-md shadow-border_1">
      <h2>Results</h2>
      <p>Time: {results.time.toFixed(2)} s</p>
      <p>WPM: {results.wordPerMinute.toFixed(2)}</p>
      <p>Accuracy: {results.accuracyPercentage.toFixed(0)}%</p>
      <div className="flex gap-3 flex-col md:flex-row w-full">
        <Cta onClick={setDefaultValues} className="w-full">
          Play again
        </Cta>
        <Cta
          as={"a"}
          href={ROUTES.home}
          variant={"secondary"}
          className="w-full"
        >
          Home
        </Cta>
      </div>
    </div>
  </div>
);
