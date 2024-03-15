"use client";

import { Button } from "@/components/ui/button";
import { Link2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface ChatInputProps {
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const uploadFileRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files.length > 0 &&
      (!files || files.length < 5)
    ) {
      setFiles((prev) => [
        ...(prev || []),
        ...Array.from(event.target.files as FileList).slice(
          0,
          5 - (prev?.length || 0),
        ),
      ]);
    }
  };

  const handleUpload = async () => {
    if (files && files.length === 0) return;

    const formData = new FormData();
    files?.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("/api/tickets/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data.urls;
  };

  const messageHandler = async () => {
    if (
      (!input && files && files.length === 0) ||
      isLoading ||
      input.length > 500
    ) {
      return;
    }
    setIsLoading(true);

    try {
      const links =
        files && files.length > 0 ? await handleUpload() : undefined;

      const message = {
        content: input,
        links,
      };

      await axios.post("/api/tickets/send", {
        message,
        chatId,
      });

      setInput("");
      setFiles([]);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-2 min-h-24 w-full border-t border-gray-200 bg-white px-4 pt-4 md:relative">
      <div className="relative flex flex-col overflow-hidden">
        {files && files.length > 0 && (
          <div className="flex flex-wrap space-x-2">
            {files?.map((file, index) => (
              <div
                key={index}
                className="relative m-2 mr-2 flex h-16 w-16 items-center justify-center rounded-[6px]"
              >
                <Image
                  fill
                  src={URL.createObjectURL(file)}
                  alt="file"
                  className="h-full w-full rounded-[6px] object-cover"
                />

                <button
                  onClick={() => {
                    setFiles((prev) => [
                      ...(prev || []).slice(0, index),
                      ...(prev || []).slice(index + 1),
                    ]);
                  }}
                  className="absolute right-0 top-0 -mr-1 -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          <div className="mr-8 flex w-full items-center justify-center rounded-[6px] border border-gray-200">
            <textarea
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  messageHandler();
                }
              }}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder={`Treść wiadomości...`}
              maxLength={500}
              className="!focus-visible:ring-0 no-scrollbar w-full resize-none px-3 py-4 text-sm !shadow-none focus:outline-none focus:ring-0"
            />

            <Button
              disabled={isLoading}
              variant="secondaryBlue"
              className="mr-2 scale-90 md:scale-100"
              onClick={() => uploadFileRef.current?.click()}
            >
              <Link2Icon className="h-4 w-4" />
            </Button>
            <input
              ref={uploadFileRef}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              id="file-upload"
              name="file-upload"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>
          <Button
            disabled={isLoading}
            variant="secondaryBlue"
            className="scale-90 md:scale-100"
            onClick={messageHandler}
            type="submit"
          >
            <span className="hidden lg:block">Wyślij wiadomość</span>{" "}
            <PaperPlaneIcon className="h-4 w-4 lg:ml-2" />
          </Button>
        </div>
        <p className="mt-2 text-xs opacity-60">
          {input.length}/500 znaków, {files?.length || 0}/5 załączników
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
