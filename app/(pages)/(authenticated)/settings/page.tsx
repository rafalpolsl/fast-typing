import {
  ChangeUsernameForm,
  RemoveScoreButton,
} from "./components/settings-forms";
import { getUsernameFromCookies } from "@/app/lib/cookies/auth";

const Settings = async () => {
  const username = await getUsernameFromCookies();

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 p-4 w-fit">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Change nickname</label>
          <ChangeUsernameForm username={username?.value || ""} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="score">Reset scores</label>
          <RemoveScoreButton />
        </div>
      </div>
    </div>
  );
};

export default Settings;
