"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Cta } from "@/app/ui/cta/cta";
import { Input } from "@/app/ui/forms/input/input";
import { TypingResults } from "./components/results";

import { getRandomStory } from "./lib/game";
import { ALLOWED_KEYS, TEXT_OPTIONS } from "./lib/helpers";
import { updateScores } from "@/app/lib/cookies/score";

export type StoryProps = {
  title: string;
  content: string;
};

export type ResultProps = {
  wordPerMinute: number;
  accuracyPercentage: number;
  time: number;
};

type LetterProps = {
  letterIndex: number;
  letter: string;
};

type WordListProps = {
  wordIndex: number;
  word: string;
  letters: LetterProps[];
};

type CursorProps = {
  wordIndex: number;
  letterIndex: number;
};

export default function Typing() {
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [story, setStory] = useState<StoryProps | null>(null);
  const [wordList, setWordList] = useState<WordListProps[]>([]);
  const [typoList, setTypoList] = useState<CursorProps[]>([]);
  const [cursor, setCursor] = useState<CursorProps>({
    wordIndex: 0,
    letterIndex: 0,
  });
  const [startTypingTime, setTypingTime] = useState<number>(0);

  const [results, setResults] = useState<ResultProps | null>(null);

  const handlePickStory = (option: TEXT_OPTIONS) => {
    const story = getRandomStory(option);
    setStory(story);
  };

  const setDefaultValues = () => {
    setResults(null);
    setWordList([]);
    setTypoList([]);
    setCursor({
      wordIndex: 0,
      letterIndex: 0,
    });
    setTypingTime(0);
  };

  const measureTime = () => new Date().getTime();

  const scrollToActiveElement = (
    observedElement?: HTMLSpanElement,
    rootElement?: HTMLSpanElement
  ) => {
    if (observedElement?.offsetTop !== rootElement?.offsetTop) {
      return observedElement?.scrollIntoView();
    }
  };

  const scrollToPreviousLine = () =>
    cursor.letterIndex === 0 &&
    scrollToActiveElement(
      letterContainerRef.current?.children[
        cursor.wordIndex - 1
      ] as HTMLSpanElement,
      letterContainerRef.current?.children[cursor.wordIndex] as HTMLSpanElement
    );
  const scrollToNextLine = () =>
    wordList[cursor.wordIndex].letters.length - 1 === cursor.letterIndex &&
    scrollToActiveElement(
      letterContainerRef.current?.children[
        cursor.wordIndex + 1
      ] as HTMLSpanElement,
      letterContainerRef.current?.children[cursor.wordIndex] as HTMLSpanElement
    );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        event.key === "Backspace" &&
        ((cursor.wordIndex >= 0 && cursor.letterIndex > 0) ||
          cursor.wordIndex > 0)
      ) {
        const isPreviousWord = 0 > cursor.letterIndex - 1;
        const reverseCursor = {
          wordIndex: isPreviousWord
            ? Math.max(0, cursor.wordIndex - 1)
            : cursor.wordIndex,
          letterIndex: isPreviousWord
            ? wordList[cursor.wordIndex - 1].letters.length - 1
            : cursor.letterIndex - 1,
        };

        setCursor(reverseCursor);

        const adjustedTypoList = typoList.filter(
          ({ letterIndex, wordIndex }) =>
            (wordIndex <= reverseCursor.wordIndex &&
              letterIndex <= reverseCursor.letterIndex - 1) ||
            wordIndex < reverseCursor.wordIndex
        );

        scrollToPreviousLine();

        return setTypoList(adjustedTypoList);
      }

      if (ALLOWED_KEYS.includes(event.code)) {
        //TODO: add handler to prevent updating measuring time on coming back to the initial state
        if (cursor.wordIndex === 0 && cursor.letterIndex === 0) {
          setTypingTime(measureTime);
        }

        scrollToNextLine();

        if (
          event.key !==
          wordList[cursor.wordIndex].letters[cursor.letterIndex].letter
        ) {
          setTypoList((typoList) => [
            ...typoList,
            { wordIndex: cursor.wordIndex, letterIndex: cursor.letterIndex },
          ]);
        }

        setCursor(({ wordIndex, letterIndex }) => {
          const isNextWord =
            wordList[wordIndex].letters.length <= letterIndex + 1;

          return {
            wordIndex: isNextWord ? wordIndex + 1 : wordIndex,
            letterIndex: isNextWord ? 0 : letterIndex + 1,
          };
        });
      }
    },
    [story?.content, wordList, cursor]
  );

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
  }, [story, results]);

  useEffect(() => {
    if (cursor.wordIndex === wordList.length && cursor.wordIndex !== 0) {
      const endTypingTime = measureTime();
      const timeTakenInSeconds = (endTypingTime - startTypingTime) / 1000;
      const timeTakenInMinutes = timeTakenInSeconds / 60;

      const wordTypoList = typoList.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (doubledWord) => doubledWord.wordIndex === value.wordIndex
          )
      );

      updateScores({
        date: new Date().toISOString(),
        difficulty: TEXT_OPTIONS.BRIEF,
        storyLength: wordList.length,
        time: timeTakenInSeconds,
        typoCount: wordTypoList.length,
        wpm: Math.round(
          (wordList.length - wordTypoList.length) / timeTakenInMinutes
        ),
      });

      setResults({
        accuracyPercentage: 100 - (wordTypoList.length / wordList.length) * 100,
        time: timeTakenInSeconds,
        wordPerMinute: Math.round(
          (wordList.length - wordTypoList.length) / timeTakenInMinutes
        ),
      });
    }
  }, [cursor]);

  if (results) {
    return (
      <TypingResults results={results} setDefaultValues={setDefaultValues} />
    );
  }

  if (story === null) {
    return (
      <div className="p-8 min-h-full flex flex-col gap-2 justify-center items-center">
        <p>Pick difficulty:</p>
        <span className="flex gap-3">
          {[TEXT_OPTIONS.BRIEF, TEXT_OPTIONS.NORMAL, TEXT_OPTIONS.LONG].map(
            (option) => (
              <Cta
                key={option}
                onClick={() => handlePickStory(option)}
                className="capitalize"
              >
                {option}
              </Cta>
            )
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="p-8 text-2xl max-w-7xl m-auto h-full flex">
        <div className="h-3/6 relative overflow-hidden m-auto">
          <div ref={letterContainerRef}>
            {wordList.map(({ letters, wordIndex, word }, index) => (
              <div key={wordIndex} className="inline-block">
                {letters.map(({ letter, letterIndex }) => (
                  <span
                    key={`${word}-${letterIndex}`}
                    id={`${word}-${letterIndex}`}
                    className={classNames("px-0.5", {
                      "bg-[gray]":
                        letterIndex === cursor.letterIndex &&
                        wordIndex === cursor.wordIndex,
                      "bg-[green]":
                        (letterIndex < cursor.letterIndex &&
                          wordIndex <= cursor.wordIndex) ||
                        wordIndex < cursor.wordIndex,
                      "bg-[red]": typoList.find(
                        (typoPosition) =>
                          typoPosition.wordIndex === wordIndex &&
                          typoPosition.letterIndex === letterIndex
                      ),
                    })}
                  >
                    {letter === " " ? "\u2002" : letter}
                  </span>
                ))}
              </div>
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
