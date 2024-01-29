"use client";

import { useEffect, useState } from "react";

import { TypingResults } from "./components/results";
import { MenuOptions } from "./components/menu-options";
import { Game } from "./components/game";

import { TEXT_OPTIONS } from "./lib/helpers";
import { updateScores } from "@/app/lib/cookies/score";
import { measureTime } from "@/app/lib/helpers/date";

export type StoryProps = {
  title: string;
  content: string;
};

export type ResultDashboardProps = {
  wordPerMinute: number;
  accuracyPercentage: number;
  time: number;
};

export type WordListProps = {
  wordIndex: number;
  word: string;
  letters: LetterProps[];
};

export type CursorProps = {
  wordIndex: number;
  letterIndex: number;
};

type LetterProps = {
  letterIndex: number;
  letter: string;
};

export default function Typing() {
  const [story, setStory] = useState<StoryProps | null>(null);
  const [wordList, setWordList] = useState<WordListProps[]>([]);
  const [typoList, setTypoList] = useState<CursorProps[]>([]);
  const [cursor, setCursor] = useState<CursorProps>({
    wordIndex: 0,
    letterIndex: 0,
  });
  const [typingTime, setTypingTime] = useState<number>(0);
  const [resultDashboard, setResultDashboard] =
    useState<ResultDashboardProps | null>(null);

  /**
   * Set initial data
   */
  const setDefaultValues = () => {
    setResultDashboard(null);
    setWordList([]);
    setTypoList([]);
    setCursor({
      wordIndex: 0,
      letterIndex: 0,
    });
    setTypingTime(0);
  };

  useEffect(() => {
    if (!story) {
      return;
    }

    const storyWords = story.content
      .split(" ")
      .flatMap((value, index, array) =>
        array.length - 1 !== index ? [value, " "] : value
      );

    const initialValues: WordListProps[] = storyWords.map(
      (word, wordIndex) => ({
        wordIndex: wordIndex,
        word,
        letters: word.split("").map((letter, letterIndex) => ({
          letterIndex,
          letter,
        })),
      })
    );

    setWordList(initialValues);
  }, [story, resultDashboard]);

  useEffect(() => {
    const isGameOver =
      cursor.wordIndex === wordList.length && cursor.wordIndex !== 0;

    if (isGameOver) {
      const endTypingTime = measureTime();
      const timeTakenInSeconds = (endTypingTime - typingTime) / 1000;
      const timeTakenInMinutes = timeTakenInSeconds / 60;

      const uniqueTypos = typoList.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (doubledWord) => doubledWord.wordIndex === value.wordIndex
          )
      );

      const wordsWithoutSpaces = wordList.filter(({ word }) => word === " ");

      const gameResults = {
        date: new Date().toISOString(),
        difficulty: TEXT_OPTIONS.BRIEF,
        storyLength: wordList.length,
        time: timeTakenInSeconds,
        typoCount: uniqueTypos.length,
        wordPerMinute: Math.round(
          (wordsWithoutSpaces.length - uniqueTypos.length) / timeTakenInMinutes
        ),
        accuracyPercentage: 100 - (uniqueTypos.length / wordList.length) * 100,
      };

      updateScores(gameResults);
      setResultDashboard({
        accuracyPercentage: gameResults.accuracyPercentage,
        time: gameResults.time,
        wordPerMinute: gameResults.wordPerMinute,
      });
    }
  }, [cursor]);

  if (resultDashboard) {
    return (
      <TypingResults
        results={resultDashboard}
        setDefaultValues={setDefaultValues}
      />
    );
  }

  if (story === null) {
    return <MenuOptions setStory={setStory} />;
  }

  return (
    <Game
      cursor={cursor}
      wordList={wordList}
      story={story}
      typoList={typoList}
      setCursor={setCursor}
      setTypingTime={setTypingTime}
      setTypoList={setTypoList}
    />
  );
}
