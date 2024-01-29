import { Cta } from "@/app/ui/cta/cta";
import { TEXT_OPTIONS } from "../lib/helpers";
import { getRandomStory } from "../lib/game";
import { StoryProps } from "../page";

type MenuOptionsProps = {
  setStory: (story: StoryProps) => void;
};

export const MenuOptions = ({ setStory }: MenuOptionsProps) => {
  const handlePickStory = (option: TEXT_OPTIONS) => {
    const story = getRandomStory(option);
    setStory(story);
  };

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
};
