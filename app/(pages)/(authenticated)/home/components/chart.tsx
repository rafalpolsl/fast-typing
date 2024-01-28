"use client";
import { useEffect, useState, useMemo } from "react";
import { ScoreProps, getScores } from "@/app/lib/cookies/score";
import { transformDate } from "@/app/lib/helpers/date";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartType,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Your 10 Latest Scores",
    },
    tooltip: {
      callbacks: {
        afterBody: (context: Array<TooltipItem<ChartType>>) => {
          const labelId = context[0].parsed?.x;
          const score = context[0].dataset.data[labelId] as unknown as ScoreProps;

          return `Typo count: ${score.typoCount} \nTime: ${
            score.time
          }s \nDifficulty: ${score.difficulty.toUpperCase()} \nStory length: ${
            score.storyLength
          } \nDate: ${transformDate(score.date, "YYYY-MM-DD")}`;
        },
      },
    },
  },
};

const MAX_CHART_LABELS = 10;

export const Chart = () => {
  const [scores, setScores] = useState<ScoreProps[]>([]);

  const data = useMemo(
    () => ({
      labels: Array(Math.min(scores.length, MAX_CHART_LABELS)).fill(""),
      datasets: [
        {
          label: "WPM",
          data: scores,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          parsing: {
            xAxisKey: "wpm",
            yAxisKey: "wpm",
          },
        },
      ],
    }),
    [scores]
  );

  useEffect(() => {
    setScores(getScores() || []);
  }, []);

  return scores.length ? (
    <Line options={options} data={data} suppressHydrationWarning />
  ) : (
    <p className="text-prime_500 h-full flex justify-center items-center">
      No results
    </p>
  );
};
