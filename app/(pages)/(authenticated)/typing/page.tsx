"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Cta } from "@/app/ui/cta/cta";
import { Input } from "@/app/ui/forms/input/input";

import { getRandomStory } from "./lib/game";
import { ALLOWED_KEYS, TEXT_LENGTH_OPTIONS } from "./lib/helpers";

export type StoryProps = {
  title: string;
  content: string;
};

type ResultProps = {
  wordPerMinute: number;
  accuracyPercentage: number;
  time: number;
};

type TypoProps = {
  index: number;
  letter: string;
  time: string;
};

export default function Typing() {
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [story, setStory] = useState<StoryProps | null>(null);
  const [letterIndex, setLetterIndex] = useState(0);
  const [typoList, setTypoList] = useState<TypoProps[]>([]);
  const [startTypingTime, setTypingTime] = useState<number>(0);

  const [results, setResults] = useState<ResultProps | null>(null);

  const handlePickStory = (option: (typeof TEXT_LENGTH_OPTIONS)[number]) => {
    const story = getRandomStory(option);
    setStory(story);
  };

  const setDefaultValues = () => {
    setResults(null);
    setLetterIndex(0);
    setTypoList([]);
  };

  const measureTime = () => new Date().getTime();

  const scrollToActiveElement = (
    elem1?: HTMLSpanElement,
    elem2?: HTMLSpanElement
  ) => {
    if (elem1?.offsetTop !== elem2?.offsetTop) {
      elem1?.scrollIntoView();
    }
  };
  const scrollToPreviousLine = () =>
    scrollToActiveElement(
      letterContainerRef.current?.children[letterIndex - 1] as HTMLSpanElement,
      letterContainerRef.current?.children[letterIndex] as HTMLSpanElement
    );
  const scrollToNextLine = () =>
    scrollToActiveElement(
      letterContainerRef.current?.children[letterIndex + 1] as HTMLSpanElement,
      letterContainerRef.current?.children[letterIndex] as HTMLSpanElement
    );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Backspace" && letterIndex > 0) {
        const typosAfterBackspaceUpdate = typoList.filter(
          ({ index }) => index < letterIndex - 1
        );

        setLetterIndex((prev) => prev - 1);
        scrollToPreviousLine();

        return setTypoList(typosAfterBackspaceUpdate);
      }

      if (ALLOWED_KEYS.includes(event.code)) {
        if (letterIndex === 0) {
          setTypingTime(measureTime);
        }

        setLetterIndex((prev) => prev + 1);
        scrollToNextLine();

        if (event.key === story?.content.charAt(letterIndex)) {
          // console.log("true");
        } else {
          setTypoList((prev) => [
            ...prev,
            { index: letterIndex, letter: event.key, time: "" },
          ]);
        }
      }
    },
    [letterIndex, story?.content]
  );

  useEffect(() => {
    if (letterIndex === story?.content.length) {
      const storyWords = story?.content.split(" ");

      // const errorWords = storyWords.filter((word, wordIndex) =>
      //   word
      //     .split("")
      //     .some((letter, letterIndex) =>
      //       typoList.find(({ index }) => index === wordIndex + letterIndex)
      //     )
      // );

      const storySpaceIndexes = story.content
        .split("")
        .map((letter, index) => letter === " " && index)
        .filter((letter) => letter);

      // const errorWords = typoList.map((typo) => {
      //   const spaces = storySpaceIndexes.reduce((prev,curr) => ({
      //     indexStart: prev,
      //     indexEnd: 
      //     isReserved: false,
      //   }));

      //   spaces.find(() => typo.index <  );
      // });

      // console.log(storySpaceIndexes, errorWords);

      const endTypingTime = measureTime();
      const timeTakenInSeconds = (endTypingTime - startTypingTime) / 1000;
      const timeTakenInMinutes = timeTakenInSeconds / 60;

      setResults({
        accuracyPercentage:
          100 - (typoList.length / story.content.length) * 100,
        time: timeTakenInSeconds,
        wordPerMinute:
          (storyWords.length - typoList.length) / timeTakenInMinutes,
      });
    }
  }, [letterIndex]);

  if (results) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 bg-prime_800 p-6 w-full max-w-lg rounded-md shadow-border_1">
          <h2>Results</h2>
          <p>Time: {results.time.toFixed(2)} s</p>
          <p>WPM: {results.wordPerMinute.toFixed(2)}</p>
          <p>Accuracy: {results.accuracyPercentage.toFixed(0)}%</p>

          <Cta onClick={setDefaultValues}>Play again</Cta>
        </div>
      </div>
    );
  }

  if (story === null) {
    return (
      <div className="p-8 min-h-screen flex flex-col gap-2 justify-center items-center">
        <p>Pick difficulty:</p>
        <span className="flex gap-3">
          {TEXT_LENGTH_OPTIONS.map((option) => (
            <Cta
              key={option}
              onClick={() => handlePickStory(option)}
              className="capitalize"
            >
              {option}
            </Cta>
          ))}
        </span>
      </div>
    );
  }

  const storyLetters = [...story.content.replaceAll(" ", "\u2002").split("")];

  return (
    <div className="h-screen">
      <div className="p-8 text-2xl max-w-7xl m-auto h-full flex">
        <div className="h-3/6 relative overflow-hidden m-auto">
          <div ref={letterContainerRef}>
            {storyLetters.map((letter, index) => (
              <span
                key={`letter-${index}`}
                id={`letter-${index}`}
                className={classNames("px-0.5", {
                  "bg-[gray]": letterIndex === index,
                  "bg-[green]": letterIndex > index,
                  "bg-[red]": typoList.find(
                    ({ index: typoIndex }) => typoIndex === index
                  ),
                })}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed">
        <Input
          innerRef={inputRef}
          className={"opacity-0 cursor-default"}
          onBlur={() => inputRef.current?.focus()}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </div>
    </div>
  );
}
