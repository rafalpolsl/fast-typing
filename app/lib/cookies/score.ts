import { TEXT_OPTIONS } from "@/app/(pages)/(authenticated)/typing/lib/helpers";
import { USER_STATISTICS_LOCAL_STORAGE_KEY } from "./keys";

export type ScoreProps = {
  date: string;
  wordPerMinute: number;
  time: number;
  storyLength: number;
  typoCount: number;
  difficulty: TEXT_OPTIONS;
};

/**
 * Get user scores
 *
 * @returns {ScoreProps[]} - get user scores saved in localStorage
 */
export const getScores = (): ScoreProps[] => {
  const score =
    typeof window !== "undefined"
      ? localStorage.getItem(USER_STATISTICS_LOCAL_STORAGE_KEY) || ""
      : null;

  if (typeof score === "string" && score) {
    return JSON.parse(score);
  } else {
    return [];
  }
};

/**
 * Add new score to existing scores
 * 
 * @param {ScoreProps} scoreToAdd - new score that is going to be saved 
 */
export const updateScores = (scoreToAdd: ScoreProps) => {
  const previousScores = getScores()
  
  localStorage.setItem(
    USER_STATISTICS_LOCAL_STORAGE_KEY,
    JSON.stringify([ ...previousScores, scoreToAdd ])
  );
};

/**
 * Remove all records from localStorage
 */
export const removeScores = () => localStorage.clear()
