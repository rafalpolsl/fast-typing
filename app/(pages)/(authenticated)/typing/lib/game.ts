import localStories from "../mock/local-stories.json";
import { TEXT_OPTIONS } from "./helpers";

type GetRandomStoryResults = {
  title: string;
  content: string;
};

// TODO: move it to common folder or somewhere else :P
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomStory = (
  option: TEXT_OPTIONS
): GetRandomStoryResults => {
  const stories = localStories.range[option];
  const randomStoryIndex = getRandomInt(0, stories.length - 1);

  return stories[randomStoryIndex];
};
