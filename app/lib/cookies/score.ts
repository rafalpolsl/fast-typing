import {
  USERNAME_LOCAL_STORAGE_KEY,
  USER_STATISTICS_LOCAL_STORAGE_KEY,
} from "./keys";

type ScoreProps = {
  score: {
    wpm: number;
    typosAmount: number;
  };
};
export const getUsernameFromLocalhost = () => {
  return localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY);
};

export const updateUsername = (value) => {
  localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, JSON.stringify(value));
};

export const updateLatestScores = (value) => {
  localStorage.setItem(
    USER_STATISTICS_LOCAL_STORAGE_KEY,
    JSON.stringify(value)
  );
};

export const updateTopScore = (value) => {
  localStorage.setItem(
    USER_STATISTICS_LOCAL_STORAGE_KEY,
    JSON.stringify(value)
  );
};
