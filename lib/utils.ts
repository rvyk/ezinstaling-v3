import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  MinusCircledIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const verifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const checkCaptcha = async (captcha: string) => {
  const res = await axios.post(
    verifyEndpoint,
    `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY as string)}&response=${encodeURIComponent(captcha)}`,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  if (!res.data.success) {
    return false;
  }

  return true;
};

export const convertUnixTime = (time: string) => {
  const unixTime = new Date(time).getTime();
  const currentTime = Math.floor(Date.now());
  const difference = currentTime - unixTime;

  const minute = 60000;
  const hour = minute * 60;
  const day = hour * 24;
  const twoDays = day * 2;
  const fiveDays = day * 5;

  if (difference < hour) {
    const minutes = Math.floor(difference / minute);
    return minutes > 1
      ? `${minutes} ${minutes < 5 ? "minuty" : "minut"} temu`
      : "Właśnie teraz";
  } else if (difference < day) {
    const hours = Math.floor(difference / hour);
    return hours > 1
      ? `${hours} ${hours <= 5 ? "godziny" : "godzin"} temu`
      : "Godzinę temu";
  } else if (difference < twoDays) {
    return "Wczoraj";
  } else if (difference <= fiveDays) {
    const days = Math.floor(difference / day);
    return `${days} dni temu`;
  } else {
    const date = new Date(unixTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
};

export const priorities = [
  {
    label: "Niski",
    value: "low",
    style: "border-green-500 !bg-green-100 text-green-800",
    icon: MinusCircledIcon,
  },
  {
    label: "Średni",
    value: "medium",
    style: "border-yellow-500 !bg-yellow-100 text-yellow-800",
    icon: InfoCircledIcon,
  },
  {
    label: "Wysoki",
    value: "high",
    style: "border-red-500 !bg-red-100 text-red-800",
    icon: ExclamationTriangleIcon,
  },
];

export const status = [
  {
    value: "open",
    label: "Otwarty",
    style: "border-green-500 !bg-green-100 text-green-800",
  },
  {
    value: "closed",
    label: "Zamknięty",
    style: "border-red-500 !bg-red-100 text-red-800",
  },
  {
    value: "in-progress",
    label: "W trakcie",
    style: "border-yellow-500 !bg-yellow-100 text-yellow-800",
  },
];
