import { Cta } from "@/app/ui/cta/cta";
import type { ResultProps } from "../page";

interface TypingResultsProps {
  results: ResultProps;
  setDefaultValues: () => void;
}

export const TypingResults = ({
  results,
  setDefaultValues,
}: TypingResultsProps) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 bg-prime_800 p-6 w-full max-w-lg rounded-md shadow-border_1">
        <h2>Results</h2>
        <p>Time: {results.time.toFixed(2)} s</p>
        <p>WPM: {results.wordPerMinute.toFixed(2)}</p>
        <p>Accuracy: {results.accuracyPercentage.toFixed(0)}%</p>
        <Cta onClick={setDefaultValues}>Play again</Cta>
      </div>
    </div>
  );
};
