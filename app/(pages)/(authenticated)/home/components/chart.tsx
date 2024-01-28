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
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartType,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
          const score = context[0].dataset.data[
            labelId
          ] as unknown as ScoreProps;

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

export const TenLatestScoresChart = () => {
  const [scores, setScores] = useState<ScoreProps[]>([]);

  const data = useMemo(
    () => ({
      labels: Array(Math.min(scores.length, MAX_CHART_LABELS)).fill(""),
      datasets: [
        {
          label: "WPM",
          data: scores.slice(-MAX_CHART_LABELS),
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

export const FiveTopScoresChart = () => {
  const [scores, setScores] = useState<Array<ScoreProps & { sortPosition: number }>>(
    []
  );

  const data = useMemo(
    () => ({
      labels: Array(Math.min(scores.length, 5)).fill(""),
      datasets: [
        {
          label: "WPM",
          data: scores.slice(-5),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          parsing: {
            xAxisKey: "wpm",
            yAxisKey: "sortPosition",
          },
        },
      ],
    }),
    [scores]
  );

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Your Top 5 Scores",
      },
      tooltip: {
        callbacks: {
          afterBody: (context: Array<TooltipItem<ChartType>>) => {
            const labelId = context[0].parsed?.y;
            const score = context[0].dataset.data[
              labelId
            ] as unknown as ScoreProps;
  
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

  useEffect(() => {
    const scores = getScores() || [];
    scores.sort((a, b) => b.wpm - a.wpm);

    const topResults = scores.slice(0, 5).map((score, index) => ({...score, sortPosition: index }));

    setScores(topResults);
  }, []);

  return scores.length ? (
    <Bar options={options} data={data} suppressHydrationWarning />
  ) : (
    <p className="text-prime_500 h-full flex justify-center items-center">
      No results
    </p>
  );
};
