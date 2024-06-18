import {  GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from "@/http/chat";
import SendIcon from "./icons/send";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";

export const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hey, how's it going?", user: "JD", me: false },
    { id: 2, message: "I'm doing great, thanks for asking!", user: "Me", me: true },
  ]);

  const {subscribeToMore, data} = useQuery(GET_ROOMMESSAGES, { variables: { roomId: "1" } });
  console.log("data", data);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: ON_MESSAGE_ADDED,
      variables: { roomId: "1" },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.userJoinedRoom;
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, message: newMessage.message, user: newMessage.userId, me: false },
        ]);
        return prev;
      },
    });
  }, []);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      variables: { message: e.currentTarget.message.value, roomId: "1" },
    });
  };
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-[calc(100vh-128px)] overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {messages.map(({id, message, user, me}) => {
            return me ? (
              <div key={id} className="flex items-start gap-4 justify-end">
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                    {message}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    2:31 PM
                  </span>
                </div>
                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                  {/* <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" /> */}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div key={id} className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                  {/* <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" /> */}
                  <AvatarFallback>{user}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg bg-gray-200 p-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-50">
                    {message}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    2:30 PM
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-800">
        <form className="flex items-center gap-4" onSubmit={handleSubmit}>
          <Input
            autoComplete="off"
            className="flex-1"
            id="message"
            placeholder="Type your message..."
          />
          <Button
            className="rounded-full"
            size="icon"
            type="submit"
            variant="ghost"
          >
            <SendIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </form>
      </div>
    </div>
  );
}
