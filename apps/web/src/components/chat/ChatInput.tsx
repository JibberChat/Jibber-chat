import { Send } from "lucide-react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

export const ChatInput: React.FC<Readonly<ChatInputProps>> = ({ sendMessage }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message;
    if (message.value.trim() === "") return;
    if (message) {
      sendMessage(message.value);
      message.value = "";
    }
  };
  return (
    <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-background">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          placeholder="Type your message..."
          name="message"
          id="message"
          rows={1}
          className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
        />
        <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
          <Send className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};
