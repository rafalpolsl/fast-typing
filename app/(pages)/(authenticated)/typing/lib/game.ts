import localStories from "../mock/local-stories.json";
import { TEXT_OPTIONS } from "./helpers";

type GetRandomStoryResults = {
  title: string;
  content: string;
};

/**
 * Get a random number between two given numbers.
 *
 * @param {number} min - The minimum number.
 * @param {number} max - The maximum number.
 * @returns {number} - The random number between min and max.
 */
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get a random story based on chosen difficulty 
 *
 * @param {TEXT_OPTIONS} option - The story difficulty.
 * @returns {number} - The story based on given difficulty.
 */
export const getRandomStory = (
  option: TEXT_OPTIONS
): GetRandomStoryResults => {
  const stories = localStories.range[option];
  const randomStoryIndex = getRandomInt(0, stories.length - 1);

  return stories[randomStoryIndex];
};
