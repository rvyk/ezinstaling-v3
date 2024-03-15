import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { lastActions } from "@/types/user-data";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  MinusCircledIcon,
} from "@radix-ui/react-icons";

export const LastActions = ({
  lastActions,
}: {
  lastActions: lastActions[];
}) => {
  const avatarStyles = {
    low: {
      style: "border-green-500 !bg-green-100 text-green-800",
      icon: <MinusCircledIcon />,
    },
    medium: {
      style: "border-yellow-500 !bg-yellow-100 text-yellow-800",
      icon: <InfoCircledIcon />,
    },
    high: {
      style: "border-red-500 !bg-red-100 text-red-800",
      icon: <ExclamationTriangleIcon />,
    },
  };
  return (
    <div className="space-y-8">
      {!!lastActions?.length ? (
        lastActions.slice(0, 5).map((action, index) => (
          <div className="flex items-center" key={index}>
            <Avatar
              className={cn(
                "flex h-9 w-9 items-center justify-center space-y-0 border",
                avatarStyles[action.priority].style,
              )}
            >
              <AvatarFallback className={avatarStyles[action.priority].style}>
                {avatarStyles[action.priority].icon}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {action.action}
              </p>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
            <div className="ml-auto flex flex-col justify-end text-right text-sm font-medium opacity-80">
              <p>{new Date(action.timestamp).toLocaleDateString("en-GB")}</p>
              <p>{new Date(action.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-8 flex w-full items-center justify-center lg:mt-32">
          <p className="text-center text-sm font-medium">
            Brak ostatnich działań w dzienniku zdarzeń 😔
          </p>
        </div>
      )}
    </div>
  );
};
