import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import classNames from "classnames";

import { Input } from "@/app/ui/forms/input/input";

import { measureTime } from "@/app/lib/helpers/date";
import { ALLOWED_KEYS, scrollToActiveElement } from "../lib/helpers";

import type { CursorProps, StoryProps, WordListProps } from "../page";

type GameProps = {
  cursor: CursorProps;
  wordList: WordListProps[];
  typoList: CursorProps[];
  story: StoryProps | null;
  setCursor: Dispatch<SetStateAction<CursorProps>>;
  setTypoList: Dispatch<SetStateAction<CursorProps[]>>;
  setTypingTime: Dispatch<SetStateAction<number>>;
};

export const Game = ({
  cursor,
  wordList,
  typoList,
  setCursor,
  setTypoList,
  setTypingTime,
  story,
}: GameProps) => {
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToPreviousLine = () =>
    cursor.letterIndex === 0 &&
    scrollToActiveElement(
      letterContainerRef.current?.children[cursor.wordIndex - 1],
      letterContainerRef.current?.children[cursor.wordIndex]
    );

  const scrollToNextLine = () =>
    wordList[cursor.wordIndex].letters.length - 1 === cursor.letterIndex &&
    scrollToActiveElement(
      letterContainerRef.current?.children[cursor.wordIndex + 1],
      letterContainerRef.current?.children[cursor.wordIndex]
    );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        event.key === "Backspace" &&
        ((cursor.wordIndex >= 0 && cursor.letterIndex > 0) ||
          cursor.wordIndex > 0)
      ) {
        scrollToPreviousLine();
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

        return setTypoList(adjustedTypoList);
      }

      if (ALLOWED_KEYS.includes(event.code)) {
        scrollToNextLine();

        const isStartingTimeCounting =
          cursor.wordIndex === 0 &&
          cursor.letterIndex === 0;

        const isTypo =
          event.key !==
          wordList[cursor.wordIndex].letters[cursor.letterIndex].letter;

        if (isStartingTimeCounting) {
          setTypingTime(measureTime());
        }

        if (isTypo) {
          setTypoList((typoList) => [
            ...typoList,
            { wordIndex: cursor.wordIndex, letterIndex: cursor.letterIndex },
          ]);
        }

        setCursor(({ wordIndex, letterIndex }) => {
          const isNextWord =
            wordList[wordIndex].letters.length <= letterIndex + 1;

          return isNextWord
            ? {
                wordIndex: wordIndex + 1,
                letterIndex: 0,
              }
            : {
                wordIndex: wordIndex,
                letterIndex: letterIndex + 1,
              };
        });
      }
    },
    [story?.content, wordList, cursor]
  );

  //TODO: do we need story.content?

  return (
    <div className="h-full">
      <div className="p-8 text-2xl max-w-7xl m-auto h-full flex">
        <div className="h-3/6 relative overflow-hidden m-auto">
          <div ref={letterContainerRef}>
            {wordList.map(({ letters, wordIndex, word }) => (
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
};
