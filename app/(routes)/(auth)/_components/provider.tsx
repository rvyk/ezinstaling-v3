"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Providers = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isPending, setIsPending] = useState({
    github: false,
    discord: false,
  });

  const onClick = (
    e: React.MouseEvent<HTMLElement>,
    provider: "github" | "discord",
  ) => {
    e.preventDefault();
    setIsPending((prevState) => ({
      ...prevState,
      [provider]: true,
    }));
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-fit items-center justify-center">
      <Button
        type="button"
        size="icon"
        className="mx-2"
        onClick={(e) => onClick(e, "github")}
        disabled={isPending.github}
      >
        {isPending.github ? (
          <UpdateIcon className="animate-spin" />
        ) : (
          <GitHubLogoIcon className="h-6 w-6" />
        )}
      </Button>
      <Button
        type="button"
        size="icon"
        className="mx-2"
        onClick={(e) => onClick(e, "discord")}
        // TODO: disabled={isPending.discord}
        disabled={true}
      >
        {isPending.discord ? (
          <UpdateIcon className="animate-spin" />
        ) : (
          <DiscordLogoIcon className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default Providers;
